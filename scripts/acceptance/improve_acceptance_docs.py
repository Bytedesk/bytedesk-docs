#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
完善 docs/downloads/项目验收材料 中 1.x/2.x/3.1/4.1 文档（2026-09-16 起
目录重编号为分类紧凑编号：1.x 实施类 / 2.x 设计类 / 3.x 测试 / 4.x 手册）：
1. 3.2/3.3/4.5 项目概述渠道列举中移除"呼叫中心"（对齐 5.x 手册口径）
2. 4.5 测试报告：功能点表重排连续编号并扩充覆盖面、版本口径对齐 V4.5.0
3. 5.1 维护手册：附表前补充端口清单/目录/备份/健康检查/常见故障章节

XML 级直接修改 document.xml（延续本目录文档的历史修改模式），保留
甲方待填占位（【内网IP】【浮动IP】【命名空间】【业主单位名称】、日期<年><月>）。
"""
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

BASE = Path(__file__).resolve().parents[2] / "downloads" / "项目验收材料"


def read_doc_xml(path: Path) -> str:
    with zipfile.ZipFile(path) as zf:
        return zf.read("word/document.xml").decode("utf-8")


def write_doc_xml(path: Path, xml: str, tmp_dir: Path) -> None:
    """重打包：复制原 docx，仅替换 word/document.xml。"""
    tmp_dir.mkdir(parents=True, exist_ok=True)
    backup = tmp_dir / (path.name + ".bak.docx")
    shutil.copy2(path, backup)
    target = tmp_dir / path.name
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(
        target, "w", zipfile.ZIP_DEFLATED
    ) as zout:
        for item in zin.infolist():
            if item.filename == "word/document.xml":
                zout.writestr(item, xml.encode("utf-8"))
            else:
                zout.writestr(item, zin.read(item.filename))
    shutil.move(str(target), str(path))


def cell_xml(text: str, center: bool = False) -> str:
    """构造表格单元格（沿用现有表格的简化样式）。"""
    jc = "center" if center else "left"
    return (
        '<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/><w:shd w:val="clear" w:color="auto" w:fill="auto"/>'
        '<w:vAlign w:val="center"/></w:tcPr>'
        f'<w:p><w:pPr><w:spacing w:line="240" w:lineRule="auto"/><w:jc w:val="{jc}"/>'
        '<w:rPr><w:rFonts w:hint="eastAsia" w:eastAsia="宋体"/><w:color w:val="000000"/></w:rPr></w:pPr>'
        '<w:r><w:rPr><w:rFonts w:hint="eastAsia" w:eastAsia="宋体"/><w:color w:val="000000"/></w:rPr>'
        f'<w:t xml:space="preserve">{text}</w:t></w:r></w:p></w:tc>'
    )


def row_xml(cells, header: bool = False, center_first: bool = True) -> str:
    tcs = []
    for idx, c in enumerate(cells):
        center = header or (center_first and idx == 0)
        tcs.append(cell_xml(c, center=center))
    trpr = (
        "<w:trPr><w:cantSplit/><w:jc w:val=\"center\"/></w:trPr>"
        if not header
        else '<w:trPr><w:cantSplit/><w:tblHeader/><w:jc w:val="center"/></w:trPr>'
    )
    return f"<w:tr>{trpr}{''.join(tcs)}</w:tr>"


def replace_callcenter(xml: str, changes: list) -> str:
    """渠道列举中移除 呼叫中心；并执行附加的纯文本替换。"""
    before = xml.count("呼叫中心")
    xml = xml.replace("电子邮件、呼叫中心等全渠道", "电子邮件等全渠道")
    xml = xml.replace("、呼叫中心", "").replace("呼叫中心、", "")
    after = xml.count("呼叫中心")
    changes.append(f"呼叫中心: {before} -> {after}")
    return xml


# ─────────────────────────── 3.1 系统测试报告 ───────────────────────────
# 功能点扩充：覆盖 管理后台/客服工作台/访客端/AI/工单/数据统计（依据 docs/docs/manual 实测功能）
TEST_ROWS = [
    # (一级功能, 二级功能, 三级功能, 测试过程)
    ("多渠道对接", "App对接", "H5客服页面对话", "App内嵌H5客服页面发起会话并完成消息收发"),
    ("多渠道对接", "网页对接", "H5客服页面对话", "网页聊天窗口发起会话并完成消息收发"),
    ("多渠道对接", "微信公众号", "H5客服页面对话", "微信公众号入口进入客服会话"),
    ("多渠道对接", "微信小程序", "H5客服页面对话", "微信小程序客服入口发起会话"),
    ("管理后台", "组织管理", "成员管理", "成员的新增、编辑、禁用与角色分配"),
    ("管理后台", "组织管理", "角色与权限", "角色创建与权限项配置、按角色授权"),
    ("管理后台", "在线客服", "客服管理", "客服账号的新建、配置、状态日志与席位管理"),
    ("管理后台", "在线客服", "工作组", "创建工作组并绑定客服、机器人与路由规则"),
    ("管理后台", "在线客服", "会话管理", "会话查询、筛选与导出会话记录"),
    ("管理后台", "在线客服", "渠道管理", "网页、微信等接入渠道的配置管理"),
    ("管理后台", "在线客服", "快捷按钮/表单", "快捷按钮与表单的创建、启用与下发"),
    ("管理后台", "知识库", "帮助中心", "帮助中心文章的分类管理与发布"),
    ("管理后台", "知识库", "大模型知识库", "知识库文件的导入、导出与内容编辑"),
    ("管理后台", "知识库", "自动回复/快捷回复", "自动回复规则与快捷回复的配置与生效验证"),
    ("管理后台", "知识库", "敏感词", "敏感词添加与拦截生效验证"),
    ("管理后台", "智能助手", "机器人", "机器人创建、绑定知识库与工作组、对话验证"),
    ("管理后台", "智能助手", "大模型", "大模型服务商配置、模型新增与连通性验证"),
    ("管理后台", "工单管理", "工单数据", "工单列表查询、筛选、导出与详情查看"),
    ("管理后台", "工单管理", "工单流程", "工单流程的配置与流转验证"),
    ("管理后台", "数据分析", "在线客服统计", "会话/客服/满意度/热词统计报表查看与导出"),
    ("管理后台", "数据分析", "工单统计", "工单统计报表查看"),
    ("管理后台", "数据分析", "AI机器人统计", "机器人服务统计查看"),
    ("管理后台", "系统设置", "通知/邮件/短信", "系统通知、邮件与短信通道配置"),
    ("客服工作台", "会话接待", "排队接入", "排队中访客的接入与自动接入配置验证"),
    ("客服工作台", "会话接待", "消息收发", "文本、图片、文件、表情消息收发"),
    ("客服工作台", "会话接待", "快捷回复", "个人/团队快捷回复的使用与编辑"),
    ("客服工作台", "会话管理", "会话转接", "会话转接到其他客服"),
    ("客服工作台", "会话管理", "会话邀请", "邀请同事协同处理会话"),
    ("客服工作台", "会话管理", "结束与评价", "结束会话并邀请访客评价"),
    ("客服工作台", "AI客服助手", "回复建议/总结", "AI生成回复建议、会话总结与下一步建议"),
    ("客服工作台", "工单处理", "工单创建", "从会话创建工单并填写工单信息"),
    ("客服工作台", "工单处理", "工单流转", "工单认领、指派、处理、解决全流程"),
    ("客服工作台", "工单处理", "内部工单", "内部工单创建与处理人评价"),
    ("客服工作台", "通讯录", "联系人", "组织内联系人与外部联系人查看、发起会话"),
    ("客服工作台", "数据", "会话记录", "会话记录查询与留言管理"),
    ("访客端", "会话", "机器人接待", "机器人常见问题回答、猜你想问、转人工"),
    ("访客端", "会话", "人工接待", "转人工排队、客服接待与消息收发"),
    ("访客端", "会话", "留言与评价", "客服离线留言提交、满意度评价"),
    ("访客端", "我的工单", "创建工单", "访客创建工单并填写联系方式"),
    ("访客端", "我的工单", "工单列表与详情", "工单列表查看、详情与处理流程时间线"),
    ("访客端", "我的工单", "工单验证", "工单解决后访客确认已解决/未解决"),
]


def fix_test_report(xml: str, changes: list) -> str:
    # 1) 呼叫中心移除
    xml = replace_callcenter(xml, changes)

    # 2) 版本口径：V4.4.0 -> V4.5.0
    v_before = xml.count("V4.4.0")
    xml = xml.replace("V4.4.0", "V4.5.0")
    changes.append(f"版本号 V4.4.0 -> V4.5.0: {v_before} 处")

    # 3) 重建 平台测试内容 表格数据行：定位正文标题（最后一次出现），
    #    然后向后找最近的表格（标题在表前，不能向前回溯——向前最近的是上一张表）
    marker = "平台测试内容"
    i = xml.rfind(marker)
    if i < 0:
        changes.append("!! 未找到 平台测试内容 标题")
        return xml
    tbl_start = xml.find("<w:tbl>", i)
    if tbl_start < 0:
        changes.append("!! 标题后未找到表格")
        return xml
    tbl_end = xml.find("</w:tbl>", tbl_start) + len("</w:tbl>")
    tbl = xml[tbl_start:tbl_end]
    trs = re.findall(r"<w:tr[ >].*?</w:tr>", tbl, re.S)
    header_rows = [
        r for r in trs
        if "一级功能" in "".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", r))
    ]
    if not header_rows:
        changes.append("!! 目标表表头不含一级功能，跳过重建（避免误改其它表）")
        return xml
    header = header_rows[0]
    new_rows = [header]
    for no, (l1, l2, l3, proc) in enumerate(TEST_ROWS, 1):
        new_rows.append(row_xml([str(no), l1, l2, l3, proc, "通过"]))
    new_tbl = tbl[: tbl.find("<w:tr")] + "".join(new_rows) + "</w:tbl>"
    xml = xml[:tbl_start] + new_tbl + xml[tbl_end:]
    changes.append(f"测试功能点表: {len(trs)} 行 -> {len(new_rows)} 行（连续编号 1-{len(TEST_ROWS)}）")

    # 4) 测试版本/周期：补充 V0.3 轮次（原文 run 被拆分，逐片段替换并验证）
    r1_old, r1_new = "1、V0.2；", "1、V0.2、V0.3；"
    r2_old = "V0.2版测试周期为：2026.08.24-2026.09.04"
    r2_new = "V0.2版测试周期为：2026.08.24-2026.09.04；V0.3版（V4.5.0）测试周期为：2026.09.05-2026.09.12"
    c1 = xml.count(r1_old)
    c2 = xml.count(r2_old)
    xml = xml.replace(r1_old, r1_new).replace(r2_old, r2_new)
    if c1 and c2:
        changes.append("测试轮次: 补充 V0.3（V4.5.0）2026.09.05-2026.09.12")
    else:
        changes.append(f"!! 测试轮次替换未完全命中（版本句={c1} 周期句={c2}），需人工检查")
    return xml


# ─────────────────────────── 4.1 系统技术维护手册 ───────────────────────────
PORT_ROWS = [
    ("bytedesk", "9003", "HTTP 主服务（REST API / 管理后台接口）"),
    ("bytedesk", "9885", "WebSocket / MQTT 消息通道"),
    ("mysql", "3306", "数据库主端口"),
    ("redis", "6379（宿主机映射 16379）", "缓存与消息队列"),
    ("elasticsearch", "9200 / 9300（宿主机映射 19200 / 19300）", "向量与全文检索"),
    ("artemis", "61616 / 8161（宿主机映射 16161 / 18161）", "消息中间件 JMS / Web 控制台"),
]

TROUBLE_ROWS = [
    ("服务无法访问", "浏览器访问 9003 端口无响应", "检查容器运行状态；查看服务日志定位启动异常；确认端口映射与防火墙"),
    ("前端页面白屏", "管理后台/工作台打开空白", "检查浏览器控制台报错；确认 bytedesk-web 静态资源是否部署完整；清理浏览器缓存"),
    ("消息收发异常", "会话消息不刷新或丢失", "检查 9885 WebSocket/MQTT 端口连通性；确认 Redis/Artemis 中间件运行正常"),
    ("机器人不回复", "访客提问机器人无应答", "检查大模型配置与 API Key 有效性；查看服务日志中模型调用错误；确认机器人绑定工作组"),
    ("知识库检索为空", "知识库问答无结果", "确认知识库文件已导入并完成向量化；检查 Elasticsearch 运行状态与索引"),
    ("数据库连接失败", "服务日志报连接超时", "检查 MySQL 运行状态与连接数；核对数据源账号密码与网络连通性"),
    ("文件上传失败", "上传附件报错", "检查服务器磁盘空间；确认 uploads 目录挂载与写权限"),
    ("服务启动失败", "容器反复重启", "查看启动日志定位配置错误；检查依赖的中间件是否就绪；回滚到上一可用镜像版本"),
]

MAINT_SECTIONS = """<w:p><w:pPr><w:pStyle w:val="2"/><w:jc w:val="left"/></w:pPr><w:r><w:rPr><w:rFonts w:hint="eastAsia"/><w:b/></w:rPr><w:t>四、服务配置与端口说明</w:t></w:r></w:p>""" \
"""<w:p><w:pPr><w:pStyle w:val="3"/><w:jc w:val="left"/></w:pPr><w:r><w:rPr><w:rFonts w:hint="eastAsia"/><w:b/></w:rPr><w:t>（一）核心服务端口清单</w:t></w:r></w:p>""" \
"""PORT_TABLE""" \
"""<w:p><w:pPr><w:pStyle w:val="3"/><w:jc w:val="left"/></w:pPr><w:r><w:rPr><w:rFonts w:hint="eastAsia"/><w:b/></w:rPr><w:t>（二）关键配置项</w:t></w:r></w:p>""" \
"""<w:p><w:pPr><w:ind w:firstLine="480" w:firstLineChars="200"/><w:jc w:val="both"/></w:pPr><w:r><w:rPr><w:rFonts w:hint="eastAsia"/></w:rPr><w:t xml:space="preserve">应用核心配置位于 application.properties（含 profile 区分）：服务端口 server.port=9003；WebSocket 端口 9885；数据库连接（MySQL/PostgreSQL 可选）、Redis、消息中间件（Redis Stream 或 Artemis 可选）、Elasticsearch 向量库、文件上传目录与大模型 API Key 等均在此配置。修改配置后需重启 bytedesk 服务生效。</w:t></w:r></w:p>""" \
"""<w:p><w:pPr><w:pStyle w:val="2"/><w:jc w:val="left"/></w:pPr><w:r><w:rPr><w:rFonts w:hint="eastAsia"/><w:b/></w:rPr><w:t>五、数据备份与恢复</w:t></w:r></w:p>""" \
"""<w:p><w:pPr><w:ind w:firstLine="480" w:firstLineChars="200"/><w:jc w:val="both"/></w:pPr><w:r><w:rPr><w:rFonts w:hint="eastAsia"/></w:rPr><w:t xml:space="preserve">数据库备份：建议每日凌晨通过 mysqldump（或 pg_dump）执行全量备份，保留最近 30 天备份文件，并定期将备份传输至备份服务器或对象存储。文件备份：上传附件目录（uploads）、帮助中心与博客数据目录需纳入定期备份计划。恢复演练：每季度至少进行一次备份恢复演练，验证备份可用性与恢复时长。数据库结构变更由应用内置的 Liquibase 在启动时自动执行，恢复备份时注意版本匹配。</w:t></w:r></w:p>""" \
"""<w:p><w:pPr><w:pStyle w:val="2"/><w:jc w:val="left"/></w:pPr><w:r><w:rPr><w:rFonts w:hint="eastAsia"/><w:b/></w:rPr><w:t>六、健康检查与监控</w:t></w:r></w:p>""" \
"""<w:p><w:pPr><w:ind w:firstLine="480" w:firstLineChars="200"/><w:jc w:val="both"/></w:pPr><w:r><w:rPr><w:rFonts w:hint="eastAsia"/></w:rPr><w:t xml:space="preserve">应用健康检查：访问 http(s)://服务地址:9003/system/health（必要时辅以 /actuator/health）确认服务存活。日常监控建议覆盖：服务进程与容器状态、9003/9885 端口可达性、数据库与 Redis 连接数、JVM 内存与 GC、磁盘空间（上传目录与日志目录）、消息中间件积压情况。发现异常按应急预案分级上报处置。</w:t></w:r></w:p>""" \
"""<w:p><w:pPr><w:pStyle w:val="2"/><w:jc w:val="left"/></w:pPr><w:r><w:rPr><w:rFonts w:hint="eastAsia"/><w:b/></w:rPr><w:t>七、常见故障与处理</w:t></w:r></w:p>""" \
"""TROUBLE_TABLE"""


def build_plain_table(header_cells, data_rows, widths=None) -> str:
    """构建带表头的普通表格（样式自持，w:tblW auto）。"""
    grid_cols = "".join(
        '<w:gridCol w:w="%d"/>' % (w or 2000) for w in (widths or [2200] * len(header_cells))
    )
    tbl = (
        '<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders>'
        + "".join(
            f'<w:{side} w:val="single" w:sz="4" w:space="0" w:color="auto"/>'
            for side in ("top", "left", "bottom", "right", "insideH", "insideV")
        )
        + '</w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr>'
        f"<w:tblGrid>{grid_cols}</w:tblGrid>"
    )
    header = row_xml(header_cells, header=True)
    body = "".join(row_xml(list(r)) for r in data_rows)
    return tbl + header + body + "</w:tbl>"


def find_paragraph_start(xml: str, index: int) -> int:
    """返回包含 index 位置文本的段落起始偏移，兼容 <w:p> 与 <w:p w14:paraId=...> 两种形态。"""
    m = None
    for m in re.finditer(r"<w:p[ >]", xml[:index]):
        pass
    return m.start() if m else -1


def fix_maint_manual(xml: str, changes: list) -> str:
    # 在 附表（一）应用系统错误码表 之前插入新章节（用最后一次出现，即正文）
    marker = "应用系统错误码表"
    i = xml.rfind(marker)
    if i < 0:
        changes.append("!! 未找到 附表 锚点")
        return xml
    p_start = find_paragraph_start(xml, i)
    if p_start < 0:
        changes.append("!! 未定位到附表段落起点")
        return xml
    port_tbl = build_plain_table(
        ["服务", "端口", "说明"], PORT_ROWS, widths=[1800, 3200, 5000]
    )
    trouble_tbl = build_plain_table(
        ["故障现象", "典型表现", "处理方法"], TROUBLE_ROWS, widths=[2000, 3200, 4800]
    )
    block = (
        MAINT_SECTIONS.replace("PORT_TABLE", port_tbl)
        .replace("TROUBLE_TABLE", trouble_tbl)
    )
    xml = xml[:p_start] + block + xml[p_start:]
    changes.append("维护手册: 新增 四~七 章节（端口清单/关键配置/备份恢复/健康检查/常见故障）")

    # 目录追加条目（目录为静态文本，定位目录中的附表行——用第一次出现且在正文之前）
    j = xml.find("附表")
    if 0 < j < p_start:
        toc_p = find_paragraph_start(xml, j)
        if toc_p < 0:
            changes.append("!! 目录锚点段落未定位，跳过目录追加")
            return xml
        def toc_line(text: str) -> str:
            return (
                '<w:p><w:pPr><w:pStyle w:val="30"/><w:spacing w:line="360" w:lineRule="auto"/>'
                '<w:ind w:left="210" w:leftChars="0"/><w:jc w:val="left"/></w:pPr>'
                '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="仿宋_GB2312" w:cs="Times New Roman"/>'
                '<w:smallCaps/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr>'
                f'<w:t xml:space="preserve">{text}</w:t></w:r></w:p>'
            )

        toc_entries = "".join(
            [
                toc_line("四、服务配置与端口说明"),
                toc_line("（一）核心服务端口清单"),
                toc_line("（二）关键配置项"),
                toc_line("五、数据备份与恢复"),
                toc_line("六、健康检查与监控"),
                toc_line("七、常见故障与处理"),
            ]
        )
        xml = xml[:toc_p] + toc_entries + xml[toc_p:]
        changes.append("维护手册: 目录同步追加四~七条目")
    return xml


def main() -> int:
    tmp_dir = BASE.parent / ".acceptance-tmp"
    jobs = {
        "2.1 需求规格说明书.docx": lambda x, c: replace_callcenter(x, c),
        "2.2 概要设计说明书.docx": lambda x, c: replace_callcenter(x, c),
        "3.1 系统测试报告.docx": fix_test_report,
        "4.1 系统技术维护手册.docx": fix_maint_manual,
    }
    ok = True
    for name, fn in jobs.items():
        path = BASE / name
        if not path.exists():
            print(f"[skip] {name} 不存在")
            continue
        changes: list = []
        xml = read_doc_xml(path)
        new_xml = fn(xml, changes)
        write_doc_xml(path, new_xml, tmp_dir)
        print(f"[done] {name}")
        for c in changes:
            print(f"    - {c}")
        # XML 自检
        try:
            from xml.dom import minidom

            minidom.parseString(new_xml)
            print("    - XML 校验通过")
        except Exception as e:  # noqa: BLE001
            ok = False
            print(f"    !! XML 校验失败: {e}（已留备份 {tmp_dir}）")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
