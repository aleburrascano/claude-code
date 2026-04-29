---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, api-docs, context-editing, compaction-sibling, tool-result-clearing, thinking-block-clearing]
source_path: (no raw)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://platform.claude.com/docs/en/build-with-claude/context-editing
---

# Anthropic Context Editing

The **fine-grained sibling** to [[Anthropic Compaction|server-side compaction]]. Context editing lets you selectively clear specific content (tool results, thinking blocks) instead of summarizing the whole conversation.

> "For most use cases, server-side compaction is the primary strategy for managing context in long-running conversations. The strategies on this page are useful for specific scenarios where you need more fine-grained control over what content is cleared."

For our wiki, context editing is the **scalpel** to compaction's **blunt instrument**. Compaction summarizes; context editing surgically removes specific content types. ZDR-eligible.

## The three strategies

| Approach | Use when |
|---|---|
| **Tool result clearing** | Heavy-tool-use agentic workflows where old tool results are no longer needed |
| **Thinking block clearing** | Managing thinking blocks during [[Extended Thinking]]; can preserve recent thinking for context continuity |
| **Client-side SDK compaction** | SDK-based summary alternative (server-side compaction is generally preferred) |

## When to use which

- **Compaction** ([[Anthropic Compaction]]) — long conversations, broad summarization; default choice
- **Tool result clearing** — agent loops where each tool call produces large output but only the *final* result matters (most agent workflows)
- **Thinking block clearing** — long extended-thinking sessions where the early thinking is no longer relevant
- **Client-side SDK compaction** — when you need bespoke summarization logic the server-side won't provide

The framing per the docs: *"Context is a finite resource with diminishing returns, and irrelevant content degrades model focus. Context editing gives you fine-grained runtime control over that curation."*

This connects to [[Anthropic Effective Context Engineering]]: the active-curation principle is what context editing operationalizes.

## Tool result clearing (the most useful pattern)

For long agent sessions with verbose tool outputs, the *intermediate* results often clutter context after a few turns. Tool result clearing removes them while keeping the conversation structure (the `tool_use` blocks still exist; the corresponding `tool_result` content is cleared).

Operationally: enables long-running agents to keep the *decision trail* (which tools were called, when) while shedding the *result content* that's no longer needed.

For [[rtk (rtk-ai)|RTK]] / [[claude-mem (thedotmack)]] users: this is the API-layer dual to their hook-layer compression. Each operates at a different layer; they compose.

## Thinking block clearing

Per [[Anthropic Extended Thinking API]]: thinking blocks count as input tokens when read from cache. For long sessions with many thinking-rich turns, clearing old thinking blocks while preserving recent ones gives you:
- Context budget for new reasoning
- Continuity from recent thinking
- No unbounded thinking-block accumulation

Pairs with the `display: "omitted"` parameter (skip *streaming* thinking) — together you can control both *rendering* cost and *context-occupancy* cost of extended thinking.

## Where this lands in the wiki

- **[[Token Efficiency]]** — third API-layer compression primitive (compaction = full summary, tool result clearing = selective removal of bulk, thinking clearing = reasoning-block hygiene). All three are ZDR-eligible and cache-aware.
- **[[Anthropic Compaction]]** — sibling productization; context editing is the lighter-touch alternative
- **[[Extended Thinking]]** — thinking-block clearing is the hygiene mechanism that keeps long thinking-rich sessions feasible
- **[[Multi-Agent Orchestration]]** — long-running agent loops with verbose tool output benefit substantially from tool result clearing
- **[[Cost Observability Playbook]]** — when CodeBurn flags "high re-read" or "verbose tool output," context editing is one of the response options

## API contract (overview)

Same `context_management.edits` parameter as Compaction. Each edit type is a distinct entry; they compose:

```python
context_management={
    "edits": [
        {"type": "compact_20260112"},              # full compaction
        {"type": "clear_tool_results_20XXXXXX"},   # selective tool result removal
        # ... etc
    ]
}
```

The full API contract is in the persisted docs; this is the shape.

## Cross-references

- [[Anthropic Compaction]] (sibling; the broader hammer)
- [[Token Efficiency]] (compression primitive #3 in the API-layer family)
- [[Extended Thinking]] · [[Anthropic Extended Thinking API]] (thinking-block clearing pairing)
- [[Anthropic Effective Context Engineering]] (the curation principle this operationalizes)
- [[Multi-Agent Orchestration]] (tool result clearing for long agent loops)
- [[rtk (rtk-ai)]] · [[claude-mem (thedotmack)]] (hook-layer cousins; different layer, same goal)
