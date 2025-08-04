---
sidebar_label: Kubernetes部署
sidebar_position: 9
---

# Kubernetes部署

:::info 试用版License
需要试用版License？请参考：[问题13：如何申请licenseKey](/docs/faq#问题13如何申请licensekey)
:::

## 系统要求

:::tip 最低配置

- **Kubernetes版本**：1.20+
- **集群配置**：至少4核8G内存的节点
- **存储**：需要支持PersistentVolume的存储类
- **网络**：支持LoadBalancer或NodePort服务类型

:::info 配置优化建议
如果集群资源有限，可以分拆MySQL、Redis、Elasticsearch、ArtemisMQ等服务到独立的节点，仅保留核心服务在主节点上。
:::

## Kubernetes 与 Docker 的关系

在了解 Kubernetes 部署之前，我们先来理解 Kubernetes 与 Docker 的关系：

### 1. 层次关系

```bash
Kubernetes (编排层)
    ↓
Docker (容器运行时)
    ↓
操作系统 (底层)
```

### 2. 分工协作

| 功能 | Docker | Kubernetes |
|------|--------|------------|
| 容器创建 | ✅ 负责 | ❌ 不直接创建 |
| 镜像管理 | ✅ 拉取、构建镜像 | ❌ 不管理镜像 |
| 容器编排 | ❌ 简单编排 | ✅ 复杂编排 |
| 服务发现 | ❌ 需要额外工具 | ✅ 内置功能 |
| 负载均衡 | ❌ 需要额外工具 | ✅ 内置功能 |
| 自动扩展 | ❌ 不支持 | ✅ 支持 |
| 滚动更新 | ❌ 不支持 | ✅ 支持 |

### 3. 实际工作流程

- **开发阶段**：使用 Docker 构建和测试应用
- **部署阶段**：使用 Kubernetes 编排和管理容器
- **运行阶段**：Kubernetes 管理容器生命周期，Docker 提供容器运行时

## 快速开始

### 步骤1：准备Kubernetes集群

- [安装Kubernetes](./depend/kubernetes.md)

确保你的Kubernetes集群已经正确配置：

```bash
# 检查集群状态
kubectl cluster-info

# 检查节点状态
kubectl get nodes

# 检查存储类
kubectl get storageclass
```

## 参考链接

- [安装Kubernetes](./depend/kubernetes.md)
- [申请licenseKey](../development/license.md)
- [微语项目仓库](https://gitee.com/270580156/weiyu)
- [微语社区版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk-ce)
- [微语企业版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk)
- [Kubernetes官方文档](https://kubernetes.io/docs/)
- [一文详解：项目如何从Docker慢慢演变成了K8s部署](https://cloud.tencent.com/developer/article/2469505)
