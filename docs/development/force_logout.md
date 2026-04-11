---
sidebar_label: Force Logout
sidebar_position: 61
---

# Force Logout

Force logout is an administrator-facing account control feature used to temporarily prevent a support agent account or member account from continuing to sign in to the agent workspace.

When an administrator force logs out a target account:

- If the account is already signed in to the agent workspace, it will immediately receive a prompt and sign out after confirmation
- If the account is not currently signed in, it will see a prompt the next time it tries to sign in and will not be allowed to continue
- The restriction remains in effect until an administrator manually restores access

## When To Use It

Force logout is typically useful in scenarios such as:

- An employee leaves the company or changes roles and access must be stopped immediately
- An account may be used by the wrong person and sign-in should be frozen first
- During agent handover, a specific account needs to stop receiving visitors temporarily
- Unusual sign-ins or suspicious operations are detected and the account should be stopped first
- An administrator needs temporary control over a member's access to the agent workspace

## What This Feature Does

For non-technical users, the simplest way to understand it is as a temporary suspension of agent workspace sign-in eligibility.

It is different from deleting an account:

- Force logout does not delete the person's profile
- It does not clear historical conversations, organization relationships, or role information
- It only prevents the account from continuing to sign in and operate
- Administrators can restore access at any time without creating the account again

Because of that, force logout is better suited for management scenarios where the account must be controlled first and handled later.

## What Happens After It Is Used

After an administrator performs a force logout, the system records the restricted sign-in status for that account.

From the user's perspective, the behavior is:

1. If already signed in: they will see a logout prompt and exit the current workspace
2. If not signed in: they will see a prompt on the next sign-in attempt and cannot enter the workspace
3. In the admin console: the account is shown as being in a restricted sign-in state

This means administrators do not need to wait for the user to sign out on their own, and do not need to worry about the person signing in again later.

## How To Restore Access

If the account is confirmed to be allowed back into normal use, the administrator only needs to restore access.

After access is restored:

- The sign-in restriction is removed
- The user can sign in to the agent workspace again
- Existing account information, member information, and historical data remain unchanged

## Recommended Usage

To reduce mistakes, it is recommended to use this feature with the following principles:

- In offboarding or handover scenarios, force logout first and then handle follow-up permission adjustments
- In suspicious sign-in scenarios, force logout first and then inspect account security and password settings
- If the goal is only to pause access temporarily, prefer force logout instead of deleting the account
- Once the matter is resolved, restore access in time to avoid affecting normal work

## Summary

The core value of force logout is that it helps administrators quickly and safely stop an account from continuing to use the agent workspace while preserving the account and business data for later recovery or further handling.

If your goal is to stop usage immediately without deleting the account for now, force logout is the most appropriate option.
