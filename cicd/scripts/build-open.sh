#!/bin/sh

# 本地路径
DIST=build
# 本地路径
TARGET_DIST=/Users/ningjinpeng/Desktop/git/private/github/bytedesk-private/starter/src/main/resources/static/docs

# 打包完，复制
pnpm build && \
rm -fr $TARGET_DIST && \
cp -r ./$DIST $TARGET_DIST
