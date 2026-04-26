---
sidebar_label: Skills
sidebar_position: 12
---

# Skills

Bytedesk already includes a practical Skills foundation for AI workflows. Skills are reusable capability packages that bundle task instructions, workflow knowledge, and supporting resources so an AI system or agent can execute a class of tasks in a more stable, repeatable, and maintainable way.

This page is written for mixed audiences. Developers and operators can use it to understand the current implementation and integration points, while product, delivery, and other non-technical readers can use it to understand why Bytedesk treats Skills as reusable AI workflow assets instead of ad hoc prompts.

## What Skills Mean In Bytedesk

In the current project, Skills already exist as packaged runtime resources. These Skills packages organize reusable guidance for document work, planning, design, coding, testing, documentation, and other agent workflows.

This page focuses on AI and agent Skills, not on organizational skill labels used for service routing or workgroup matching.

You can think of Skills as:

- engineered prompt packaging
- standardized operating guides for AI workflows
- reusable knowledge modules for a class of tasks

In short, the model determines whether the system can reason, while Skills determine how it should approach a category of work.

## Current Foundation

The repository already contains:

- bundled Skills resource directories
- multiple example `SKILL.md` packages
- metadata parsing and synchronization into platform entities
- support for loading Skills from an external directory
- admin-side visibility into platform-level Skills

This shows that Skills are already part of the implemented AI capability foundation, not just a product idea.

The current built-in Skills set already includes resource directories such as:

- `brainstorming`
- `doc-coauthoring`
- `frontend-design`
- `mcp-builder`
- `pptx`
- `docx`
- `webapp-testing`
- `test-driven-development`

These examples show that Bytedesk is not limiting Skills to question answering. Skills are already being used to structure planning, implementation, testing, document work, and multimodal content workflows.

## How It Works Today

The current implementation already completes the basic Skills lifecycle inside the platform.

### 1. Built-in Skills Are Discovered Automatically

The application scans bundled runtime resources using a pattern equivalent to:

```text
starter/src/main/resources/skills/*/SKILL.md
```

Each Skills package lives in its own directory and is expected to include at least one `SKILL.md` file.

### 2. External Skills Can Be Mounted By Configuration

In addition to built-in Skills, the system can load Skills from a configurable external directory:

```properties
bytedesk.ai.skill.external-directory=/data/bytedesk/skills
```

The expected directory structure is:

```text
<external-root>/<skill-directory>/SKILL.md
```

This matters for operators because it allows teams to:

- manage custom Skills outside the application source tree
- load different Skills sets in different environments
- extend platform capability without modifying bundled runtime resources

### 3. Current Metadata Parsing

The current parser reads key frontmatter fields from `SKILL.md`, especially:

- `name`
- `description`

For example:

```md
---
name: brainstorming
description: Guides the AI to clarify goals and solution options before implementation
---
```

If `name` is missing, the system falls back to the Skills directory name.

### 4. Parsed Skills Are Synchronized Into Platform Data

After parsing, the platform synchronizes Skills metadata into `SkillEntity`, including:

- `name`
- `description`
- `source`, marked as `INTERNAL` or `EXTERNAL`
- `level`, currently managed as `PLATFORM`
- `platform`, currently associated with the Bytedesk platform

This means Skills are no longer just markdown files in a folder. They are already treated as platform capability assets.

### 5. Skills Are Visible In The Admin UI

The admin-side super management page can already list platform-level Skills and show fields such as:

- UID
- name
- description
- type
- source
- level
- platform
- created time
- updated time

The `source` field distinguishes bundled and external Skills, which is helpful for both operations and development troubleshooting.

## What Skills Are Good For

Skills are especially useful when you want to:

- standardize how an AI assistant performs a recurring task
- package domain knowledge for repeated use
- reduce prompt duplication across workflows
- make agent behavior more modular and easier to maintain

Given the current implementation, Skills are particularly suitable for:

- process rules such as gather context, plan, execute, then verify
- scenario knowledge such as document co-authoring, test-driven development, frontend design, or document generation
- multi-step workflows such as reading input, structuring output, generating results, and validating them
- long-term platform knowledge that should be reused instead of rewritten each time

For non-technical readers, Skills can be understood as standard operating packages for AI work.

For developers, Skills are closer to structured prompt assets plus workflow guidance.

For operators, Skills are runtime capability resources that can be loaded, inspected, and extended.

## Role-Based View

### For Developers

Developers mainly care about how to create and maintain a Skills package.

The current practical rules are:

- one Skills package maps to one directory
- the entry file is `SKILL.md`
- `SKILL.md` should at least provide a clear `name` and `description`
- the directory name should remain stable because the platform derives a stable UID from it
- a Skills package should describe a reusable method for handling a task, not just a large unstructured prompt dump

If you are introducing a new agent capability, it is often better to extract it as a Skills package first instead of hardcoding all logic into one prompt.

### For Operators

Operators mainly care about deployment, expansion, and troubleshooting.

The key operational points are:

- built-in Skills come from bundled runtime resources
- external Skills can be mounted through configuration
- synchronized Skills can be identified in the admin UI as `INTERNAL` or `EXTERNAL`
- if the external directory structure does not follow the expected convention, the system will not discover the Skills package correctly
- if `SKILL.md` does not provide valid metadata, the synchronized platform record will be incomplete

In practice, this means Skills can already be managed as a configurable runtime resource, not only as source code.

### For Product, Delivery, And Other Non-Technical Readers

You do not need to care about the implementation details to understand the product meaning.

At a functional level, Skills are:

- the way Bytedesk turns an AI capability into a standard reusable module
- a mapping between a task category and a structured way to handle it
- a foundation for making AI capabilities configurable, manageable, and reusable across scenarios

A simple way to explain it is:

The model generates, but Skills provide method, structure, and accumulated experience.

## Integration Examples For Development And Operations

### Built-in Skill Directory Example

```text
starter/src/main/resources/skills/
  brainstorming/
    SKILL.md
  doc-coauthoring/
    SKILL.md
  webapp-testing/
    SKILL.md
```

### External Skill Directory Example

```text
/data/bytedesk/skills/
  order-helper/
    SKILL.md
  ops-diagnosis/
    SKILL.md
```

### Minimal `SKILL.md` Example

```md
---
name: ops-diagnosis
description: Guides the AI to diagnose deployment, configuration, and runtime problems step by step
---

# Ops Diagnosis

This file can then continue with operating constraints, execution flow, and usage notes.
```

## Current Boundary

It is also important to state the current scope clearly.

- the current platform already supports Skills discovery, metadata parsing, synchronization, and admin-side visibility
- current parsing is still centered on core metadata such as `name` and `description`
- the current admin page is mainly for viewing platform Skills records, not yet a full online Skills editor
- richer lifecycle features such as direct file editing, write-back to `SKILL.md`, or broader external exposure are still future work

So at this stage, Skills should be understood as platform-managed AI capability metadata plus runtime resource organization, not yet as a full marketplace or end-user authoring product.

## Relationship To Other Capability Pages

- [Tools](./tools) focus on callable actions and backend execution.
- [MCP](./mcp) focuses on standard protocol-based integration with external agent ecosystems.
- [Text Model Guide](./model_text) covers the model layer that powers reasoning behind Skills usage.

If reduced to one sentence each:

- the model decides whether the system can reason
- tools decide whether the system can execute
- MCP decides whether the system can connect to external ecosystems in a standard way
- Skills decide how the system should approach a class of tasks

## Summary

Skills provide the reusable knowledge layer for Bytedesk AI workflows. They help transform one-off prompting into structured, repeatable, and maintainable AI capabilities.

From the current implementation, Bytedesk already has:

- built-in Skills resource directories
- externally mountable Skills directories
- `SKILL.md` metadata parsing
- synchronization into platform entities
- admin-side visibility into the synchronized Skills list

For developers, this is the basis for modular AI capability design.

For operators, this is a configurable and extensible runtime resource.

For non-technical readers, this shows that Bytedesk is already moving from one-off prompts toward reusable and manageable AI capability assets.
