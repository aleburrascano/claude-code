---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, api-docs, tool-use, prompt-caching, mcp, defer-loading, scaling]
source_path: (no raw — discovered via in-text citation in raw/articles/Thariq - Prompt Caching Is Everything.md line 73)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool
---

# Anthropic Tool Search

The official Anthropic docs for the **tool search tool** — a server-side primitive that lets Claude work with up to **10,000 tools** in a catalog by dynamically discovering and loading 3-5 of them per request, instead of stuffing every definition into the system-prompt prefix. Released `2025-11-19` as `tool_search_tool_regex_20251119` and `tool_search_tool_bm25_20251119`.

Citation trail: Thariq's [[Thariq - Prompt Caching Is Everything|Prompt Caching Is Everything]] essay (line 73) directly points to this docs page as the productized form of Claude Code's internal `defer_loading` mechanism. Anthropic shipped the pattern as an API feature.

## What it solves

Two compounding problems at scale:

1. **Context bloat from tool definitions.** A typical multi-server setup (GitHub + Slack + Sentry + Grafana + Splunk) consumes **~55k tokens** in tool definitions before Claude does any actual work. Tool search reduces this by **>85%** by loading only the 3-5 tools needed per request.
2. **Tool selection accuracy degrades past 30-50 tools.** Hard metric, stated in the docs. This is the *underlying reason* for [[Boris Cherny Tips Compendium|Boris's "MCP <80 tools" rule]] — Boris named the operational threshold; Anthropic now publishes the cognitive one.

## How it works (the cache-preserving mechanism)

The piece that matters for [[Token Efficiency]] / [[Prompt Caching]]: **deferred tools are not in the system-prompt prefix at all.**

When the model discovers a deferred tool through tool search, the tool definition is appended **inline as a `tool_reference` block in the conversation**. The prefix is untouched, so prompt caching is preserved. This is exactly what Thariq describes as "lightweight stubs the model can discover" — and now we have the internal grammar.

Bonus: strict-mode grammar builds from the full toolset, so `defer_loading: true` and strict mode **compose without grammar recompilation**.

## Two variants

| Variant | Query type | When |
|---|---|---|
| `tool_search_tool_regex_20251119` | Python `re.search()` regex (max 200 chars) | Tools with consistent naming (e.g., `github_*`, `slack_*`) |
| `tool_search_tool_bm25_20251119` | Natural language | Tools with descriptive prose names |

Both variants search tool **names, descriptions, argument names, AND argument descriptions**.

## Minimal API contract

```json
{
  "tools": [
    { "type": "tool_search_tool_regex_20251119", "name": "tool_search_tool_regex" },
    {
      "name": "get_weather",
      "description": "Get current weather for a location",
      "input_schema": { "...": "..." },
      "defer_loading": true
    }
  ]
}
```

**Critical rules**:
- The tool search tool itself **must NOT** have `defer_loading: true` (400 error: "All tools have defer_loading set")
- Every `tool_reference` must point to a tool defined in the top-level `tools` array (400 error: "Tool reference 'X' has no corresponding tool definition")
- Keep your **3-5 most frequently used tools as non-deferred** — these stay in the cached prefix

## Response shape

When Claude searches:

```json
{
  "type": "server_tool_use",
  "name": "tool_search_tool_regex",
  "input": { "query": "weather" }
}
{
  "type": "tool_search_tool_result",
  "content": {
    "type": "tool_search_tool_search_result",
    "tool_references": [{ "type": "tool_reference", "tool_name": "get_weather" }]
  }
}
```

`tool_reference` blocks **auto-expand** into full tool definitions before Claude sees them — the SDK handles this. Discovered tools are reusable in subsequent turns without re-searching.

## Custom (client-side) tool search

You can implement your own search algorithm — embeddings, semantic search, whatever — by returning `tool_reference` blocks from a regular `tool_result`. Lets you swap regex/BM25 for vector search while staying compatible with the deferred-loading machinery.

```json
{
  "type": "tool_result",
  "tool_use_id": "toolu_my_search_id",
  "content": [{ "type": "tool_reference", "tool_name": "discovered_tool" }]
}
```

A complete embeddings example exists in the Anthropic Cookbook (referenced from this docs page).

## Limits and platform notes

| Constraint | Value |
|---|---|
| Max tools in catalog | 10,000 |
| Search results per query | 3-5 |
| Regex query length | 200 chars |
| Models supported | Mythos preview, Sonnet 4.0+, Opus 4.0+, Haiku 4.5+ |
| Bedrock | invoke API only (NOT converse API) |
| Batch API | Supported (same pricing as regular requests) |
| Streaming | Supported (`server_tool_use` + `tool_search_tool_result` events) |
| ZDR | Eligible |
| Tool use examples | **NOT compatible** — if you need `tool_use` examples, use standard tool calling instead |

## Usage tracking

```json
{
  "usage": {
    "server_tool_use": { "tool_search_requests": 2 }
  }
}
```

Add this to the [[Cost Observability Playbook]] / [[Token Efficiency]] measurement layer when the topic page is built.

## When to enable

| Good fit | Skip it |
|---|---|
| 10+ tools | <10 tools total |
| Tool defs >10k tokens | All tools used in every request |
| MCP-powered systems with multiple servers (200+ tools) | Tool defs <100 tokens total |
| Tool selection accuracy issues at scale | |
| Tool library growing over time | |

## Optimization tips (from the docs)

- Keep 3-5 most-frequently-used tools **non-deferred** so they stay in the cache prefix
- Use **consistent namespacing** (`github_*`, `slack_*`) so search queries naturally surface the right group
- Add **semantic keywords** to descriptions matching how users describe tasks
- Add a **system prompt section describing categories** ("You can search for tools to interact with Slack, GitHub, and Jira") — primes Claude to invoke the search tool
- **Monitor which tools Claude discovers** and refine descriptions accordingly

## Where this lands in the wiki

- **Architecture validation**: Productizes Claude Code's internal `defer_loading` pattern → directly references [[Thariq - Prompt Caching Is Everything]] (the architectural rationale) and validates it.
- **Scaling primitive for [[Model Context Protocol|MCP]]**: This is *the* answer to "MCP servers ship too many tools." Pair with [[Boris Cherny Tips Compendium|Boris's <80 tools rule]] — Boris was naming the operational consequence; Anthropic now ships the structural fix.
- **Cache-preservation pattern**: Confirms Thariq's claim that adding/removing tools mid-session breaks the cache for the entire conversation. With tool search, you don't add or remove — you stub-and-discover.

## Cross-references

- [[Thariq - Prompt Caching Is Everything]] — the architectural rationale (line 67-71 describes this exact mechanism); productized in this docs page
- [[Token Efficiency]] — Tool Search is a layer-0/1 mechanism (changes what enters the cached prefix)
- [[Model Context Protocol]] — the most affected primitive (MCP is where 200+ tools come from)
- [[Boris Cherny Tips Compendium]] — "MCP <80 tools" rule; cognitive threshold (30-50 from these docs) is the underlying reason
- [[Skills]] — alternative to adding tools (per Thariq, skills + progressive disclosure can substitute for new tools)
- [[Anthropic Compaction]] — sibling productization of Claude Code internal pattern (cache-safe forking)

## Bonus discoveries (cross-references in the docs to ingest later)

These docs link out to four other Anthropic resources that are themselves wiki-worthy and not yet ingested. Tier 3 backlog candidates:

- **["Effective context engineering for AI agents"](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)** — Anthropic engineering blog, cited as the foundational read on context discipline. Critical for [[Context Engineering]] topic.
- **["Advanced tool use"](https://www.anthropic.com/engineering/advanced-tool-use)** — Anthropic engineering blog, cited as the background on tool-scale challenges.
- **"Tool use with prompt caching"** dedicated docs page (`/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching`).
- **"Tool reference"** docs (`/docs/en/agents-and-tools/tool-use/tool-reference`) — full tool catalog with model compatibility.
