import { access, mkdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildStorageState, loginViaApi } from "./fixtures/auth.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const docsDirectory = path.resolve(scriptDirectory, "../..");
const repositoryDirectory = path.resolve(docsDirectory, "..");
const outputDirectory = path.join(docsDirectory, "static/img/manual");
const reportDirectory = path.join(docsDirectory, ".manual-screenshots");
const manifestPath = path.join(scriptDirectory, "manifest.json");

const flags = new Set(process.argv.slice(2));
const checkOnly = flags.has("--check");
const updateExisting = flags.has("--update");

async function loadManifest() {
  const source = await readFile(manifestPath, "utf8");
  const manifest = JSON.parse(source);
  const serviceIds = new Set(manifest.services.map((service) => service.id));
  const screenshotIds = new Set();

  for (const screenshot of manifest.screenshots) {
    if (screenshotIds.has(screenshot.id)) {
      throw new Error(`Duplicate screenshot id: ${screenshot.id}`);
    }
    screenshotIds.add(screenshot.id);

    if (!serviceIds.has(screenshot.service)) {
      throw new Error(`Unknown service '${screenshot.service}' for ${screenshot.id}`);
    }

    const target = path.resolve(outputDirectory, screenshot.output);
    const relativeTarget = path.relative(outputDirectory, target);
    if (relativeTarget.startsWith("..") || path.isAbsolute(relativeTarget)) {
      throw new Error(`Screenshot output escapes manual image directory: ${screenshot.output}`);
    }
  }

  return manifest;
}

async function probeService(service) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(service.url, {
      redirect: "manual",
      signal: controller.signal,
    });
    return {
      id: service.id,
      url: service.url,
      state: response.status < 500 ? "ready" : "unhealthy",
      status: response.status,
      ownership: "external",
    };
  } catch (error) {
    return {
      id: service.id,
      url: service.url,
      state: "stopped",
      error: error instanceof Error ? error.message : String(error),
      ownership: null,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function outputExists(relativePath) {
  try {
    await access(path.join(outputDirectory, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function createReport(manifest, services) {
  const screenshots = await Promise.all(
    manifest.screenshots.map(async (screenshot) => ({
      id: screenshot.id,
      service: screenshot.service,
      output: screenshot.output,
      outputExists: await outputExists(screenshot.output),
      requiresAuth: screenshot.requiresAuth,
    })),
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: checkOnly ? "check" : updateExisting ? "update" : "capture",
    repositoryDirectory,
    outputDirectory,
    services,
    screenshots,
  };
}

function buildScreenshotUrl(service, screenshot) {
  const baseUrl = new URL(service.url);
  return new URL(screenshot.path, baseUrl.origin).toString();
}

async function captureScreenshots(manifest, services) {
  const unavailableServices = services.filter((service) => service.state !== "ready");
  if (unavailableServices.length > 0) {
    throw new Error(
      `Required services are not ready: ${unavailableServices.map((service) => service.id).join(", ")}`,
    );
  }

  const backendUrl = manifest.services.find((s) => s.id === "backend");
  const { chromium } = await import("@playwright/test");
  const browser = await chromium.launch({ headless: true });
  const serviceById = new Map(manifest.services.map((service) => [service.id, service]));
  const results = [];
  const authTokens = new Map();

  /** 预登录：为所有 requiresAuth 的 service 获取 token（同一账号、按 channel 区分）。 */
  for (const screenshot of manifest.screenshots) {
    if (!screenshot.requiresAuth || authTokens.has(screenshot.service)) continue;
    const channel = screenshot.authChannel ?? "WEB_ADMIN";
    if (!authTokens.has(channel)) {
      const token = await loginViaApi(backendUrl.url.replace(/\/system\/health$/, ""), { channel });
      authTokens.set(channel, token);
      console.error(`[manual-screenshots] logged in via ${channel}`);
    }
  }

  try {
    for (const screenshot of manifest.screenshots) {
      const targetPath = path.join(outputDirectory, screenshot.output);
      const temporaryPath = `${targetPath}.tmp.png`;
      const exists = await outputExists(screenshot.output);
      if (exists && !updateExisting) {
        results.push({ id: screenshot.id, state: "preserved", output: screenshot.output });
        continue;
      }

      const contextOptions = {
        viewport: manifest.defaults.viewport,
        locale: manifest.defaults.locale,
        colorScheme: manifest.defaults.colorScheme,
        timezoneId: manifest.defaults.timezoneId,
        deviceScaleFactor: 1,
      };

      if (screenshot.requiresAuth) {
        const service = serviceById.get(screenshot.service);
        const channel = screenshot.authChannel ?? "WEB_ADMIN";
        const token = authTokens.get(channel);
        if (!token) {
          results.push({ id: screenshot.id, state: "skipped", reason: "no-token" });
          continue;
        }
        contextOptions.storageState = buildStorageState(
          new URL(service.url).origin,
          token,
        );
      }

      const context = await browser.newContext(contextOptions);
      const page = await context.newPage();
      const service = serviceById.get(screenshot.service);
      const url = buildScreenshotUrl(service, screenshot);

      try {
        await mkdir(path.dirname(targetPath), { recursive: true });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

        const readySelector = screenshot.readySelector ?? "input[type=password], button[type=submit], form";
        await page
          .waitForSelector(readySelector, { state: "visible", timeout: 60000 })
          .catch(() => {});
        await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(screenshot.settleMs ?? 500);

        const bodyText = (await page.locator("body").innerText()).trim();
        if (bodyText.length < 10) {
          throw new Error(`Page body is unexpectedly empty: ${url}`);
        }

        await page.screenshot({ path: temporaryPath, fullPage: true, animations: "disabled" });
        const image = await stat(temporaryPath);
        if (image.size < 5000) {
          throw new Error(`Screenshot is unexpectedly small (${image.size} bytes): ${screenshot.id}`);
        }

        await rename(temporaryPath, targetPath);
        results.push({
          id: screenshot.id,
          state: exists ? "updated" : "created",
          output: screenshot.output,
          url: page.url(),
          bytes: image.size,
        });
      } catch (error) {
        await unlink(temporaryPath).catch(() => {});
        throw error;
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  return results;
}

async function main() {
  const manifest = await loadManifest();
  const services = await Promise.all(manifest.services.map(probeService));
  const report = await createReport(manifest, services);

  await mkdir(reportDirectory, { recursive: true });
  await writeFile(
    path.join(reportDirectory, "preflight-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );

  console.log(JSON.stringify(report, null, 2));

  if (checkOnly) {
    return;
  }

  const captureResults = await captureScreenshots(manifest, services);
  await writeFile(
    path.join(reportDirectory, "capture-report.json"),
    `${JSON.stringify({ ...report, captureResults }, null, 2)}\n`,
    "utf8",
  );
  console.log(JSON.stringify({ captureResults }, null, 2));
}

main().catch((error) => {
  console.error(`[manual-screenshots] ${error.message}`);
  process.exitCode = 1;
});