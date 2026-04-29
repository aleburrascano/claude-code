---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, api-docs, compaction, prompt-caching, context-window, beta]
source_path: (no raw — discovered via in-text citation in raw/articles/Thariq - Prompt Caching Is Everything.md line 93)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://platform.claude.com/docs/en/build-with-claude/compaction
beta_header: compact-2026-01-12
---

# Anthropic Compaction

The official Anthropic docs for **server-side context compaction** — Anthropic's productization of Claude Code's internal **cache-safe forking** pattern. Beta header `compact-2026-01-12`, edit type `compact_20260112`.

Citation trail: Thariq's [[Thariq - Prompt Caching Is Everything|Prompt Caching Is Everything]] essay (line 93) directly says: *"based on our learnings from Claude Code we built compaction directly into the API, so you can apply these patterns in your own applications."* This docs page is that productization.

## What compaction does

When a conversation approaches the context window limit, Claude:

1. Detects when input tokens exceed your trigger threshold (default **150,000**, min 50,000)
2. Generates a summary of the current conversation
3. Creates a **`compaction` block** in the response containing the summary
4. Continues the response with the compacted context

On subsequent requests, the API **automatically drops all message blocks prior to the `compaction` block**, continuing the conversation from the summary. The client just appends the response and keeps going — the API handles the truncation.

> Compaction isn't only about staying under a token cap. As conversations get longer, models struggle to maintain focus across the full history. Compaction keeps the active context focused and performant by replacing stale content with concise summaries.

This matches Thariq's framing of [[Token Efficiency|context rot]] — the problem isn't the cap, it's degradation past 300-400k tokens on a 1M model.

## The cache-safe-forking productization

The architectural reason this docs page exists: **Anthropic took Claude Code's cache-safe forking and shipped it as an API feature.**

In [[Thariq - Prompt Caching Is Everything|Thariq's article]]:
> "When we run compaction, we use the exact same system prompt, user context, system context, and tool definitions as the parent conversation. We prepend the parent's conversation messages, then append the compaction prompt as a new user message at the end. From the API's perspective, this request looks nearly identical to the parent's last request — same prefix, same tools, same history — so the cached prefix is reused."

In these docs:
> "Compaction works well with prompt caching. You can add a `cache_control` breakpoint on compaction blocks to cache the summarized content. The original compacted content is ignored."

Same primitive, exposed two ways. The API hides the forking mechanics; the user just adds `cache_control: ephemeral` to the compaction block.

## Minimal API contract

```python
import anthropic
client = anthropic.Anthropic()

response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-7",
    max_tokens=4096,
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
)

# Append the response (incl. compaction block) and continue
messages.append({"role": "assistant", "content": response.content})
```

**Note**: must use the `client.beta.*` namespace; must include `compact-2026-01-12` in `betas`.

## Parameters

| Parameter | Default | Description |
|---|---|---|
| `type` | (required) | Must be `"compact_20260112"` |
| `trigger` | `{ type: "input_tokens", value: 150000 }` | When compaction fires. Min 50,000 tokens. |
| `pause_after_compaction` | `false` | If `true`, returns the compaction block but **doesn't auto-continue** the response — gives the caller a chance to inspect/intervene. |
| `instructions` | `null` | Custom summarization prompt. Completely replaces the default when provided. Useful for domain-specific summarization (e.g., "preserve all variable names mentioned"). |

## Prompt caching with compaction

The cache pattern (from the docs):

```json
{
  "role": "assistant",
  "content": [
    {
      "type": "compaction",
      "content": "[summary text]",
      "cache_control": { "type": "ephemeral" }
    },
    {
      "type": "text",
      "text": "Based on our conversation..."
    }
  ]
}
```

Add `cache_control: ephemeral` to the compaction block to cache the *summary* itself. Subsequent requests reuse the cached summary instead of regenerating context from scratch.

**The math**: original compacted content is ignored after the cache point — you don't pay for the pre-compaction tokens repeatedly. Cost dominated by summary tokens + new turns.

## Streaming events

```sse
event: content_block_start
data: { "type": "content_block_start", "content_block": { "type": "compaction" } }

event: content_block_delta
data: { "type": "content_block_delta", "delta": { "type": "compaction_delta", "content": "..." } }
```

Use `compaction_delta` events to stream summary generation; standard `text_delta` events for the continued response.

## Limitations

- **Same model for summarization** — the model in your request handles summarization. **No option to use a cheaper model** for the summary. (Compare Claude Code's strategy: cache-preserving Opus → Haiku handoff via subagents — see [[Subagents]].)
- **Models supported**: Claude Mythos Preview, Opus 4.7/4.6, Sonnet 4.6. Notably **no Haiku models** and no older Sonnet/Opus generations.
- **Beta header required** — currently in beta as of `compact-2026-01-12`.

## When to use

> Recommended strategy for managing context in long-running conversations and agentic workflows. Handles context management automatically with minimal integration work.

Ideal for:

- Chat-based, multi-turn conversations where users stay in one chat for long periods
- Task-oriented prompts requiring lots of follow-up tool use that may exceed the context window

## Where this lands in the wiki

- **Architecture validation** — confirms Thariq's account: Claude Code's internal compaction is a cache-preserving fork, not an arbitrary summarization call. The naive implementation (separate API call with different system prompt + no tools) would lose the entire cached prefix and pay full price on input tokens.
- **Token efficiency** — productized layer 1+2 (compression + cache-preservation). The default 150k threshold is a meaningful operational anchor for [[Token Efficiency]]: somewhere between Thariq's "300-400k context rot zone" and the cap.
- **Comparison axis with subagent handoff** — for cache-preserving model switching, Claude Code uses [[Subagents|subagents]] (Opus prepares a handoff brief for Haiku). For cache-preserving context truncation, Claude Code uses compaction. Same architectural goal (preserve cache across cognitive transitions); two different mechanisms.

## Cross-references

- [[Thariq - Prompt Caching Is Everything]] — the architectural rationale (lines 76-93 describe the exact mechanism); productized in this docs page
- [[Token Efficiency]] — compaction is a layer-1 (compression) + layer-2 (cache-preservation) primitive
- [[Anthropic Tool Search]] — sibling productization of Claude Code internal pattern (stub-and-discover)
- [[Subagents]] — alternative cache-preserving cognitive transition (model switching)
- [[claude-mem (thedotmack)]] — third-party PostToolUse compression pattern; same goal, hooks-layer not API-layer
- [[Memory]] — Auto Memory + Compaction together cover both "always-loaded" and "summarize-when-full" memory layers

## Bonus discoveries (cross-references in the docs to ingest later)

- **"Effective context engineering for AI agents"** (engineering blog) — cited as the deeper read on long-context degradation. Same blog post Tool Search docs link to. **Strong Tier 3 candidate.**
- **["Session memory compaction cookbook"](https://platform.claude.com/cookbook/misc-session-memory-compaction)** — runnable example using **background threading** for instant compaction. Worth a separate cookbook source.
- **"Context windows"** docs (`/docs/en/build-with-claude/context-windows`) — companion strategy reference.
- **"Context editing"** docs (`/docs/en/build-with-claude/context-editing`) — sibling strategies (tool result clearing, thinking block clearing).
