---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, api-docs, extended-thinking, reasoning, adaptive-thinking]
source_path: (no raw)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://platform.claude.com/docs/en/build-with-claude/extended-thinking
---

# Anthropic Extended Thinking API

The API surface behind [[Extended Thinking]] (the Claude Code primitive). Two important shifts the wiki didn't have before:

1. **Adaptive thinking has replaced manual `budget_tokens` on Opus 4.7+.** Manual `type: "enabled"` returns 400.
2. **Thinking parameter changes invalidate the messages cache** (system cache preserved). This is the precise [[Anthropic Tool Use with Prompt Caching|cache invalidation rule]].

## What it does

Creates `thinking` content blocks containing internal step-by-step reasoning before the final answer. Provides transparency into the model's thought process.

**You're charged for full thinking tokens** (not summaries). Latency increases; quality improves on complex problems.

## The two API shapes

### Adaptive thinking (Opus 4.7+, Opus 4.6, Sonnet 4.6, Haiku 4.5)

```python
thinking={"type": "adaptive"}
# Optional effort parameter for fine control
```

The model decides budget. **Required on Opus 4.7+**; manual returns 400.

### Manual / `budget_tokens` (Sonnet 3.7, earlier Claude 4 models)

```python
thinking={"type": "enabled", "budget_tokens": 10000}
```

Deprecated on Opus 4.6+ (still functional). Budget must be < `max_tokens`. Claude may not use the entire budget, especially above 32k.

## Per-model support matrix

| Model | Manual extended thinking | Adaptive thinking |
|---|---|---|
| Opus 4.7+ | **400 error** (not supported) | Required |
| Opus 4.6 | Deprecated but functional | Recommended |
| Sonnet 4.6 | Deprecated but functional | Recommended |
| Sonnet 3.7 | Supported | — |
| Earlier Claude 4 | Supported | — |
| Haiku 4.5 | — | Supported |

## Tool use integration

Constraints when combining extended thinking with tool use:

- **Only `tool_choice: "auto"` (default) or `"none"` supported.** `"any"` and forced-specific are NOT.
- **Thinking blocks must be preserved** when passing tool results back. The next request must include the prior thinking block in the assistant message:
  ```python
  messages = [
      {"role": "user", "content": "..."},
      {"role": "assistant", "content": [thinking_block, tool_use_block]},  # MUST include thinking_block
      {"role": "user", "content": [{"type": "tool_result", ...}]},
  ]
  ```

### Interleaved thinking

With interleaved, Claude reasons *between tool calls*. Critical for multi-step tool sequences where intermediate reasoning matters.

| Model | Interleaved support |
|---|---|
| Mythos preview / Opus 4.7 / Opus 4.6 | Automatic with adaptive |
| Sonnet 4.6 (manual) | Beta header `interleaved-thinking-2025-05-14` |
| Earlier Claude 4 | Beta header `interleaved-thinking-2025-05-14` |

## Prompt caching interaction (the precise rules)

**Critical for [[Prompt Caching]]:**

- Changing thinking parameters (enabled/disabled, budget allocation) **invalidates the messages cache** (NOT system cache, NOT tools cache).
- System prompt cache hits are **preserved** despite thinking parameter changes.
- Thinking blocks are themselves cached and count as input tokens when read from cache.
- **Interleaved thinking amplifies cache invalidation** — thinking blocks between tool calls multiply the cache surface.

This means: **thinking is the right place to add adaptive depth control** (different budgets per turn), accepting messages-cache invalidation, while keeping the more expensive system+tools caches intact.

## Display control (`omitted` for latency)

```python
thinking={"type": "adaptive", "display": "omitted"}
```

| Display option | Behavior |
|---|---|
| `"summarized"` (default on Opus 4.6 / Sonnet 4.6) | Returns summary of thinking |
| `"omitted"` (default on Opus 4.7 / Mythos) | Empty thinking field, only signature |

`omitted` is faster time-to-first-text-token when streaming. Server skips streaming thinking tokens. **You're still charged full thinking cost** — only latency is reduced.

## Output limits per model (Max output)

- Opus 4.7 / Opus 4.6 / Sonnet 4.6: **64k–128k**
- Legacy: lower (check [[Anthropic Models Overview]])

## Best practices (from the docs)

1. **Budget sizing** — start 10k–20k tokens; tune by complexity
2. **Don't toggle mid-turn** — silently degrades. Decide thinking strategy per turn.
3. **Preserve thinking blocks** with tool results
4. **Cache awareness** — budget changes invalidate messages cache (system cache preserved). Pair with [[claudekit (Carl Rannaberg)|claudekit's `thinking-level` hook]] pattern (set per-prompt; accept the messages-cache cost).
5. **Use `display: "omitted"`** for latency-sensitive applications
6. **Graceful degradation** — API silently disables thinking on mid-turn conflicts

## Where this lands in the wiki

- **[[Extended Thinking]]** — primary anchor; updates the concept page with adaptive-thinking-as-default on Opus 4.7+
- **[[Prompt Caching]]** — the precise messages-cache-only invalidation rule
- **[[Action Space Design]]** — adaptive thinking is itself a state-as-tools-style pattern (depth controlled by the model, not config changes)
- **[[Reducing Hallucinations]]** — thinking surfaces wrong reasoning for inspection (defense layer 9, Extended Thinking + Planning)
- **[[Token Efficiency]]** — `display: "omitted"` for latency without changing cost; `claudekit thinking-level` for contextual depth

## Bonus discovery

> [!note] Adaptive thinking docs
> Linked from this page: dedicated [Adaptive Thinking](https://docs.anthropic.com/build-with-claude/adaptive-thinking) docs page. Worth its own ingest if it has more depth than this overview captures — the `effort` parameter behavior in particular.

## Cross-references

- [[Extended Thinking]] (concept page; primary anchor)
- [[Prompt Caching]] (messages-cache-only invalidation rule)
- [[Anthropic Tool Use with Prompt Caching]] (the cache-invalidation matrix this row updates)
- [[Anthropic Models Overview]] (per-model thinking support)
- [[Reducing Hallucinations]] (thinking + planning pair)
- [[Action Space Design]] (adaptive depth as state-as-tools)
- [[Token Efficiency]] (display: omitted for latency)
- [[claudekit (Carl Rannaberg)]] (thinking-level hook pattern)
