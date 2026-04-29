---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 5
tags: [pattern, subagents, reasoning-quality, multi-agent, test-time-compute]
---

# Test Time Compute

The principle that **more compute applied at evaluation time produces better results**, especially when that compute takes the form of **multiple agents in separate context windows** — even when those agents use the same underlying model.

The most important framing in our wiki for *why* multi-agent patterns work. Source: [[Boris Cherny Tips Compendium|Boris Cherny's March 10, 2026 tips]].

## The core insight

> "The more tokens you throw at a coding problem, the better the result."

Not just inference-speed optimization. The strategic claim: **separate context windows beat single agents** even with identical underlying models.

> "The same underlying model performing different cognitive roles produces better collective results."

Why? Because:
- One agent introduces a bug → another agent (same model, fresh context) catches it
- Independent contexts approach problems with **different logical pathways**
- Errors decorrelate when contexts decorrelate
- Mirrors human team dynamics — code review by colleagues catches what authors miss

## Boris's prediction

> "Agents will probably write perfect bug-free code — until then, multiple uncorrelated context windows tends to be a good approach."

So Test Time Compute is the **right pattern for now** while AI is good-but-imperfect. As AI improves, the pattern's value decreases. But "for now" is at least the next several model generations.

## Implications for our wiki's focus

### For [[Reducing Hallucinations]]
A single agent may confidently produce plausible-sounding but incorrect code. **Independent verification agents working from separate contexts catch these fabrications more reliably than the original generator.** Hallucination is structurally reduced by uncorrelated cognitive paths.

### For [[Subagents]]
Re-frames subagents:
- **NOT** primarily a cost-optimization measure (though they save context tokens)
- **YES** primarily **cognitive diversity engines**

Each subagent's separate context = different reasoning pathway = uncorrelated failures.

### For [[Reasoning Quality]] (and reasoning generally)
Quality improvements come not from cleverer individual agents but from **orchestrating multiple perspectives toward convergence**.

### For [[Token Efficiency]]
Counter-intuitive: spending MORE tokens (multiple agents) can yield BETTER outcomes per dollar than spending FEWER tokens (single agent making more revisions). The metric is "tokens per shipped quality unit," not "raw tokens per turn."

## Implementations of Test Time Compute

Multiple resources in the wiki implement TTC patterns:

| Source | Implementation |
|---|---|
| [[claudekit (Carl Rannaberg)]] | **6-aspect parallel review** — 6 subagents (architecture, security, performance, testing, quality, docs) on the same diff |
| [[Superpowers (obra)]] | **Two-stage subagent review** — spec-compliance subagent → code-quality subagent |
| [[Context Engineering Kit (NeoLabHQ)]] | **MAKER pattern** — multi-agent voting; **SADD** with judge verification + retry |
| [[BMAD-METHOD]] | **Party Mode** — multiple agent personas collaborating in real-time |
| [[Get Shit Done (gsd-build)]] | **Wave-based parallelization** — independent plans run simultaneously |
| [[gstack (Garry Tan)]] | **`/pair-agent`** — multiple AI vendors (CC, Codex, Hermes) shared browser |
| [[Compound Engineering Plugin]] | **`/ce-code-review`** — multi-agent review |
| [[Self-Consistency Prompting\|Self-Consistency]] | (technique) sample N reasoning paths, take majority |
| [[Tree of Thoughts]] | (technique) generate + evaluate multiple thought candidates |
| **Anthropic's own `/code-review`** | "Team of agents runs deep review on every PR" (per Boris) |

The convergence is striking. Many independent groups have arrived at variants of "more compute via multiple agents."

## Cost-quality framing

TTC inverts the usual frame:

| Wrong frame | Better frame |
|---|---|
| "How few tokens can I use?" | "How many tokens does shipped quality require?" |
| "One smart agent" | "N agents whose errors decorrelate" |
| "Optimize prompt for accuracy" | "Sample multiple completions; aggregate" |

For [[Token Efficiency]]: the cheapest token is the one you don't have to retry. Multi-agent review prevents the retry — net token cost may be *lower*, not higher.

## When TTC is right

- Code review (multiple aspects need independent attention)
- Critical changes (where a missed bug is expensive)
- Novel problems (where a single approach may not be best)
- Spec validation (where misalignment is hardest to self-detect)

## When TTC is overkill

- Trivial changes (typo fixes, single-line obvious changes)
- Pure-deterministic operations (use bash/scripts, not agents)
- Tightly time-constrained operations (latency cost of multiple agents > value)

## Anti-patterns

- **Multiple agents on the same context** — defeats the purpose. The whole point is fresh contexts.
- **Multiple agents without aggregation** — getting many opinions without synthesizing them is just noise.
- **TTC for trivial work** — overhead exceeds benefit.
- **Same model + same prompt + multiple times** — at least vary the role/system prompt to get genuinely different reasoning.

## Cross-references

- [[Subagents]] · [[When to Delegate to Subagents]]
- [[Reducing Hallucinations]] · [[Reasoning Quality]] (if/when written)
- [[Self-Consistency Prompting]] · [[Tree of Thoughts]] · [[Prompt Engineering Techniques]]
- Sources: [[Boris Cherny Tips Compendium]] (Mar 10 tip is canonical) · [[claudekit (Carl Rannaberg)]] · [[Superpowers (obra)]] · [[Context Engineering Kit (NeoLabHQ)]] · [[Encyclopedia of Agentic Coding Patterns]] · [[Karpathy LLM Coding Notes (Dec 2025)|Karpathy's leverage framing]] (*"LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go"* — same insight as Boris's TTC, arrived at independently)
