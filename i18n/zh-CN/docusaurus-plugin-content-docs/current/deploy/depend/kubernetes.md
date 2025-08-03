---
sidebar_label: Kubernetes
sidebar_position: 10
---

# Kubernetes

:::info 什么是Kubernetes
Kubernetes（K8s）是一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用程序。它提供了容器编排、自动部署、自动扩展、负载均衡等功能。
:::

## 系统要求

### 最低配置

- **操作系统**：Ubuntu 20.04+ / CentOS 7+ / RHEL 7+
- **CPU**：2核心以上
- **内存**：2GB以上
- **磁盘**：20GB以上可用空间
- **网络**：每个节点唯一的主机名、MAC地址和product_uuid

### 推荐配置

- **操作系统**：Ubuntu 22.04 LTS
- **CPU**：4核心以上
- **内存**：8GB以上
- **磁盘**：50GB以上SSD
- **网络**：千兆网络连接

## 安装方式

### 方式一：使用kubeadm（推荐）

kubeadm是Kubernetes官方推荐的集群部署工具，适合生产环境。

#### 步骤1：准备环境

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 关闭swap
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# 加载必要的内核模块
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# 设置网络参数
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo sysctl --system
```

#### 步骤2：安装Docker

```bash
# 安装Docker
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 配置Docker使用systemd
sudo mkdir -p /etc/docker
cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF

sudo systemctl enable docker
sudo systemctl start docker
```

#### 步骤3：安装kubeadm、kubelet和kubectl

```bash
# 添加Kubernetes源
sudo apt install -y apt-transport-https ca-certificates curl

curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-archive-keyring.gpg

echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt update

# 安装指定版本（推荐使用稳定版本）
sudo apt install -y kubelet=1.28.0-00 kubeadm=1.28.0-00 kubectl=1.28.0-00

# 锁定版本，防止自动升级
sudo apt-mark hold kubelet kubeadm kubectl
```

#### 步骤4：初始化主节点

```bash
# 初始化集群
sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=<主节点IP>

# 配置kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 安装网络插件（Flannel）
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
```

#### 步骤5：添加工作节点

在主节点上获取加入命令：

```bash
# 获取加入命令
kubeadm token create --print-join-command
```

在工作节点上执行：

```bash
# 执行加入命令（替换为实际的命令）
sudo kubeadm join <主节点IP>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```

### 方式二：使用Minikube（开发测试）

Minikube适合本地开发和测试，可以快速搭建单节点集群。

```bash
# 安装Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# 启动集群
minikube start --driver=docker

# 验证集群
kubectl cluster-info
```

### 方式三：使用kind（本地开发）

kind（Kubernetes IN Docker）适合本地开发和CI/CD。

```bash
# 安装kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# 创建集群
kind create cluster

# 验证集群
kubectl cluster-info
```

## 基本操作

### 集群管理

```bash
# 查看集群信息
kubectl cluster-info

# 查看节点
kubectl get nodes

# 查看命名空间
kubectl get namespaces

# 查看所有资源
kubectl get all --all-namespaces
```

### 命名空间操作

```bash
# 创建命名空间
kubectl create namespace my-namespace

# 切换到命名空间
kubectl config set-context --current --namespace=my-namespace

# 查看命名空间中的资源
kubectl get all -n my-namespace

# 删除命名空间
kubectl delete namespace my-namespace
```

### Pod操作

```bash
# 创建Pod
kubectl run nginx --image=nginx

# 查看Pod
kubectl get pods
kubectl get pods -o wide

# 查看Pod详细信息
kubectl describe pod <pod-name>

# 查看Pod日志
kubectl logs <pod-name>
kubectl logs -f <pod-name>  # 实时查看日志

# 进入Pod
kubectl exec -it <pod-name> -- /bin/bash

# 删除Pod
kubectl delete pod <pod-name>
```

### Deployment操作

```bash
# 创建Deployment
kubectl create deployment nginx --image=nginx

# 查看Deployment
kubectl get deployments

# 扩展Deployment
kubectl scale deployment nginx --replicas=3

# 更新镜像
kubectl set image deployment/nginx nginx=nginx:1.19

# 查看滚动更新状态
kubectl rollout status deployment/nginx

# 回滚Deployment
kubectl rollout undo deployment/nginx

# 查看历史版本
kubectl rollout history deployment/nginx
```

### Service操作

```bash
# 创建Service
kubectl expose deployment nginx --port=80 --type=NodePort

# 查看Service
kubectl get services

# 查看Service详细信息
kubectl describe service nginx

# 删除Service
kubectl delete service nginx
```

### ConfigMap和Secret

```bash
# 创建ConfigMap
kubectl create configmap my-config --from-literal=key1=value1 --from-literal=key2=value2

# 创建Secret
kubectl create secret generic my-secret --from-literal=username=admin --from-literal=password=123456

# 查看ConfigMap和Secret
kubectl get configmaps
kubectl get secrets
```

## 常用命令

### 资源查看

```bash
# 查看所有资源
kubectl get all

# 查看特定资源
kubectl get pods
kubectl get services
kubectl get deployments
kubectl get nodes
kubectl get namespaces

# 查看详细信息
kubectl get pods -o wide
kubectl get pods -o yaml
kubectl get pods -o json

# 按标签筛选
kubectl get pods -l app=nginx
kubectl get pods -l environment=production

# 查看资源描述
kubectl describe pod <pod-name>
kubectl describe service <service-name>
kubectl describe node <node-name>
```

### 资源管理

```bash
# 应用YAML文件
kubectl apply -f deployment.yaml
kubectl apply -f -  # 从标准输入读取

# 删除资源
kubectl delete -f deployment.yaml
kubectl delete pod <pod-name>
kubectl delete deployment <deployment-name>

# 编辑资源
kubectl edit deployment <deployment-name>
kubectl edit service <service-name>

# 复制文件到Pod
kubectl cp /local/file <pod-name>:/remote/path
kubectl cp <pod-name>:/remote/file /local/path
```

### 故障排查

```bash
# 查看Pod状态
kubectl get pods
kubectl describe pod <pod-name>

# 查看Pod日志
kubectl logs <pod-name>
kubectl logs <pod-name> -c <container-name>  # 多容器Pod
kubectl logs <pod-name> --previous  # 查看上一个容器的日志

# 查看事件
kubectl get events
kubectl get events --sort-by='.lastTimestamp'

# 查看节点资源使用情况
kubectl top nodes
kubectl top pods

# 查看集群事件
kubectl get events --all-namespaces
```

### 端口转发

```bash
# 端口转发
kubectl port-forward <pod-name> 8080:80
kubectl port-forward service/<service-name> 8080:80

# 访问Pod
kubectl exec -it <pod-name> -- /bin/bash
kubectl exec -it <pod-name> -c <container-name> -- /bin/bash
```

### 标签和注解

```bash
# 添加标签
kubectl label pod <pod-name> environment=production
kubectl label pod <pod-name> tier=frontend

# 删除标签
kubectl label pod <pod-name> environment-

# 添加注解
kubectl annotate pod <pod-name> description="This is a test pod"
```

## 配置文件示例

### Pod配置

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```

### Deployment配置

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

### Service配置

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
  type: NodePort
```

## 常见问题

### 1. Pod一直处于Pending状态

```bash
# 检查节点资源
kubectl describe node <node-name>

# 检查Pod事件
kubectl describe pod <pod-name>

# 检查节点污点
kubectl get nodes -o custom-columns=NAME:.metadata.name,TAINTS:.spec.taints
```

### 2. Pod无法启动

```bash
# 查看Pod状态
kubectl get pods

# 查看Pod日志
kubectl logs <pod-name>

# 查看Pod详细信息
kubectl describe pod <pod-name>
```

### 3. 服务无法访问

```bash
# 检查Service配置
kubectl get services
kubectl describe service <service-name>

# 检查Endpoints
kubectl get endpoints <service-name>

# 检查Pod标签
kubectl get pods --show-labels
```

### 4. 节点不可用

```bash
# 检查节点状态
kubectl get nodes
kubectl describe node <node-name>

# 检查节点上的Pod
kubectl get pods -o wide

# 驱逐节点上的Pod
kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data
```

## 参考链接

- [Kubernetes官方文档](https://kubernetes.io/docs/)
- [kubeadm安装指南](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/)
- [Minikube文档](https://minikube.sigs.k8s.io/docs/)
- [kind文档](https://kind.sigs.k8s.io/)
- [kubectl命令参考](https://kubernetes.io/docs/reference/kubectl/) 