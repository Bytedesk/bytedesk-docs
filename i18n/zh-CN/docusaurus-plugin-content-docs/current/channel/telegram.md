---
sidebar_label: Telegram
sidebar_position: 15
---

# Telegram

:::tip 前置条件

- 此模块为付费模块，如需要，请[扫码联系微信](/img/wechat.png)

:::

## 创建Telegram机器人

以下是创建和使用Telegram机器人的步骤：

### 1. 搜索BotFather

在Telegram中搜索 "BotFather"，这是Telegram官方的机器人创建助手。

import SearchBotfather from '/img/channel/telegram/1_search_botfather.jpg';

<img src={SearchBotfather} alt="搜索BotFather" style={{width: 360}} />

### 2. 启动BotFather

点击 "Start" 启动BotFather。

import StartBotfather from '/img/channel/telegram/2_start_botfather.jpg';

<img src={StartBotfather} alt="启动BotFather" style={{width: 360}} />

### 3. 创建新机器人

使用 /newbot 命令创建新的机器人。

- 先输入Bot 名称：xxx，注：请自行定义，例如：weiyuai
- 然后输入Bot 用户名：xxxx_bot，注：请自行定义，例如：weiyuai_bot
- 最后一步获取 Telegram 机器人Token

将上述三者依次填入到微语管理后台中。

import NewWeiyuaiBot from '/img/channel/telegram/3_new_weiyuai_bot.jpg';

<img src={NewWeiyuaiBot} alt="创建新机器人" style={{width: 360}} />

### 4. 与机器人聊天

创建成功后，可以开始与你的机器人聊天。

import ChatWeiyuaiBot1 from '/img/channel/telegram/4_chat_weiyuai_bot.jpg';
import ChatWeiyuaiBot2 from '/img/channel/telegram/5_chat_weiyuai_bot2.jpg';

<img src={ChatWeiyuaiBot1} alt="与机器人聊天1" style={{width: 360}} />
<img src={ChatWeiyuaiBot2} alt="与机器人聊天2" style={{width: 360}} />

### 5. 查看机器人资料

你可以查看机器人的完整资料。

import WeiyuaiBotProfile from '/img/channel/telegram/6_weiyuai_bot_profile.jpg';

<img src={WeiyuaiBotProfile} alt="机器人资料" style={{width: 360}} />

### 6. 添加机器人

你可以通过不同方式添加机器人。

import AddWeiyuaiBot1 from '/img/channel/telegram/7_add_weiyuai_bot.jpg';
import AddWeiyuaiBot2 from '/img/channel/telegram/8_add_weiyuai_bot2.jpg';
import AddWeiyuaiBot3 from '/img/channel/telegram/9_add_weiyuai_bot3.jpg';

<img src={AddWeiyuaiBot1} alt="添加机器人1" style={{width: 360}} />
<img src={AddWeiyuaiBot2} alt="添加机器人2" style={{width: 360}} />
<img src={AddWeiyuaiBot3} alt="添加机器人3" style={{width: 360}} />

### 7. 将机器人添加到群组

你也可以将机器人添加到Telegram群组中。

import GroupAddBot1 from '/img/channel/telegram/10_group_add_bot.jpg';
import GroupWeiyuaiBot from '/img/channel/telegram/11_group_weiyuai_bot.jpg';
import GroupBotConfirm from '/img/channel/telegram/12_group_bot_confirm.jpg';

<img src={GroupAddBot1} alt="添加机器人到群组1" style={{width: 360}} />
<img src={GroupWeiyuaiBot} alt="添加机器人到群组2" style={{width: 360}} />
<img src={GroupBotConfirm} alt="添加机器人到群组确认" style={{width: 360}} />

### 8. 机器人最终设置

完成所有设置后的机器人资料。

import FinalWeiyuaiBotProfile from '/img/channel/telegram/13_weiyuai_bot_profile.jpg';

<img src={FinalWeiyuaiBotProfile} alt="机器人最终资料" style={{width: 360}} />

### 9. 微语中配置Telegram机器人

## 参考资源

<!-- Telegram官方sdk -->
- [TelegramBots Documentation](https://rubenlagus.github.io/TelegramBotsDocumentation/telegram-bots.html)
- [TelegramBots GitHub](https://github.com/rubenlagus/TelegramBots)
- [Telegram Bots API](https://core.telegram.org/bots)
- [Telegram API](https://core.telegram.org/api)
- [TelegramBots Maven Package](https://mvnrepository.com/artifact/org.telegram/telegrambots-meta)
- [Spring Boot With Proxy](https://rubenlagus.github.io/TelegramBotsDocumentation/lesson-10.html#now-it-s-time-for-our-custom-configurations)
- [Http Proxy && SOCKS5 Proxy](https://www.digitalocean.com/community/tutorials/how-to-set-up-squid-proxy-on-ubuntu-20-04)
