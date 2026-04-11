---
sidebar_label: Allow Platform
sidebar_position: 62
---

# Restrict Member Login Platforms

Restricting member login platforms is an account access control feature for administrators.

It allows you to decide which back-office systems a member can log in to and which ones they cannot.

You can think of it as:

- which workspaces this member can enter
- which back-office systems this member cannot access
- opening only the right entry points for each role

For example:

- A regular support agent can log in only to the service workspace
- A knowledge base editor can log in only to the knowledge base console
- A workflow operator can log in only to the workflow console
- An organization administrator can log in to all platforms

## Which Platforms Can Be Restricted

The system supports login control for each member on the following platforms:

- Admin console admin
- Service workspace desktop
- Knowledge base console notebase
- Workflow console workflow
- Call center workspace call
- Call center admin console callAdmin

Administrators can select the allowed platforms for each member based on job responsibilities.

## Typical Use Cases

This feature is useful in situations such as:

- Different roles exist in the same organization, and not everyone should access every console
- Support agents should use only the service workspace and not the admin console
- Content or knowledge base staff should access only the knowledge base console
- Only designated staff should access workflow or call center related consoles
- New members should start with only the minimum required login entry
- A member's accessible platforms should be updated when their role changes

## Default Rules

To make setup easier, the system provides default access rules based on role:

- Organization administrators or super administrators: allowed to log in to all platforms by default
- Regular members: allowed to log in only to desktop by default

This means:

- Administrators usually do not need to enable each platform one by one
- Regular members need additional authorization if they must access more consoles

## What Happens After You Configure It

After an administrator saves the allowed login platforms for a member, the system will enforce that rule on future logins.

If the member tries to log in to a platform that is not allowed:

- The system will show a message explaining that the account does not have access to that platform
- After confirmation, the user cannot continue into that platform
- The account, member profile, and historical data are not deleted

If the member logs in to an allowed platform:

- They can enter and use that system normally

## How To Understand This Feature

For non-technical users, the easiest way to understand it is as role-based entry control.

It does not delete the account and it does not disable the member. It only controls which entrance that person can use.

So it is different from deleting, disabling, or force logout:

- Restrict login platforms: controls which platform the member can log in to
- Force logout: immediately stops the current session on a platform
- Delete member: removes the member record and organization relationship

If your goal is simply to control where a member can sign in, restricting login platforms is usually the best option.

## Common Examples

### Example 1: Regular Support Agent

If a member is only responsible for handling customer conversations, it is recommended to keep only:

- Service workspace desktop

This helps prevent accidental access to the admin console, knowledge base console, or workflow console.

### Example 2: Knowledge Base Editor

If a member mainly maintains knowledge base content, you can keep only:

- Knowledge base console notebase

If they also need to handle customer conversations, you can additionally allow:

- Service workspace desktop

### Example 3: Organization Administrator

If a member is an organization administrator, they usually need to handle settings, users, knowledge base content, and process configuration. In this case, all platform permissions are usually appropriate.

The system also grants all platforms to administrators by default.

## Recommendations

To reduce mistakes and avoid overly broad access, it is recommended to follow these principles:

- Open access by role, not by giving everyone every platform
- Give regular members only the platforms they actually need
- Give broader access only to administrators or responsible owners
- Update allowed platforms promptly when roles change
- Review member access regularly to avoid old accounts keeping unnecessary entry points

## Summary

The core purpose of restricting member login platforms is to help administrators control system entry points more precisely by role.

It allows different members to enter only the systems they actually need, which improves management and reduces the risk of mistakes or unnecessary access.

If you want one account to have different access based on the member's role, this feature is the most direct and easy-to-understand way to do it.
