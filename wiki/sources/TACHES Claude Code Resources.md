---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, skills, meta-skills, auditing, quality-gates]
source_url: https://github.com/glittercowboy/taches-cc-resources
source_author: TÂCHES (glittercowboy)
license: MIT
---

# TÂCHES Claude Code Resources

A curated collection of 27 commands, 9 skills, and 3 specialized subagents by **TÂCHES** (glittercowboy). The resource's signature contribution: **meta-skills and audit subagents** — tools for *building* and *quality-checking* the rest of your Claude Code setup.

Author philosophy:
> "When you use a tool like Claude Code, it's your responsibility to assume everything is possible."

## Components at a glance

### Commands (27)
- **Meta-prompting**: `/create-prompt`, `/run-prompt`
- **Todo management**: `/add-to-todos`, `/check-todos`
- **Context handoff**: `/whats-next` — for between-session continuity
- **Thinking models**: `/consider:pareto`, `/consider:first-principles`, `/consider:inversion`, plus 9 others — explicit reasoning frames the user can request
- **Deep analysis**: `/debug`

### Skills (9)
- **Create Plans** — hierarchical project planning
- **Create Agent Skills** — meta-skill for skills
- **Create Meta-Prompts**
- **Create Slash Commands**
- **Create Subagents**
- **Create Hooks**
- **Create MCP Servers**
- **Debug Like Expert**
- **Setup Ralph** — autonomous coding loop ([[Ralph Wiggum Technique]])

### Audit subagents (3)
- **skill-auditor** — reviews new skills against best-practice compliance
- **slash-command-auditor**
- **subagent-auditor**

## Why this resource is uniquely valuable

Most Claude Code resources are *content* (skills, agents, hooks). TÂCHES is largely *infrastructure for content* — meta-skills that produce good skills, audit subagents that maintain quality, and `/heal-skill` (mentioned in the awesome list annotation) that updates skills based on what actually worked.

This is the pattern of **"tools for building tools"** — and it's the difference between an ad-hoc collection of skills and a maintainable skill library.

### The audit pattern
Each of skill / slash-command / subagent has a paired auditor. This enforces structural standards across extensions and prevents **configuration drift** — the slow degradation that happens when a library accumulates extensions without quality enforcement. The auditors are themselves subagents — quality enforcement is delegated, not centralized in user discipline.

### Self-healing skills (`/heal-skill`)
Per the awesome list annotation: analyzes execution failures and updates skills based on what actually worked, embedding **experiential learning** into tool development. Conceptually adjacent to [[Compound Engineering Plugin|/ce-compound]] but at the skill-definition level rather than the project level.

### Thinking-model commands (`/consider:*`)
Explicit reasoning frames: pareto, first-principles, inversion, etc. The user can *name the lens* they want Claude to apply, rather than hoping Claude picks the right one implicitly. Worth folding into [[Reducing Hallucinations]] as a guarded-reasoning technique — naming the frame surfaces assumptions.

## Design philosophy

Lightweight, composable, adaptable — explicitly *not* a heavyweight framework. The PLAN.md files double as both planning artifacts and prompt input ("executable outputs over documentation"). Author favors *adapting* tools to your workflow, not adopting a workflow wholesale.

## Installation

Plugin marketplace (recommended):
```
claude plugin marketplace add glittercowboy/taches-cc-resources
claude plugin install taches-cc-resources
```

Manual install copies commands to `~/.claude/commands/` and skills to `~/.claude/skills/`.

## Author

TÂCHES (glittercowboy) — also runs a YouTube channel (youtube.com/tachesteaches) and ports work to OpenCode for community use.

## My assessment

This is the wiki's most direct primary source for **skill quality auditing** and **skills-for-building-skills**. The audit subagent pattern is generalizable: you can write your own auditor for any structural artifact (CLAUDE.md files, hook configs, agent definitions). Worth treating as the canonical reference for that pattern.

The `/consider:*` thinking-model commands are an under-appreciated pattern. Most "reasoning" approaches try to make the model think better implicitly; TÂCHES makes the user pick the lens explicitly. This is faster, more controllable, and surfaces assumptions about *which* lens applies — a side benefit for [[Reducing Hallucinations]].

Pair with [[Superpowers (obra)|Superpowers writing-skills]], [[Matt Pocock Skills|Matt Pocock's write-a-skill]], and [[Claude Code Infrastructure Showcase (diet103)|diet103's skill-developer]] for a complete view of meta-skill design across the ecosystem.

Cross-references: [[Skill Building]] · [[Skills]] · [[Subagents]] · [[Reducing Hallucinations]] · [[Ralph Wiggum Technique]] · [[Claude Code Ecosystem]]
