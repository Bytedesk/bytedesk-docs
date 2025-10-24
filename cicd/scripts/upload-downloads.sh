#!/bin/bash

# 下载资源上传脚本
# 将 downloads 目录下的 pptx、docx、file、excel 四类资源同步到本地与服务器指定路径
# 本地目标：/Users/ningjinpeng/Desktop/git/private/github/bytedesk-private/starter/src/main/resources/static/downloads/{pptx,docx,file,excel}
# 服务器（124.220.58.234）目标：/var/www/html/weiyuai/download/{ppt,file,docx,excel}

set -e  # 遇到错误时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 路径定义
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
PRESENTATION_DIR="${PROJECT_ROOT}/downloads/pptx"
DOCUMENT_DIR="${PROJECT_ROOT}/downloads/docx"
FILE_DIR="${PROJECT_ROOT}/downloads/file"
EXCEL_DIR="${PROJECT_ROOT}/downloads/excel"

LOCAL_TARGET_DIR="/Users/ningjinpeng/Desktop/git/private/github/bytedesk-private/starter/src/main/resources/static/downloads/pptx"
LOCAL_TARGET_DIR_DOCX="/Users/ningjinpeng/Desktop/git/private/github/bytedesk-private/starter/src/main/resources/static/downloads/docx"
LOCAL_TARGET_DIR_FILE="/Users/ningjinpeng/Desktop/git/private/github/bytedesk-private/starter/src/main/resources/static/downloads/file"
LOCAL_TARGET_DIR_EXCEL="/Users/ningjinpeng/Desktop/git/private/github/bytedesk-private/starter/src/main/resources/static/downloads/excel"

# 服务器配置
SERVER_HOST_WEIYU="124.220.58.234"
SERVER_TARGET_DIR_WEIYU="/var/www/html/weiyuai/download/ppt"
SERVER_TARGET_DIR_WEIYU_DOCX="/var/www/html/weiyuai/download/docx"
SERVER_TARGET_DIR_WEIYU_FILE="/var/www/html/weiyuai/download/file"
SERVER_TARGET_DIR_WEIYU_EXCEL="/var/www/html/weiyuai/download/excel"

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查源目录是否存在
check_source_dir() {
    if [ ! -d "${PRESENTATION_DIR}" ]; then
        log_error "PPT源目录不存在: ${PRESENTATION_DIR}"
        exit 1
    fi
    
    if [ ! -d "${DOCUMENT_DIR}" ]; then
        log_error "DOCX源目录不存在: ${DOCUMENT_DIR}"
        exit 1
    fi
    
    if [ ! -d "${FILE_DIR}" ]; then
        log_error "FILE源目录不存在: ${FILE_DIR}"
        exit 1
    fi
    
    if [ ! -d "${EXCEL_DIR}" ]; then
        log_error "EXCEL源目录不存在: ${EXCEL_DIR}"
        exit 1
    fi
    
    # 检查是否有PPT文件
    ppt_count=$(find "${PRESENTATION_DIR}" -name "*.ppt*" -type f | wc -l)
    
    # 检查是否有DOCX文件
    docx_count=$(find "${DOCUMENT_DIR}" -name "*.docx" -type f | wc -l)
    
    # 检查是否有FILE文件（拷贝所有常规文件）
    file_count=$(find "${FILE_DIR}" -type f | wc -l)
    
    # 检查是否有EXCEL文件
    excel_count=$(find "${EXCEL_DIR}" -name "*.xlsx" -type f | wc -l)
    
    if [ ${ppt_count} -eq 0 ] && [ ${docx_count} -eq 0 ] && [ ${file_count} -eq 0 ] && [ ${excel_count} -eq 0 ]; then
        log_warn "在 ${PRESENTATION_DIR} 中未找到PPT文件，在 ${DOCUMENT_DIR} 中未找到DOCX文件，在 ${FILE_DIR} 中未找到文件，在 ${EXCEL_DIR} 中未找到EXCEL文件"
        exit 0
    fi
    
    log_info "找到 ${ppt_count} 个PPT文件，${docx_count} 个DOCX文件，${file_count} 个FILE文件，${excel_count} 个EXCEL文件"
}

# 拷贝到本地目录
copy_to_local() {
    log_info "开始拷贝下载资源到本地目录..."
    
    # 创建PPT目标目录（如果不存在）
    if [ ! -d "${LOCAL_TARGET_DIR}" ]; then
        log_info "创建本地PPT目标目录: ${LOCAL_TARGET_DIR}"
        mkdir -p "${LOCAL_TARGET_DIR}"
    fi
    
    # 创建DOCX目标目录（如果不存在）
    if [ ! -d "${LOCAL_TARGET_DIR_DOCX}" ]; then
        log_info "创建本地DOCX目标目录: ${LOCAL_TARGET_DIR_DOCX}"
        mkdir -p "${LOCAL_TARGET_DIR_DOCX}"
    fi
    
    # 创建FILE目标目录（如果不存在）
    if [ ! -d "${LOCAL_TARGET_DIR_FILE}" ]; then
        log_info "创建本地FILE目标目录: ${LOCAL_TARGET_DIR_FILE}"
        mkdir -p "${LOCAL_TARGET_DIR_FILE}"
    fi
    
    # 创建EXCEL目标目录（如果不存在）
    if [ ! -d "${LOCAL_TARGET_DIR_EXCEL}" ]; then
        log_info "创建本地EXCEL目标目录: ${LOCAL_TARGET_DIR_EXCEL}"
        mkdir -p "${LOCAL_TARGET_DIR_EXCEL}"
    fi
    
    # 拷贝PPT文件
    ppt_count=$(find "${PRESENTATION_DIR}" -name "*.ppt*" -type f | wc -l)
    if [ ${ppt_count} -gt 0 ]; then
        find "${PRESENTATION_DIR}" -name "*.ppt*" -type f -exec cp {} "${LOCAL_TARGET_DIR}/" \;
        log_info "成功拷贝 ${ppt_count} 个PPT文件到本地目录: ${LOCAL_TARGET_DIR}"
    fi
    
    # 拷贝DOCX文件
    docx_count=$(find "${DOCUMENT_DIR}" -name "*.docx" -type f | wc -l)
    if [ ${docx_count} -gt 0 ]; then
        find "${DOCUMENT_DIR}" -name "*.docx" -type f -exec cp {} "${LOCAL_TARGET_DIR_DOCX}/" \;
        log_info "成功拷贝 ${docx_count} 个DOCX文件到本地目录: ${LOCAL_TARGET_DIR_DOCX}"
    fi
    
    # 拷贝FILE文件（所有常规文件）
    file_count=$(find "${FILE_DIR}" -type f | wc -l)
    if [ ${file_count} -gt 0 ]; then
        find "${FILE_DIR}" -type f -exec cp {} "${LOCAL_TARGET_DIR_FILE}/" \;
        log_info "成功拷贝 ${file_count} 个FILE文件到本地目录: ${LOCAL_TARGET_DIR_FILE}"
    fi
    
    # 拷贝EXCEL文件（xlsx）
    excel_count=$(find "${EXCEL_DIR}" -name "*.xlsx" -type f | wc -l)
    if [ ${excel_count} -gt 0 ]; then
        find "${EXCEL_DIR}" -name "*.xlsx" -type f -exec cp {} "${LOCAL_TARGET_DIR_EXCEL}/" \;
        log_info "成功拷贝 ${excel_count} 个EXCEL文件到本地目录: ${LOCAL_TARGET_DIR_EXCEL}"
    fi
    
    # 显示拷贝的文件
    if [ ${ppt_count} -gt 0 ]; then
        ls -la "${LOCAL_TARGET_DIR}"/*.ppt* 2>/dev/null || true
    fi
    if [ ${docx_count} -gt 0 ]; then
        ls -la "${LOCAL_TARGET_DIR_DOCX}"/*.docx 2>/dev/null || true
    fi
    if [ ${file_count} -gt 0 ]; then
        ls -la "${LOCAL_TARGET_DIR_FILE}" 2>/dev/null || true
    fi
    if [ ${excel_count} -gt 0 ]; then
        ls -la "${LOCAL_TARGET_DIR_EXCEL}"/*.xlsx 2>/dev/null || true
    fi
}

# 拷贝到服务器
copy_to_server() {
    log_info "上传下载资源到微语AI服务器 ${SERVER_HOST_WEIYU}..."
    
    # 检查是否可以连接到服务器
    if ! ping -c 1 "${SERVER_HOST_WEIYU}" > /dev/null 2>&1; then
        log_error "无法连接到微语AI服务器: ${SERVER_HOST_WEIYU}"
        exit 1
    fi
    
    # 在服务器上创建PPT目标目录（如果不存在）
    ssh "root@${SERVER_HOST_WEIYU}" "mkdir -p ${SERVER_TARGET_DIR_WEIYU}" 2>/dev/null || {
        log_error "无法在微语AI服务器上创建PPT目录，请检查SSH连接和权限"
        exit 1
    }
    
    # 在服务器上创建DOCX目标目录（如果不存在）
    ssh "root@${SERVER_HOST_WEIYU}" "mkdir -p ${SERVER_TARGET_DIR_WEIYU_DOCX}" 2>/dev/null || {
        log_error "无法在微语AI服务器上创建DOCX目录，请检查SSH连接和权限"
        exit 1
    }
    
    # 在服务器上创建FILE目标目录（如果不存在）
    ssh "root@${SERVER_HOST_WEIYU}" "mkdir -p ${SERVER_TARGET_DIR_WEIYU_FILE}" 2>/dev/null || {
        log_error "无法在微语AI服务器上创建FILE目录，请检查SSH连接和权限"
        exit 1
    }
    
    # 在服务器上创建EXCEL目标目录（如果不存在）
    ssh "root@${SERVER_HOST_WEIYU}" "mkdir -p ${SERVER_TARGET_DIR_WEIYU_EXCEL}" 2>/dev/null || {
        log_error "无法在微语AI服务器上创建EXCEL目录，请检查SSH连接和权限"
        exit 1
    }
    
    # 使用scp拷贝PPT文件到微语AI服务器
    ppt_count=$(find "${PRESENTATION_DIR}" -name "*.ppt*" -type f | wc -l)
    if [ ${ppt_count} -gt 0 ]; then
        find "${PRESENTATION_DIR}" -name "*.ppt*" -type f -exec scp {} "root@${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU}/" \;
        log_info "成功拷贝 ${ppt_count} 个PPT文件到微语AI服务器: ${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU}"
    fi
    
    # 使用scp拷贝DOCX文件到微语AI服务器
    docx_count=$(find "${DOCUMENT_DIR}" -name "*.docx" -type f | wc -l)
    if [ ${docx_count} -gt 0 ]; then
        find "${DOCUMENT_DIR}" -name "*.docx" -type f -exec scp {} "root@${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU_DOCX}/" \;
        log_info "成功拷贝 ${docx_count} 个DOCX文件到微语AI服务器: ${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU_DOCX}"
    fi
    
    # 使用scp拷贝FILE文件到微语AI服务器
    file_count=$(find "${FILE_DIR}" -type f | wc -l)
    if [ ${file_count} -gt 0 ]; then
        find "${FILE_DIR}" -type f -exec scp {} "root@${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU_FILE}/" \;
        log_info "成功拷贝 ${file_count} 个FILE文件到微语AI服务器: ${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU_FILE}"
    fi
    
    # 使用scp拷贝EXCEL文件到微语AI服务器
    excel_count=$(find "${EXCEL_DIR}" -name "*.xlsx" -type f | wc -l)
    if [ ${excel_count} -gt 0 ]; then
        find "${EXCEL_DIR}" -name "*.xlsx" -type f -exec scp {} "root@${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU_EXCEL}/" \;
        log_info "成功拷贝 ${excel_count} 个EXCEL文件到微语AI服务器: ${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU_EXCEL}"
    fi
    
    # 显示服务器上的文件
    if [ ${ppt_count} -gt 0 ]; then
        ssh "root@${SERVER_HOST_WEIYU}" "ls -la ${SERVER_TARGET_DIR_WEIYU}/*.ppt* 2>/dev/null" || true
    fi
    if [ ${docx_count} -gt 0 ]; then
        ssh "root@${SERVER_HOST_WEIYU}" "ls -la ${SERVER_TARGET_DIR_WEIYU_DOCX}/*.docx 2>/dev/null" || true
    fi
    if [ ${file_count} -gt 0 ]; then
        ssh "root@${SERVER_HOST_WEIYU}" "ls -la ${SERVER_TARGET_DIR_WEIYU_FILE} 2>/dev/null" || true
    fi
    if [ ${excel_count} -gt 0 ]; then
        ssh "root@${SERVER_HOST_WEIYU}" "ls -la ${SERVER_TARGET_DIR_WEIYU_EXCEL}/*.xlsx 2>/dev/null" || true
    fi
}

# 主函数
main() {
    log_info "开始执行下载资源上传脚本..."
    log_info "PPT源目录: ${PRESENTATION_DIR}"
    log_info "DOCX源目录: ${DOCUMENT_DIR}"
    log_info "FILE源目录: ${FILE_DIR}"
    log_info "EXCEL源目录: ${EXCEL_DIR}"
    log_info "本地PPT目标目录: ${LOCAL_TARGET_DIR}"
    log_info "本地DOCX目标目录: ${LOCAL_TARGET_DIR_DOCX}"
    log_info "本地FILE目标目录: ${LOCAL_TARGET_DIR_FILE}"
    log_info "本地EXCEL目标目录: ${LOCAL_TARGET_DIR_EXCEL}"
    log_info "微语AI服务器PPT目标目录: ${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU}"
    log_info "微语AI服务器DOCX目标目录: ${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU_DOCX}"
    log_info "微语AI服务器FILE目标目录: ${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU_FILE}"
    log_info "微语AI服务器EXCEL目标目录: ${SERVER_HOST_WEIYU}:${SERVER_TARGET_DIR_WEIYU_EXCEL}"
    
    check_source_dir
    copy_to_local
    copy_to_server
    
    log_info "下载资源上传脚本执行完成！"
}

# 脚本使用说明
usage() {
    echo "用法: $0 [选项]"
    echo "选项:"
    echo "  -h, --help     显示此帮助信息"
    echo "  -l, --local    仅拷贝到本地目录"
    echo "  -s, --server   仅拷贝到微语AI服务器"
    echo ""
    echo "示例:"
    echo "  $0              # 拷贝 downloads 下的 pptx/docx/file/excel 到本地和微语AI服务器"
    echo "  $0 -l           # 仅拷贝到本地"
    echo "  $0 -s           # 仅拷贝到微语AI服务器"
}

# 参数处理
case "${1:-}" in
    -h|--help)
        usage
        exit 0
        ;;
    -l|--local)
        log_info "仅拷贝到本地目录模式"
        check_source_dir
        copy_to_local
        log_info "下载资源本地拷贝完成！"
        ;;
    -s|--server)
        log_info "仅拷贝到微语AI服务器模式"
        check_source_dir
        copy_to_server
        log_info "下载资源微语AI服务器拷贝完成！"
        ;;
    "")
        main
        ;;
    *)
        log_error "未知参数: $1"
        usage
        exit 1
        ;;
esac
