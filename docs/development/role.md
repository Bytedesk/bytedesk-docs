---
sidebar_label: Role
sidebar_position: 50
---

# Role

This page explains Bytedesk Admin Console’s **Roles & Permissions** feature.

If you’re not technical, you can think of it as:

- **Role** = job/identity (e.g. “Org Admin”, “Agent”, “Read-only member”)
- **Permission** = what actions someone is allowed to do (e.g. “View sessions”, “Export data”, “Edit settings”)

## 1. Key concepts

### 1.1 Role

Roles are used to group users and grant access consistently. You typically assign one or more roles to a user, and the roles determine what the user can see and do.

### 1.2 Authority (Permission)

Permissions control access to specific features or resources, such as:

- viewing sessions
- handling tickets
- editing settings
- exporting data

### 1.3 Practical rule

It’s recommended to grant permissions via **roles**, not directly per person, so that future changes are easier to manage.

## 2. Understanding permissions (no need to read the codes)

In the Admin UI, permissions are typically presented as “Module + Action” (for example: “Sessions - View”, “Settings - Edit”).

You don’t need to understand internal permission codes—just select permissions based on the displayed meaning.

## 3. Default built-in roles

The system provides a few default roles (for example: Super Admin / Org Admin / Agent / User). You can also create custom roles and adjust what each role can do.

## 4. Role expiry

### 4.1 Behavior

Roles can have an **expiry time**. After it expires, the role stops granting permissions automatically.

- No expiry set: the role stays valid
- Expiry set: once expired, permissions under that role become invalid

### 4.2 Recommended usage

Use expiry for **temporary access**, such as contractors, interns, or short-term projects. Set an expiry date so access is automatically revoked when it’s no longer needed.

### 4.3 Admin Console behavior (Frontend)

- In Role create/edit modal (RoleModel):
	- you can set an expiry datetime
	- if not set, it means permanent
	- clearing the value submits an empty string, and backend clears the expiry

- In role list (RoleList):
	- shows expiry; if none, shows “Permanent”

Tip: after a role expires, the permission change may require the user to re-login (or refresh user info) to fully take effect.

## 5. Admin operations

### 5.1 Create a role

1. Open **Role Management**
2. Click **Create Role**
3. Fill name and description
4. (Optional) set **Expiry**; leave empty for permanent
5. Save, then bind permissions

### 5.2 Edit role expiry

1. In role list, select the target role
2. Click **Edit**
3. Set an expiry datetime or clear it for permanent
4. Save

### 5.3 Configure role authorities

In the role detail “Authorities” section:

- Bind: select authorities and add to the role
- Remove: remove one or batch remove
- Reset: restore to system default (useful for built-in roles)

## 6. FAQ

### 6.1 Why can a user still operate after the role expired?

If a user logged in before the role expired, they may still have cached access. Ask them to re-login (or refresh user info) so permissions are recalculated.

### 6.2 What’s the difference between “Permanent” and “Field not provided”?

For non-technical users:

- “Permanent” simply means no expiry is set.
- Clearing the expiry makes it permanent again.
