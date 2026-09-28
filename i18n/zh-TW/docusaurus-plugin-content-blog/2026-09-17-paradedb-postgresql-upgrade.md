---
slug: paradedb-postgresql-upgrade
title: 微語預設 PostgreSQL 映像升級為 ParadeDB 0.25.9
authors: jackning
tags: [bytedesk, PostgreSQL, ParadeDB, Docker, Upgrade]
---

微語已在 `deploy/docker/compose/compose-postgresql.yaml` 中將預設 PostgreSQL 映像從原生 `postgres:17` 切換為 `paradedb/paradedb:0.25.9`。這次更新的目標很明確：在保持 PostgreSQL 協議與生態相容的前提下，為知識庫、工單、訊息與 AI 檢索場景引入更強的全文檢索與分析能力。

本文說明這次切換帶來的變化、為什麼選擇 ParadeDB，以及本地開發與升級時需要注意的相容點。

<!-- truncate -->

## 這次更新了什麼

目前預設配置已改為：

```yaml
image: paradedb/paradedb:0.25.9
```

同時保留了原生 PostgreSQL 映像註解，方便需要純 PostgreSQL 環境的團隊自行切回：

```yaml
# image: postgres:17
```

除了映像本身，這次還同步調整了兩個關鍵細節：

- 資料卷掛載路徑改為 `/var/lib/postgresql`
- PostgreSQL 資料卷名稱調整為 `bytedesk_postgresql_data18`

這兩個調整並不是格式整理，而是為了相容 ParadeDB 目前基於 PostgreSQL 18 的映像布局，避免沿用舊 PG17 或更早映像的資料目錄慣例後導致容器拒絕啟動。

## 為什麼從 PostgreSQL 切到 ParadeDB

ParadeDB 本質上仍然是 PostgreSQL 發行版，但額外內建了適合搜尋與分析場景的增強能力。對微語而言，這比「資料庫一套、搜尋引擎再另外部署一套」的方式更輕量。

這次切換主要基於以下考量：

- 微語的知識庫、FAQ、工單與訊息天然存在全文檢索需求
- AI 檢索增強場景需要更強的文本召回與排序能力
- 本地開發、展示環境與中小規模部署更希望減少 Elasticsearch 這類額外元件依賴
- 保持 PostgreSQL 相容協議，能降低應用側改造成本

ParadeDB 提供的 `pg_search` 能力適合這類場景，尤其是基於 BM25 的全文檢索、向量檢索與混合檢索能力，和微語目前的知識庫與 AI 能力方向相當一致。

## 對微語有什麼直接價值

對使用 PostgreSQL 部署微語的團隊，這次更新最直接的價值有三點：

### 1. 搜尋能力更貼近業務場景

客服知識庫、FAQ、歷史訊息、工單標題與內容，都更適合走資料庫內的全文檢索能力，而不是只依賴模糊比對或額外維護獨立搜尋系統。

### 2. 部署結構更簡單

在需要 PostgreSQL 的場景裡，ParadeDB 讓團隊可以先把檢索能力放進資料庫層驗證，減少「先上搜尋叢集再做業務聯調」的前置成本。

### 3. 為 AI 檢索增強預留基礎設施空間

微語已在知識庫與 AI 場景中逐步引入向量檢索、檢索增強與多階段召回。預設映像改為 ParadeDB，可以讓後續 PostgreSQL 技術棧上的 AI 檢索能力擴展更自然。

## 相容性說明

這次切換不是替換資料庫協議，應用層仍按 PostgreSQL 使用。也就是說：

- Spring Boot 資料源配置方式不變
- JDBC 驅動與 PostgreSQL 方言不變
- 現有 PostgreSQL 工具鏈與維運方式基本不變

但有兩個升級注意事項必須明確。

### 1. ParadeDB 0.25.9 預設基於 PostgreSQL 18

`paradedb/paradedb:0.25.9` 不是 PG17 變體，而是預設基於 PostgreSQL 18。若你的環境明確要求 PG17，需要改用 ParadeDB 對應的 PG17 標籤，而不是直接假設 `0.25.9` 等同於 PG17。

### 2. PG18+ 的資料目錄掛載方式不同

舊的 PostgreSQL Docker 使用中，很多專案會把資料卷掛到：

```yaml
/var/lib/postgresql/data
```

但 PG18+ 系列映像要求掛載到：

```yaml
/var/lib/postgresql
```

如果繼續沿用舊路徑，容器可能因為識別到不相容的資料目錄布局而無法正常啟動。這也是這次 compose 檔案裡同步修改卷掛載路徑的原因。

## 如何切換與使用

如果你使用倉庫內的 Docker 腳本，可以直接執行：

```bash
cd deploy/docker
./switch-db.sh postgresql
```

應用側再配合本地 profile 使用：

```properties
bytedesk.datasource.active=postgresql
```

對於本地開發，微語已按這個組合完成了啟動驗證：

- 預設 PostgreSQL compose 使用 ParadeDB 0.25.9
- 本地 `starter` 以 PostgreSQL 資料源成功啟動
- 相容修復已覆蓋 PostgreSQL 下暴露出的 Liquibase/JPA 命名與遷移問題

## 升級建議

如果你目前已在使用舊 PostgreSQL 容器或舊資料卷，建議按下面順序處理：

1. 先確認是否需要保留舊資料卷
2. 如果是從舊 PG17 風格目錄遷移，避免直接復用舊掛載路徑
3. 為 ParadeDB 18 基線使用新的資料卷名稱，避免與舊卷混用
4. 完成容器切換後，再啟動微語應用做一次資料庫遷移校驗

如果你是全新本地環境，直接使用目前 compose 配置即可。

## 總結

這次更新將微語預設 PostgreSQL 映像切換到 `paradedb/paradedb:0.25.9`，核心目的是在保持 PostgreSQL 相容性的同時，為知識庫、工單、訊息與 AI 檢索場景提供更強的預設搜尋基礎設施。

如果你計劃用 PostgreSQL 承載微語，並希望後續進一步增強全文檢索、混合檢索或 AI 檢索能力，這個預設配置會比原生 PostgreSQL 更合適。

## 相關連結

- [ParadeDB GitHub](https://github.com/paradedb/paradedb)
- [ParadeDB Docker Hub Tags](https://hub.docker.com/r/paradedb/paradedb/tags)
- [PostgreSQL PG18 資料目錄調整說明](https://github.com/docker-library/postgres/pull/1259)