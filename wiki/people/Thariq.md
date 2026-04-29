---
type: person
created: 2026-04-26
updated: 2026-04-26
sources: 2
tags: [people, anthropic, claude-code, engineer]
---

# Thariq

Anthropic engineer who built parts of Claude Code. Public voice on **how Anthropic uses skills internally** and on **session/context management with the 1M context window**. Authoritative on both topics.

For our wiki, Thariq's documents are foundational primary sources. Now four articles ingested:

- "Lessons from Building Claude Code: How We Use Skills" (17 Mar 2026) — see [[Thariq Anthropic Skills + Sessions]]
- "Session Management & 1M Context" (16 Apr 2026) — see [[Thariq Anthropic Skills + Sessions]]
- **"Seeing like an Agent"** (28 Feb 2026) — see [[Thariq - Seeing like an Agent]] — tool design philosophy
- **"Prompt Caching Is Everything"** (20 Feb 2026) — see [[Thariq - Prompt Caching Is Everything]] — architectural rationale for the entire harness

## Distinctive contributions

### Tool design philosophy ([[Thariq - Seeing like an Agent]])
- **"See like an agent"** — design tools shaped to model abilities, not user intuition
- **Math-problem analogy** for tool selection (paper/calculator/computer based on what the operator can use)
- **Model affinity matters** — "even the best designed tool doesn't work if Claude doesn't understand how to call it"
- **Tools-evolve-with-capabilities** — Tasks replaced TodoWrite as models outgrew need for hand-holding
- **Add to action space without adding tools** — use subagents, skills, progressive disclosure
- **Bar to add a new tool is high** — each one is more for the model to consider

### Prompt caching as architectural foundation ([[Thariq - Prompt Caching Is Everything]])
- **"Long running agentic products like Claude Code are made feasible by prompt caching"**
- Prompt layout: static → dynamic (CLAUDE.md cached per project; tools cached globally; conversation last)
- **`<system-reminder>` pattern** = cache-preservation mechanism, not cosmetic
- **Don't change tools/models mid-session** — breaks cache for whole conversation
- **EnterPlanMode/ExitPlanMode as tools** (not config changes) preserves cache
- **`defer_loading`** for MCP tool stubs — keep prefix stable, load full schemas on demand
- **Cache-safe forking** for compaction (use exact same prefix as parent)

### The 9 skill categories ([[Skill Building|skill-building canon]])
Skills naturally cluster into 9 types: Library & API Reference, Product Verification, Data Fetching & Analysis, Business Process & Team Automation, Code Scaffolding & Templates, Code Quality & Review, CI/CD & Deployment, Runbooks, Infrastructure Operations.

**Best skills fit cleanly into one category.** Confusion comes from skills spanning types.

### The 9 skill design principles
The most authoritative skill design guidance available. See [[Skills]] page for full detail. Highlights:
- "Don't state obvious knowledge"
- "Prioritize Gotchas sections — highest-signal content"
- "Write descriptions for the model, not humans" (trigger spec, not summary)
- "Don't railroad Claude" (goals + constraints, not prescriptive steps)
- "Skills are still early — iterative experimentation, not theoretical perfection"

### Context rot zones
> "Performance degradation typically emerges around 300-400k tokens" on the 1M model.

Defines the operational thresholds: dumb zone at ~40% context for newcomers; experienced users keep below 30%, push to 60% only on simple tasks. Material for [[Token Efficiency]].

### The 5 decision points after each Claude turn
| # | Action | When |
|---|---|---|
| 1 | Continue | Context still load-bearing |
| 2 | Rewind (double-Esc) | Wrong path; preserve learnings |
| 3 | Compact | Mid-task; bloat from debugging |
| 4 | Fresh session (`/clear`) | High-stakes next step; new task |
| 5 | Subagent | Conclusion-only needed |

This decision framework is now load-bearing for [[Context Engineering]] and [[When to Delegate to Subagents]].

### "The model is at its least intelligent point when summarizing"
Critical insight: autocompact fires when context fills, but the model's summarization quality degrades exactly when it needs to make summarization choices. Tactic: **proactive `/compact` with directional hint** before autocompact triggers.

```text
/compact focus on the auth refactor, drop the test debugging
```

### Strategic rewind
Rather than correcting failed attempts (leaving "reads + 2 fails + 2 corrections" in context), rewind: "reads + 1 informed prompt + the fix". Cleaner archaeology. The rewind drops the failed path; the new prompt incorporates what was learned.

## Public presence

- X: [@trq212](https://x.com/trq212)
- Articles cited: "Seeing like an Agent — lessons from building Claude Code"; "Lessons from Building Claude Code: Prompt Caching Is Everything"

## My assessment

Thariq's role is uniquely valuable because he's an engineer **who built the system writing about how to use it**. Where [[Boris Cherny]] writes about Claude Code from the creator's perspective, Thariq writes from the engineer's perspective on specific subsystems (skills, sessions, prompt caching).

The "skills are still early" humility is genuine and worth taking seriously — Anthropic hasn't solved skill design once and for all. Iterative experimentation, started minimal, improved with usage.

For Alessandro's focus areas:
- Read both Thariq docs in full when convenient. Short and dense.
- Adopt the 5 decision points as a session-management discipline.
- Use the 9 skill categories as a check when designing skills (does mine fit one category?).
- Adopt the proactive-`/compact`-with-hint tactic to avoid bad autocompact.

## Cross-references

- [[Thariq Anthropic Skills + Sessions]] (the consolidated source page)
- [[Skills]] · [[Skill Building]] · [[Memory]]
- [[Token Efficiency]] · [[Context Engineering]] · [[When to Delegate to Subagents]]
- [[Checkpoints]] (rewind > correct)
- Source: [[shanraisshan Claude Code Best Practice]] (where Thariq's articles are compiled)
