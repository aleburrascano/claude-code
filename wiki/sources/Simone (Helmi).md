---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, project-management, framework, mcp, documentation]
source_url: https://github.com/Helmi/claude-simone
source_author: Helmi
license: MIT
---

# Simone (Helmi)

A project + task management framework purpose-built for AI-assisted development workflows. Functions as **artifact-generation infrastructure** — establishes shared knowledge between you and the AI through organized structure and clear documentation.

## What it generates

Simone operates as an artifact-generation ecosystem creating:
- **Project documentation** (context + requirements)
- **Structured task definitions** (manageable units of work)
- **Process guidelines** (how Claude approaches your codebase)
- **Project context files** (persist AI understanding across sessions)

These artifacts collectively form a shared knowledge base, reducing context loss and improving workflow consistency.

## Two implementations

### Legacy System (production-stable)
The original directory-based approach. Feature-complete; established patterns. For teams already using Simone.

### MCP Server (early access)
Newer implementation leveraging [[Model Context Protocol|MCP]]. Delivers structured prompts, activity tracking. Represents future direction. Under active development.

Both share the same fundamental philosophy: **systematic documentation enables AI to work with project context intelligently**.

## Installation

Universal installer at `/hello-simone`. Choose legacy or MCP based on maturity needs.

## My assessment

Simone's distinctive philosophy is **documentation-as-substrate**. Most frameworks have skills + commands + agents (the "active" components); Simone emphasizes the *passive* documentation layer that those active components consume.

This aligns with [[Spec-Driven Development|SDD's spec-as-load-bearing-artifact]] philosophy and [[Memory|CLAUDE.md as persistent context]] but at a higher level — Simone is opinionated about what *kinds* of documents you should generate.

For Alessandro's focus areas, Simone's main contribution is the **MCP-based future direction**. As MCP matures and more tools standardize on it, Simone's pattern of "structured prompts + activity tracking via MCP" will likely become more common. Worth keeping an eye on the MCP Server variant.

Less differentiated from peers than other frameworks — most of what Simone does, [[ContextKit (Cihat Gunduz)|ContextKit]] / [[Spec Kit (github)|Spec Kit]] / [[BMAD-METHOD]] also do. Simone's lighter weight may suit teams that find heavier frameworks over-prescribed.

Cross-references: [[Spec-Driven Development]] · [[Memory]] · [[Model Context Protocol]] · [[Claude Code Ecosystem]]
