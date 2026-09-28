import { createRequire } from "node:module";
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const docsDirectory = path.resolve(scriptDirectory, "../..");
const staticRoot = path.join(docsDirectory, "static");
const outputRoot = path.join(docsDirectory, "downloads");

const PRODUCT_VERSION = "4.5.0";
const GENERATION_DATE = new Date().toISOString().slice(0, 10);

// ============ 设计系统：微语品牌色 ============
const C = {
  primary: "1677FF",
  primaryDark: "0E42A8",
  secondary: "13C2C2",
  accent: "FA8C16",
  success: "52C41A",
  dark: "14141E",
  dark2: "1C1C2A",
  text: "262633",
  textLight: "FFFFFF",
  muted: "8A8A99",
  bg: "F5F7FB",
  white: "FFFFFF",
  border: "E4E8F0",
};

const F_HEAD = "Microsoft YaHei";
const F_BODY = "Microsoft YaHei";

const PAGE_W = 13.333;
const PAGE_H = 7.5;

let slideCount = 0;

function img(rel) {
  return path.join(staticRoot, rel);
}

function newSlide(pptx, { background = C.white } = {}) {
  const slide = pptx.addSlide();
  slide.background = { color: background };
  slideCount += 1;
  return slide;
}

/** 统一页眉：左侧色条 + 标题 + 副标题 + 分隔线 + 页脚页码 */
function addHeader(slide, title, subtitle, accentColor = C.primary) {
  slide.addShape("roundRect", {
    x: 0.55, y: 0.5, w: 0.14, h: 0.62,
    fill: { color: accentColor }, line: { type: "none" }, rectRadius: 0.06,
  });
  slide.addText(title, {
    x: 0.85, y: 0.38, w: 10.6, h: 0.62,
    fontSize: 26, bold: true, color: C.text, fontFace: F_HEAD,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.87, y: 0.98, w: 10.6, h: 0.36,
      fontSize: 13, color: C.muted, fontFace: F_BODY,
    });
  }
  slide.addShape("line", {
    x: 0.55, y: 1.46, w: 12.23, h: 0,
    line: { color: C.border, width: 1 },
  });
  addFooter(slide);
}

function addFooter(slide) {
  slide.addText("微语 Bytedesk · 客服系统培训", {
    x: 0.55, y: 7.06, w: 5, h: 0.3,
    fontSize: 9, color: C.muted, fontFace: F_BODY,
  });
  slide.addText(String(slideCount).padStart(2, "0"), {
    x: 12.3, y: 7.06, w: 0.5, h: 0.3, align: "right",
    fontSize: 9, color: C.muted, fontFace: F_BODY,
  });
}

/** 带强调点的列表（首条加粗强调） */
function addBulletList(slide, items, options = {}) {
  const {
    x = 0.6, y = 1.8, w = 6.3, h = 5.0, fontSize = 14, gap = 8,
  } = options;
  const rows = [];
  items.forEach((item, i) => {
    const obj = typeof item === "string" ? { text: item } : item;
    rows.push({
      text: obj.text,
      options: {
        bullet: { code: "25CF", indent: 14 },
        breakLine: true,
        bold: obj.bold ?? false,
        color: obj.color ?? (obj.bold ? C.primaryDark : C.text),
        fontSize: obj.fontSize ?? fontSize,
        paraSpaceAfter: gap,
      },
    });
  });
  slide.addText(rows, { x, y, w, h, fontFace: F_BODY, valign: "top", lineSpacingMultiple: 1.15 });
}

/** 截图卡片：白色圆角底 + 边框 + contain 图片 + 说明 */
function addScreenshot(slide, imageRel, caption, box = {}) {
  const { x = 7.15, y = 1.85, w = 5.65, h = 4.55 } = box;
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: C.white }, line: { color: C.border, width: 1.25 }, rectRadius: 0.08,
    shadow: { type: "outer", color: "1B2A4A", opacity: 0.14, blur: 7, offset: 2, angle: 90 },
  });
  slide.addImage({
    path: img(imageRel),
    x: x + 0.15, y: y + 0.15,
    sizing: { type: "contain", w: w - 0.3, h: h - 0.62 },
  });
  if (caption) {
    slide.addText(caption, {
      x: x + 0.15, y: y + h - 0.44, w: w - 0.3, h: 0.32, align: "center",
      fontSize: 10, color: C.muted, fontFace: F_BODY,
    });
  }
}

/** 编号卡片网格 */
function addCardGrid(slide, cards, options = {}) {
  const {
    x = 0.6, y = 1.85, w = 12.13, cardH = 2.2, cols = 3, gap = 0.28,
    numberColor = C.primary,
  } = options;
  const rows = Math.ceil(cards.length / cols);
  const cardW = (w - gap * (cols - 1)) / cols;
  cards.forEach((card, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = x + col * (cardW + gap);
    const cy = y + row * (cardH + gap);
    slide.addShape("roundRect", {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.border, width: 1.25 }, rectRadius: 0.09,
      shadow: { type: "outer", color: "1B2A4A", opacity: 0.1, blur: 6, offset: 2, angle: 90 },
    });
    slide.addShape("ellipse", {
      x: cx + 0.24, y: cy + 0.24, w: 0.52, h: 0.52,
      fill: { color: numberColor }, line: { type: "none" },
    });
    slide.addText(String(i + 1), {
      x: cx + 0.24, y: cy + 0.24, w: 0.52, h: 0.52, align: "center", valign: "middle",
      fontSize: 16, bold: true, color: C.white, fontFace: F_HEAD,
    });
    slide.addText(card.title, {
      x: cx + 0.92, y: cy + 0.26, w: cardW - 1.1, h: 0.5, valign: "middle",
      fontSize: 14.5, bold: true, color: C.text, fontFace: F_HEAD,
    });
    slide.addText(card.desc, {
      x: cx + 0.28, y: cy + 0.92, w: cardW - 0.56, h: cardH - 1.1,
      fontSize: 11.5, color: C.muted, fontFace: F_BODY, valign: "top", lineSpacingMultiple: 1.15,
    });
  });
  return y + rows * (cardH + gap);
}

/** 横向流程步骤（圆点 + 连线 + 标签） */
function addStepFlow(slide, steps, options = {}) {
  const { x = 0.8, y = 3.0, w = 11.73, color = C.primary, fontSize = 12.5 } = options;
  const n = steps.length;
  const stepW = w / n;
  const cx = (i) => x + stepW * i + stepW / 2;
  // 连接线
  slide.addShape("line", {
    x: cx(0), y: y + 0.26, w: cx(n - 1) - cx(0), h: 0,
    line: { color: C.border, width: 2.5 },
  });
  steps.forEach((label, i) => {
    slide.addShape("ellipse", {
      x: cx(i) - 0.26, y, w: 0.52, h: 0.52,
      fill: { color: i === 0 || i === n - 1 ? color : C.white },
      line: { color, width: 2 },
    });
    slide.addText(String(i + 1), {
      x: cx(i) - 0.26, y, w: 0.52, h: 0.52, align: "center", valign: "middle",
      fontSize: 14, bold: true, color: i === 0 || i === n - 1 ? C.white : color, fontFace: F_HEAD,
    });
    slide.addText(label, {
      x: cx(i) - stepW / 2 + 0.1, y: y + 0.66, w: stepW - 0.2, h: 0.7, align: "center",
      fontSize, color: C.text, fontFace: F_BODY, lineSpacingMultiple: 1.05,
    });
  });
}

/** 章节分隔页 */
function addSectionDivider(pptx, number, title, highlights, accentColor) {
  const slide = newSlide(pptx, { background: C.dark });
  // 装饰圆
  slide.addShape("ellipse", {
    x: 9.2, y: -1.6, w: 5.4, h: 5.4,
    fill: { color: accentColor, transparency: 86 }, line: { type: "none" },
  });
  slide.addShape("ellipse", {
    x: 10.6, y: 4.9, w: 3.6, h: 3.6,
    fill: { color: C.secondary, transparency: 88 }, line: { type: "none" },
  });
  slide.addShape("roundRect", {
    x: 0.9, y: 1.95, w: 0.16, h: 2.6,
    fill: { color: accentColor }, line: { type: "none" }, rectRadius: 0.07,
  });
  slide.addText(`PART ${number}`, {
    x: 1.35, y: 1.95, w: 8, h: 0.6,
    fontSize: 20, bold: true, color: accentColor, fontFace: F_HEAD, charSpacing: 4,
  });
  slide.addText(title, {
    x: 1.32, y: 2.55, w: 9.5, h: 1.15,
    fontSize: 40, bold: true, color: C.textLight, fontFace: F_HEAD,
  });
  slide.addText(highlights.join("   ·   "), {
    x: 1.35, y: 3.95, w: 10, h: 0.55,
    fontSize: 15, color: C.secondary, fontFace: F_BODY,
  });
  addFooterDark(slide);
  return slide;
}

function addFooterDark(slide) {
  slide.addText("微语 Bytedesk · 客服系统培训", {
    x: 0.55, y: 7.06, w: 5, h: 0.3,
    fontSize: 9, color: "6E6E80", fontFace: F_BODY,
  });
  slide.addText(String(slideCount).padStart(2, "0"), {
    x: 12.3, y: 7.06, w: 0.5, h: 0.3, align: "right",
    fontSize: 9, color: "6E6E80", fontFace: F_BODY,
  });
}

function addNotes(slide, notes) {
  if (notes) slide.addNotes(notes);
}

async function main() {
  const pptxModule = require("pptxgenjs");
  const PptxGenJS = pptxModule.default ?? pptxModule;
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "bytedesk";
  pptx.company = "微语 bytedesk.com";
  pptx.title = "微语客服系统培训课件";

  // ================= 1. 封面 =================
  {
    const slide = newSlide(pptx, { background: C.dark });
    slide.addShape("ellipse", { x: 8.6, y: -2.2, w: 7.2, h: 7.2, fill: { color: C.primary, transparency: 84 }, line: { type: "none" } });
    slide.addShape("ellipse", { x: 11.0, y: 3.4, w: 4.6, h: 4.6, fill: { color: C.secondary, transparency: 86 }, line: { type: "none" } });
    slide.addShape("ellipse", { x: -1.8, y: 5.2, w: 4.4, h: 4.4, fill: { color: C.accent, transparency: 88 }, line: { type: "none" } });
    // 顶部徽标条
    slide.addShape("roundRect", { x: 0.9, y: 0.85, w: 0.5, h: 0.5, fill: { color: C.primary }, line: { type: "none" }, rectRadius: 0.12 });
    slide.addText("微", { x: 0.9, y: 0.85, w: 0.5, h: 0.5, align: "center", valign: "middle", fontSize: 20, bold: true, color: C.white, fontFace: F_HEAD });
    slide.addText("微语 Bytedesk", { x: 1.52, y: 0.85, w: 4, h: 0.5, valign: "middle", fontSize: 16, bold: true, color: C.textLight, fontFace: F_HEAD });
    // 徽章
    slide.addShape("roundRect", { x: 0.92, y: 2.3, w: 1.9, h: 0.44, fill: { color: C.primary, transparency: 74 }, line: { color: C.primary, width: 1 }, rectRadius: 0.2 });
    slide.addText("内部培训资料", { x: 0.92, y: 2.3, w: 1.9, h: 0.44, align: "center", valign: "middle", fontSize: 11, color: "9DC2FF", fontFace: F_BODY });
    // 主标题
    slide.addText("微语客服系统", {
      x: 0.88, y: 2.85, w: 11.5, h: 1.15,
      fontSize: 52, bold: true, color: C.textLight, fontFace: F_HEAD,
    });
    slide.addText("管理员与客服工作台培训", {
      x: 0.92, y: 4.05, w: 11.5, h: 0.7,
      fontSize: 26, color: C.secondary, fontFace: F_BODY,
    });
    slide.addText("从系统配置到日常接待，一次讲透全流程", {
      x: 0.92, y: 4.85, w: 10, h: 0.5,
      fontSize: 14, color: "9A9AAC", fontFace: F_BODY,
    });
    slide.addText(`版本 v${PRODUCT_VERSION}   ·   ${GENERATION_DATE}   ·   微语 bytedesk.com   ·   docs.weiyuai.cn`, {
      x: 0.92, y: 6.55, w: 11.5, h: 0.4,
      fontSize: 12, color: C.muted, fontFace: F_BODY,
    });
    addNotes(slide, "开场：欢迎参加微语客服系统培训。本次培训面向管理员和新客服，覆盖系统初始化配置与日常接待全流程，约 2-3 小时。");
  }

  // ================= 2. 培训目标与议程 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "培训目标与议程", "两条主线：管理员配置侧 + 客服接待侧");
    addCardGrid(slide, [
      { title: "认识微语", desc: "了解产品定位、核心模块与三端角色分工" },
      { title: "管理员配置", desc: "组织成员、客服路由、知识库、机器人、工单流程" },
      { title: "客服接待", desc: "登录上线、会话处理、转接协同、结束评价" },
      { title: "工单闭环", desc: "从会话创建工单，流转、解决、访客验证" },
      { title: "AI 助手", desc: "回复建议、会话总结，人工确认后发送" },
      { title: "综合演练", desc: "两人一组完成端到端闭环并验收" },
    ], { cols: 3, cardH: 2.15, y: 1.85 });
    addNotes(slide, "强调本次培训两个角色线索：管理员线（配置侧）与客服线（接待侧）。建议先问在场人员角色比例，调整侧重。");
  }

  // ================= 3. 微语是什么 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "微语是什么", "AI 驱动的全渠道智能客服平台", C.secondary);
    addCardGrid(slide, [
      { title: "全渠道接入", desc: "网页、微信、邮件、API 等多渠道统一接待" },
      { title: "智能机器人", desc: "基于大模型的自动问答与转人工" },
      { title: "人工工作台", desc: "会话、客户资料、快捷回复、协同" },
      { title: "工单系统", desc: "创建、流转、SLA、满意度闭环" },
      { title: "知识库", desc: "文章、FAQ、大模型知识库三层体系" },
      { title: "数据与质检", desc: "会话统计、客服绩效、智能质检" },
    ], { cols: 3, cardH: 2.15, y: 1.85, numberColor: C.secondary });
    addNotes(slide, "用一个典型场景串讲：客户在网页咨询 → 机器人先答 → 转人工 → 客服创建工单 → 处理完成 → 客户评价。");
  }

  // ================= 4. 系统组成与角色分工 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "系统组成与角色分工", "三端协同，数据实时互通", C.accent);
    const roles = [
      { role: "管理后台 Admin", duty: "组织、成员、权限、渠道、知识库、AI、工单、统计", color: C.primary, shot: "/img/manual/admin/welcome-new.png" },
      { role: "客服工作台 Desktop", duty: "会话接待、工单处理、AI 助手辅助回复", color: C.secondary, shot: "/img/manual/agent/chat.png" },
      { role: "访客端 Visitor", duty: "客户发起咨询、提交工单、查看进度、评价", color: C.accent, shot: "/img/manual/chat/gettting_started.png" },
    ];
    roles.forEach((item, i) => {
      const cx = 0.6 + i * 4.24;
      slide.addShape("roundRect", {
        x: cx, y: 1.8, w: 3.86, h: 4.3,
        fill: { color: C.white }, line: { color: C.border, width: 1.25 }, rectRadius: 0.09,
        shadow: { type: "outer", color: "1B2A4A", opacity: 0.1, blur: 6, offset: 2, angle: 90 },
      });
      slide.addShape("roundRect", { x: cx + 0.2, y: 2.0, w: 0.1, h: 0.42, fill: { color: item.color }, line: { type: "none" }, rectRadius: 0.04 });
      slide.addText(item.role, { x: cx + 0.42, y: 1.95, w: 3.3, h: 0.5, fontSize: 15.5, bold: true, color: item.color, fontFace: F_HEAD, valign: "middle" });
      slide.addText(item.duty, { x: cx + 0.24, y: 2.55, w: 3.4, h: 0.75, fontSize: 11.5, color: C.text, fontFace: F_BODY, lineSpacingMultiple: 1.1 });
      slide.addImage({
        path: img(item.shot),
        x: cx + 0.2, y: 3.4,
        sizing: { type: "contain", w: 3.46, h: 2.5 },
      });
    });
    slide.addText("管理员在 Admin 配置  →  客服在 Desktop 接待  →  客户通过 Visitor 使用", {
      x: 0.6, y: 6.35, w: 12.13, h: 0.45, align: "center",
      fontSize: 13.5, color: C.muted, fontFace: F_BODY, italic: true,
    });
    addNotes(slide, "画三栏角色图。强调三端数据实时互通：管理员改配置立即影响客服端；客服处理的记录同步到统计。");
  }

  // ================= 5. 分节：管理员配置篇 =================
  addSectionDivider(pptx, "01", "管理员配置篇", ["组织与成员", "客服与路由", "知识库与机器人", "工单流程"], C.primary);

  // ================= 6. Admin 组织与成员 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "Admin 初始化：组织与成员", "管理员的第一天");
    addBulletList(slide, [
      { text: "登录 Admin → 工作台首页确认组织信息", bold: true },
      "组织管理 → 成员：逐个添加或 Excel 批量导入",
      "为成员分配角色：超级管理员 / 管理员 / 普通成员",
      "设置成员可登录平台（Admin / Desktop / both）",
      { text: "建议：正式使用前修改默认密码并绑定邮箱手机号", color: C.accent },
      "通知：配置邮件 / 短信通道，用于验证码与通知",
    ]);
    addScreenshot(slide, "/img/manual/admin/team/member-new.png", "管理后台 · 成员管理");
    addNotes(slide, "演示：现场添加一个测试成员，展示角色下拉与可登录平台选项。提醒默认密码安全风险。");
  }

  // ================= 7. Admin 客服与路由 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "Admin 初始化：客服与路由", "让客户找到正确的客服");
    addBulletList(slide, [
      { text: "在线客服 → 客服：创建客服账号并关联成员", bold: true },
      "在线客服 → 工作组：按业务线建立接待组",
      "在线客服 → 统一路由：配置分配策略（轮询 / 技能）",
      "在线客服 → 渠道：接入网页聊天、微信公众号等",
      "在线客服 → 队列：查看排队与客服实时状态",
      { text: "验证：用访客端发起会话，确认路由到正确工作组", color: C.accent },
    ]);
    addScreenshot(slide, "/img/manual/admin/service/agent-new.png", "管理后台 · 客服管理");
    addNotes(slide, "演示：创建一个「售后」工作组，把测试客服加进去，然后用浏览器无痕窗口模拟访客发消息，展示会话到达客服端。");
  }

  // ================= 8. Admin 知识库与机器人 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "Admin 配置：知识库与机器人", "让机器人先回答 80% 的常见问题");
    addBulletList(slide, [
      { text: "知识库 → 文章：整理帮助中心文档", bold: true },
      "知识库 → 常见问题：维护 FAQ 问答对",
      "智能助手 → 大模型：配置模型与 API Key",
      "智能助手 → 机器人：绑定知识库 + 设置提示词",
      "智能助手 → 工具 / MCP / 技能：按需扩展机器人能力",
      { text: "测试：验证回答质量与转人工关键词", color: C.accent },
    ]);
    addScreenshot(slide, "/img/manual/admin/ai/robot-new.png", "管理后台 · 机器人管理");
    addNotes(slide, "强调三层知识体系：帮助中心文章（人读）、FAQ（精确匹配）、大模型知识库（语义检索）。演示转人工关键词设置。");
  }

  // ================= 9. Admin 工单流程 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "Admin 配置：工单流程", "从会话到闭环");
    addBulletList(slide, [
      { text: "工单管理 → 工单：查看全部工单与状态流转", bold: true },
      "工单管理 → 流程：可视化编辑器编排处理流程",
      "工单设置：分类、优先级、SLA 时限、自动分配",
      "外部工单：访客无需登录即可提交并跟踪",
      "内部工单：成员间协同处理，支持部门流转",
      { text: "验证：走完 新建 → 处理 → 解决 → 验证 闭环", color: C.accent },
    ]);
    addScreenshot(slide, "/img/manual/admin/ticket/data.png", "管理后台 · 工单数据");
    addNotes(slide, "演示 TicketBuilder 可视化流程编辑。重点讲工单状态机：NEW → PROCESSING → RESOLVED → VERIFIED/CLOSED。");
  }

  // ================= 10. 分节：客服工作篇 =================
  addSectionDivider(pptx, "02", "客服工作篇", ["登录与状态", "会话接待", "工单处理", "AI 助手"], C.secondary);

  // ================= 11. 登录与接待状态 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "客服工作台：登录与接待状态", "客服的一天从上线开始", C.secondary);
    addBulletList(slide, [
      { text: "登录 Desktop → 默认进入聊天工作台", bold: true },
      "左下角头像 → 切换接待状态",
      "在线：正常接收新会话分配",
      "小休 / 忙碌：暂不分配新访客（可选原因：会议 / 培训）",
      "离线：不接收任何会话与消息",
      { text: "注意：有进行中会话时退出会弹确认提示", color: C.accent },
    ]);
    addScreenshot(slide, "/img/manual/agent/status.png", "客服工作台 · 接待状态切换");
    addNotes(slide, "让每位学员现场登录并切换一次状态。强调「小休」与「离线」的区别：小休消息仍会到达，离线完全不收。");
  }

  // ================= 12. 会话接待 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "客服工作台：会话接待", "四栏布局高效处理", C.secondary);
    addBulletList(slide, [
      { text: "左侧：会话分类（全部 / 进行中 / 待处理 / 已结束）", bold: true },
      "中部：会话列表（访客昵称、最后消息、未读数）",
      "对话窗口：文字、图片、文件、表情、快捷回复",
      "右侧面板：客户资料、历史会话、标签备注",
      "转接：把会话转给其他客服或工作组",
      { text: "结束会话：可邀请客户评价满意度", color: C.accent },
    ]);
    addScreenshot(slide, "/img/manual/agent/chat-wide.png", "客服工作台 · 四栏布局");
    addNotes(slide, "演示完整接待：接收新会话 → 用快捷回复 → 查看客户资料 → 转接演示 → 结束并邀请评价。强调右侧面板的信息价值。");
  }

  // ================= 13. 工单处理 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "客服工作台：工单处理", "会话解决不了就建工单", C.secondary);
    addBulletList(slide, [
      { text: "从会话创建工单：自动关联访客与会话记录", bold: true },
      "工单列表：按状态、优先级、处理人筛选",
      "处理动作：认领、指派、转派、备注",
      "解决后：访客确认（已解决 / 未解决）",
      "处理流程时间线：每一步操作留痕可追溯",
      { text: "工单消息：状态变化自动同步到关联会话", color: C.accent },
    ]);
    addScreenshot(slide, "/img/manual/agent/ticket-detail.png", "客服工作台 · 工单详情与认领指派");
    addNotes(slide, "演示从刚才的会话创建工单并指派给另一位学员，两人协作完成处理。强调访客确认环节。");
  }

  // ================= 14. AI 客服助手 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "客服工作台：AI 客服助手", "让人工如虎添翼", C.secondary);
    addBulletList(slide, [
      { text: "回复建议：根据上下文生成推荐回复", bold: true },
      "会话总结：一键总结长会话要点",
      "下一步建议：系统提示可能的处理动作",
      "知识库检索：直接搜索知识库回答",
      { text: "使用建议：AI 建议需人工确认后发送", color: C.accent },
    ]);
    addScreenshot(slide, "/img/manual/agent/agent_assistant.png", "客服工作台 · AI 客服助手面板");
    addNotes(slide, "演示 AI 助手对一个复杂咨询生成回复建议。强调：AI 是辅助，客服需要审核后再发，避免错误承诺。");
  }

  // ================= 15. 分节：实战与答疑 =================
  addSectionDivider(pptx, "03", "实战与答疑", ["综合演练", "常见问题", "培训总结"], C.accent);

  // ================= 16. 综合演练 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "综合演练：端到端闭环", "两人一组 · 15 分钟", C.accent);
    addStepFlow(slide, ["客户发起咨询", "机器人自动回复", "转人工路由", "客服接待建单", "处理并标记解决", "客户验证评价"], {
      y: 2.1, color: C.accent,
    });
    // 角色卡
    const roles = [
      { role: "角色 A · 管理员", duty: "创建测试工作组并配置机器人", color: C.primary },
      { role: "角色 B · 客服", duty: "登录 Desktop 并切换为在线，接待并建单", color: C.secondary },
      { role: "角色 C · 客户", duty: "从访客端发起咨询，最终确认并评价", color: C.accent },
    ];
    roles.forEach((r, i) => {
      const cx = 0.6 + i * 4.24;
      slide.addShape("roundRect", {
        x: cx, y: 4.0, w: 3.86, h: 1.55,
        fill: { color: C.white }, line: { color: C.border, width: 1.25 }, rectRadius: 0.09,
      });
      slide.addShape("roundRect", { x: cx + 0.2, y: 4.22, w: 0.1, h: 0.36, fill: { color: r.color }, line: { type: "none" }, rectRadius: 0.04 });
      slide.addText(r.role, { x: cx + 0.4, y: 4.16, w: 3.3, h: 0.46, fontSize: 13.5, bold: true, color: r.color, fontFace: F_HEAD, valign: "middle" });
      slide.addText(r.duty, { x: cx + 0.24, y: 4.7, w: 3.4, h: 0.75, fontSize: 11, color: C.text, fontFace: F_BODY, lineSpacingMultiple: 1.1 });
    });
    slide.addShape("roundRect", {
      x: 0.6, y: 5.85, w: 12.13, h: 0.75,
      fill: { color: "FFF7E8" }, line: { color: C.accent, width: 1 }, rectRadius: 0.09,
    });
    slide.addText("验收标准：全流程无报错 · 工单状态最终为「已验证」 · 评价可在统计中查到", {
      x: 0.6, y: 5.85, w: 12.13, h: 0.75, align: "center", valign: "middle",
      fontSize: 13, bold: true, color: C.accent, fontFace: F_BODY,
    });
    addNotes(slide, "分组演练，讲师巡场。常见问题：路由不到（检查工作组客服在线状态）、工单无法确认（检查访客端登录态）。");
  }

  // ================= 17. 常见问题 =================
  {
    const slide = newSlide(pptx, { background: C.bg });
    addHeader(slide, "常见问题与排查", "培训现场高频提问", C.accent);
    const faqs = [
      { q: "登录提示无权限", a: "账号未分配客服角色，联系管理员在后台配置" },
      { q: "收不到新会话", a: "检查接待状态是否在线、工作组路由是否包含该客服" },
      { q: "机器人不回答", a: "检查知识库内容与模型配置，确认 API Key 有效" },
      { q: "工单无法确认", a: "检查是否为外部工单且访客已登录" },
      { q: "语音无声音", a: "检查浏览器麦克风权限与设备" },
      { q: "更多问题", a: "查阅 docs.weiyuai.cn 文档中心" },
    ];
    const cols = 2, rows = 3, gap = 0.25;
    const cardW = (12.13 - gap * (cols - 1)) / cols;
    const cardH = 1.5;
    faqs.forEach((f, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const cx = 0.6 + col * (cardW + gap);
      const cy = 1.85 + row * (cardH + gap);
      slide.addShape("roundRect", {
        x: cx, y: cy, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.border, width: 1.25 }, rectRadius: 0.09,
      });
      slide.addShape("ellipse", { x: cx + 0.22, y: cy + 0.26, w: 0.46, h: 0.46, fill: { color: C.accent }, line: { type: "none" } });
      slide.addText("Q", { x: cx + 0.22, y: cy + 0.26, w: 0.46, h: 0.46, align: "center", valign: "middle", fontSize: 15, bold: true, color: C.white, fontFace: F_HEAD });
      slide.addText(f.q, { x: cx + 0.84, y: cy + 0.2, w: cardW - 1.05, h: 0.55, fontSize: 13.5, bold: true, color: C.text, fontFace: F_HEAD, valign: "middle" });
      slide.addText(f.a, { x: cx + 0.84, y: cy + 0.78, w: cardW - 1.05, h: 0.62, fontSize: 11.5, color: C.muted, fontFace: F_BODY, lineSpacingMultiple: 1.1 });
    });
    addNotes(slide, "预留 Q&A 时间。每个问题先让学员猜原因，再讲解，加深印象。");
  }

  // ================= 18. 培训总结 =================
  {
    const slide = newSlide(pptx, { background: C.dark });
    slide.addShape("ellipse", { x: 9.6, y: -1.8, w: 5.6, h: 5.6, fill: { color: C.primary, transparency: 85 }, line: { type: "none" } });
    slide.addShape("ellipse", { x: -1.6, y: 4.6, w: 4.6, h: 4.6, fill: { color: C.secondary, transparency: 87 }, line: { type: "none" } });
    slide.addText("培训总结", {
      x: 0.9, y: 0.85, w: 8, h: 0.9,
      fontSize: 36, bold: true, color: C.textLight, fontFace: F_HEAD,
    });
    slide.addText("记住这三条主线，就能独立上手", {
      x: 0.92, y: 1.75, w: 9, h: 0.45,
      fontSize: 14, color: "9A9AAC", fontFace: F_BODY,
    });
    const takeaways = [
      { title: "管理员线", desc: "组织 → 客服 → 渠道 → 知识库 → 工单 → 统计", color: C.primary },
      { title: "客服线", desc: "上线 → 接待 → 协同 → 工单 → AI 辅助", color: C.secondary },
      { title: "业务闭环", desc: "咨询 → 机器人/人工 → 工单 → 验证 → 评价", color: C.accent },
    ];
    takeaways.forEach((t, i) => {
      const cx = 0.9 + i * 4.0;
      slide.addShape("roundRect", {
        x: cx, y: 2.6, w: 3.72, h: 2.3,
        fill: { color: "FFFFFF", transparency: 94 }, line: { color: t.color, width: 1.25 }, rectRadius: 0.1,
      });
      slide.addShape("roundRect", { x: cx + 0.25, y: 2.9, w: 0.12, h: 0.5, fill: { color: t.color }, line: { type: "none" }, rectRadius: 0.05 });
      slide.addText(t.title, { x: cx + 0.5, y: 2.85, w: 3.0, h: 0.6, fontSize: 17, bold: true, color: t.color, fontFace: F_HEAD, valign: "middle" });
      slide.addText(t.desc, { x: cx + 0.28, y: 3.6, w: 3.2, h: 1.1, fontSize: 12.5, color: "C9C9D6", fontFace: F_BODY, lineSpacingMultiple: 1.25 });
    });
    slide.addText("感谢参与  ·  微语 bytedesk.com  ·  docs.weiyuai.cn", {
      x: 0.9, y: 6.3, w: 11.5, h: 0.45,
      fontSize: 13, color: C.muted, fontFace: F_BODY,
    });
    addFooterDark(slide);
    addNotes(slide, "总结后发放小测验（5 题）。预告进阶培训：质检配置、数据分析专题。");
  }

  // ================= 19. 结束页 =================
  {
    const slide = newSlide(pptx, { background: C.dark });
    slide.addShape("ellipse", { x: 4.9, y: 1.15, w: 3.5, h: 3.5, fill: { color: C.primary, transparency: 82 }, line: { type: "none" } });
    slide.addShape("ellipse", { x: 8.9, y: 3.9, w: 2.9, h: 2.9, fill: { color: C.secondary, transparency: 85 }, line: { type: "none" } });
    slide.addShape("ellipse", { x: 2.1, y: 4.3, w: 2.4, h: 2.4, fill: { color: C.accent, transparency: 87 }, line: { type: "none" } });
    slide.addText("Q & A", {
      x: 1.7, y: 2.3, w: 10, h: 1.3, align: "center",
      fontSize: 60, bold: true, color: C.textLight, fontFace: F_HEAD, charSpacing: 6,
    });
    slide.addText("现在开始提问，或随时联系我们的实施团队", {
      x: 1.7, y: 3.75, w: 10, h: 0.55, align: "center",
      fontSize: 16, color: C.secondary, fontFace: F_BODY,
    });
    slide.addText("微语 bytedesk.com   ·   docs.weiyuai.cn   ·   微信交流群见官网", {
      x: 1.7, y: 6.35, w: 10, h: 0.45, align: "center",
      fontSize: 12, color: C.muted, fontFace: F_BODY,
    });
    addFooterDark(slide);
    addNotes(slide, "自由提问环节。收集未解决问题清单，会后书面跟进。");
  }

  // ============ 输出 ============
  const outputDir = path.join(outputRoot, "training");
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `bytedesk-admin-agent-training-zh-CN-${PRODUCT_VERSION}.pptx`);
  await pptx.writeFile({ fileName: outputPath });
  const info = await stat(outputPath);
  console.log(`[build-pptx] training: ${outputPath} (${(info.size / 1024).toFixed(1)} KB, ${slideCount} slides)`);
  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), outputPath, bytes: info.size, slides: slideCount }, null, 2));
}

main().catch((error) => {
  console.error(`[build-pptx] ${error.stack ?? error.message}`);
  process.exitCode = 1;
});
