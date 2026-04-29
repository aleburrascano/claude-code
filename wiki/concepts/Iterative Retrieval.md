---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 3
tags: [pattern, subagents, context-engineering, retrieval]
---

# Iterative Retrieval

A [[Subagents|subagent]] design pattern where context is **progressively refined across iterations** rather than gathered all at once. Named by [[Everything Claude Code (affaan-m)|ECC]] as one of their flagship skills.

The problem this solves: when delegating to a subagent, you don't always know upfront what context it needs. Sending too little brief means failure; sending too much wastes tokens. Iterative retrieval lets the subagent **request more as needed**.

## The shape

```
Main agent → Subagent (initial brief)
     ←  "Need more context about X"
Main agent (provides X) → Subagent
     ←  "Need spec for Y"  
Main agent (provides Y) → Subagent
     ←  Result
```

Each iteration narrows what's needed. The subagent doesn't get the entire conversation; it gets a focused initial brief and pulls more on demand.

## Why it matters

For [[Token Efficiency]]:
- Subagent's context stays small (only what's actually used)
- Main agent's context isn't passed wholesale (its own tokens preserved)
- Works at scale — large codebases where you couldn't possibly pre-fetch all relevant context

For [[Reducing Hallucinations]]:
- Subagent doesn't *invent* missing context (a common failure mode of fixed-brief subagents)
- It asks for what it needs; main agent provides specifically
- Misalignment surfaces early ("the subagent is asking about X — did I scope this wrong?")

For [[Context Engineering]]:
- Forces explicit context-passing rather than implicit shared state
- Makes context dependencies legible

## Comparison to alternatives

### Fixed-brief subagent
Send everything you think the subagent needs upfront. Risk: missing critical context → subagent fabricates / fails. Or sends too much → token waste.

### Iterative retrieval (this pattern)
Send minimal initial brief. Subagent requests more. Bounded by communication cost.

### Full-conversation subagent
Pass the entire conversation history. Maximally informed. But maximally expensive and prone to context rot. Defeats the purpose of [[Subagents|subagent context isolation]].

The right shape depends on the task. Iterative retrieval is best when:
- You can't predict what the subagent will need
- The cost of asking is low
- Multiple iterations are tolerable

## Implementations

### [[Everything Claude Code (affaan-m)|ECC iterative-retrieval skill]]
Named flagship of the framework. Skills/iterative-retrieval/ provides explicit pattern guidance.

### [[claudekit (Carl Rannaberg)|claudekit research-expert]] (variant)
Similar shape but writes findings to disk; main agent reads summary. Iterative-retrieval mode where the "iterations" are file-system handoffs.

### [[Boris Cherny Tips Compendium|Boris's "use subagents for context management"]]
> "Will I need this tool output again, or just the conclusion?"

This *implies* iterative retrieval — the subagent collects what's needed and returns the conclusion. The exact iteration mechanism is per-implementation.

### MCP-based progressive disclosure (per [[claude-mem (thedotmack)|claude-mem]])
The 3-layer search → timeline → get_observations pattern is iterative retrieval applied to memory. Coarse search first, refine in subsequent calls.

## Anti-patterns

- **Excessive iteration** — if a subagent makes 20 round-trips for context, the brief was wrong. Re-design with more upfront.
- **Iteration without termination** — subagent keeps asking for more context indefinitely. Set bounds.
- **Iterative retrieval for trivial work** — overhead exceeds benefit. Direct execution is fine.
- **Treating each iteration as independent** — main agent should track what's been provided to avoid re-sending.

## When iterative retrieval is right

- Long-form research subagents
- Codebase exploration of unfamiliar territory
- Tasks where the question evolves as work progresses
- Cases where context-passing cost is meaningfully high

## When it's not

- Well-scoped tasks (use a fixed brief)
- Time-critical operations (each iteration adds latency)
- Stateless operations (no context to retrieve)

## Cross-references

- [[Subagents]] · [[When to Delegate to Subagents]]
- [[Context Engineering]] · [[Token Efficiency]]
- [[Everything Claude Code (affaan-m)]] (canonical implementation)
- [[claude-mem (thedotmack)]] (3-layer pattern as memory analog)
- [[Agentic Search vs RAG]] (agentic search IS iterative retrieval applied to corpora)
