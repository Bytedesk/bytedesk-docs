---
slug: scan-to-login
title: QR Code Login Implementation Process
authors: jackning
tags: [developer, bytedesk]
---

- Desktop client generates a unique device uid: deviceUid
- Sends this deviceUid to the server, server returns a random code: randomCode
- Desktop client generates QR code using randomCode and deviceUid
- Mobile client scans this QR code, obtains deviceUid, sends deviceUid to server, server updates status to SCANED
- Mobile client clicks confirm login, sends mobile number and deviceUid to server, server saves mobile number and updates status to CONFIRMED
- Desktop client polls to get mobile number and CONFIRMED status, uses mobile number and randomCode to call login API
- If desktop client gets EXPIRED status, it needs to fetch a new randomCode and regenerate QR code
- After successful login, returns accessToken, desktop client saves this accessToken locally and redirects to homepage

<!-- truncate -->

QR Code Login Implementation Process
