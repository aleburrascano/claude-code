---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [agent-design, framework, principles, foundational, humanlayer]
source_url: https://github.com/humanlayer/12-factor-agents
source_author: HumanLayer team
---

# 12 Factor Agents (HumanLayer)

A foundational framework articulating principles for production-ready LLM agent design, modeled on the [12-Factor App](https://12factor.net/) methodology. By the [[HumanLayer]] team.

For our wiki, this is the **canonical principle reference** for agent system design — analogous to what [[Encyclopedia of Agentic Coding Patterns]] is for patterns. Where the Encyclopedia gives you patterns to apply, 12 Factor Agents gives you principles to test designs against.

## The 12 factors

### Foundations
1. **Natural Language to Tool Calls** — Convert unstructured input into structured actions. Separates language understanding from execution; makes behavior predictable, debuggable, auditable.
2. **Own Your Prompts** — Treat prompts as versioned, manageable code, not magic strings. Enables systematic improvement.
3. **Own Your Context Window** — Deliberately engineer what reaches the model. Context engineering = output quality. (Maps directly to wiki's [[Context Engineering]].)
4. **Tools Are Just Structured Outputs** — Tool definitions are output schemas. Don't treat them as magical framework constructs.

### State and execution
5. **Unify Execution State and Business State** — One source of truth for operational + system state. Separate tracking → debugging nightmares.
6. **Launch/Pause/Resume with Simple APIs** — Checkpointing for graceful failure recovery. Simple state serialization beats clever framework.
7. **Contact Humans with Tool Calls** — Human intervention as an explicit tool. Makes [[HumanLayer|human-in-the-loop]] testable and controllable.
8. **Own Your Control Flow** — Write explicit orchestration. Frameworks obscure subtle bugs.

### Operational
9. **Compact Errors into Context Window** — Distill error info for the model. Don't dump raw stack traces.
10. **Small, Focused Agents** — Specialized > monolithic. Smaller scopes → reliability + testability + understandability. (Maps to [[Subagents]] and [[When to Delegate to Subagents]].)
11. **Trigger from Anywhere, Meet Users Where They Are** — Webhooks, cron, queues. Don't force new infrastructure.
12. **Make Your Agent a Stateless Reducer** — Pure function transforming state. Simplifies testing, scaling, concurrency reasoning.

## The cross-cutting insight

> "Good agents are mostly software, not mostly LLM."

Production AI agents are **deterministic code with LLM steps sprinkled in at the right points** — not LLM all the way down. The framework warns against frameworks that obscure this reality. Pragmatism over purity: take small modular concepts and incorporate them into existing products. Greenfield rewrites are usually impossible.

## Why this matters for our wiki

### Maps to existing focus areas

| Factor | Wiki page |
|---|---|
| 3 (Own Your Context Window) | [[Context Engineering]] |
| 4 (Tools Are Just Structured Outputs) | [[Skills]], [[Model Context Protocol]] |
| 7 (Contact Humans with Tool Calls) | [[HumanLayer]], [[Reducing Hallucinations]] |
| 9 (Compact Errors into Context) | [[Token Efficiency]] |
| 10 (Small, Focused Agents) | [[Subagents]], [[When to Delegate to Subagents]] |
| 12 (Stateless Reducer) | [[Subagents]] design pattern |

### Adds principle layer above patterns

The wiki has tactical patterns (TDD, vertical slice, spec-driven) and concept pages (Skills, Subagents, Hooks). 12 Factor Agents adds the **principle layer above both** — what to test designs against. When making design choices for the wiki itself or for new skills, run them through the 12 factors.

## My assessment

12 Factor Agents is **foundational reading**. Even if you don't formally adopt every factor, the framing shapes good design instincts. Recommended for anyone building Claude Code skills or agents at scale.

Specific principles I'd adopt without question:

- **Factor 3 (Own Your Context Window)** — never accept "the framework handles context." You own it.
- **Factor 4 (Tools Are Just Structured Outputs)** — clarifies what tools are; cuts through framework mysticism.
- **Factor 10 (Small, Focused Agents)** — operationalizes [[When to Delegate to Subagents]] from a different angle.
- **Factor 12 (Stateless Reducer)** — explains why [[Subagents]] with fresh contexts work.

Specific principles worth *understanding* before adopting:

- **Factor 8 (Own Your Control Flow)** — sometimes framework-driven loops are right (Claude Code's agent loop is well-engineered). The principle is right *with judgment*.
- **Factor 12 (Stateless Reducer)** — applies to subagents cleanly; main session is necessarily stateful.

The "AI is mostly software" framing is the most important takeaway. **Resist the temptation to make everything an LLM call** — deterministic bash, scripts, and code are usually better for the deterministic parts.

Cross-references: [[HumanLayer]] · [[Context Engineering]] · [[Subagents]] · [[Reducing Hallucinations]] · [[Skill Building]] · [[Token Efficiency]] · [[Encyclopedia of Agentic Coding Patterns]] · [[Claude Code Ecosystem]]
