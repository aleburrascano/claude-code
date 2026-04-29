---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, api-docs, tool-use, prompt-caching, cache-invalidation]
source_path: (no raw — sibling reference to Tier 1.2 Anthropic Tool Search + Compaction docs)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching
---

# Anthropic Tool Use with Prompt Caching

The most precise reference the wiki has on **what invalidates the cache**. Pair this with [[Thariq - Prompt Caching Is Everything]] (the architectural rationale) and [[Anthropic Compaction]] / [[Anthropic Tool Search]] (the productizations) for full coverage of [[Prompt Caching]].

## Where to place `cache_control`

```json
{
  "tools": [
    { /* ... */ },
    { /* ... */ , "cache_control": { "type": "ephemeral" } }   // last tool
  ]
}
```

Place `cache_control: { type: "ephemeral" }` on the **last tool in the `tools` array**. This caches the entire tool-definitions prefix from the first tool through the marked breakpoint.

For `mcp_toolset` (where you don't control tool order within the set): place the breakpoint on the `mcp_toolset` entry itself. The API applies it to the final expanded tool.

## How `defer_loading` preserves the cache

The mechanism Thariq describes, now precisely documented:

> "Deferred tools are not included in the system-prompt prefix. When the model discovers a deferred tool through tool search, the definition is appended inline as a `tool_reference` block in the conversation history. **The prefix is untouched, so prompt caching is preserved.**"

> "`defer_loading` also acts independently of grammar construction for strict mode. The grammar builds from the full toolset regardless of which tools are deferred, so prompt caching and grammar caching are both preserved when tools load dynamically."

Two implications:
1. **Tool search is cache-safe by design.** Adding tools dynamically through tool search does NOT break your cache.
2. **Strict mode and `defer_loading` compose.** No grammar recompilation when deferred tools materialize.

## The cache-invalidation matrix

The cache follows a **prefix hierarchy**: `tools → system → messages`. A change at one level invalidates that level *and everything after it*.

| Change | Invalidates |
|---|---|
| Modifying tool definitions | **Entire cache** (tools + system + messages) |
| Toggling web search or citations | system + messages |
| Changing `tool_choice` | messages |
| Changing `disable_parallel_tool_use` | messages |
| Toggling images present/absent | messages |
| Changing thinking parameters | messages |

This is the **canonical reference** for "what breaks the cache." [[Prompt Caching|Anti-patterns]] cite this matrix.

> "If you need to vary `tool_choice` mid-conversation, consider placing cache breakpoints before the variation point."

## Per-tool caching interaction table

| Tool | Caching considerations |
|---|---|
| **Web search** | Enabling/disabling invalidates system + messages caches |
| **Web fetch** | Same — invalidates system + messages |
| **Code execution** | **Container state is independent of prompt cache** (separate state lifecycle) |
| **Tool search** | Discovered tools load as `tool_reference` blocks → preserves prefix cache |
| **Computer use** | Screenshot presence affects messages cache |
| **Text editor / Bash / Memory** | Standard client tools; no special caching interaction |

The **code execution exception** is worth knowing: container state lives outside the prompt cache, so long-running code execution sessions don't pay cache costs the way tool definitions do.

## What this clarifies that wasn't precise before

Before this docs page, the wiki's [[Prompt Caching]] cache-breaking-mistakes list was based on Thariq's article. This docs page makes it precise:

| Wiki claim (was) | Docs precision (now) |
|---|---|
| "Mid-session tool addition/removal breaks cache" | Modifying tool definitions invalidates entire cache; deferred tools via Tool Search do NOT |
| "Mid-session model switching breaks cache" | (separate; not in this matrix) |
| "Plugin install/uninstall mid-session is expensive" | Confirmed — plugin install adds tools → "modifying tool definitions" → entire cache invalidated |
| "Web search toggle effects" | Now precise: invalidates system + messages, but tools cache stays |

The wiki's narrative was correct; this page provides the operational matrix.

## The architectural placement

> "Tools → system → messages."

The prefix hierarchy is the deepest principle. Everything else (where to place breakpoints, what invalidates what, when caching is preserved) is consequences. The hierarchy is:

```
[ tools ] → [ system ] → [ messages ]
```

A change to `tools` invalidates everything downstream. A change to `messages` only invalidates `messages`. Design accordingly: anything that changes per-turn goes in `messages`; anything stable across the project goes in `tools` or `system`.

## Where this lands in the wiki

- **[[Prompt Caching]]** — primary reference; the cache-invalidation matrix is now Anthropic-documented, not Thariq-summarized
- **[[Anthropic Tool Search]]** — confirmation that `defer_loading` + tool search preserves cache
- **[[Hooks]]** — confirmation that hooks injecting via `additionalContext` (in `messages`) is cache-safe; hooks editing system prompt is not
- **[[Action Space Design]]** — tool stability is a documented cache requirement, not just a Thariq claim

## Cross-references

- [[Prompt Caching]] (the primary topic this anchors)
- [[Thariq - Prompt Caching Is Everything]] (the architectural rationale)
- [[Anthropic Tool Search]] (productized `defer_loading`)
- [[Anthropic Compaction]] (sibling cache-preserving productization)
- [[Anthropic Tool Use Overview]] (foundational tool-use docs)
- [[Anthropic Advanced Tool Use]] (engineering blog companion)
- [[Hooks]] (cache-safe `additionalContext` injection pattern)
- [[Token Efficiency]] (the cache hierarchy as design constraint)
