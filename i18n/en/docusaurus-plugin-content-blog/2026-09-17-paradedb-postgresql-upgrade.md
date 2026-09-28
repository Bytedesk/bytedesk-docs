---
slug: paradedb-postgresql-upgrade
title: Bytedesk Switches the Default PostgreSQL Image to ParadeDB 0.25.9
authors: jackning
tags: [bytedesk, PostgreSQL, ParadeDB, Docker, Upgrade]
---

Bytedesk has updated the default PostgreSQL image in `deploy/docker/compose/compose-postgresql.yaml` from the native `postgres:17` image to `paradedb/paradedb:0.25.9`. The goal of this change is straightforward: keep PostgreSQL compatibility while bringing stronger built-in search and analytics capabilities for knowledge base, ticket, message, and AI retrieval scenarios.

This post explains what changed, why ParadeDB was chosen, and what teams should pay attention to when upgrading local or test environments.

<!-- truncate -->

## What Changed

The default image is now:

```yaml
image: paradedb/paradedb:0.25.9
```

The original PostgreSQL image is still kept as a comment for teams that want to switch back to a pure upstream PostgreSQL setup:

```yaml
# image: postgres:17
```

Two related infrastructure details were also updated:

- The data volume mount path is now `/var/lib/postgresql`
- The PostgreSQL volume name is now `bytedesk_postgresql_data18`

These are not cosmetic changes. They are required for compatibility with the current ParadeDB image layout, which is based on PostgreSQL 18, and help avoid startup failures caused by older PG17-style data directory assumptions.

## Why ParadeDB

ParadeDB is still PostgreSQL, but with built-in extensions focused on search and analytics. For Bytedesk, that is a better default than requiring a separate database plus a separate search engine for every PostgreSQL-based deployment.

This switch is mainly driven by these factors:

- Knowledge base, FAQ, ticket, and message data all need strong full-text search
- AI retrieval workflows benefit from better ranking and retrieval primitives
- Local development, demos, and smaller deployments benefit from fewer mandatory external components
- PostgreSQL protocol compatibility keeps application-layer changes minimal

ParadeDB's `pg_search` feature set is a strong fit here, especially for BM25 full-text search, vector search, and hybrid retrieval.

## What This Means for Bytedesk Users

For teams deploying Bytedesk on PostgreSQL, this change brings three immediate benefits.

### 1. Search Becomes More Practical for Real Workloads

Customer service knowledge bases, FAQs, historical messages, and ticket content are a natural fit for in-database full-text retrieval instead of only relying on basic matching or a separately managed search stack.

### 2. Deployment Gets Simpler

In PostgreSQL-based environments, teams can validate richer search behavior without introducing Elasticsearch or another dedicated search tier on day one.

### 3. Better Groundwork for AI Retrieval

Bytedesk is already expanding its vector retrieval and retrieval-augmented flows. Using ParadeDB as the default PostgreSQL image creates a cleaner path for future AI search enhancements on the PostgreSQL stack.

## Compatibility Notes

This is not a database protocol change. The application still uses PostgreSQL as PostgreSQL:

- Spring Boot datasource configuration stays the same
- The JDBC driver stays the same
- The PostgreSQL dialect and operational model stay the same

However, two upgrade details are important.

### 1. ParadeDB 0.25.9 Is Based on PostgreSQL 18 by Default

`paradedb/paradedb:0.25.9` is not a PG17 variant. It is based on PostgreSQL 18 by default. If your environment must stay on PG17, use the appropriate PG17-specific ParadeDB tag instead of assuming `0.25.9` matches PG17.

### 2. PG18+ Uses a Different Volume Mount Layout

Many older PostgreSQL Docker setups mounted data at:

```yaml
/var/lib/postgresql/data
```

PG18+ images expect the volume to be mounted at:

```yaml
/var/lib/postgresql
```

If you keep the old path, the container may refuse to start because the data directory layout no longer matches what the image expects. That is why the compose file was updated at the same time.

## How to Use It

If you use the repository's Docker helper scripts, you can switch with:

```bash
cd deploy/docker
./switch-db.sh postgresql
```

Then point the local application profile to PostgreSQL:

```properties
bytedesk.datasource.active=postgresql
```

This setup has already been verified in local startup validation:

- The default PostgreSQL compose now uses ParadeDB 0.25.9
- The local starter application boots successfully against PostgreSQL
- PostgreSQL-specific Liquibase and JPA compatibility issues uncovered during the switch have been fixed

## Upgrade Advice

If you already use an older PostgreSQL container or volume layout, upgrade in this order:

1. Decide whether the old data volume must be preserved.
2. Do not directly reuse the old PG17-style mount path when moving to ParadeDB on PG18.
3. Use a new volume name for the ParadeDB 18-based setup to avoid mixing layouts.
4. After the container switch, start Bytedesk and let database migrations validate the environment.

If this is a fresh local environment, the current compose file is ready to use as-is.

## Summary

Bytedesk now uses `paradedb/paradedb:0.25.9` as the default PostgreSQL image. The main goal is to keep PostgreSQL compatibility while giving knowledge base, ticket, message, and AI retrieval workloads a stronger default search foundation.

If you plan to run Bytedesk on PostgreSQL and want a better path toward full-text, hybrid, or AI-assisted retrieval, this default is a more capable starting point than plain upstream PostgreSQL.

## Related Resources

- [ParadeDB GitHub](https://github.com/paradedb/paradedb)
- [ParadeDB Docker Hub Tags](https://hub.docker.com/r/paradedb/paradedb/tags)
- [PostgreSQL PG18 data directory change](https://github.com/docker-library/postgres/pull/1259)