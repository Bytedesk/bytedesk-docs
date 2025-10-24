#!/bin/bash

# 自动同步 docs 内容到 bytedesk-docs 仓库
# 使用方法: ./sync-to-docs-repo.sh ["commit message"]

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 源目录（docs 文件夹）
SOURCE_DIR="/Users/ningjinpeng/Desktop/git/private/github/bytedesk-private/docs"
# 目标仓库目录
TARGET_DIR="/Users/ningjinpeng/Desktop/git/github/bytedesk-docs"

# 检查源目录是否存在
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}错误: 源目录不存在: $SOURCE_DIR${NC}"
    exit 1
fi

# 检查目标目录是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}错误: 目标仓库目录不存在: $TARGET_DIR${NC}"
    exit 1
fi

# 检查目标目录是否是 git 仓库
if [ ! -d "$TARGET_DIR/.git" ]; then
    echo -e "${RED}错误: 目标目录不是 git 仓库: $TARGET_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}开始同步 docs 到 bytedesk-docs...${NC}"

# 进入目标仓库
cd "$TARGET_DIR"

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}警告: 目标仓库有未提交的更改${NC}"
    git status --short
    read -p "是否继续? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}已取消同步${NC}"
        exit 1
    fi
fi

# 拉取最新代码
echo -e "${GREEN}拉取最新代码...${NC}"
git pull origin main || git pull origin master || true

# 同步文件（排除 node_modules, .git, build 等）
echo -e "${GREEN}同步文件...${NC}"
rsync -av --delete \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='build' \
    --exclude='.docusaurus' \
    --exclude='coverage' \
    --exclude='.DS_Store' \
    --exclude='*.log' \
    --exclude='.env.local' \
    --exclude='.env.*.local' \
    "$SOURCE_DIR/" "$TARGET_DIR/"

# 检查是否有变更
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}没有变更需要提交${NC}"
    exit 0
fi

# 显示变更
echo -e "${YELLOW}以下文件已变更:${NC}"
git status --short

# 添加所有变更
git add .

# 获取提交消息
if [ -n "$1" ]; then
    COMMIT_MESSAGE="$1"
else
    COMMIT_MESSAGE="docs: 同步文档内容 ($(date '+%Y-%m-%d %H:%M:%S'))"
fi

# 提交
echo -e "${GREEN}提交变更...${NC}"
git commit -m "$COMMIT_MESSAGE"

# 推送
echo -e "${GREEN}推送到远程仓库...${NC}"
git push origin main || git push origin master

echo -e "${GREEN}✅ 同步完成!${NC}"
