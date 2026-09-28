---
sidebar_label: 登录与匿名访问
sidebar_position: 1
---

# Login and Anonymous Access

Visitors can chat anonymously or sign in with an account provided by the enterprise. Whether account, phone-number, or QR-code login is shown depends on the deployment and administrator configuration.

## Anonymous Access

After opening the chat page from an enterprise link, the system automatically creates an anonymous visitor identity. Anonymous access requires no account and suits one-off consultations.

The anonymous identity is usually stored in the current browser. After clearing browser data, switching browsers, or changing devices, the system may no longer recognize the original identity, so for important matters it is recommended to sign in before submitting tickets.

## Account and Password Login

![Visitor login window](/img/manual/chat/auth/login.png)

1. Open the login page.
2. Enter your account and password.
3. Complete the captcha or privacy-agreement confirmation as prompted.
4. Click "Login".

After a successful login the system returns to the chat page. Repeated wrong passwords may trigger a remaining-attempts notice or a temporary lockout; wait until the lockout ends or contact the administrator.

:::warning Account Security
Use "Remember password" only on trusted devices. On public computers, sign out after use and clear the login information saved by the browser.
:::

## Phone Number Login

1. Switch to phone-number login.
2. Enter your phone number and request a verification code.
3. Enter a valid code, accept the privacy agreement, and sign in.

If the code does not arrive, check the phone number, the resend interval, and your network. When the SMS service is not configured or the phone number is not bound, contact the service provider.

## QR-Code Login

When the page shows a QR-code login entry:

1. Scan the QR code with the mobile app specified on the page;
2. Confirm the login on the mobile side;
3. Wait for the web page to enter the chat automatically.

QR codes expire. When the page indicates expiry, refresh the code and scan again. Some deployments disable QR login; use account or phone-number login instead.

## Registration and Server Switching

- If the login page provides a "Register" entry, you can create an account as required by the page; whether registration is allowed is decided by the deployment operator.
- Private deployments may provide a server-switching entry for configuring API and WebSocket addresses. Regular users should not modify it; wrong addresses cause login or messaging failures.

## Troubleshooting Login Failures

| Symptom | Suggestion |
| --- | --- |
| Wrong username or password | Check case and input method; avoid repeated attempts |
| Captcha wrong or expired | Refresh the captcha and enter again |
| Account locked | Wait until the prompted time ends, or ask the administrator to unlock |
| Page keeps loading | Check the network and refresh; private-deployment users should verify the server address |
| No history after login | Make sure you use the same account, organization, and server |

Signing in is not required to start a consultation. If anonymous access is allowed, return to [Quick Start](../gettting_started.md) and chat directly.
