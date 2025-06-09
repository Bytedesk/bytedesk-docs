---
sidebar_label: SSL Certificate
sidebar_position: 4
---

# SSL Certificate

## Let's Encrypt

```bash
# Install certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d weiyuai.cn -d *.weiyuai.cn

# Automatic renewal
sudo certbot renew --dry-run
```

## References

- [Let's Encrypt](https://letsencrypt.org/)
- [Certbot Instructions](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal)
