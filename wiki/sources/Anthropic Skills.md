---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 1
tags: [skill, anthropic-official, canonical-examples, document-skills, agent-skills-spec]
source_path: (no raw — discovered via hyperlink in raw/repos/davila7-claude-code-templates.md)
source_date: 2026-04-27
source_author: Anthropic
source_url: https://github.com/anthropics/skills
license: Apache 2.0 (most skills) / source-available (document skills)
---

# Anthropic Skills

The **official Anthropic skills repository**: 125k stars, 14.6k forks, the canonical reference implementations for the [[Skills|Agent Skills system]]. Discovered via attribution in [[Claude Code Templates (Daniel Avila)]] which cited 21 skills.

## Why it matters for the wiki

Three reasons to track this distinctly:

1. **Production reference** — the `docx`, `pdf`, `pptx`, `xlsx` skills *power Claude's native document capabilities*. Looking at their internals is looking at the actual Claude product.
2. **Specification anchor** — implementation follows the **[Agent Skills specification at agentskills.io](http://agentskills.io)**. This is the spec other collections (incl. [[claude-scientific-skills (K-Dense-AI)]]) target for cross-platform compatibility.
3. **Mixed licensing pattern** — most skills Apache 2.0; document skills are **source-available, not open source** (production reference, not redistribution-friendly). Worth noting because the open-source assumption is so strong in the rest of the ecosystem.

## Skill categories

1. **Creative & Design** — art, music, design
2. **Development & Technical** — testing web apps, MCP server generation
3. **Enterprise & Communication** — communications, branding
4. **Document Skills** — DOCX, PDF, PPTX, XLSX manipulation (source-available)

## Canonical structure

```
skills/
├── skill-name/
│   └── SKILL.md   (YAML frontmatter + instructions)
```

Frontmatter spec (the canonical form referenced everywhere):

```yaml
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

# My Skill Name

[Instructions, examples, guidelines follow]
```

This is the **reference SKILL.md format** — every other skill collection in the wiki is implicitly imitating it.

## Install paths

### Claude Code
```
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

### Claude.ai (paid plans)
Upload custom skills via UI.

### Claude API
Via the [Skills API Quickstart](https://docs.claude.com/en/api/skills-guide).

## Important disclaimer

> "These skills are provided for demonstration and educational purposes only. While some of these capabilities may be available in Claude, the implementations and behaviors you receive from Claude may differ from what is shown in these skills."

In other words: the production document skills *power* Claude, but the open repo's version is reference-quality, not necessarily byte-identical to what runs in production. **A genuine source of confusion** — the wiki should call this out when readers ask "is this what Claude is actually running?"

## Cross-references

- [[Skills]] — the canonical reference implementation; SKILL.md frontmatter format originates here
- [[Skill Building]] — design references; document skills are the most studied production examples
- [[Plugins]] — `@anthropic-agent-skills` marketplace
- [[Anthropic Claude Code]] — sister official repo (configs/plugins for the CLI itself)
- [[Claude Code Templates (Daniel Avila)]] — distributes a subset
- [[claude-scientific-skills (K-Dense-AI)]] — also targets `agentskills.io`, demonstrating non-Anthropic adoption of the spec

## Open questions

> [!question] Production-vs-public divergence
> The disclaimer "implementations may differ from what is shown" is the tightest concession Anthropic has made about the relationship between published reference skills and actual product behavior. Worth checking if document-skills internals (e.g. PDF parsing strategy) match what users observe in production Claude.
