import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { augmentImages, parseMarkdown, renderBlocks } from "./lib/markdown-to-docx.mjs";

const require = createRequire(import.meta.url);

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const docsDirectory = path.resolve(scriptDirectory, "../..");
const repositoryDirectory = path.resolve(docsDirectory, "..");
const staticRoot = path.join(docsDirectory, "static");
const manualRoot = path.join(docsDirectory, "docs/manual");
const outputRoot = path.join(docsDirectory, "downloads");

const PRODUCT_VERSION = "4.5.0";
const GENERATION_DATE = new Date().toISOString().slice(0, 10);

const documents = [
  {
    id: "product",
    title: "微语产品说明书",
    subtitle: "全渠道智能客服平台",
    audience: "客户决策者、售前、项目负责人、实施人员",
    outputDir: "product",
    fileName: `bytedesk-product-description-zh-CN-${PRODUCT_VERSION}.docx`,
    sections: [
      { source: "gettting_started.md", title: "快速开始", dir: "admin", heading: "管理后台快速开始" },
      { source: "gettting_started.md", title: "客服工作台快速开始", dir: "agent" },
      { source: "thread.md", title: "产品功能概览", dir: "agent/thread", heading: "会话处理" },
      { source: "ticket.md", title: "工单与协同", dir: "agent/ticket", heading: "工单处理" },
      { source: "robot.md", title: "AI 与机器人", dir: "agent/ai", heading: "AI 助手与机器人" },
    ],
  },
  {
    id: "admin",
    title: "微语管理后台子系统用户手册",
    subtitle: "组织、客服、知识库、AI、工单与数据管理",
    audience: "系统管理员、客服主管、运营人员、实施人员",
    outputDir: "admin",
    fileName: `bytedesk-admin-user-manual-zh-CN-${PRODUCT_VERSION}.docx`,
    // 章节顺序严格对应管理后台左侧菜单（frontend/apps/admin/config/routes.ts）；
    // 按用户要求剔除 MCP（ai/mcp）与社交评论（voc/comment）。
    sections: [
      { source: "auth/login.md", title: "登录" },
      { source: "gettting_started.md", title: "快速开始" },
      { source: "welcome.md", title: "工作台", part: "工作台" },
      { source: "team/member.md", title: "成员管理", part: "组织管理" },
      { source: "team/role.md", title: "角色与权限" },
      { source: "team/task.md", title: "待办任务" },
      { source: "team/notification.md", title: "通知管理" },
      { source: "team/email.md", title: "邮件通道" },
      { source: "team/sms.md", title: "短信通道" },
      { source: "team/action.md", title: "操作日志" },
      { source: "team/org.md", title: "组织信息" },
      { source: "service/agent.md", title: "客服管理", part: "在线客服" },
      { source: "service/workgroup.md", title: "工作组" },
      { source: "service/unified.md", title: "统一路由" },
      { source: "service/thread.md", title: "会话管理" },
      { source: "service/message.md", title: "消息管理" },
      { source: "service/tag.md", title: "标签管理" },
      { source: "service/channel.md", title: "渠道管理" },
      { source: "service/quickbutton.md", title: "快捷按钮" },
      { source: "service/form.md", title: "表单管理" },
      { source: "service/holiday.md", title: "工作时间" },
      { source: "service/workflow.md", title: "工作流" },
      { source: "ai/robot.md", title: "机器人", part: "智能助手" },
      { source: "ai/agent.md", title: "智能体" },
      { source: "ai/prompt.md", title: "提示词" },
      { source: "ai/model.md", title: "大模型" },
      { source: "ai/message.md", title: "AI 消息" },
      { source: "ai/tools.md", title: "工具" },
      { source: "ai/skill.md", title: "技能" },
      { source: "kb/article.md", title: "帮助中心", part: "知识库" },
      { source: "kb/llm.md", title: "大模型知识库" },
      { source: "kb/autoreply.md", title: "自动回复" },
      { source: "kb/quickreply.md", title: "快捷回复" },
      { source: "kb/taboo.md", title: "敏感词" },
      { source: "kb/upload.md", title: "上传记录" },
      { source: "ticket/data.md", title: "工单数据", part: "工单管理" },
      { source: "ticket/process.md", title: "工单流程" },
      { source: "ticket/settings.md", title: "工单设置" },
      { source: "marketing/blog.md", title: "内容管理", part: "营销管理" },
      { source: "bi.md", title: "数据分析", part: "数据分析与服务质检" },
      { source: "quality.md", title: "服务质检" },
      { source: "setting.md", title: "系统设置", part: "系统设置" },
    ],
  },
  {
    id: "agent",
    title: "微语客服工作台子系统用户手册",
    subtitle: "会话接待、工单处理与 AI 助手",
    audience: "一线客服、客服主管、质检人员",
    outputDir: "agent",
    fileName: `bytedesk-agent-desktop-user-manual-zh-CN-${PRODUCT_VERSION}.docx`,
    sections: "agent-tree",
  },
  {
    // 访客端（visitor/visitorTicket）用户手册；章节顺序：快速开始 → 登录 → 会话 → 机器人 → 工单 → 账号安全
    id: "chat",
    title: "微语 Chat 访客端子系统用户手册",
    subtitle: "在线咨询、机器人接待与我的工单",
    audience: "网站访客、最终用户",
    outputDir: "chat",
    fileName: `bytedesk-chat-visitor-user-manual-zh-CN-${PRODUCT_VERSION}.docx`,
    sections: [
      { source: "gettting_started.md", title: "快速开始", dir: "chat" },
      { source: "login.md", title: "登录与匿名访问", dir: "chat/auth" },
      { source: "thread.md", title: "聊天会话", dir: "chat/thread" },
      { source: "robot.md", title: "机器人接待", dir: "chat/ai" },
      { source: "ticket.md", title: "我的工单", dir: "chat/ticket" },
      { source: "changepassword.md", title: "账号与密码安全", dir: "chat/setting" },
    ],
  },
];

/** 列出目录下 .md 文件（跳过 _category_.json 与 index） */
async function listManualFiles(relativeDir) {
  const { readdir } = await import("node:fs/promises");
  const absoluteDir = path.join(manualRoot, relativeDir);
  let entries;
  try {
    entries = await readdir(absoluteDir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const nested = await listManualFiles(path.join(relativeDir, entry.name));
      files.push(...nested);
    } else if (entry.name.endsWith(".md")) {
      files.push(path.join(relativeDir, entry.name));
    }
  }
  return files.sort();
}

function deriveSectionTitle(fileName) {
  const base = path.basename(fileName, ".md");
  const map = {
    gettting_started: "快速开始",
    welcome: "工作台首页",
    login: "登录",
    thread: "会话处理",
    ticket: "工单处理",
    robot: "机器人",
    member: "成员管理",
    role: "角色与权限",
    org: "组织管理",
    agent: "客服管理",
    workgroup: "工作组",
    unified: "统一路由",
    channel: "渠道管理",
    faq: "常见问题",
    article: "知识文章",
    model: "大模型",
    prompt: "提示词",
    tools: "工具",
    mcp: "MCP",
    skill: "技能",
    settings: "设置",
    setting: "设置",
    data: "数据",
    changepassword: "修改密码",
    contact: "联系人",
    notification: "通知",
  };
  return map[base] ?? base;
}

async function buildCoverPage(docx, doc) {
  const { Paragraph, TextRun, AlignmentType, PageBreak } = docx;
  const elements = [];

  elements.push(new Paragraph({ text: "", spacing: { after: 2400 } }));
  elements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: doc.title, bold: true, size: 56 })],
      spacing: { after: 300 },
    }),
  );
  elements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: doc.subtitle, size: 28, color: "666666" })],
      spacing: { after: 600 },
    }),
  );
  elements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `适用版本：v${PRODUCT_VERSION}`, size: 22, color: "888888" })],
      spacing: { after: 120 },
    }),
  );
  elements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `生成日期：${GENERATION_DATE}`, size: 22, color: "888888" })],
      spacing: { after: 120 },
    }),
  );
  elements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `目标读者：${doc.audience}`, size: 22, color: "888888" })],
      spacing: { after: 120 },
    }),
  );
  elements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "微语 bytedesk.com", size: 20, color: "999999" })],
    }),
  );
  elements.push(new Paragraph({ children: [new PageBreak()] }));

  return elements;
}

async function buildDocument(doc) {
  const docx = require("docx");
  const {
    Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
    PageBreak, TableOfContents, Footer, PageNumber, LevelFormat, NumberFormat,
  } = docx;

  const children = [];

  // 封面
  children.push(...(await buildCoverPage(docx, doc)));

  // 目录页
  children.push(new Paragraph({ text: "目录", heading: HeadingLevel.HEADING_1 }));
  children.push(new TableOfContents("目录", { hyperlink: true, headingStyleRange: "1-3" }));
  children.push(new Paragraph({ children: [new PageBreak()] }));

  // 正文章节
  const sectionSources =
    doc.sections === "agent-tree"
      ? (await listManualFiles("agent")).map((file) => {
          // listManualFiles 返回 "agent/xxx.md" / "agent/yyy/zzz.md"，拆成 dir + source 以便下方统一拼路径
          const dir = path.dirname(file);
          return {
            source: path.basename(file),
            dir: dir === "." ? "agent" : dir,
            title: deriveSectionTitle(file),
          };
        })
      : doc.sections;

  let firstSection = true;
  let currentPart = null;
  for (const section of sectionSources) {
    const sourcePath = section.dir
      ? path.join(manualRoot, section.dir, section.source)
      : path.join(manualRoot, "admin", section.source);

    let source;
    try {
      source = await readFile(sourcePath, "utf8");
    } catch {
      console.warn(`[build-docx] ${doc.id}: 源文件缺失，已跳过章节：${sourcePath}`);
      continue; // 源文件缺失时跳过该章
    }

    // 新的菜单分组：插入分组扉页（仅当配置了 part 且与上一章不同）
    if (section.part && section.part !== currentPart) {
      currentPart = section.part;
      if (!firstSection) {
        children.push(new Paragraph({ children: [new PageBreak()] }));
      }
      children.push(
        new Paragraph({ text: currentPart, heading: HeadingLevel.HEADING_1, pageBreakBefore: true }),
      );
      firstSection = false;
    }

    if (!firstSection) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }
    firstSection = false;

    const blocks = augmentImages(parseMarkdown(source), staticRoot);
    const rendered = await renderBlocks(blocks, { staticRoot });

    // 若首个块不是 H1，用配置标题补一个；菜单分组内的章节统一降为 H2 以体现层级
    const hasOwnH1 = blocks.some((b) => b.type === "heading" && b.level === 1);
    if (!hasOwnH1) {
      children.push(
        new Paragraph({ text: section.title ?? path.basename(sourcePath, ".md"), heading: HeadingLevel.HEADING_2 }),
      );
    } else if (currentPart && hasOwnH1) {
      // 将文档自身 H1 降级为 H2，保持分组(H1) -> 章节(H2)层级
      for (const block of blocks) {
        if (block.type === "heading" && block.level === 1) block.level = 2;
      }
    }
    children.push(...rendered);
  }

  const document = new Document({
    creator: "bytedesk docs pipeline",
    title: doc.title,
    description: `${doc.subtitle}，生成日期 ${GENERATION_DATE}`,
    styles: {
      default: {
        document: {
          run: { font: "Microsoft YaHei", size: 21 },
          paragraph: { spacing: { line: 320 } },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: "ordered-list",
          levels: [
            { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: "start" },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ children: [PageNumber.CURRENT], color: "888888", size: 18 }),
                  new TextRun({ text: `  ·  微语 v${PRODUCT_VERSION}`, color: "888888", size: 18 }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(document);
  const outputDir = path.join(outputRoot, doc.outputDir);
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, doc.fileName);
  await writeFile(outputPath, buffer);
  return { outputPath, bytes: buffer.length, sections: sectionSources.length };
}

async function main() {
  const results = [];
  for (const doc of documents) {
    const result = await buildDocument(doc);
    console.log(`[build-docx] ${doc.id}: ${result.outputPath} (${(result.bytes / 1024).toFixed(1)} KB, ${result.sections} sections)`);
    results.push({ id: doc.id, ...result });
  }
  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
}

main().catch((error) => {
  console.error(`[build-docx] ${error.stack ?? error.message}`);
  process.exitCode = 1;
});
