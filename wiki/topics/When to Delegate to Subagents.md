---
type: topic
created: 2026-04-26
updated: 2026-04-26
sources: 6
tags: [topic, focus, subagents, delegation, parallelism]
---

# When to Delegate to Subagents

A decision framework for when [[Subagents]] earn their cost — and when they're overhead. Synthesizes patterns across the wiki's deep-dive sources.

The core fact (per [[Learn Claude Code (shareAI-lab)]]):

> "Subagents isolate noise. Each subtask spawns a fresh `messages[]` array, preventing reasoning clutter in the main conversation."

That's the *unique* benefit. Everything else (parallelism, specialization) is downstream of context isolation.

---

## The decision tree

```
Does the task produce verbose tool output (long file reads, repo scans, web fetches)?
  → YES: Subagent worth it (keeps verbosity out of main context).

Does the task need a specialized prompt or different model?
  → YES: Subagent worth it (claudekit's domain experts).

Will the task likely fail or get stuck?
  → YES: Subagent worth it (failure stays isolated).

Could the task run in parallel with other work?
  → YES: Subagent enables it.

Is the task a few lines of work the main agent can do directly?
  → NO subagent. Overhead exceeds benefit.

Does the task require tight iteration with the main agent?
  → NO subagent. The hand-off cost dominates.

Does interpretation of the result require full conversation context?
  → NO subagent. The brief can't carry enough.
```

---

## Five worked patterns

### 1. Long file reads / repo scans → research subagent
**Pattern**: spawn a research subagent with a focused brief, have it read deeply, return a summary.
**Bonus**: write findings to `/tmp/` ([[claudekit (Carl Rannaberg)|claudekit research-expert pattern]]) so the main agent reads only the summary.
**Token win**: huge. The verbose output never enters main context.

### 2. Code review → 6-aspect parallel review ([[claudekit (Carl Rannaberg)]])
**Pattern**: spawn six subagents on the same diff simultaneously — architecture, security, performance, testing, quality, documentation. Each is held to its single concern.
**Why parallel**: prevents one reviewer from trading off concerns ("the security issue is fine because the tests cover most cases…"). Each subagent is structurally incapable of that trade.
**Result merging**: main agent synthesizes findings.

### 3. Implementation → spec-then-quality two-stage ([[Superpowers (obra)|Superpowers SDD]])
**Pattern**: subagent A reviews against spec; subagent B reviews code quality; then code merges.
**Why staged**: spec validation first prevents *clean implementation of wrong thing*.

### 4. Domain-specific work → specialist subagent ([[claudekit (Carl Rannaberg)|claudekit's 20+ experts]])
**Pattern**: route TypeScript questions to typescript-expert, React to react-expert, database to database-expert, etc.
**Why**: domain-loaded prompt + tool restrictions produce a different (better-informed) reasoning path. Same model, better context.

### 5. Parallel exploration → multiple subagents on alternatives
**Pattern**: "design this interface — spawn 3 subagents, each with a different design philosophy, return their candidates" ([[Matt Pocock Skills|`mattpocock/skills/design-an-interface`]]).
**Why**: explores the design space wider than sequential thinking would; main agent picks the best.

---

## The cost calculus

Each subagent invocation:
- Spawns a new context (model cost — usually amortizes via the verbose-output savings)
- Cannot see main conversation history (what's needed must be passed in the brief)
- Returns a single text result (unless it writes to disk for richer artifacts)
- Adds latency (especially for sequential subagent chains)

Compare against doing it directly:
- Main agent has full context, fast iteration, no hand-off
- But pollutes main context with intermediate work

The pivot point: **how much intermediate "noise" would the work generate, vs. how much shared context is the work using?**

- Lots of noise + little shared context → subagent
- Little noise + lots of shared context → direct
- Lots of noise + lots of shared context → hardest case; consider a brief-loaded subagent or splitting the work

---

## Specific design choices in subagent definitions

### Tool restrictions
A subagent with full tool access can drift outside its task. Restrict in the agent's frontmatter (`tools: [Read, Grep]` etc.).

### Description discipline
Same as [[Skills]] and [[Memory]] — descriptions name trigger conditions explicitly, not just capabilities.

### Model selection
Subagents can use different models. [[claudekit (Carl Rannaberg)]]'s `oracle` uses GPT-5 as a different perspective. For most cases, same model is fine.

### Verification step
For mission-critical subagents, the calling agent should verify the result before acting. Don't take subagent output on faith.

---

## Anti-patterns

- **Subagent for trivial work** — the overhead (context spawn, brief writing, result interpretation) exceeds the work. Use directly.
- **No tool restrictions** — subagent drifts into territory unrelated to its task.
- **Subagent stack-up** — subagents calling subagents calling subagents. Tracking state becomes impossible. Limit nesting.
- **Vague descriptions** — same as skills; the description must signal *when* to delegate.
- **Briefs that lack the spec** — subagents can't see the conversation. The brief is everything.
- **Treating subagent output as verified** — the subagent might be wrong. Verify, especially for code-producing subagents.
- **Mandatory delegation everywhere** — [[claudekit (Carl Rannaberg)|claudekit]]'s mandatory-delegation rule is opinionated; for trivial work it's friction. Use judgment.

---

## Subagents and our focus areas

For [[Token Efficiency]]: subagents are a **major** lever. Verbose tool outputs that would otherwise pollute main context can be entirely contained in a subagent.

For [[Reducing Hallucinations]]: parallel review patterns ([[claudekit (Carl Rannaberg)|claudekit's 6-aspect]], [[Superpowers (obra)|Superpowers two-stage]]) catch what a single reviewer would miss or normalize away.

For [[Context Engineering]]: subagents *force* context engineering. The brief is everything; if the brief is bad, the subagent fails. This pressure improves discipline.

For [[Skill Building]]: any skill that does verbose work should consider spawning a subagent rather than doing the work in-context. Saves the calling session's context for the actual reasoning.

---

## Cross-references

- [[Subagents]] (the primitive)
- [[Skills]] · [[Hooks]] · [[Memory]]
- [[Token Efficiency]] · [[Reducing Hallucinations]] · [[Context Engineering]]
- Sources: [[claudekit (Carl Rannaberg)]] (20+ experts, 6-aspect review) · [[Superpowers (obra)]] (subagent-driven development) · [[Context Engineering Kit (NeoLabHQ)]] (SADD) · [[Learn Claude Code (shareAI-lab)]] (architectural rationale) · [[Matt Pocock Skills]] (parallel design exploration) · [[Claude Code System Prompts (Piebald)]] (delegation prompt)
