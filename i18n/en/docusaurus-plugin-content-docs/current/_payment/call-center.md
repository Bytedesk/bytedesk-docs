---
sidebar_label: "Call Center Pricing"
sidebar_position: 12
---

# Call Center Pricing Guide

The Weiyu call center module is architected on FreeSWITCH, WebRTC, and SIP trunking. Pricing reflects both the software capability set and the telecom resources you need. This document outlines the standard bundles used by the commercial team when preparing quotations.

## 1. Software Bundles

| Bundle | Seats Included | Concurrent Calls | License | What You Get |
| --- | --- | --- | --- | --- |
| **Cloud Starter** | 10 | 5 | ¥18,800 / year | Managed tenant on the public cloud, IVR designer, queue routing, recording, dashboard |
| **Cloud Growth** | 30 | 15 | ¥32,800 / year | Dedicated SBC slice, skill-based routing, quality monitoring, Salesforce/Feishu connectors |
| **Private Enterprise** | 50 | 25 | ¥56,800 / year | Delivered as Docker/K8s package, supports hybrid WebRTC/SIP phones, dual data center standby |
| **Perpetual Enterprise** | 50 | 25 | ¥89,800 one-time + ¥13,400 / year maintenance | Perpetual license with 12 months of upgrades; ideal for regulated industries |
| **Source Code Pack** | 50 | 25 | ¥128,000 one-time | Full React + Java source code, developer handbook, sample CI/CD pipeline |

All bundles ship with the [Call Center module](../plugins/freeswitch.md), agent workspace widgets, supervisor console, wallboard, and REST/Socket APIs for CTI integration.

## 2. Capacity-Based Add-ons

| Add-on | Granularity | Reference Price | Notes |
| --- | --- | --- | --- |
| Extra agent seats | Pack of 5 | ¥3,500 / year | Named logins for additional agents |
| Extra concurrent calls | Pack of 5 | ¥4,200 one-time + ¥600 / year | Enables more simultaneous IVR/agent calls |
| Cloud recording storage | 1 TB | ¥2,200 / year | AES-256 at rest, lifecycle policies configurable |
| Outbound dialer license | Per tenant | ¥9,800 / year | Predictive & progressive modes |
| AI quality inspection | Per 100k minutes analyzed | ¥1,800 | Uses LLM-based scoring and keyword spotting |

## 3. Telecom Resources

| Item | Supplier Options | Billing |
| --- | --- | --- |
| SIP trunk / DID numbers | China Telecom, China Mobile, Alibaba Cloud, Twilio | Direct carrier contract; Weiyu can assist with onboarding |
| SMS notifications | Alibaba Cloud SMS, Tencent Cloud SMS | Pay-as-you-go, from ¥0.045 / message |
| PSTN call recording compliance storage | Alibaba Cloud OSS, Huawei OBS | Storage + traffic billed by provider |

> Customers may also bring their own SIP carrier. Our SBC supports dual registration with custom dial plans.

## 4. Implementation Services

| Service | Scope | Effort | Price |
| --- | --- | --- | --- |
| Rapid deployment | Environment diagnosis, domain setup, FreeSWITCH hardening, go-live checklist | 2 days | ¥12,000 fixed |
| IVR journey design | Workshop + call flow delivery (max 50 nodes) | 3 days | ¥18,000 fixed |
| CRM/ERP integration | REST/webhook integration, SSO, data sync | Depends | ¥2,000 / consultant / day |
| On-site training | Supervisor + agent sessions (≤20 attendees) | 1 day | ¥6,000 + travel |

## 5. Support & SLA

- Cloud bundles include 7×12 support and 99.9% availability SLA.
- Private deployments include 10 remote support hours/year; additional hours billed at ¥800/hour.
- Maintenance renewal after the first year is 15% of the license list price and covers patches, feature upgrades, and security advisories.

## 6. Quotation Checklist

Prepare the following information to speed up the quotation cycle:

1. Expected number of concurrent inbound and outbound calls.
2. Channels that must be supported (PSTN, WebRTC, SIP desk phones, mobile SDK).
3. Regions/data centers and disaster recovery requirements.
4. Integrations (CRM, ticketing, workforce management, billing).
5. Compliance constraints (call recording retention, encryption, data residency).

Send the checklist to **sales@weiyuai.cn** or reach out via [WeChat QR code](/img/wechat.png) for a customized proposal.
