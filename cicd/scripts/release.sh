#!/usr/bin/bash
# 本地路径
DIST=build
# 服务器地址
SERVER_HOST=124.222.102.45
# 服务器路径
TARGET_DIST=/var/www/html/weiyuai/docs/

# 打包完，上传到服务器
yarn build && \
scp -r ../../$DIST/* root@$SERVER_HOST:$TARGET_DIST
