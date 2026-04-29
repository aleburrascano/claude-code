---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, engineering-blog, tool-use, mcp, programmatic-tool-calling, tool-search, scaling]
source_path: (no raw — discovered as cross-reference in Tier 1.2 Anthropic Tool Search docs)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://www.anthropic.com/engineering/advanced-tool-use
beta_header: advanced-tool-use-2025-11-20
---

# Anthropic Advanced Tool Use

Anthropic's engineering post on tool use **at scale** — the companion piece to [[Anthropic Tool Search]] that frames the broader problem the productizations solve.

The core thesis: agents at scale need **three architectural shifts** beyond traditional tool calling. Tool Search is one of them; this post introduces the other two.

## The three architectural shifts

### 1. Dynamic tool discovery — productized as [[Anthropic Tool Search]]
Already covered. Up to 10k tools in catalog; 3-5 surfaced per request. Selection accuracy degrades past 30-50 tools.

### 2. **Programmatic Tool Calling** (PTC) — *new for the wiki*

The most important new pattern this post introduces.

Claude writes **orchestration code (Python)** that calls tools sequentially or in parallel. **Tool results feed into the code execution environment, not the model context.** Replaces multiple inference passes with a single code block.

Beta header: `betas=["advanced-tool-use-2025-11-20"]`. Tools opt in with `allowed_callers: ["code_execution_20250825"]`.

**Worked example (Budget Compliance)**:
- *Traditional approach*: fetch team members → iterate with 20 tool calls for expenses (50-100 line items each) → 2,000+ expense items accumulate in context (50KB+)
- *PTC approach*: Claude writes async/parallel fetch-and-filter code → only final results (2-3 names) enter context

> "These intermediate results consume massive token budgets and can push important information out of the context window entirely."

**Result**: average usage dropped from **43,588 → 27,297 tokens (37% reduction)**.

This is a fundamentally different shape from tool-search-style optimization. Tool Search reduces what enters the cached prefix; **PTC reduces what enters the conversation at all** by filtering inside a code execution sandbox before Claude sees it.

### 3. **Tool Use Examples**

`input_examples` field on tool definitions. Demonstrates parameter combinations, format conventions, optional-field inclusion logic, nested structure usage. Beyond what JSON Schema can express.

**Result**: parameter accuracy on complex tools improved from **72% → 90%** in internal testing.

Worked example (Support Ticket API): clarifies date format ("2024-11-06" vs "Nov 6, 2024"), ID conventions ("USR-12345" vs UUID), and parameter correlations (priority + escalation.level + sla_hours relationships) — all things schemas can't capture.

## Concrete metrics worth remembering

| Metric | Value |
|---|---|
| 5-server MCP setup token overhead | ~55k tokens (observed real-world: up to 134k) |
| Tool Search Opus 4 accuracy lift | 49% → 74% |
| Tool Search Opus 4.5 accuracy lift | 79.5% → 88.1% |
| Tool Search context savings vs traditional | 191k preserved vs 122.8k (85% reduction) |
| PTC token reduction (general) | 37% (43,588 → 27,297 avg) |
| **PTC search benchmarks** (Opus 4.6 on BrowseComp + DeepsearchQA) | **+11% accuracy / −24% input tokens** |
| **LMArena Search Arena ranking** (Opus 4.6 + PTC) | **#1** |
| Tool Use Examples accuracy lift | 72% → 90% on complex parameters |
| Threshold to enable Tool Search | tool definitions consuming >10k tokens |

The search-specific numbers are from [[Lance Martin - Give Claude a computer]] (Feb 2026). PTC is **now built into the `web_search_20260209` tool by default** — the wiki's [[Anthropic Tool Use Overview]] references this tool but doesn't flag PTC as the underlying mechanism; it's transparent to API users.

## The layering strategy

The post explicitly recommends a **stack-the-fixes** approach:

1. **Largest bottleneck first**:
   - Context bloat from too many tools → enable Tool Search
   - Intermediate results accumulating → enable PTC
   - Parameter errors / malformed calls → add Tool Use Examples
2. **Keep 3-5 most-used tools always loaded**; defer the rest
3. **Document return formats explicitly** — PTC requires Claude to parse tool outputs in code; explicit return shapes make this reliable

## The implicit principle (worth quoting)

> "Effective agents manage not just *what* enters context, but *when* and *in what form*."

This generalizes. The wiki's [[Token Efficiency|five-layer compression stack]] is the operational form; this is the conceptual form. PTC is the canonical example of "in what form" — same data, but pre-filtered through code rather than dumped into the conversation.

## Where this lands in the wiki

- **[[Action Space Design]]** — PTC is a *fourth* way to add capability without adding tools (orchestration in code instead of multi-turn tool dance)
- **[[Token Efficiency]]** — PTC is a candidate for layer 1.5: code-execution-mediated tool result filtering. Pairs with [[rtk (rtk-ai)|RTK]] (Bash output filtering) and AST graphs (precomputed structural context)
- **[[Model Context Protocol]]** — Tool Search + PTC together are *the* MCP-at-scale pattern
- **[[Multi-Agent Orchestration]]** — PTC's "filter intermediate results" pattern is what makes long autonomous runs feasible
- **[[Reducing Hallucinations]]** — Tool Use Examples reduce malformed-call hallucinations (a recognized class)

## Open questions

> [!note] PTC adoption tradeoff
> PTC requires Claude to write reliable Python orchestration code. This shifts a class of errors from "wrong tool call" to "wrong orchestration code" — testable but real. Worth tracking PTC adoption signals (one-shot rate per [[CodeBurn (AgentSeal)|CodeBurn]]) before recommending broadly.

> [!note] Tool Use Examples for skill design
> The pattern (provide concrete usage examples, not just schemas) generalizes to [[Skill Building]] — most skill design failures are about *when* and *how* to invoke, not *what* the skill does. Worth lifting into Skill Building's design principles.

## Cross-references

- [[Anthropic Tool Search]] (productized #1)
- [[Anthropic Effective Context Engineering]] (the broader framing)
- [[Action Space Design]] (PTC as 4th alternative-to-tools)
- [[Token Efficiency]] (PTC as filtering layer)
- [[Model Context Protocol]] (scale story)
- [[Multi-Agent Orchestration]] (long autonomous run feasibility)
- [[Reducing Hallucinations]] (Tool Use Examples reduce malformed-call class)
- [[Thariq - Seeing like an Agent]] (action-space design philosophy this operationalizes)
