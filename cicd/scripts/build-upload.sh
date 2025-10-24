#!/usr/bin/bash

# 本地路径
DIST=build
# 服务器地址
SERVER_HOST_WEIYU=124.220.58.234
SERVER_HOST_BYTEDESK=118.178.126.119
# 服务器路径
TARGET_DIST_WEIYU=/var/www/html/weiyuai/docs/
TARGET_DIST_BYTEDESK=/var/www/html/bytedesk/docs/

# 先通过ssh删除服务器上的target_dist文件夹中的内容
ssh root@$SERVER_HOST_WEIYU "rm -rf $TARGET_DIST_WEIYU*"
ssh root@$SERVER_HOST_BYTEDESK "rm -rf $TARGET_DIST_BYTEDESK*"

# 打包完，上传到服务器
pnpm build && \
scp -r ./$DIST/* root@$SERVER_HOST_WEIYU:$TARGET_DIST_WEIYU
scp -r ./$DIST/* root@$SERVER_HOST_BYTEDESK:$TARGET_DIST_BYTEDESK
