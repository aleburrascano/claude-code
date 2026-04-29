---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [prompt-caching, anthropic, langchain, auto-caching, cache-control, foundational]
source_path: raw/articles/Lance Martin - Prompt auto-caching with Claude.md
source_date: 2025-12-24
source_author: Lance Martin (LangChain; @RLanceMartin)
source_url: https://x.com/RLanceMartin/status/2024573404888911886
---

# Lance Martin — Prompt auto-caching with Claude

The technical companion piece [[Thariq - Prompt Caching Is Everything|Thariq]] explicitly says to read. Lance Martin (LangChain) wrote this on Dec 24, 2025 to explain Claude's auto-caching feature and the underlying caching mechanics.

For our wiki, this **closes a gap** — [[Prompt Caching]] had the architectural framing from Thariq but lacked the operational specifics (the 10% cost number, the 20-block search rule, the auto-caching mechanism). All of those are here.

## The headline numbers

> "Cached input tokens are **10% the cost of non-cached input tokens**."

This is the operational anchor [[Cost Observability Playbook]] needed. Cache hits are an order-of-magnitude cost reduction — and by extension, **a 60-80% cache hit rate is meaningfully different from 90%+**, because the 10×-cheaper tokens dominate the math.

## The 20-block search rule

> "It tells Claude to search backward at most **20 blocks from the breakpoint** to find any prior cache write matches ('hits'). The hash requires identical content. One character difference will produce a different hash and a cache miss."

New specific. When you set `cache_control` on a block, Claude looks back **up to 20 blocks** for a matching cryptographic hash. If found → cache hit. If not → fresh prefill.

Implications:
- Cache hits decay as conversation grows past 20 blocks back from the current breakpoint
- Pinning frequently-reused prefixes (system prompt, CLAUDE.md, tools) at the *front* maximizes their cache lifetime
- Workspace-scoped: hashes don't cross workspaces (multi-team / multi-project deployments need to be aware)

## Manual caching vs auto-caching

### Manual (per-block breakpoint)

You explicitly mark a block with `cache_control`. Claude caches everything up to and including that block; searches backward 20 blocks for hits.

```json
"messages": [
  { "role": "user", "content": "A" },
  { "role": "assistant", "content": "B" },
  {
    "role": "user",
    "content": "C",
    "cache_control":  {"type": "ephemeral"}
  }
]
```

### Auto-caching (request-level)

A single `cache_control` parameter at the request level. The breakpoint **automatically moves to the last cacheable block** as the conversation grows.

```json
{
  "cache_control":  {"type": "ephemeral"},
  "messages": [
    { "role": "user", "content": "A" },
    { "role": "assistant", "content": "B" },
    { "role": "user", "content": "C" }
  ]
}
```

**Why this matters**: for turn-based apps (agents), you previously had to manually move the breakpoint to the latest block on every turn. Auto-caching does it for you.

Auto-caching still composes with block-level caching: you can set explicit breakpoints on the system prompt or tools, *and* let auto-caching handle the conversation tail.

## How it works (the prefill-and-cache intuition)

> "LLM inference pipelines typically use a prefill phase that processes the prompt and a decode phase that generates output tokens. The intuition behind caching is that the prefill computation can be performed once, saved (e.g., cached), and then re-used if (part of) a future prompt is identical."

Prefill is the expensive step on long prompts. Caching skips it for unchanged prefixes. References to vLLM and SGLang as the open-source inference stacks that pioneered different approaches to the same idea.

## Cache breaking is easy

> "If you edit the history (see below) you risk breaking the cache."
> 
> Quoting Thariq (Dec 24, 2025 in this article): "Most context management and compaction techniques are limited by prompt caching. Coding agents would be cost prohibitive if they didn't maintain the prompt cache between turns. **And it's very easy to break the cache when doing more.**"

Pairs with [[Anthropic Tool Use with Prompt Caching|the cache-invalidation matrix]] — single-character differences produce different hashes; tool definition changes invalidate the entire cache; etc.

## The cache-hit-rate-as-primary-metric framing

> "@peakji from Manus called out the cache hit rate as **the single most important metric for a production AI agent**."

Reinforces the wiki's existing framing. [[Prompt Caching]] / [[Cost Observability Playbook]] both lead with cache hit rate as the leading indicator; Lance's piece adds an external practitioner (Manus team) confirming the same.

## Cited resources (Tier 3+ backlog candidates)

The article links out to several technical references the wiki could deep-dive:

- **Sankalp / @dejavucoder — "How prompt caching works"**: https://sankalp.bearblog.dev/how-prompt-caching-works/ — practitioner deep-dive on the mechanics
- **@kipply — "Transformer inference arithmetic"**: https://kipp.ly/transformer-inference-arithmetic/ — KV cache deep-dive at the math layer
- **vLLM paper**: https://arxiv.org/pdf/2309.06180 — the seminal inference framework paper
- **SGLang**: https://lmsys.org/blog/2024-01-17-sglang/ — sibling inference framework
- **Manus context-engineering essay** (peakji): https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus — production agent perspective from Manus team

## Where this lands in the wiki

- **[[Prompt Caching]]** — adds the 10% cost number + 20-block search rule + auto-caching mechanism (manual vs request-level)
- **[[Cost Observability Playbook]]** — 10× cost differential between cached and non-cached input tokens is the operational anchor for "why cache hit rate dominates spend"
- **[[Anthropic Tool Use with Prompt Caching]]** — auto-caching as the "single cache_control parameter" pattern this article describes
- **[[Token Efficiency]]** — productized cache architecture; auto-caching is the no-config default for cache discipline

## Cross-references

- [[Thariq - Prompt Caching Is Everything]] (the architectural rationale this article references)
- [[Prompt Caching]] (primary anchor)
- [[Anthropic Tool Use with Prompt Caching]] (the cache-invalidation matrix)
- [[Cost Observability Playbook]] (the 10% number is the lead operational metric)
- [[Token Efficiency]] · [[Anthropic Compaction]] · [[Anthropic Tool Search]]
- [[Lance Martin - Give Claude a computer]] (the sibling Lance Martin piece on PTC)
