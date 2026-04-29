---
type: person
created: 2026-04-26
updated: 2026-04-26
sources: 7
tags: [people, anthropic, claude-code, creator]
---

# Boris Cherny

Anthropic engineer; **creator of [[Claude Code]]**. Public voice on how Claude Code is meant to be used. Most authoritative single source on intent.

For our wiki, Boris is the canonical "creator's intent" reference. When wiki content conflicts with his stated guidance, the wiki is wrong.

## Public guidance

Boris has shared seven major tweet threads (compiled by [[shanraisshan Claude Code Best Practice|shanraisshan]] into a consolidated source page: [[Boris Cherny Tips Compendium]]):

| Date | Topic |
|---|---|
| 3 Jan 2026 | "How I use Claude Code — 13 tips from my surprisingly vanilla setup" |
| 1 Feb 2026 | 10 tips for using Claude Code from the team |
| 12 Feb 2026 | 12 ways people are customizing their claudes |
| 10 Mar 2026 | Code Review & Test Time Compute (2 tips) |
| 25 Mar 2026 | Squash Merging & PR Size Distribution (2 tips) |
| 30 Mar 2026 | 15 hidden & under-utilized features |
| 16 Apr 2026 | 6 tips for getting more out of Opus 4.7 |

Plus video appearances on Lenny's Podcast, Y Combinator, The Pragmatic Engineer, Ryan Peterman, etc.

## Recurring themes

Three architectural principles repeat across Boris's guidance:

### 1. Verification loops over prompt perfection
> "This feedback mechanism amplifies quality by 2-3x."

The single highest-leverage discipline. Don't try to make Claude perfect on first try — give it a way to *check itself*. Foundational for [[Reducing Hallucinations]] and [[Verification Loops]].

### 2. Distributed / parallel compute
Multiple Claude instances simultaneously: terminal parallelism, web parallelism, [[Subagents]], git worktrees, `/batch` for parallel changesets. **Many independent tasks beat one giant task.** See [[Test Time Compute]].

### 3. Context engineering through accumulated artifacts
[[Memory|CLAUDE.md]], [[Slash Commands]], [[Subagents|specialized subagents]] compound team knowledge. Boris coined "**compounding engineering**" — institutional memory at the tooling layer. Tag Claude on PRs → CLAUDE.md updates → next session benefits.

## Specific framing contributions

### Test Time Compute
> "The more tokens you throw at a coding problem, the better the result."

Specifically, **separate context windows beat single agents** even with the same model. Reframes [[Subagents]] as cognitive diversity engines, not just cost optimization. See [[Test Time Compute]].

### Compounding Engineering
> Team-level practice where shared CLAUDE.md + GitHub-Claude integration + slash commands accumulate institutional knowledge over time.

Distinct from [[Compound Engineering]] (EveryInc's mechanism for cycle-level lesson capture) but related in spirit. Both about each unit of work making the next easier.

### "Surprisingly vanilla setup"
The framing that Boris's setup is "vanilla" is itself a tip — the tool is well-designed enough that exotic customization isn't needed. Customizations should ride within intentional extension points (hooks, MCP, agents), not work around the tool. Aligned with [[12 Factor Agents (HumanLayer)|12 Factor Agents]] principle that "good agents are mostly software."

### Vanilla = Opus + thinking on everything
Boris uses Claude Opus + Extended Thinking universally. Computationally heavier but requires less steering. Faster overall than smaller models that demand more correction. (Updated for Opus 4.7 with adaptive thinking effort levels.)

### Plan mode first
Begin sessions in [[Planning Mode]] (Shift+Tab twice). Iterate on strategy before switching to auto-accept. Quality planning enables single-shot execution.

### Verification loops as feedback architecture
For autonomous Opus 4.7 work, Boris uses `/go` skill ritual: (1) test E2E (2) run `/simplify` (3) put up PR. Verification is baked into "task complete."

## Key opinions to know

- **Squash merge religiously.** Each PR = one atomic commit. Enables clean revert + bisect.
- **Small PRs.** Boris's own median: 118 lines. 90% under 500. Discipline at scale.
- **Permission allowlists, not `--dangerously-skip-permissions`.** Use [[Auto Mode]] when available.
- **`/sandbox` for permission-prompt reduction.** Reports 84% reduction internally.
- **Agentic search > RAG for code.** "Code drifts out of sync; permissions are complex." See [[Agentic Search vs RAG]].
- **`<important if="...">` tags** to keep CLAUDE.md rules from being ignored.
- **"Always start with plan mode"** for non-trivial work.

## Patterns directly traceable to Boris

- [[Verification Loops]] (Boris's "verification loops 2-3x quality" insight)
- [[Test Time Compute]] (Boris's March 10 insight)
- [[Auto Mode]] (Boris recommends for Opus 4.7 parallel work)
- [[Agentic Search vs RAG]] (Boris's claim is canonical for the wiki)
- [[Compound Engineering]] (related but EveryInc's mechanism)
- [[Memory|"compounding engineering"]] framing
- [[Token Efficiency]] (model selection, fewer permission prompts, parallel work)
- [[Planning Mode]] (always start there for non-trivial)

## Quotes worth saving

> "The model has reached a point where I generally trust it to run the right commands and make the right edits."

> "Provide Claude mechanisms to verify its own output. This feedback mechanism amplifies quality by 2-3x."

> "Use auto mode instead of dangerously-skip-permissions."

> "Agents will probably write perfect bug-free code — until then, multiple uncorrelated context windows tends to be a good approach."

> "Agentic search (glob + grep) beats RAG. Claude Code tried and discarded vector databases because code drifts out of sync."

## Cross-references

- [[Boris Cherny Tips Compendium]] (the 7 compiled tip docs)
- [[Claude Code]] · [[Memory]] · [[Subagents]] · [[Planning Mode]] · [[Hooks]]
- [[Auto Mode]] · [[Verification Loops]] · [[Test Time Compute]] · [[Agentic Search vs RAG]]
- [[Getting the Most from Claude Code]] · [[Reducing Hallucinations]]
- Source: [[shanraisshan Claude Code Best Practice]] (where Boris's tweet threads are compiled)
