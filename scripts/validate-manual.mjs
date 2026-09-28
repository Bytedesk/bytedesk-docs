#!/usr/bin/env node
/**
 * validate-manual.mjs — 校验 manual/admin 文档树与管理后台菜单(routes.ts)的一致性
 *
 * 规则（见 docs/plans/2026-09-03-admin-manual-menu-restructure-plan.md 2.1）：
 *   可见菜单项（有 name、无 hideInMenu、无 redirect、非注释、path 以 / 开头、
 *   且不属于 layout:false 分区）的路由 path 去掉首部 '/' 即为
 *   docs/docs/manual/admin/ 下的期望文档路径。
 *
 * 排除白名单（合法保留但非菜单对应的文档）：
 *   - gettting_started.md（分区总览）
 *   - auth/、callcenter/、workplace/（登录页帮助 / callAdmin 手册范畴，另行规划）
 *   - super/（二期，菜单存在但文档暂不生成）
 *
 * 用法：node scripts/validate-manual.mjs [--warn]
 * 输出：缺失/多余清单；全部一致时退出码 0，否则退出码 1（--warn 模式始终退出 0）
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsRoot = join(__dirname, "..");
const routesPath = join(docsRoot, "..", "frontend", "apps", "admin", "config", "routes.ts");
const manualAdminDir = join(docsRoot, "docs", "manual", "admin");

const warnOnly = process.argv.includes("--warn");

/** 菜单存在但文档暂缓生成的路由前缀（二期/其他后台范畴） */
const SKIP_MENU_PREFIXES = ["super/"];
/** layout:false 分区下的路由（非侧边栏菜单） */
const SKIP_MENU_PATHS = new Set(["/debug", "/auth/login", "/auth/register"]);
/** manual/admin 下合法存在但不对应菜单的文档 */
const EXPECTED_EXTRA_FILES = new Set(["gettting_started.md"]);
/** 整目录白名单：不参与比对的目录 */
const DIR_WHITELIST = new Set(["auth", "callcenter", "workplace", "super"]);

// ---------- 1. 平衡花括号解析 routes.ts，提取对象块 ----------
function extractObjects(src) {
  // 提取所有层级的平衡花括号对象（栈方式：内层对象也返回）
  const objs = [];
  const stack = [];
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") {
      stack.push(i);
    } else if (ch === "}" && stack.length > 0) {
      const start = stack.pop();
      objs.push(src.slice(start, i + 1));
    }
  }
  return objs;
}

/** 扁平化：递归剥离嵌套对象，仅保留当前对象的直接属性文本 */
function flatten(obj) {
  // 先去掉自身首尾花括号，再递归剥离嵌套对象，仅保留直接属性文本
  let prev = obj.replace(/^\{/, "").replace(/\}$/, "");
  let next = prev.replace(/\{[^{}]*\}/g, "");
  while (next !== prev) {
    prev = next;
    next = prev.replace(/\{[^{}]*\}/g, "");
  }
  return prev;
}

function hasProp(obj, prop) {
  return new RegExp(`(^|[\\s,{])${prop}\\s*:`).test(flatten(obj));
}

function getPropString(obj, prop) {
  const m = flatten(obj).match(new RegExp(`${prop}\\s*:\\s*["']([^"']+)["']`));
  return m ? m[1] : null;
}

function extractMenuPaths() {
  const src = readFileSync(routesPath, "utf-8");
  const noComments = src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");
  const objs = extractObjects(noComments);
  const paths = [];
  for (const obj of objs) {
    const path = getPropString(obj, "path");
    if (!path || !path.startsWith("/")) continue;
    if (!hasProp(obj, "name")) continue;
    if (hasProp(obj, "redirect")) continue;
    if (/hideInMenu\s*:\s*true/.test(flatten(obj))) continue;
    if (SKIP_MENU_PATHS.has(path)) continue;
    const rel = path.slice(1);
    if (SKIP_MENU_PREFIXES.some((p) => rel.startsWith(p))) continue;
    // 纯容器：自身带 routes 且子路由中有带 name 的可见菜单（文档由子项与 _category_ 承载）
    if (hasProp(obj, "routes")) {
      const hasNamedChild = objs.some(
        (child) =>
          child !== obj &&
          obj.includes(child) &&
          hasProp(child, "name") &&
          getPropString(child, "path") !== null &&
          !/hideInMenu\s*:\s*true/.test(flatten(child)),
      );
      if (hasNamedChild) continue;
    }
    paths.push(path);
  }
  return [...new Set(paths)];
}

// ---------- 2. 期望/实际文件清单 ----------
function expectedFiles() {
  const files = new Set(extractMenuPaths().map((p) => p.replace(/^\//, "") + ".md"));
  for (const f of EXPECTED_EXTRA_FILES) files.add(f);
  return files;
}

function actualFiles() {
  const files = new Set();
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const rel = relative(manualAdminDir, full).split(sep).join("/");
      if (statSync(full).isDirectory()) {
        if (DIR_WHITELIST.has(name)) continue;
        walk(full);
      } else if (name.endsWith(".md")) {
        files.add(rel);
      }
    }
  };
  walk(manualAdminDir);
  return files;
}

// ---------- 3. 比对 ----------
const expected = expectedFiles();
const actual = actualFiles();
const missing = [...expected].filter((f) => !actual.has(f)).sort();
const extra = [...actual].filter((f) => !expected.has(f)).sort();

console.log(`manual/admin 一致性校验：期望 ${expected.size} 个文档，实际 ${actual.size} 个`);
if (missing.length) {
  console.log("\n❌ 缺失（菜单有但文档无）：");
  missing.forEach((f) => console.log(`   - ${f}`));
}
if (extra.length) {
  console.log("\n⚠️ 多余（文档有但菜单无，请确认是否应加入白名单）：");
  extra.forEach((f) => console.log(`   + ${f}`));
}
if (!missing.length && !extra.length) {
  console.log("✅ 菜单与文档完全一致");
  process.exit(0);
}
process.exit(warnOnly ? 0 : 1);
