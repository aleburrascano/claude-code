---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 4
tags: [pattern, learning, instincts, skills, memory]
---

# Continuous Learning

A pattern for **automatically extracting reusable knowledge from sessions** — typically as instincts, skills, or memory entries — so that future sessions inherit what was learned without manual effort.

Distinct from [[Memory|always-loaded CLAUDE.md memory]] (where you write what should always apply) and from [[Compound Engineering|Compound Engineering's `/ce-compound`]] (which captures lessons at cycle level). Continuous Learning operates at the *session* level: while you work, patterns are extracted and saved for next time.

## Implementations across the wiki

### [[Everything Claude Code (affaan-m)|ECC's instinct system]] — the canonical implementation
Auto-extracts patterns from sessions into reusable artifacts called **instincts** with **confidence scoring**:

- `/instinct-status` — view learned instincts with confidence scores
- `/instinct-import <file>` — import instincts shared by others
- `/instinct-export` — export your instincts for sharing
- `/evolve` — cluster related instincts into skills
- `/prune` — delete expired pending instincts
- `/skill-create` — analyze git history to generate SKILL.md

The novel contributions: **confidence scoring** (not all observations are equally trustworthy) + **cluster-into-skills evolution** (many low-confidence instincts → one well-formed skill).

### [[TACHES Claude Code Resources|TÂCHES `/heal-skill`]]
Analyzes execution failures and updates the skill based on what actually worked. Continuous learning at the **skill-definition layer** — the skill itself improves.

### [[Boris Cherny Tips Compendium|Boris's "spaced-repetition skills"]]
Skills that identify knowledge gaps via follow-up questions. Continuous learning for **the human**, not the agent.

### Anthropic's [[Memory|Auto Memory]]
Built-in: Claude writes notes about your project (build commands, debugging insights, preferences) to `~/.claude/projects/<project>/memory/MEMORY.md` based on what's worth remembering. **First 200 lines (or 25KB) loaded into every session.**

This is the most accessible implementation — built into Claude Code itself (v2.1.59+), no plugin needed.

## The continuum: where learning lives

| Layer | What changes | Loaded when |
|---|---|---|
| **Conversation** | Chat-only insights | Within session only |
| **Auto Memory** | Claude's notes | Every session (top 200 lines) |
| **CLAUDE.md** | Your written rules | Every session, in full |
| **Skill instincts** (affaan-m) | Per-pattern observations with confidence | When invoked or evolved |
| **Skill definitions** (TÂCHES heal) | The skill itself | When skill activates |
| **Architectural decisions** | Documented in `docs/adr/` | When relevant |
| **Compound Engineering** (`/ce-compound`) | Cycle-level lessons | Per project artifact |

Each layer has different decay characteristics, different cost, different review burden. Mature setups use multiple layers strategically.

## Key design patterns

### Confidence scoring (ECC)
Not all observations are equally reliable. A pattern observed once is hypothesis; observed 10 times is evidence. ECC scores instincts so low-confidence ones can be pruned without losing high-confidence ones.

### Append-only logs vs structured data
ECC uses both. Append-only logs preserve raw observations. Structured data (JSON/SQLite) supports queries and clustering. Per [[Thariq Anthropic Skills + Sessions|Thariq]]: skills can store data using `${CLAUDE_PLUGIN_DATA}` for stable storage across upgrades.

### Cluster-then-promote
ECC's `/evolve` clusters related instincts into proper skills. Pattern: gather many small observations cheaply → identify clusters → invest in well-formed skill only when pattern is proven.

### Periodic pruning
Knowledge decays. Stale instincts mislead. ECC's `/prune` and the general principle of [[Memory|memory-as-claims-not-logs]] both apply: lessons that no longer hold should be removed, not buried.

## Why this matters for our wiki

For Alessandro's stated focus areas:

- **Skill building** — instinct-based learning auto-generates skills based on real usage. Better than designing skills upfront.
- **Reducing hallucinations** — skills that incorporate observed failure modes pre-empt those failures. Direct mechanism: each previously-encountered hallucination becomes a guard.
- **Token efficiency** — cheaper to capture lessons once than re-derive them every session. Auto Memory is essentially free (Claude writes during normal operation); skills generated from instincts pay for themselves quickly.

## Anti-patterns

- **Capturing without consuming** — if `/instinct-status` is never reviewed, instincts pile up but don't help. Set a periodic review cadence.
- **No confidence weighting** — treating one-time observations as facts. Risks calcifying coincidences.
- **Skills that don't evolve** — the skill from 6 months ago may have been right then but not now. `/heal-skill` and similar mechanisms address this; without them, skills decay.
- **Memory of the wrong things** — auto-capturing every detail (per [[claude-mem (thedotmack)|claude-mem]] without `<private>` tags) can store sensitive info. Selective capture matters.

## What continuous learning is *not*

- Not [[Memory|always-loaded memory]] — that's for *always-true* facts.
- Not [[Compound Engineering]] — that's *cycle-level* lessons (one feature, one PR, one week).
- Not chat history — that evaporates per session.
- Not [[Reducing Hallucinations|reasoning improvements]] — those are structural, not learned.

## Cross-references

- [[Memory]] (Anthropic's Auto Memory is the most accessible implementation)
- [[Skills]] · [[Skill Building]]
- [[Compound Engineering]] (cycle-level analog)
- [[claude-mem (thedotmack)]] (general session capture, not skills-focused)
- Sources: [[Everything Claude Code (affaan-m)]] · [[TACHES Claude Code Resources]] · [[Boris Cherny Tips Compendium]] · Anthropic Memory docs
