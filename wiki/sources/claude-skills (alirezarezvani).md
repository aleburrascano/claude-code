---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 1
tags: [skill, skill-collection, role-based, persona-driven, cross-platform]
source_path: (no raw — discovered via hyperlink in raw/repos/davila7-claude-code-templates.md)
source_date: 2026-04-27
source_author: Alireza Rezvani
source_url: https://github.com/alirezarezvani/claude-skills
license: MIT
---

# claude-skills (alirezarezvani)

Discovered via the attribution section of [[Claude Code Templates (Daniel Avila)]] (which cited "36 professional role skills" — **the cited count is stale; the repo now ships 235+ skills across 9 domains**, with 13k+ stars).

## Why it matters for the wiki

This is the single largest **professional role-based** skill collection seen so far. It widens the skill-collection landscape beyond engineering-focused repos like [[Matt Pocock Skills]] (18, eng-focused) and [[Superpowers (obra)]] (composable engineering workflows) into:

- **C-Level Advisory** (34 skills) — Startup CTO, executive coaching, board prep
- **Marketing** (44 skills)
- **Regulatory & QM** (14 skills)
- **Project Management** (9 skills)
- **Product** (16 skills)
- **Engineering** (37 core + 45 "POWERFUL-tier")
- **Playwright Pro, Self-Improving Agent, Business & Growth, Finance**

For [[Skill Building]] the relevant signal: skills are not just developer-facing primitives. The category boundary "engineering" vs "business" dissolves once you see persona-driven skill bundles like "Solo Founder" and "Growth Marketer."

## Distinctive design decisions

**Persona-driven**: Pre-configured agent identities (Startup CTO, Growth Marketer, Solo Founder) come with **curated skill loadouts** — multi-skill bundles aimed at a role rather than a task. Adds a "persona" layer on top of the [[Skills|Anthropic skill primitive]].

**Security-first**: A dedicated **security-auditor skill for vetting other skills before installation**. Explicitly addresses the install-and-forget bloat problem that [[CodeBurn (AgentSeal)|CodeBurn]] flags via `optimize`.

**Cross-platform via `convert.sh`**: Single source converts to 12 tools (Claude Code, Cursor, Aider, Windsurf, etc.) — same portability bet as [[graphify (safishamsi)|graphify]] and [[Trail of Bits Security Skills]] but at collection scale.

**Python-first tooling**: 305 CLI scripts, **stdlib-only, zero external dependencies**. Skills can ship CLI helpers without a dependency surface. Worth noting in [[Skills]] design guidance.

**Orchestration protocol**: Multi-persona workflows where complex work is sequential domain handoffs — adjacent to [[Subagents]] but tracked as skill orchestration rather than agent fan-out.

## Structure (per skill)

```
SKILL.md          # frontmatter + structured instructions
scripts/          # optional CLI tools (stdlib-only)
references/       # templates, checklists, domain knowledge
assets/           # supporting materials
```

Domain folders organize by functional area (`engineering/`, `marketing-skill/`, `c-level-advisor/`).

## Install paths

- **Claude Code**: `/plugin install <name>@claude-code-skills`
- **Gemini CLI**: `./scripts/gemini-install.sh`
- **Multi-tool**: `./scripts/convert.sh --tool all`

Skills bundle by domain (e.g. "engineering-advanced-skills") rather than individually — different from the Anthropic-style one-skill-per-install model.

## Cross-references

- [[Skill Building]] — persona-driven bundles + security-auditor skill = collection-scale skill engineering
- [[Skills]] — the role-based / business-skill expansion of the primitive's scope
- [[Claude Code Templates (Daniel Avila)]] — attribution source (with the now-stale "36 skills" count)
- [[CodeBurn (AgentSeal)]] — `optimize`'s ghost-skill detection becomes essential at this scale
- [[Claude Code Ecosystem]] — skill-collections subsection
