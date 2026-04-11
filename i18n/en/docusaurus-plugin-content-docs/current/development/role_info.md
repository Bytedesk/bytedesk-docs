---
sidebar_label: Role
sidebar_position: 50
---

# Role

This page explains Bytedesk Admin Console’s **Roles & Permissions** feature.

If you’re not technical, think of it as:

- **Role** = job/identity (e.g. “Org Admin”, “Agent”, “Read-only member”)
- **Permission** = what actions someone can do (e.g. “View sessions”, “Export data”, “Edit settings”)

## What you can do

- Create roles for different teams/positions
- Assign roles to users
- Decide what each role can access
- Set an expiry for temporary access

## Key ideas

### Roles

Roles help you manage permissions at scale. Instead of configuring access person-by-person, configure a role once and assign it to the right people.

### Permissions

Permissions control specific features, such as:

- viewing sessions
- handling tickets
- editing settings
- exporting data

You don’t need to understand any internal codes—select permissions based on the labels shown in the Admin UI.

## Default roles

Bytedesk provides some default roles (for example: Super Admin / Org Admin / Agent / User). You can keep them as-is or create custom roles for your organization.

## Role expiry (temporary access)

Roles can have an **expiry time**. After the role expires, its permissions stop taking effect.

Recommended usage:

- contractors / interns
- short-term projects
- temporary escalations

Tip: after changing a role’s expiry, the user may need to re-login (or refresh user info) for the change to fully apply.

## Admin Console guide

### Create a role

1. Open **Role Management**
2. Click **Create Role**
3. Fill name and description
4. (Optional) set **Expiry**; leave empty for permanent
5. Save, then configure permissions

### Configure permissions for a role

- Add permissions that this role should have
- Remove permissions that this role should not have

### Edit role expiry

1. Open the role
2. Click **Edit**
3. Set an expiry time, or clear it to make it permanent
4. Save

## FAQ

### Why can a user still operate after the role expired?

If the user logged in before the expiry, they may still have cached access. Ask them to re-login (or refresh user info) so permissions are recalculated.
