---
sidebar_label: Admin Dashboard
sidebar_position: 2
---

# Admin Dashboard Deployment

:::tip

- Operating System: Ubuntu 20.04 LTS
- Server Requirements: Minimum 2 cores 4GB RAM, Recommended 4 cores 8GB RAM

:::

## Dependencies

- [Nginx](/docs/docs/deploy/depend/nginx)
- [Let's Encrypt](/docs/docs/deploy/depend/letsencrypt)

## Download

```bash
# Download source code
git clone https://github.com/bytedesk/bytedesk-admin.git
cd bytedesk-admin
# Install dependencies
yarn install
# Start development
yarn dev
# Build for production
yarn build
```

## Configuration

```bash
# Modify configuration files
vim .env.production
# Modify API URL
VITE_API_URL=https://api.example.com
```

## Deploy

```bash
# Copy dist directory to nginx html directory
cp -r dist/* /var/www/html/weiyuai/admin/
```
