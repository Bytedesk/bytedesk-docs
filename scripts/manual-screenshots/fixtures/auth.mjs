import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * 通过后端 /auth/v1/login 明文密码登录（testing 模式下验证码已绕过），
 * 返回 accessToken。凭据从环境变量读取，绝不写入仓库。
 *
 * 环境变量：
 *   MANUAL_SHOTS_ADMIN_USERNAME  默认 admin@email.com
 *   MANUAL_SHOTS_ADMIN_PASSWORD  默认 admin123（仅本地测试环境）
 */
export async function loginViaApi(baseUrl, { channel }) {
  const username = process.env.MANUAL_SHOTS_ADMIN_USERNAME ?? "admin@email.com";
  const password = process.env.MANUAL_SHOTS_ADMIN_PASSWORD ?? "admin123";

  const response = await fetch(new URL("/auth/v1/login", baseUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      platform: "BYTEDESK",
      channel,
    }),
  });

  const payload = await response.json();
  if (payload.code !== 200 || !payload.data?.accessToken) {
    throw new Error(
      `Login failed for ${baseUrl} (code=${payload.code}, message=${payload.message}). ` +
        "Ensure backend testing mode is enabled and credentials are correct.",
    );
  }

  return payload.data.accessToken;
}

/**
 * 构建 Playwright storageState：在对应 origin 的 localStorage 注入
 * ACCESS_TOKEN + AUTH_STORE（zustand persist），使页面刷新后即为登录态。
 */
export function buildStorageState(origin, accessToken) {
  return {
    cookies: [],
    origins: [
      {
        origin,
        localStorage: [
          { name: "ACCESS_TOKEN", value: accessToken },
          {
            name: "AUTH_STORE",
            value: JSON.stringify({
              state: { accessToken },
              version: 0,
            }),
          },
        ],
      },
    ],
  };
}

/** 将 storageState 写入临时目录（已被 .gitignore 忽略）。 */
export async function saveStorageState(reportDirectory, serviceId, state) {
  await mkdir(reportDirectory, { recursive: true });
  const filePath = path.join(reportDirectory, `${serviceId}-storage-state.json`);
  await writeFile(filePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  return filePath;
}
