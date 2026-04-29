---
type: topic
created: 2026-04-29
updated: 2026-04-29
sources: 5
tags: [topic, focus, cost, observability, measurement, token-efficiency, optimization]
---

# Cost Observability Playbook

Measurement → diagnosis → optimization for Claude Code spend. The other [[Token Efficiency|token-efficiency]] layers (prompt caching, AST graphs, sandboxing, tool-output filtering, memory compression) need a feedback signal to know if they're working. This page is that signal.

> "You can't optimize what you don't measure." — the wiki's framing of [[Token Efficiency#The framing layer 0 + five compression layers|layer 0]].

---

## TL;DR — what to do

1. **Install [[ccusage (ryoppippi)]]** for at-a-glance daily/session cost. (5 minutes; lifelong value.)
2. **Run [[CodeBurn (AgentSeal)]] `optimize`** weekly to surface bloat patterns with copy-paste fixes.
3. **Track cache hit rate** — Anthropic's API response `usage.cache_read_input_tokens / usage.input_tokens`. Should be >60-80% on long sessions (per [[Thariq - Prompt Caching Is Everything]], they alert below this).
4. **Measure one-shot rate** ([[CodeBurn (AgentSeal)|CodeBurn]]'s metric) per task category. Improving hallucination defenses ([[Reducing Hallucinations]]) should move this number; if it doesn't, your defenses aren't catching what you thought.
5. **For agent harnesses**: build cache hit rate dashboarding from day one. Treat dips as incidents.

---

## Why observability is layer 0

Per [[Token Efficiency]]: five compression layers compound, but **without measurement they're guesswork**. CodeBurn's "patterns to look for" diagnostic table maps observed signals to which compression layer to engage:

| Signal | Likely layer to engage |
|---|---|
| Cache hit rate < 80% | Layer 1: [[Prompt Caching]] — prefix instability |
| Many `Read` calls re-reading same files | Layer 5: [[claude-mem (thedotmack)|memory compression]] |
| Low one-shot rate on edits | [[Reducing Hallucinations|hallucination defenses]] |
| Bash dominated by `git status`, `ls` | Layer 4: [[rtk (rtk-ai)|tool-output filtering]] |
| No MCP usage | Audit MCP config; consider [[Anthropic Tool Search|deferred tools]] or AST-graph servers |
| Bloated CLAUDE.md | [[Memory|200-line target]]; move conditional content to skills/hooks |

Without these signals, you might engage the wrong layer or none at all. Measurement *names the problem* so the fix is targeted.

---

## The two canonical tools

The category has matured. Two tools cover the bulk of needs:

### [[ccusage (ryoppippi)]] — the originator (13.5k stars)

Lightweight CLI + statusline. Daily/monthly/session/blocks reports. Multi-provider sibling packages (`@ccusage/codex`, `@ccusage/opencode`, `@ccusage/pi`, `@ccusage/amp`, `@ccusage/mcp`).

**Use for**: "what did today cost?" at a glance. `ccusage daily`, `ccusage session`, statusline integration so cost is always visible.

**Strengths**: zero-config; fast; reads from disk (no API keys); MIT license; well-maintained.

**Limits**: surface-level — tells you *what* you spent, not *where the bloat is*.

### [[CodeBurn (AgentSeal)]] — the diagnostic layer

TUI dashboard + native macOS menubar app + CLI. Multi-provider with `--provider`. Reads from disk (no API keys, no proxy).

**Use for**: "*where* am I wasting tokens, and how do I fix it?"

**Three signature features**:
- **`codeburn optimize`** — copy-paste fixes for re-reads, ghost skills, bloated CLAUDE.md, unused MCPs, cache-creation overhead
- **Compare mode** — model A/B from your real session data ("Sonnet better at refactoring on your code, Opus better at debugging")
- **Yield mode** — productive vs reverted/abandoned spend, correlated with git commits

**Strengths**: actionable. The optimize report says exactly what to change.

**Limits**: macOS-first for the menubar; some heuristics (e.g., AI-flavoured-commit detection) have noise floors documented in the source page.

---

## What to measure

Five metrics, in roughly increasing sophistication:

### 1. Total cost (the basics)
**Per session**, **per day**, **per week**. ccusage handles all three. If you don't have this, you're flying blind.

### 2. Cache hit rate (the leading indicator)
Per [[Prompt Caching|Thariq]]: *"We alert on cache breaks and treat them as incidents."*

Computed: `usage.cache_read_input_tokens / (usage.cache_read_input_tokens + usage.input_tokens)` per turn.

**The math that makes this load-bearing**: per [[Lance Martin - Prompt auto-caching with Claude]], cached input tokens cost **10% of non-cached** input tokens. A 10× cost differential. This is why a 60% cache hit rate isn't "good enough" — at 60% hit, you're paying full price on 40% of input every turn. At 90% hit, your effective input cost drops by ~9× vs no caching.

Targets:
- New sessions (first few turns): low — cache is being built
- Steady-state sessions: **>60%** is acceptable; **>80%** is good; **>90%** is the goal
- Long sessions: should *increase* over time as more prefix becomes cacheable
- **If hit rate is low or dropping**: prefix is being invalidated. Hunt the cache-breaking change ([[Prompt Caching#Cache-breaking mistakes (often invisible)]]).

### 3. Cost per task / per feature
Aggregate cost across turns for a given task. Lets you compare:
- **Same task, different approach**: did Spec-Driven Dev cost less than vibe-coding?
- **Same task, different model**: did Opus or Sonnet ship for less total spend?
- **Cost per shipped PR / feature**: the unit-economic number that matters

CodeBurn's Yield mode approaches this by correlating spend with git activity.

### 4. One-shot rate per task category
[[CodeBurn (AgentSeal)|CodeBurn]]'s signature metric. Detects edit/test/fix retry patterns (`Edit → Bash → Edit`) and reports the percentage of edits that succeeded **without retries**.

Per-category breakdown (Coding 90%, Debugging 60%, Refactoring 75%, etc.) tells you *where hallucinations cluster* on your workload. Improving [[Reducing Hallucinations|hallucination defenses]] should move this number; if it doesn't, your defenses aren't catching what you thought they were.

### 5. Ghost skills / unused MCP / re-read patterns
Sub-metrics CodeBurn surfaces in `optimize`:
- **Ghost skills**: skills defined in `~/.claude/` but never invoked. Pure overhead in every session. Delete or move to plugin install.
- **Unused MCP servers**: connected but never called. Tool-schema overhead every turn. Disable.
- **Re-read patterns**: same file Read multiple times in one session. Indicates cache miss or memory-compression opportunity.
- **Bloated CLAUDE.md**: with `@-import` expansion accounted for; surfaces files over the 200-line target.

---

## The diagnostic loop

```
1. Baseline: capture current daily/session cost (ccusage daily, ccusage session)
2. Diagnose: codeburn optimize → review the patterns table
3. Fix one thing at a time:
   - Cache hit rate low? → investigate prefix instability (timestamps in system prompt, plugin install/uninstall)
   - Re-reads high? → install [[claude-mem (thedotmack)|claude-mem]] or use Read with offset/limit
   - Bash dominates? → install [[rtk (rtk-ai)|rtk]]
   - Bloated CLAUDE.md? → trim or move to skills/hooks
4. Re-measure: did the fix move the needle?
5. Loop: pick the next biggest signal
```

This is the same single-fix-at-a-time loop that works in any optimization domain — premature simultaneous changes obscure which fix actually helped.

---

## Adjacent and specialized tools

The wiki tracks the rest of the category in [[Claude Code Ecosystem]] under "Cost / token observability." Brief notes:

- **ccflare / better-ccflare** — web dashboard, comprehensive metrics. Heavier than ccusage; lighter than full APM.
- **ccxray** (lis186) — HTTP proxy + real-time dashboard; captures every request/response. Best for serious profiling — when you need every byte traced.
- **Claude Code Usage Monitor** — real-time terminal monitor with burn rate. Good for "watch the meter while a long task runs."
- **Claudex** (Kunwar Shah) — web-based session browser with full-text search. Good for forensic — "what did I spend on the auth refactor last Tuesday?"
- **`rtk gain` / `rtk discover`** — built-in per-command savings analytics for [[rtk (rtk-ai)|RTK]]. Scoped to RTK's own filtering, not full session.
- **Claude Code Templates `--analytics` / `--health-check`** — shipped as part of [[Claude Code Templates (Daniel Avila)]].

---

## Cost-quality framing (the deeper question)

Cost minimization in isolation is the wrong framing. Per [[Test Time Compute]]:

| Wrong frame | Better frame |
|---|---|
| "How few tokens can I use?" | "How many tokens does shipped quality require?" |
| "One smart agent" | "N agents whose errors decorrelate" |
| "Optimize prompt for accuracy" | "Sample multiple completions; aggregate" |

The cheapest token is the one you don't have to retry. Multi-agent review prevents the retry — net token cost may be *lower*, not higher, even though raw turn count is higher. CodeBurn's Yield mode captures this: the metric that matters is *cost per shipped quality unit*, not raw spend.

---

## Anti-patterns

- **No measurement at all.** Most users adopt techniques and never check if they help. Without baseline → fix → re-measure, you're cargo-culting.
- **Watching only total spend.** Total goes up if you're shipping more (good) or wasting more (bad). Without unit economics, you can't tell.
- **Fixing symptoms instead of cache stability.** Half the "this is expensive" diagnoses turn out to be cache invalidation issues; fix the cache instead of the surface.
- **Trusting CodeBurn's heuristics blindly.** AI-flavored-commit detection has a documented noise floor; Yield mode's revert detection isn't ground truth. Use as starting points, not verdicts.
- **Across-provider comparisons via Copilot output-only data.** Per CodeBurn docs: Copilot only logs output tokens; comparison is asymmetric until they log input. Don't compare CodeBurn cost across providers directly.
- **Premature optimization on small projects.** If your monthly Claude bill is $20, you don't need this playbook. Comes into play at the scale where prompt-caching SEVs would matter.

---

## Reading paths

For *daily-cost awareness*:
1. Install [[ccusage (ryoppippi)]] (`bun add -g @ccusage/cli` or equivalent)
2. Add to statusline (instructions in source page)
3. Glance at it daily; intervene only when surprised

For *deep optimization*:
1. Run [[CodeBurn (AgentSeal)|`codeburn optimize`]] on your last week of sessions
2. Pick the biggest signal from the patterns table
3. Apply the corresponding fix from [[Token Efficiency]]
4. Re-run optimize a week later; compare

For *agent harness builders*:
1. Implement cache hit rate dashboarding (use Anthropic's `usage.cache_*` fields)
2. Alert on cache hit rate < threshold
3. Track per-feature token cost; correlate with git/PR data
4. Yield mode (productive vs abandoned) is the validation that token-efficiency work is paying out

---

## Cross-references

- [[Token Efficiency]] (cost observability is layer 0; the five compression layers are the fix-actions)
- [[Prompt Caching]] (cache hit rate = the leading indicator)
- [[Reducing Hallucinations]] (one-shot rate validates hallucination defenses)
- [[Memory]] (CLAUDE.md bloat is one of the patterns to look for)
- [[Skills]] (ghost-skill detection)
- [[Model Context Protocol]] (unused-MCP detection)
- Sources: [[ccusage (ryoppippi)]] (originator + multi-provider lineage) · [[CodeBurn (AgentSeal)]] (`optimize` + Compare + Yield) · [[Thariq - Prompt Caching Is Everything]] (cache hit rate as alert metric) · [[rtk (rtk-ai)]] (built-in `rtk gain`) · [[Claude Code Templates (Daniel Avila)]] (`--analytics`)
