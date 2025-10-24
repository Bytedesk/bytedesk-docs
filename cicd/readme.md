<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-06-18 10:46:11
 * @LastEditors: jack ning github@bytedesk.com
 * @LastEditTime: 2025-09-24 17:12:50
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
# CI/CD

```bash
# 打包上传到服务器
pnpm release
# 赋予执行权限
chmod +x cicd/scripts/build-upload.sh
chmod +x cicd/scripts/build-open.sh
# 执行
sh cicd/scripts/build-upload.sh
# 
sh cicd/scripts/build-open.sh
# 
# 拷贝到downloads本地和服务器（默认）
sh cicd/scripts/upload-downloads.sh
# 仅拷贝到downloads本地
sh cicd/scripts/upload-downloads.sh -l
# 仅拷贝到downloads服务器
sh cicd/scripts/upload-downloads.sh -s
# 显示拷贝downloads帮助信息
sh cicd/scripts/upload-downloads.sh -h
```

## 自动同步和提交

```bash
# 定时提交
chmod +x cicd/scripts/auto-commit
sh cicd/scripts/auto-commit
# 定时自动提交
./cicd/scripts/auto-commit
# 后台运行自动提交
# nohup ./cicd/scripts/auto-commit
nohup ./cicd/scripts/auto-commit > nohup.out 2>&1 &
# 终止自动提交
pkill -f auto-commit
# ps aux | grep auto-commit 找到进程 ID，然后用 kill 命令终止它
```

- [参考](https://juejin.cn/post/7057776355450028045)
- [参考](https://blog.csdn.net/weixin_43233914/article/details/134186796)
