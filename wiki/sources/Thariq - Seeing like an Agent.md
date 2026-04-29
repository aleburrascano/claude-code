---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, anthropic, tool-design, action-space, foundational]
source_path: raw/articles/Thariq - Seeing like an Agent.md
source_date: 2026-02-28 (approx)
source_author: Thariq (Anthropic engineer)
source_url: https://x.com/trq212/status/2027463795355095314
---

# Thariq — Seeing like an Agent

[[Thariq|Thariq's]] foundational article on **how to design the action space (tool set) of an agent harness**. Captured via Obsidian Web Clipper after WebFetch couldn't reach X.

For our wiki, this is the canonical primary source for **tool design philosophy** in Claude Code. Closes one of the deferred items from previous rounds.

## The framing — "see like an agent"

> "To put myself in the mind of the model I like to imagine being given a difficult math problem. What tools would you want in order to solve it? It would depend on your own skills!"

The math-problem analogy:
- **Paper** = minimum, manual calculations only
- **Calculator** = better, but you must know how to operate advanced options
- **Computer** = fastest + most powerful, but requires writing/executing code

Implication: tools should be **shaped to the model's abilities**. To know those abilities: pay attention, read its outputs, experiment. **See like an agent.**

This is a different framing from "design tools for the user's needs." Tools must match what the model can productively use.

## Lesson 1 — Improving Elicitation: the AskUserQuestion tool

The problem: Claude could ask questions in plain text but answering them felt friction-heavy. How to lower friction + raise communication bandwidth?

### Attempt #1: Editing the ExitPlanTool
Added a `questions` parameter to `ExitPlanTool` alongside the plan.

**Why it failed**: confused Claude. Asking for plan AND questions about the plan simultaneously created ambiguity. What if user answers conflicted with the plan? Two ExitPlanTool calls?

### Attempt #2: Changing Output Format
Modified Claude's instructions to output bullet-point questions with bracketed alternatives (parsed as UI).

**Why it failed**: not guaranteed. Claude appended extra sentences, omitted options, used different formats. Markdown parsing is fragile.

### Attempt #3: The AskUserQuestion tool ✓
A tool Claude can call at any point, prompted especially during plan mode. When called, displays modal with questions; **blocks the agent's loop until user answers**.

**Why it worked**:
- Structured output (tool call schema) instead of markdown parsing
- Ensures multiple options
- Composable (callable from Agent SDK, referenceable in skills)
- **Most important**: Claude *liked* calling this tool — model affinity matters

> "Even the best designed tool doesn't work if Claude doesn't understand how to call it."

This is a **load-bearing insight**. Tool design must consider whether the model will *want* to use the tool. Not just "is it well-defined?" but "does the model recognize this as the right shape?"

## Lesson 2 — Updating with Capabilities: Tasks vs Todos

Original Claude Code: **TodoWrite tool** + system reminders every 5 turns reminding Claude of its goal. Models needed help staying on track.

As models improved (Opus 4.5+):
- They no longer needed Todo reminders
- Worse: reminders **constrained** them — Claude felt obligated to stick to the list rather than modify it
- Subagents couldn't coordinate on a shared Todo List

The replacement: **Task Tool**. Where Todos kept models on track, Tasks help **agents communicate**:
- Tasks include dependencies
- Share updates across subagents
- Model can alter and delete

> "As model capabilities increase, the tools that your models once needed might now be constraining them. It's important to constantly revisit previous assumptions on what tools are needed. This is also why it's useful to stick to a small set of models to support that have a fairly similar capabilities profile."

**Implication for the wiki**: this is the canonical primary on why TodoWrite was deprecated and replaced by `/tasks` (referenced by [[shanraisshan Claude Code Best Practice|shanraisshan]]). The pattern generalizes: **tools designed for past-model limitations may actively impair current models**. Periodically re-audit the tool set.

## Lesson 3 — Designing a Search Interface

Original Claude Code: **RAG vector database** for context.

Problems with RAG:
- Required indexing and setup
- Fragile across environments
- **Claude was given context instead of finding it itself**

The shift: give Claude a **Grep tool** + let it search its own context. **"If Claude could search on the web, why not search your codebase?"**

> "As Claude gets smarter, it becomes increasingly good at building its context if it's given the right tools."

### Progressive disclosure — formalized via Skills
[[Skills]] formalized the idea: agents incrementally discover relevant context through exploration. Skill files reference other files; Claude reads recursively.

> "Over the course of a year Claude went from not really being able to build its own context, to being able to do nested search across several layers of files to find the exact context it needed."

This is the **canonical primary source for [[Agentic Search vs RAG|the agentic-search-beats-RAG insight]]**. Not just Boris's claim — Thariq's article is the engineering account of how Claude Code abandoned RAG in favor of grep + progressive disclosure.

## Lesson 4 — Progressive disclosure as alternative to adding tools

Claude Code has ~20 tools. **Bar to add a new tool is high** — each new tool is one more option for the model to consider.

Example: Claude didn't know how to use Claude Code itself (MCP setup, slash commands).

### Could have: stuffed it all into the system prompt
But would add **context rot** and interfere with Claude Code's main job.

### Tried: link to docs Claude could load
Worked, but Claude loaded too many results into context to find one answer.

### Built: Claude Code Guide subagent
Subagent prompted to be called when user asks about Claude Code itself. Has extensive instructions on how to search docs well + what to return.

**Pattern**: add functionality without adding a tool — use [[Subagents|subagents]] or [[Skills|skills]] with progressive disclosure instead.

## "An art, not a science"

> "If you were hoping for a set of rigid rules on how to build your tools, unfortunately that is not this guide. Designing the tools for your models is as much an art as it is a science. It depends heavily on the model you're using, the goal of the agent and the environment it's operating in.
>
> Experiment often, read your outputs, try new things. See like an agent."

## Implications for our wiki

Multiple existing pages should reflect Thariq's framing:

- [[Skills]] — Lesson 4 is the canonical source for "high bar to add tools, use skills/subagents instead"
- [[Subagents]] — the Claude Code Guide subagent is the textbook "extend without adding tools" pattern
- [[Agentic Search vs RAG]] — Lesson 3 is the canonical engineering account of why CC abandoned vector search
- [[Skill Building]] — model-affinity insight ("Claude must like the tool") is design constraint
- [[Memory]] — Tasks-vs-Todos transition is the canonical TodoWrite-deprecation story
- [[Plugins]] — high-bar-to-add-tools justifies plugin namespacing + opt-in
- [[Reducing Hallucinations]] — model-affinity insight is structural ("if model doesn't recognize the tool, it won't use it correctly")

## My assessment

This article is **foundational** — among the most important sources in the wiki. It's:

1. **From an Anthropic engineer who built parts of Claude Code** — authoritative on intent
2. **The actual reasoning behind design choices** — not "here's how to use it" but "here's why we built it this way"
3. **Generalizable beyond Claude Code** — the math-problem analogy applies to any agent harness

Three principles to internalize:

1. **Model affinity matters as much as tool definition.** A perfect schema that the model doesn't naturally call is useless.
2. **Tool sets should evolve with model capabilities.** What helped past models constrains current ones.
3. **Adding to action space ≠ adding tools.** Use subagents, skills, progressive disclosure when possible.

Pair with [[Thariq - Prompt Caching Is Everything]] for the full Anthropic-engineer perspective on Claude Code design philosophy.

Cross-references: [[Thariq]] · [[Skills]] · [[Subagents]] · [[Agentic Search vs RAG]] · [[Skill Building]] · [[Memory]] · [[Plugins]] · [[Thariq Anthropic Skills + Sessions]] (the prior consolidated source page)
