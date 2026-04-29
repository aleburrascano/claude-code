---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, api-docs, tool-use, foundational, mcp, agent-loop]
source_path: (no raw — sibling reference to Tier 1.2 Anthropic Tool Search docs)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
---

# Anthropic Tool Use Overview

The foundational Anthropic API docs for tool use — what Claude Code, MCP servers, and Skills are all built on top of. The primitive everything else stands on.

## The client/server distinction

Tools differ primarily by **where the code executes**:

| Type | Execution | Examples |
|---|---|---|
| **Client tools** | Your application | User-defined tools, Anthropic-schema tools (`bash`, `text_editor`) |
| **Server tools** | Anthropic's infrastructure | `web_search`, `code_execution`, `web_fetch`, `tool_search` |

**Client tool flow**: Claude returns `stop_reason: "tool_use"` + one or more `tool_use` blocks → your code executes → you send back `tool_result` → loop continues.

**Server tool flow**: Anthropic executes; you see results directly without handling execution.

## The agentic loop (canonical shape)

```
1. Send messages + tools to API
2. Claude returns assistant message
   - if stop_reason == "tool_use": one or more tool_use blocks
   - if stop_reason == "end_turn": final answer
3. For each tool_use block:
   - execute (client) or skip (server)
   - return tool_result block in next user message
4. Loop until stop_reason == "end_turn"
```

This is the agent loop — the primitive every agent harness (Claude Code, Cursor, Codex, etc.) implements on top of. Whatever sits above (skills, hooks, subagents, plan mode) is structured around this loop.

## Strict tool use

> "Add `strict: true` to your tool definitions to ensure Claude's tool calls always match your schema exactly."

A grammar-enforced mode. Worth knowing for tools where a malformed call is genuinely costly (database writes, financial operations). Composes cleanly with [[Anthropic Tool Search|`defer_loading`]] (per the Tool Search docs: strict-mode grammar builds from the full toolset, no recompilation when tools materialize).

## Token cost of tool use

Adding `tools` automatically includes a tool-use system prompt. Per-model overhead:

| Model | `auto`/`none` | `any`/`tool` |
|---|---|---|
| Opus 4.7 / 4.6 / 4.5 / 4.1 / 4 | 346 tokens | 313 tokens |
| Sonnet 4.6 / 4.5 / 4 / 3.7 (deprecated) | 346 tokens | 313 tokens |
| Haiku 4.5 | 346 tokens | 313 tokens |
| Haiku 3.5 / Haiku 3 | 264 / 340 tokens | (paired) |
| Opus 3 (deprecated) | 530 tokens | 281 tokens |

**These are baseline costs before any of your tool definitions.** Add the `tools` parameter content (names + descriptions + schemas) on top. This is why [[Token Efficiency|the <80 active tools rule]] exists — each definition compounds.

## Pricing decomposition

For a tool-use request, you pay for:
1. **Total input tokens** (including the `tools` parameter)
2. **Output tokens** generated
3. **Server-side tool usage** (e.g., web search per-search charges)

Client-side tools are priced like any other Claude API request. Server-side tools have additional usage-based charges.

## Why this is foundational

> "Tool access is one of the highest-leverage primitives you can give an agent. On benchmarks like LAB-Bench FigQA (scientific figure interpretation) and SWE-bench (real-world software engineering), adding even basic tools produces outsized capability gains, often surpassing human expert baselines."

The thesis: tools aren't a feature; they're the primary way agents get more capable. A model with the right tools beats a smarter model with the wrong ones.

This is the intuition pump for [[Action Space Design]] — careful tool design dominates careful prompt design at scale.

## What happens when Claude needs more information

When a tool requires a parameter the user didn't supply, behavior varies by model:

- **Opus**: more likely to recognize a parameter is missing and ask for clarification
- **Sonnet**: may ask, especially when prompted to think before tool use; may also infer a "reasonable" value (the example: "what's the weather?" → infers `location: "New York, NY"`, `unit: "fahrenheit"`)

Not guaranteed. For ambiguous prompts on less-intelligent models, expect inference rather than questions.

For [[Reducing Hallucinations]]: this is one of the structural reasons [[Karpathy Coding Principles|"Think Before Coding"]] matters — Sonnet without explicit guidance will quietly fill in defaults.

## Where this lands in the wiki

- **[[Action Space Design]]** — this page is the API-level foundation; AS Design is the philosophy on top
- **[[Skills]]** · **[[Subagents]]** · **[[Hooks]]** — all sit on top of this loop
- **[[Model Context Protocol]]** — MCP is a way to expose tools; tools is the underlying primitive
- **[[Token Efficiency]]** — the per-model tool-use overhead numbers (346 tokens) are part of the baseline overhead measurements
- **[[Reducing Hallucinations]]** — the Sonnet-fills-defaults behavior is a known hallucination class
- **[[Anthropic Tool Search]]** · **[[Anthropic Advanced Tool Use]]** — both build on this

## Bonus discoveries (for Tier 3 backlog)

This overview links to several sub-pages that may warrant their own ingest:
- **"How tool use works"** — full conceptual model + agent loop deep-dive
- **"Build a tool-using agent"** tutorial — one-tool-call to production
- **"Define tools"** — reference for individual tool definition concepts
- **"Handle tool calls"** — reference for tool_result handling
- **"Strict tool use"** — separate page on schema enforcement
- **"Tool reference"** — directory of all Anthropic-provided tools (web_search, bash, text_editor, code_execution, web_fetch, computer_use, memory)

The "Tool reference" page in particular is a useful catalog when designing skills/hooks that call Anthropic-provided tools.

## Cross-references

- [[Action Space Design]] · [[Skills]] · [[Subagents]] · [[Hooks]] · [[Model Context Protocol]]
- [[Anthropic Tool Search]] · [[Anthropic Advanced Tool Use]] · [[Anthropic Tool Use with Prompt Caching]]
- [[Token Efficiency]] (per-model tool overhead numbers)
- [[Reducing Hallucinations]] (Sonnet-fills-defaults hallucination class)
- [[Karpathy Coding Principles]] (Think Before Coding addresses this class)
