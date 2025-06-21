---
sidebar_label: Ollama
sidebar_position: 3
---

# Ollama

:::tip 系统要求

- 操作系统：Ubuntu 24.04 LTS
- 服务器推荐配置：2核4G内存
:::

## 简介

Ollama 是一个轻量级、开源的框架，让您能够在本地设备上运行、创建和管理大型语言模型（LLM）。它提供了一种简单方式在本地部署和运行各种开源语言模型，如Llama、Mistral、Qwen等，无需依赖云服务。

在微语系统中，Ollama 作为本地大模型服务提供商，能够为您的应用提供高效、私密的AI能力，确保数据不离开本地环境，同时降低API调用成本。

## 资源链接

- [Ollama GitHub 仓库](https://github.com/ollama/ollama)
- [Ollama 官方网站](https://ollama.com/)

## 系统要求

- Linux/macOS/Windows
- 至少8GB RAM (推荐16GB或更多用于运行更大的模型)
- 足够的磁盘空间存储模型文件（根据模型大小，通常需要4GB-50GB不等）

## 直接安装

### Linux (Ubuntu/Debian)

```bash
sudo apt-get update
# 安装Ollama：
sudo apt-get install ollama
# 验证安装
ollama --version
# 无docker安装模型
ollama run mistral
ollama run llama3.1
```

### macOS

```bash
brew install ollama
```

### Windows

从[Ollama官方网站](https://ollama.com/download/windows)下载安装包进行安装。

## Docker安装

- [使用Docker安装](../jar.md#12-安装项目依赖)

## 常用模型

Ollama支持多种开源大语言模型，以下是一些常用模型：

- **Qwen3**: 阿里云通义千问3.0系列模型
- **Llama3**: Meta的Llama 3系列模型
- **Mistral**: Mistral AI开发的高性能模型
- **Yi**: 零一万物开发的大型语言模型
- **Gemma**: Google的轻量级开源模型

## 与微语系统集成

Ollama部署完成后，可以在微语系统的管理后台中配置本地模型接入，使用Ollama API端点`http://localhost:21434`或`http://bytedesk-ollama:11434`(容器内访问)。

## 模型管理命令

```bash
# 列出所有已下载的模型
ollama list

# 拉取模型（不运行）
ollama pull qwen3:0.6b

# 删除模型
ollama rm qwen3:0.6b

# 查看模型信息
ollama show qwen3:0.6b

# 创建模型标签
ollama cp qwen3:0.6b qwen3:latest
```

## API使用示例

Ollama提供了简单的REST API，以下是使用curl进行调用的示例:

```bash
# 生成文本
curl http://localhost:21434/api/generate -d '{
  "model": "qwen3:0.6b",
  "prompt": "你好，请介绍一下自己"
}'

# 聊天对话
curl http://localhost:21434/api/chat -d '{
  "model": "qwen3:0.6b",
  "messages": [
    { "role": "user", "content": "你好，请介绍一下自己" }
  ]
}'
```

## 故障排查

- 如果遇到内存不足问题，可以尝试使用较小的模型，如`qwen3:0.6b`或`gemma:2b`
- 如果模型下载过程中断，可以使用`ollama pull`命令重新下载
- 查看Docker日志以诊断问题：`docker logs ollama-bytedesk`
