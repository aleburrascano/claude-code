---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, workflow, spec-driven, phased, branch-aware]
source_url: https://github.com/tony/claude-code-riper-5
source_author: Tony Narlock (with credit to robotlovehuman/Cursor Forums for original RIPER-5)
license: MIT
---

# RIPER Workflow (Tony Narlock)

A 5-phase development methodology: **Research • Innovate • Plan • Execute • Review**. Enforces phase separation through custom slash commands and subagents. By Tony Narlock; original RIPER-5 concept from robotlovehuman.

Distinctive contribution: **strict mode enforcement** + **branch-aware memory bank**.

## The 5 phases

| Phase | Permissions | Purpose |
|---|---|---|
| **Research** | Read-only | Analyze codebase, understand architecture, gather requirements |
| **Innovate** (optional) | Read-only | Brainstorming, alternative approaches — no implementation pressure |
| **Plan** | Read + memory bank writes | Detailed technical specs based on research |
| **Execute** | Full read/write/test | Implementation. Granular targeting: `/riper:execute 2.3` |
| **Review** | Read + tests + memory bank writes | Validation against specs |

The mode-permission design is the discipline. Research can't accidentally modify code. Plan can't accidentally execute. Each phase is structurally bounded.

## Consolidated subagents

Three agents (not five) handle the phases:
- **research-innovate** — phases 1-2
- **plan-execute** — phases 3-4
- **review** — phase 5

Consolidation balances **specialization with context window efficiency**. Smart tradeoff for our [[Token Efficiency]] focus area.

## Branch-aware memory bank

Hierarchical organization:
- Primary directory for **main branch**
- Subdirectories for **feature branches**
- Within each branch: **plans separate from reviews**

You can switch contexts between features without losing prior decisions. Supports both shared context (main) and isolated work (feature branches).

This is a **per-branch memory pattern** — adjacent to [[Memory|CLAUDE.md hierarchy]] but at git-branch granularity. Worth understanding for monorepo or multi-feature work.

## Strict mode enforcement (`/riper:strict`)

Activates protocol compliance throughout session. Prevents accidental phase violations (executing before planning). Acts as governance layer.

## Installation

Copy `.claude` directory to project root, customize:
- `project-info.md` — project details, tech stack, guidelines
- `riper-config.json` — workflow settings, agent models

Optionally `.gitignore` memory bank directories to keep plans private.

## My assessment

RIPER's contributions for our wiki:

1. **Permission-bounded phases** — research is *structurally* read-only, not just by convention. Prevents whole classes of mistakes. Worth lifting to other workflows.

2. **Branch-aware memory bank** — extends [[Memory]] design to git-branch granularity. Useful for parallel feature work where each branch has its own context.

3. **Consolidated subagents (3 not 5)** — explicit acknowledgment that more subagents ≠ better. Balance specialization with efficiency.

4. **Strict mode as governance** — opt-in enforcement for sessions where discipline matters. Pair with [[Karpathy Coding Principles]] which is also discipline-as-CLAUDE.md.

The approach overlaps significantly with [[Spec Kit (github)]] (constitution + clarify gates) and [[Compound Engineering Plugin]] (`/ce-*` cycle), but RIPER's distinctive contribution is the **per-phase permission boundaries**.

Cross-references: [[Spec-Driven Development]] · [[Memory]] · [[Subagents]] · [[Karpathy Coding Principles]] · [[Token Efficiency]] (consolidated subagents) · [[Claude Code Ecosystem]]
