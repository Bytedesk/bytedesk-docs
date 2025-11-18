---
sidebar_label: Kubernetes
sidebar_position: 10
---

# Kubernetes

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [Kubernetes 官方文档](https://kubernetes.io/docs/home/)。Kubernetes（K8s）是一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用程序。它提供了容器编排、自动部署、自动扩展、负载均衡等功能。
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

本文档记录了在 Ubuntu 22.04 LTS 系统上安装 Kubernetes 和 KubeSphere 的完整过程。

## 目录

1. [前置准备](#前置准备)
2. [安装 Kubernetes](#安装-kubernetes)
3. [安装 KubeSphere](#安装-kubesphere)
4. [验证安装](#验证安装)
5. [访问控制台](#访问控制台)
6. [常用命令](#常用命令)

---

## 前置准备

### 1. 关闭 Swap

```bash
# 临时关闭 swap
sudo swapoff -a

# 永久关闭 swap
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

### 2. 加载内核模块

```bash
# 创建模块加载配置文件
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

# 加载模块
sudo modprobe overlay
sudo modprobe br_netfilter
```

### 3. 配置系统参数

```bash
# 创建 sysctl 配置文件
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

# 应用配置
sudo sysctl --system
```

### 4. 配置 Containerd

```bash
# 生成默认配置
sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml

# 修改配置使用 systemd cgroup driver
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# 配置镜像加速(可选)
sudo sed -i 's|registry.k8s.io/pause:3.8|registry.aliyuncs.com/google_containers/pause:3.9|' /etc/containerd/config.toml

# 重启 containerd
sudo systemctl restart containerd
sudo systemctl enable containerd
```

---

## 安装 Kubernetes

### 1. 安装依赖包

```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
```

### 2. 添加 Kubernetes 软件源

```bash
# 创建目录
sudo mkdir -p /etc/apt/keyrings

# 下载 GPG 密钥
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

# 添加软件源
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

### 3. 安装 Kubernetes 组件

```bash
# 更新软件包列表
sudo apt-get update

# 安装 kubelet、kubeadm 和 kubectl
sudo apt-get install -y kubelet kubeadm kubectl

# 锁定版本防止自动更新
sudo apt-mark hold kubelet kubeadm kubectl

# 启用 kubelet
sudo systemctl enable kubelet
```

### 4. 初始化 Kubernetes 集群

```bash
# 初始化主节点
sudo kubeadm init \
  --pod-network-cidr=192.168.0.0/16 \
  --image-repository=registry.aliyuncs.com/google_containers

# 配置 kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 5. 安装网络插件 (Calico)

```bash
# 安装 Calico CNI
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

# 等待所有 Pod 就绪
kubectl wait --for=condition=Ready pods --all -n kube-system --timeout=300s
```

### 6. 移除主节点污点(单节点集群)

```bash
# 允许在主节点上调度 Pod
kubectl taint nodes --all node-role.kubernetes.io/control-plane-
```

---

## 安装 KubeSphere

### 1. 创建本地存储类

KubeSphere 需要一个默认的 StorageClass，这里创建一个基于本地存储的 StorageClass：

```bash
# 创建 local-storage.yaml
cat > local-storage.yaml <<'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: local-path-storage
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: local-path-provisioner-service-account
  namespace: local-path-storage
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: local-path-provisioner-role
rules:
  - apiGroups: [""]
    resources: ["nodes", "persistentvolumeclaims", "configmaps"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["endpoints", "persistentvolumes", "pods"]
    verbs: ["*"]
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["create", "patch"]
  - apiGroups: ["storage.k8s.io"]
    resources: ["storageclasses"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: local-path-provisioner-bind
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: local-path-provisioner-role
subjects:
  - kind: ServiceAccount
    name: local-path-provisioner-service-account
    namespace: local-path-storage
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: local-path-provisioner
  namespace: local-path-storage
spec:
  replicas: 1
  selector:
    matchLabels:
      app: local-path-provisioner
  template:
    metadata:
      labels:
        app: local-path-provisioner
    spec:
      serviceAccountName: local-path-provisioner-service-account
      containers:
        - name: local-path-provisioner
          image: rancher/local-path-provisioner:v0.0.24
          imagePullPolicy: IfNotPresent
          command:
            - local-path-provisioner
            - --debug
            - start
            - --config
            - /etc/config/config.json
          volumeMounts:
            - name: config-volume
              mountPath: /etc/config/
          env:
            - name: POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
      volumes:
        - name: config-volume
          configMap:
            name: local-path-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: local-path-config
  namespace: local-path-storage
data:
  config.json: |-
    {
      "nodePathMap":[
        {
          "node":"DEFAULT_PATH_FOR_NON_LISTED_NODES",
          "paths":["/opt/local-path-provisioner"]
        }
      ]
    }
  setup: |-
    #!/bin/sh
    set -eu
    mkdir -m 0777 -p "$VOL_DIR"
  teardown: |-
    #!/bin/sh
    set -eu
    rm -rf "$VOL_DIR"
  helperPod.yaml: |-
    apiVersion: v1
    kind: Pod
    metadata:
      name: helper-pod
    spec:
      containers:
        - name: helper-pod
          image: busybox
          imagePullPolicy: IfNotPresent
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-path
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: rancher.io/local-path
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
EOF

# 应用配置
kubectl apply -f local-storage.yaml
```

### 2. 下载 KubeSphere 安装器

```bash
# 下载 kubesphere-installer.yaml
kubectl apply -f https://github.com/kubesphere/ks-installer/releases/download/v3.4.1/kubesphere-installer.yaml

# 下载 cluster-configuration.yaml
kubectl apply -f https://github.com/kubesphere/ks-installer/releases/download/v3.4.1/cluster-configuration.yaml
```

### 3. 监控安装进度

```bash
# 查看安装日志
kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l 'app in (ks-install, ks-installer)' -o jsonpath='{.items[0].metadata.name}') -f

# 查看 Pod 状态
kubectl get pods --all-namespaces | grep kubesphere
```

### 4. 等待安装完成

安装过程大约需要 15-20 分钟，取决于网络速度。安装完成后会显示类似以下的信息：

```
**************************************************
#####################################################
###              Welcome to KubeSphere!           ###
#####################################################

Console: http://ip:30880
Account: admin
Password: password

NOTES：
  1. After you log into the console, please check the
     monitoring status of service components in
     "Cluster Management". If any service is not
     ready, please wait patiently until all components 
     are up and running.
  2. Please change the default password after login.

#####################################################
https://kubesphere.io             2025-10-30 14:15:32
#####################################################
```

---

## 验证安装

### 1. 检查节点状态

```bash
kubectl get nodes
```

预期输出：
```
NAME                STATUS   ROLES           AGE   VERSION
ser109845944762     Ready    control-plane   45m   v1.28.15
```

### 2. 检查所有 Pod 状态

```bash
kubectl get pods --all-namespaces
```

所有 Pod 应该处于 `Running` 状态。

### 3. 检查 KubeSphere 组件

```bash
# 检查 kubesphere-system 命名空间
kubectl get pods -n kubesphere-system

# 检查 kubesphere-controls-system 命名空间
kubectl get pods -n kubesphere-controls-system

# 检查 kubesphere-monitoring-system 命名空间
kubectl get pods -n kubesphere-monitoring-system
```

---

## 访问控制台

### 获取访问地址

```bash
# 查看 KubeSphere 控制台服务
kubectl get svc -n kubesphere-system
```

输出示例：
```
NAME                    TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
ks-apiserver            ClusterIP   10.102.219.12    <none>        80/TCP         19m
ks-console              NodePort    10.104.188.239   <none>        80:30880/TCP   19m
ks-controller-manager   ClusterIP   10.96.119.8      <none>        443/TCP        19m
```

### 访问方式

- **控制台地址**: `http://<节点IP>:30880`
- **默认账号**: `admin`
- **默认密码**: `password`

> ⚠️ **重要**: 首次登录后请立即修改默认密码！

### 获取节点 IP

```bash
kubectl get nodes -o wide
```

使用 `INTERNAL-IP` 列的 IP 地址访问控制台。

---

## 常用命令

### Kubernetes 基础命令

```bash
# 查看集群信息
kubectl cluster-info

# 查看所有节点
kubectl get nodes

# 查看所有命名空间
kubectl get namespaces

# 查看所有 Pod
kubectl get pods --all-namespaces

# 查看特定命名空间的 Pod
kubectl get pods -n <namespace>

# 查看 Pod 详细信息
kubectl describe pod <pod-name> -n <namespace>

# 查看 Pod 日志
kubectl logs <pod-name> -n <namespace>

# 进入 Pod
kubectl exec -it <pod-name> -n <namespace> -- /bin/bash
```

### KubeSphere 管理命令

```bash
# 查看 KubeSphere 版本
kubectl get cm -n kubesphere-system ks-console-config -o yaml | grep version

# 重启 KubeSphere 控制台
kubectl rollout restart deployment ks-console -n kubesphere-system

# 查看 KubeSphere 安装状态
kubectl get cc -n kubesphere-system ks-installer -o yaml

# 查看所有 KubeSphere 相关的 Pod
kubectl get pods --all-namespaces | grep kubesphere
```

### 资源管理命令

```bash
# 查看所有 Service
kubectl get svc --all-namespaces

# 查看所有 Deployment
kubectl get deployments --all-namespaces

# 查看所有 StatefulSet
kubectl get statefulsets --all-namespaces

# 查看存储类
kubectl get storageclass

# 查看持久卷
kubectl get pv

# 查看持久卷声明
kubectl get pvc --all-namespaces
```

---

## 故障排查

### 1. Pod 一直处于 Pending 状态

```bash
# 查看 Pod 详细信息
kubectl describe pod <pod-name> -n <namespace>

# 检查是否有足够的资源
kubectl top nodes
kubectl top pods -n <namespace>
```

### 2. 镜像拉取失败

```bash
# 检查镜像拉取状态
kubectl get pods -n <namespace> -o wide

# 查看 Pod 事件
kubectl get events -n <namespace> --sort-by='.lastTimestamp'

# 手动拉取镜像(在节点上执行)
sudo crictl pull <image-name>
```

### 3. 查看日志排查问题

```bash
# 查看 kubelet 日志
sudo journalctl -u kubelet -f

# 查看 containerd 日志
sudo journalctl -u containerd -f

# 查看 KubeSphere 安装器日志
kubectl logs -n kubesphere-system deployment/ks-installer -f
```

---

## 卸载

### 卸载 KubeSphere

```bash
# 删除 KubeSphere
kubectl delete -f https://github.com/kubesphere/ks-installer/releases/download/v3.4.1/kubesphere-installer.yaml
kubectl delete -f https://github.com/kubesphere/ks-installer/releases/download/v3.4.1/cluster-configuration.yaml

# 删除 KubeSphere 命名空间
kubectl delete namespace kubesphere-system
kubectl delete namespace kubesphere-controls-system
kubectl delete namespace kubesphere-monitoring-system
```

### 重置 Kubernetes 集群

```bash
# 重置集群
sudo kubeadm reset -f

# 清理配置文件
sudo rm -rf /etc/kubernetes/
sudo rm -rf ~/.kube/
sudo rm -rf /etc/cni/net.d/
sudo rm -rf /var/lib/etcd/

# 清理 iptables
sudo iptables -F && sudo iptables -t nat -F && sudo iptables -t mangle -F && sudo iptables -X
```

---

## 参考资料

- [KubeSphere 官方文档](https://kubesphere.io/zh/docs/)
- [Calico 官方文档](https://docs.projectcalico.org/)
- [kubeadm 安装指南](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/)
- [Kubernetes官方文档](https://kubernetes.io/zh-cn/docs/setup/)
- [Minikube文档](https://minikube.sigs.k8s.io/docs/)
- [kind文档](https://kind.sigs.k8s.io/)
- [kubectl命令参考](https://kubernetes.io/docs/reference/kubectl/)

---

## 更新日志

- **2025-10-30**: 完成初始安装，Kubernetes v1.28.15 + KubeSphere v3.4.1
