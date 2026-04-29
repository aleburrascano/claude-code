---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [tool-use, programmatic-tool-calling, action-space, web-search, anthropic, langchain]
source_path: raw/articles/Lance Martin - Give Claude a computer.md
source_date: 2026-02-27
source_author: Lance Martin (LangChain; @RLanceMartin)
source_url: https://x.com/RLanceMartin/status/2027450018513490419
---

# Lance Martin — Give Claude a computer

The companion piece [[Thariq - Seeing like an Agent|Thariq]] points to (line 16). Lance Martin wrote this on Feb 27, 2026 to introduce **Programmatic Tool Calling (PTC)** to a developer audience. Together with [[Anthropic Advanced Tool Use]], this is the canonical practitioner explainer of PTC.

For our wiki, this closes specifics on [[Action Space Design]] — Lance gives the **5 reasons to promote an action to a tool** as an explicit framework, and the **"tools trade-off control with composability"** quote as a memorable framing.

## The 5 reasons to promote an action to a tool

When does an action *need* to be a tool (vs being callable from code or via Bash)? Lance enumerates 5 reasons:

| # | Reason | Example |
|---|---|---|
| 1 | **UX** | Specific actions need to be caught and rendered to the user in a particular way (e.g., AskUserQuestion → modal dialog) |
| 2 | **Guardrails** | A file edit tool can run a staleness check to verify the file hasn't changed since the model last read it |
| 3 | **Concurrency control** | Group actions by concurrency safety (read-only tools can run in parallel) |
| 4 | **Observability** | Isolate specific actions for logging (latency, token usage) |
| 5 | **Autonomy** | Group actions by autonomy-level — if the harness can undo an action, it can approve it more freely |

This is **the explicit decision framework** [[Action Space Design]] needed. The wiki had Thariq's "see like an agent" philosophy and "the bar to add a new tool is high" rule, but not a structured set of reasons that justify *crossing* that bar.

## The composition tax framing

> "Tools trade-off control with composability. Each round trip costs latency, serializes the tool result into context (e.g., it will pass thousands of rows even if the next step only needs five), and introduces a reasoning step. **The composition tax grows with the number of actions.**"

The most memorable framing of *why* multi-step tool sequences become expensive. Each round-trip:
1. Costs latency (model + network)
2. Serializes tool output into context (often more than needed)
3. Introduces a reasoning step (model has to decide what to do next)

Three independent costs. They all scale linearly with action count. **Programmatic Tool Calling resolves the tradeoff**: composability of code + control surface of tools.

## How PTC works (the mechanism)

> "When the code calls a tool (e.g., `await web_search(query)`) the container pauses. The call crosses the sandbox boundary as a typed tool-use event. It is fulfilled just as if the model directly called the tool (e.g., via a handler, an MCP server etc). But the result returns **to the running code, not to Claude's context window**. The code processes it following the control flow that Claude specified (e.g., calls another tool, filters the data, accumulates results). Only the final output reaches Claude."

The architectural trick: **tool implementations stay outside the sandbox** (handlers / MCP servers as before), but the *orchestration* moves inside. Tool handlers remain "in the middle of every call as a control surface, able to inspect, reject, log, or queue for human approval." All 5 reasons-to-promote-to-tool benefits are preserved; the composition tax disappears.

## Concrete metrics (Opus 4.6 with PTC)

Across **BrowseComp** (https://cdn.openai.com/pdf/5e10f4ab-d6f7-442e-9508-59515c65e35d/browsecomp.pdf) and **DeepsearchQA** (Google DeepMind) benchmarks:

- **+11% accuracy** on average
- **−24% input tokens**

Opus 4.6 + PTC ranked **#1 on LMArena's Search Arena**. PTC is **now built into the `web_search_20260209` tool** by default — when you use Anthropic's web search tool, PTC handles the orchestration under the hood without you needing to opt in.

```json
{
  "model": "claude-opus-4-6",
  "max_tokens": 4096,
  "tools": [
    {
      "type": "web_search_20260209",
      "name": "web_search"
    }
  ],
  "messages": [
    { "role": "user", "content": "<query>" }
  ]
}
```

## "Is bash all you need?"

> "Just giving Claude a bash tool opens up a broad action space and leads to a common question: **is bash all you need**? And how to decide what other tools to give an agent?"

Lance frames the wiki's [[Action Space Design]] question explicitly: *given* that bash unlocks a broad action space, *when* do you add anything beyond bash? The 5 reasons above are the answer.

## Worked example — search

Without PTC: pull 50 raw search results into Claude's context, reason over them. **Tens of thousands of tokens for a 5-result decision.**

With PTC: code parses, filters, cross-references results programmatically, applies dynamic filtering. **Only what's relevant** reaches Claude.

This is the **"effective agents manage not just *what* enters context, but *when* and *in what form*"** principle from [[Anthropic Effective Context Engineering]] and [[Anthropic Advanced Tool Use]] in concrete form.

## Where this lands in the wiki

- **[[Action Space Design]]** — adds the 5 reasons-to-promote-to-tool framework + "composition tax" framing + "is bash all you need?" question
- **[[Anthropic Advanced Tool Use]]** — adds concrete benchmark metrics (+11% / -24% on BrowseComp + DeepsearchQA; #1 on LMArena Search Arena) and confirms PTC as default in `web_search_20260209`
- **[[Token Efficiency]]** — PTC is candidate for layer 1.5 (code-execution-mediated tool result filtering) — substantiated with metrics
- **[[Multi-Agent Orchestration]]** — PTC's "filter intermediate results in code" is one of the canonical patterns making long autonomous runs cost-feasible

## Cross-references

- [[Thariq - Seeing like an Agent]] (the action-space-design philosophy this operationalizes)
- [[Action Space Design]] (primary anchor)
- [[Anthropic Advanced Tool Use]] (PTC + Tool Use Examples engineering blog)
- [[Anthropic Tool Use Overview]] (the agentic loop primitive PTC builds on)
- [[Token Efficiency]] · [[Multi-Agent Orchestration]]
- [[Lance Martin - Prompt auto-caching with Claude]] (sibling Lance Martin piece on caching)
