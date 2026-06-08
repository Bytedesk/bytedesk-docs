sidebar_label: Kamailio
sidebar_position: 16

# Kamailio

This page is the English counterpart of the Chinese Kamailio guide. It now includes the current environment mapping and the key deployment boundaries so the English site is no longer an empty placeholder.

## Current Environment Mapping

- FreeSWITCH server IP: `118.25.178.96`
- FreeSWITCH access domain: `sip.weiyuai.cn`
- Kamailio server IP: `124.220.58.234`
- Kamailio access domain: `call.weiyuai.cn`

`call.weiyuai.cn` currently means the Kamailio host access domain. It does not automatically mean the SIP registration domain. If Kamailio takes over the public SIP edge, you can still keep `sip.weiyuai.cn` as the SIP business domain, but DNS or endpoint SIP server targets must point to Kamailio.

## Roles And Boundaries

- Kamailio: public SIP edge, registration, routing, NAT adaptation, rate limiting, and access control.
- FreeSWITCH: media and call processing, such as IVR, bridging, recording, conferencing, and codec handling.
- Nginx: HTTP/HTTPS and WS/WSS entry point with TLS termination when needed.

In the current environment, `call.weiyuai.cn` can be treated as the Kamailio host access domain, while `sip.weiyuai.cn` remains the public SIP business domain. That split is valid as long as the final SIP target points to Kamailio instead of directly to FreeSWITCH.

## FreeSWITCH Trust Boundary

FreeSWITCH should trust Kamailio through a dedicated ACL instead of a broad allowlist.

Example ACL:

```xml
<list name="kamailio_only" default="deny">
 <node type="allow" cidr="127.0.0.0/8"/>
 <node type="allow" cidr="::1/128"/>
 <node type="allow" cidr="124.220.58.234/32"/>
</list>
```

Bind it to the external Sofia profile:

```xml
<param name="local-network-acl" value="localnet.auto"/>
<param name="apply-inbound-acl" value="kamailio_only"/>
```

Then reload:

```bash
fs_cli -p bytedesk123 -x "reloadxml"
fs_cli -p bytedesk123 -x "reloadacl"
fs_cli -p bytedesk123 -x "sofia profile external restart"
```

## Deployment Notes

- If public SIP traffic is moved from FreeSWITCH to Kamailio, keep the SIP business domain stable when possible.
- Update the DNS record or device target of `sip.weiyuai.cn` to Kamailio if Kamailio becomes the public SIP edge.
- Do not switch endpoints to `call.weiyuai.cn` unless you intentionally want that to become a SIP domain and you also update Kamailio aliases, certificates, and endpoint settings.

## Full Guide

The full operational guide currently lives in the Chinese version and is the canonical detailed reference in this repository.

- Chinese guide: `docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/callcenter/kamailio.md`
