---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 2
tags: [claude-code, anthropic, skills, sessions, context-management]
source_url: https://github.com/shanraisshan/claude-code-best-practice/tree/main/tips
source_author: Thariq (Anthropic engineer), compiled by shanraisshan
---

# Thariq Anthropic Skills + Sessions

Two compiled tip docs from [[Thariq]], an Anthropic engineer who built Claude Code. **Authoritative on skill design (Anthropic uses hundreds internally) and on context/session management with the 1M-token model.**

Source documents:
- "Lessons from Building Claude Code: How We Use Skills" (17 Mar 2026)
- "Session Management & 1M Context" (16 Apr 2026)

## Part 1 — Skills (Mar 2026)

Anthropic uses hundreds of skills at scale internally. Thariq's lessons distill what they've learned. **The most authoritative skill-design source in the wiki.**

### The 9 skill categories
Skills naturally cluster into nine types:

1. Library & API Reference
2. Product Verification
3. Data Fetching & Analysis
4. Business Process & Team Automation
5. Code Scaffolding & Templates
6. Code Quality & Review
7. CI/CD & Deployment
8. Runbooks
9. Infrastructure Operations

**Best skills fit cleanly into one category.** Confusion comes from skills spanning multiple types.

### The 9 design principles

1. **Avoid stating obvious knowledge** — Claude already has substantial coding knowledge. The highest-value skills surface organizational-specific or counterintuitive information.

2. **Prioritize Gotchas sections** — Thariq calls these "the highest-signal content in any skill." They capture failure modes Claude encounters. Skills are *living documents*; add Claude's failure points over time.

3. **Leverage the file system** — A skill is a folder, not a file. Progressive disclosure through `references/`, `examples/`, `scripts/` subdirectories.

4. **Avoid over-specification** — Goals and constraints, not prescriptive step-by-step. Don't railroad Claude.

5. **Structure configuration thoughtfully** — `config.json` for skill-specific settings the agent can request dynamically.

6. **Write descriptions for the model, not humans** — The description is a *trigger specification*, not a summary. Crucial for activation.

7. **Enable memory and data persistence** — Skills can store data: append-only logs, JSON, SQLite. Use `${CLAUDE_PLUGIN_DATA}` for stable storage across upgrades.

8. **Provide reusable code and scripts** — Pre-built scripts let Claude focus on composition, not boilerplate reconstruction.

9. **Use on-demand hooks strategically** — Hooks activated only when a skill is called provide guardrails for destructive operations (`rm -rf`, `DROP TABLE`).

### Distribution and evolution
- Small teams: check skills into repos (`.claude/skills`)
- Large orgs: build plugin marketplaces
- Curation is organic — high-performing skills graduate from sandbox to marketplace via community validation
- **Skill composition** (skill→skill dependencies) isn't natively managed yet, but works through references Claude resolves at runtime

### Measurement
> "Use a `PreToolUse` hook to log skill usage patterns — reveals which skills are popular or undertriggering."

This makes skill quality *measurable*. Drives maintenance decisions.

### Frame
> "Skills are still early and we're all figuring out how to use them best."

Anthropic's recommendation is **iterative experimentation**, not theoretical perfection upfront. Start minimal, improve as usage reveals edges.

## Part 2 — Session Management & 1M Context (Apr 2026)

The 1M context window enables longer tasks (full-stack apps from scratch) but introduces "context rot" — performance degrades as attention spreads.

### Context rot thresholds
Performance degradation typically emerges around **300-400k tokens** on the 1M model, though task-dependent. The model is at its **least intelligent precisely when summarizing** (so autocompact often picks wrong things to drop).

### The 5 decision points after each Claude turn

| # | Action | When |
|---|---|---|
| 1 | **Continue** | Current context remains load-bearing |
| 2 | **Rewind** (double-Esc) | Wrong path taken; drop failed attempts, preserve learnings |
| 3 | **Compact** | Mid-task; momentum > precision; lossy summarization |
| 4 | **Fresh session** (`/clear`) | High-stakes next step; new task; user-written brief |
| 5 | **Subagent** | Conclusion-only needed; isolate verbose intermediates |

### The strategic rewind pattern
The strongest signal of effective context management. Rather than:

```
reads + 2 failed attempts + 2 corrections → cluttered context
```

Use rewind:

```
reads + 1 informed prompt + the fix → clean context
```

The retrying path drops entirely; only what was learned remains.

### Compact vs fresh-session
- **Compact** — low-effort, lossy. Mid-task, when bloat accumulates from debugging.
- **Fresh session** — high-effort, controlled. High-stakes next step; you write the brief.

### The bad-compact problem
Autocompact fires when context fills. But the model is **least intelligent at that moment** (context rot). It may drop something that becomes critical in the next message ("fix that other warning in `bar.ts`" — but the warning got summarized away).

**Fix**: proactive `/compact` with a directional hint *before* autocompact triggers.
```
/compact focus on the auth refactor, drop the test debugging
```

### Subagents as context garbage collection
> "Will I need this tool output again, or just the conclusion?"

If the latter → subagent. The exploration noise (file reads, greps, dead ends) stays in the subagent's context; only the synthesized conclusion returns.

This is the *operational* test for [[When to Delegate to Subagents|subagent delegation]].

## Implications for the wiki

Multiple existing pages should be updated:

- [[Skills]] — add Thariq's 9 categories and 9 design principles; add Gotchas section convention; add measurement-via-PreToolUse-hook pattern
- [[Skill Building]] — add the 9 categories framing; emphasize iteration over upfront perfection
- [[Memory]] — `${CLAUDE_PLUGIN_DATA}` for skill-side storage
- [[Token Efficiency]] — context rot zones (300-400k); proactive `/compact` with hint
- [[Context Engineering]] — the 5-decision-points pattern after each turn; subagent-as-garbage-collection test
- [[When to Delegate to Subagents]] — Thariq's "will I need this output again or just the conclusion?" test
- [[Checkpoints]] — strategic rewind > correct framing

## My assessment

These two documents are among the **most authoritative** sources in the wiki. Thariq's "skills are still early" humility is genuine — but his 9 categories + 9 principles are the closest thing to canonical skill-design guidance available.

The "least intelligent at compaction time" insight is non-obvious and significant. Most users let autocompact fire. Thariq's specific tactic — proactive `/compact` with a directional hint — is the right escape hatch.

For Alessandro: read both source docs in full when convenient. They're short and dense.

Cross-references: [[Thariq]] · [[Skills]] · [[Skill Building]] · [[Memory]] · [[Token Efficiency]] · [[Context Engineering]] · [[When to Delegate to Subagents]] · [[Checkpoints]] · [[shanraisshan Claude Code Best Practice]]
