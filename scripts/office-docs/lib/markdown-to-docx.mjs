import { createRequire } from "node:module";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

/**
 * Markdown -> DOCX 转换器（面向 manual 子集语法）：
 * - #/##/###/#### 标题 -> Heading1-4
 * - 段落、加粗、行内代码
 * - -/* 列表与 1. 有序列表
 * - | 表格 |（含对齐行）
 * - :::tip/warning/info/note/danger 提示框 -> 带底色表格
 * - ![alt](path) 图片（解析 /img/manual/ 到 static/img/manual/）
 * - 代码块 -> 等宽段落
 * - 其余语法降级为普通段落文本，不报错
 */

const MANUAL_IMAGE_PREFIX = "/img/manual/";

/** 移除 Markdown 强调/链接语法，返回纯文本与 runs */
function parseInlineTokens(text) {
  const runs = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*|`)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      runs.push({ text: text.slice(lastIndex, match.index), bold: false, code: false });
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      runs.push({ text: token.slice(2, -2), bold: true, code: false });
    } else if (token.startsWith("`") && token.endsWith("`") && token.length > 2) {
      runs.push({ text: token.slice(1, -1), bold: false, code: true });
    } else if (token.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      runs.push({ text: linkMatch ? linkMatch[1] : token, bold: false, code: false });
    } else {
      runs.push({ text: token, bold: false, code: false });
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    runs.push({ text: text.slice(lastIndex), bold: false, code: false });
  }
  return runs.filter((run) => run.text.length > 0);
}

/** 解析 Markdown 表格行 */
function parseTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isTableDivider(line) {
  return /^\s*\|?\s*:?-{2,}.*\|/.test(line);
}

/** 解析整篇 Markdown 为结构化块 */
export function parseMarkdown(source) {
  const lines = source.split(/\r?\n/);
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    // frontmatter（文档首部 --- 块，必须先于分隔线判断）
    if (index === 0 && line.trim() === "---") {
      index += 1;
      while (index < lines.length && lines[index].trim() !== "---") index += 1;
      index += 1;
      continue;
    }

    // 空行
    if (line.trim() === "") { index += 1; continue; }

    // 代码块
    if (line.trim().startsWith("```")) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ type: "code", text: codeLines.join("\n") });
      continue;
    }

    // 提示框
    const admonition = /^:::(tip|warning|info|note|danger)\s*(.*)$/.exec(line.trim());
    if (admonition) {
      const kind = admonition[1];
      const title = admonition[2].trim();
      const bodyLines = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith(":::")) {
        bodyLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ type: "admonition", kind, title, text: bodyLines.join("\n").trim() });
      continue;
    }

    // 标题
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2].trim() });
      index += 1;
      continue;
    }

    // 分隔线
    if (/^---+\s*$/.test(line.trim())) { index += 1; continue; }

    // 表格
    if (line.trim().startsWith("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const header = parseTableRow(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    // 列表
    const bullet = /^\s*[-*]\s+(.*)$/.exec(line);
    const ordered = /^\s*(\d+)\.\s+(.*)$/.exec(line);
    if (bullet) {
      blocks.push({ type: "listItem", ordered: false, text: bullet[1] });
      index += 1;
      continue;
    }
    if (ordered) {
      blocks.push({ type: "listItem", ordered: true, text: ordered[2] });
      index += 1;
      continue;
    }

    // 引用
    if (line.trim().startsWith(">")) {
      blocks.push({ type: "quote", text: line.trim().replace(/^>\s?/, "") });
      index += 1;
      continue;
    }

    // 普通段落（合并连续非空行）
    const paragraphLines = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !/^(#{1,4})\s/.test(lines[index]) &&
      !lines[index].trim().startsWith("|") &&
      !lines[index].trim().startsWith("```") &&
      !lines[index].trim().startsWith(":::") &&
      !/^\s*[-*]\s/.test(lines[index]) &&
      !/^\s*\d+\.\s/.test(lines[index])
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

/** 将 blocks 渲染为 docx npm 的元素数组 */
export async function renderBlocks(blocks, options = {}) {
  const docx = require("docx");
  const {
    Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
    WidthType, AlignmentType, ImageRun, ShadingType, BorderStyle,
  } = docx;
  const staticRoot = options.staticRoot;
  const elements = [];

  for (const block of blocks) {
    switch (block.type) {
      case "heading": {
        const levelMap = {
          1: HeadingLevel.HEADING_1,
          2: HeadingLevel.HEADING_2,
          3: HeadingLevel.HEADING_3,
          4: HeadingLevel.HEADING_4,
        };
        elements.push(
          new Paragraph({
            text: block.text,
            heading: levelMap[block.level] ?? HeadingLevel.HEADING_4,
          }),
        );
        break;
      }
      case "paragraph": {
        const runs = parseInlineTokens(block.text).map(
          (token) =>
            new TextRun({
              text: token.text,
              bold: token.bold,
              font: token.code ? "Courier New" : undefined,
            }),
        );
        elements.push(new Paragraph({ children: runs, spacing: { after: 120 } }));
        break;
      }
      case "listItem": {
        const runs = parseInlineTokens(block.text).map(
          (token) => new TextRun({ text: token.text, bold: token.bold }),
        );
        elements.push(
          new Paragraph({
            children: runs,
            bullet: block.ordered ? undefined : { level: 0 },
            numbering: block.ordered
              ? { reference: "ordered-list", level: 0 }
              : undefined,
            spacing: { after: 80 },
          }),
        );
        break;
      }
      case "quote": {
        elements.push(
          new Paragraph({
            children: [new TextRun({ text: block.text, italics: true, color: "555555" })],
            spacing: { after: 120 },
            indent: { left: 480 },
          }),
        );
        break;
      }
      case "code": {
        for (const codeLine of block.text.split("\n")) {
          elements.push(
            new Paragraph({
              children: [new TextRun({ text: codeLine, font: "Courier New", size: 18 })],
              spacing: { after: 20 },
            }),
          );
        }
        elements.push(new Paragraph({ text: "", spacing: { after: 120 } }));
        break;
      }
      case "table": {
        const headerRow = new TableRow({
          tableHeader: true,
          children: block.header.map(
            (cell) =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: cell, bold: true })] })],
                shading: { type: ShadingType.CLEAR, fill: "F0F0F0" },
                width: { size: Math.floor(9360 / Math.max(block.header.length, 1)), type: WidthType.DXA },
              }),
          ),
        });
        const bodyRows = block.rows.map(
          (row) =>
            new TableRow({
              children: Array.from({ length: block.header.length }, (_, i) => {
                const cellText = row[i] ?? "";
                const runs = parseInlineTokens(cellText).map(
                  (token) => new TextRun({ text: token.text, bold: token.bold }),
                );
                return new TableCell({
                  children: [new Paragraph({ children: runs })],
                  width: { size: Math.floor(9360 / Math.max(block.header.length, 1)), type: WidthType.DXA },
                });
              }),
            }),
        );
        elements.push(
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            columnWidths: Array.from(
              { length: block.header.length },
              () => Math.floor(9360 / Math.max(block.header.length, 1)),
            ),
            rows: [headerRow, ...bodyRows],
          }),
        );
        elements.push(new Paragraph({ text: "", spacing: { after: 160 } }));
        break;
      }
      case "admonition": {
        const fillColor = { tip: "E6F7FF", warning: "FFF7E6", info: "E6FFFB", note: "F0F5FF", danger: "FFF1F0" }[block.kind] ?? "F5F5F5";
        const titleText = block.title || { tip: "提示", warning: "注意", info: "信息", note: "备注", danger: "危险" }[block.kind] || block.kind;
        elements.push(
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            columnWidths: [9360],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: fillColor },
                    margins: { top: 120, bottom: 120, left: 200, right: 200 },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: titleText, bold: true })], spacing: { after: 60 } }),
                      new Paragraph({ children: [new TextRun({ text: block.text })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        );
        elements.push(new Paragraph({ text: "", spacing: { after: 160 } }));
        break;
      }
      case "image": {
        if (block.filePath) {
          try {
            const imageBuffer = await readFile(block.filePath);
            const ext = path.extname(block.filePath).toLowerCase().replace(".", "");
            const type = ext === "jpg" ? "jpg" : ext === "png" ? "png" : ext === "gif" ? "gif" : ext === "bmp" ? "bmp" : ext === "svg" ? "svg" : "png";
            const size = await getImageSize(block.filePath).catch(() => ({ width: 600, height: 400 }));
            const maxWidth = 540;
            const scale = Math.min(1, maxWidth / (size.width || maxWidth));
            elements.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new ImageRun({
                    data: imageBuffer,
                    transformation: {
                      width: Math.round((size.width || 600) * scale),
                      height: Math.round((size.height || 400) * scale),
                    },
                    type,
                  }),
                ],
                spacing: { after: 80 },
              }),
            );
            if (block.alt) {
              elements.push(
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: `图：${block.alt}`, color: "888888", size: 18 })],
                  spacing: { after: 160 },
                }),
              );
            }
          } catch {
            // 图片缺失时降级为占位文本
            elements.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: `[图片占位：${block.alt || block.src}]`, color: "999999", italics: true })],
                spacing: { after: 160 },
              }),
            );
          }
        } else {
          elements.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: `[图片引用：${block.alt || block.src}]`, color: "999999", italics: true })],
              spacing: { after: 160 },
            }),
          );
        }
        break;
      }
      default:
        break;
    }
  }

  return elements;
}

/** 读取 PNG/JPG 尺寸（无需第三方依赖） */
async function getImageSize(filePath) {
  const buffer = await readFile(filePath);
  if (buffer.length > 24 && buffer.toString("ascii", 1, 4) === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7].includes(marker)) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
  }
  throw new Error(`Unsupported image: ${filePath}`);
}

/** 把解析出的段落级 image Markdown 也补进 blocks（在 parseMarkdown 内不处理行内图片） */
export function augmentImages(blocks, staticRoot) {
  for (const block of blocks) {
    if (block.type !== "paragraph") continue;
    const match = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(block.text.trim());
    if (!match) continue;
    const [, alt, src] = match;
    const localPath = src.startsWith(MANUAL_IMAGE_PREFIX)
      ? path.join(staticRoot, "img/manual", src.slice(MANUAL_IMAGE_PREFIX.length))
      : src.startsWith("http")
        ? null
        : path.resolve(staticRoot, src.replace(/^\//, ""));
    block.type = "image";
    block.alt = alt;
    block.src = src;
    block.filePath = localPath;
  }
  return blocks;
}
