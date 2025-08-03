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

## 快速开始

### 步骤1：准备Kubernetes集群

确保你的Kubernetes集群已经正确配置：

```bash
# 检查集群状态
kubectl cluster-info

# 检查节点状态
kubectl get nodes

# 检查存储类
kubectl get storageclass
```

### 步骤2：创建命名空间

```bash
# 创建微语专用命名空间
kubectl create namespace bytedesk

# 切换到该命名空间
kubectl config set-context --current --namespace=bytedesk
```

### 步骤3：选择部署方式

#### 方式一：使用云模型（推荐新手）

1. 下载 [`k8s-deployment.yaml`](https://gitee.com/270580156/weiyu/blob/main/deploy/k8s/k8s-deployment.yaml) 文件到本地
2. 申请智谱AI [API Key](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)
3. 修改配置文件中的API Key

#### 方式二：使用本地模型

1. 下载 [`k8s-deployment-ollama.yaml`](https://gitee.com/270580156/weiyu/blob/main/deploy/k8s/k8s-deployment-ollama.yaml) 文件到本地
2. 无需申请API Key，使用本地Ollama模型

### 步骤4：修改配置

在下载的配置文件中，将 `your-domain.com` 替换为你的域名，并配置[licenseKey](../development/license.md)：

```yaml
# 请将 your-domain.com 替换为你的域名
- name: BYTEDESK_UPLOAD_URL
  value: "http://your-domain.com"
- name: BYTEDESK_KBASE_API_URL
  value: "http://your-domain.com"
- name: BYTEDESK_FEATURES_AVATAR_BASE_URL
  value: "http://your-domain.com"

# 官方微语管理后台-》设置-》License-》申请licenseKey
- name: BYTEDESK_LICENSE_KEY
  value: ""
```

### 步骤5：部署服务

```bash
# 使用云模型
kubectl apply -f k8s-deployment.yaml

# 或使用本地模型
kubectl apply -f k8s-deployment-ollama.yaml
```

### 步骤6：检查部署状态

```bash
# 检查Pod状态
kubectl get pods

# 检查服务状态
kubectl get services

# 检查持久化卷
kubectl get pvc

# 查看Pod日志
kubectl logs -f deployment/bytedesk-app
```

### 步骤7：下载模型（仅本地模型需要）

如果使用本地模型，需要下载Ollama模型：

```bash
# 进入Ollama Pod
kubectl exec -it deployment/ollama-bytedesk -- /bin/bash

# 下载对话模型
ollama pull qwen3:0.6b

# 下载嵌入模型
ollama pull bge-m3:latest

# 下载重新排序模型
ollama pull linux6200/bge-reranker-v2-m3:latest
```

## 配置说明

### 云模型配置（智谱AI）

在 [`k8s-deployment.yaml`](https://gitee.com/270580156/weiyu/blob/main/deploy/k8s/k8s-deployment.yaml) 中配置：

```yaml
env:
- name: SPRING_AI_ZHIPUAI_API_KEY
  value: "sk-xxx"  # 替换为你的智谱AI API Key
- name: SPRING_AI_ZHIPUAI_CHAT_ENABLED
  value: "true"
- name: SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL
  value: "glm-4-flash"
- name: SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE
  value: "0.7"
- name: SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED
  value: "true"
- name: SPRING_AI_ZHIPUAI_EMBEDDING_OPTIONS_MODEL
  value: "embedding-2"
```

### 本地模型配置（Ollama）

在 [`k8s-deployment-ollama.yaml`](https://gitee.com/270580156/weiyu/blob/main/deploy/k8s/k8s-deployment-ollama.yaml) 中已预配置，无需额外设置。

## 访问系统

### 服务暴露方式

#### 方式一：LoadBalancer（推荐生产环境）

```yaml
apiVersion: v1
kind: Service
metadata:
  name: bytedesk-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 9003
  selector:
    app: bytedesk
```

#### 方式二：NodePort（适合测试环境）

```yaml
apiVersion: v1
kind: Service
metadata:
  name: bytedesk-service
spec:
  type: NodePort
  ports:
  - port: 9003
    targetPort: 9003
    nodePort: 30090
  selector:
    app: bytedesk
```

#### 方式三：Ingress（推荐生产环境）

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: bytedesk-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: bytedesk-service
            port:
              number: 9003
```

### 登录信息

```bash
访问地址：http://your-domain.com/
默认账号：admin@email.com
默认密码：admin
```

## 生产环境配置

### 高可用配置

#### 多副本部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bytedesk-app
spec:
  replicas: 3  # 设置3个副本
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

#### 资源限制

```yaml
resources:
  requests:
    memory: "2Gi"
    cpu: "1000m"
  limits:
    memory: "4Gi"
    cpu: "2000m"
```

### 持久化存储

#### MySQL持久化

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: your-storage-class
```

#### Redis持久化

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: redis-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: your-storage-class
```

### 监控和日志

#### 配置Prometheus监控

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: bytedesk-monitor
spec:
  selector:
    matchLabels:
      app: bytedesk
  endpoints:
  - port: http
    path: /actuator/prometheus
```

#### 配置日志收集

```yaml
# 使用Fluentd或Fluent Bit收集日志
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/bytedesk-*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      read_from_head true
      <parse>
        @type json
        time_key time
        time_format %Y-%m-%dT%H:%M:%S.%NZ
      </parse>
    </source>
```

## 常见问题

### 故障排查

```bash
# 查看Pod状态
kubectl describe pod <pod-name>

# 查看服务状态
kubectl describe service <service-name>

# 查看事件
kubectl get events --sort-by='.lastTimestamp'

# 查看日志
kubectl logs <pod-name> -c <container-name>
```

### 常见错误

1. **Pod一直处于Pending状态**
   - 检查节点资源是否充足
   - 检查存储类是否正确配置

2. **服务无法访问**
   - 检查Service配置
   - 检查Ingress配置
   - 检查网络策略

3. **数据库连接失败**
   - 检查数据库Pod状态
   - 检查数据库服务配置
   - 检查网络连通性

## 升级和回滚

### 升级应用

```bash
# 更新镜像版本
kubectl set image deployment/bytedesk-app bytedesk=registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest

# 查看升级状态
kubectl rollout status deployment/bytedesk-app
```

### 回滚应用

```bash
# 查看历史版本
kubectl rollout history deployment/bytedesk-app

# 回滚到上一个版本
kubectl rollout undo deployment/bytedesk-app

# 回滚到指定版本
kubectl rollout undo deployment/bytedesk-app --to-revision=2
```

## 参考链接

- [申请licenseKey](../development/license.md)
- [微语项目仓库](https://gitee.com/270580156/weiyu)
- [微语社区版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk-ce)
- [微语企业版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk)
- [Kubernetes官方文档](https://kubernetes.io/docs/)
