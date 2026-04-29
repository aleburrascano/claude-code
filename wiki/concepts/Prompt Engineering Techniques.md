---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 5
tags: [pattern, prompt-engineering, reasoning, techniques, llm-general]
---

# Prompt Engineering Techniques

A reference catalog of named prompt-engineering techniques relevant to Claude Code mastery. Drawn from the [[Prompt Engineering Guide (dair-ai)|DAIR.AI Prompt Engineering Guide]] (the canonical LLM-general reference) plus the [[Encyclopedia of Agentic Coding Patterns]] and ecosystem implementations.

These are **technique-level** primitives. They show up across many wiki concepts — when you see "the LLM samples multiple paths" or "let's think step by step," it's one of these.

---

## 1. Chain-of-Thought (CoT)

**What**: The model articulates intermediate reasoning steps before reaching conclusions. Decomposes problems into logical sequences.

**Why it works**: Explicit reasoning helps navigate complex problems; tracks logical dependencies; reduces error cascades. Most valuable for math, multi-step reasoning, careful analysis.

**Variants**:
- **Few-Shot CoT** — combine reasoning with example demonstrations
- **Zero-Shot CoT** — append "Let's think step by step" without examples (surprisingly effective)
- **Auto-CoT** — automated example crafting via clustering questions and generating CoT examples

**When to use**: Mathematical problem-solving, logical deduction, multi-step processes, analytical questions.

**When NOT**: Straightforward factual retrieval, classification, simple pattern matching. CoT adds overhead without value.

**Claude Code analog**: [[Extended Thinking]] is essentially CoT scaled into a model-level mode. The "ultrathink" keyword in skills triggers extended thinking. Per [[Karpathy Coding Principles]] "Think Before Coding" — the discipline-level version.

---

## 2. Self-Consistency

**What**: Sample N reasoning paths via CoT independently → take majority answer.

**Why it works**: Errors decorrelate across independent samples. Variance reduction.

**When to use**: Arithmetic, logical deduction, commonsense — tasks with deterministic answers where multiple attempts converge on truth.

**Cost tradeoff**: N samples = N× tokens. Use when accuracy justifies cost.

**Claude Code analog**: [[Test Time Compute]] is the same idea applied to subagents — multiple agents with separate contexts converge on better answers. [[Context Engineering Kit (NeoLabHQ)|NeoLabHQ's MAKER pattern]] (multi-agent voting) is direct.

---

## 3. Tree of Thoughts (ToT)

**What**: Branching exploration. At each step, generate multiple thought candidates; evaluate; prune; advance promising ones; lookahead before committing.

**vs CoT**: CoT assumes a single optimal path. ToT acknowledges complex problems benefit from exploring multiple candidates simultaneously.

**Mechanism**: BFS/DFS-like search over thought-trees. The LM generates AND evaluates ("sure / maybe / impossible"). Pruning keeps top ~5.

**When to use**: Math (Game of 24), strategic problems requiring decomposition, scenarios where early decisions cascade, problems with multi-step viable solutions.

**Cost**: Multiple LM invocations per step (generation + evaluation + variations). Significantly more expensive than CoT.

**Claude Code analog**: [[Subagents]] running in parallel exploring different solution branches; [[Context Engineering Kit (NeoLabHQ)|FPF reasoning]] with hypothesis competition; [[gstack (Garry Tan)|`/design-shotgun`]] generating 4-6 design variants.

---

## 4. ReAct (Reason + Act)

**What**: Alternating sequence of reasoning traces and task-specific actions:
1. **Thought** — articulate reasoning
2. **Action** — execute a tool / API call / search
3. **Observation** — feed results back into reasoning
4. (Loop)

**Why it matters**: Bidirectional interaction with external systems. Mitigates fact hallucination by grounding in retrieved data. Improves human interpretability and trustworthiness.

**Claude Code is essentially a ReAct system.** Per [[Learn Claude Code (shareAI-lab)]] session 2-5: the agent loop IS Reason→Act→Observe. Tool handlers are the action layer; tool results are the observation layer; reasoning happens in the model.

When you write skills or design subagents, you're shaping the Action+Observation legs of ReAct loops.

---

## 5. Generate Knowledge

**What**: Generate facts before answering. Decompose: first prompt the model for relevant background; then prompt with that background as context.

**Why it works**: Surfaces what the model knows explicitly; allows you (or another agent) to verify before depending on it.

**Claude Code analog**: [[jeffallan claude-skills|`/common-ground`]] does exactly this — Claude states what it believes about your project, then proceeds. Surfaces hidden assumptions.

---

## 6. Prompt Chaining

**What**: Multi-step prompts where outputs feed into subsequent prompts. Stage the work.

**vs Monolithic prompts**: Easier to debug; each stage's output reviewable; smaller context per stage.

**Claude Code analogs**: [[Compound Engineering Plugin|/ce-brainstorm → /ce-plan → /ce-work → /ce-review → /ce-compound]] is a 5-stage prompt chain. [[Spec Kit (github)|Spec Kit's constitution → specify → clarify → plan → tasks → implement]] is a 6-stage chain. [[Get Shit Done (gsd-build)|GSD's `gsd-new-project → gsd-discuss → gsd-plan → gsd-execute → gsd-verify → ship`]] is similar.

---

## 7. Retrieval-Augmented Generation (RAG)

**What**: Embed query → retrieve relevant docs from vector DB → concatenate with prompt → generate.

**See [[Agentic Search vs RAG]]** for the full treatment. Boris's claim: agentic search beats RAG for code.

---

## 8. Active-Prompt

**What**: Curate few-shot examples actively (not randomly). Identify which examples will most improve performance, then use those.

**Implication**: Quality of examples > quantity. One well-chosen example often beats five random ones.

---

## 9. Directional Stimulus Prompting

**What**: Hint-based steering. Small explicit hints in the prompt direct the model toward desired behavior without verbose instructions.

**Claude Code analog**: `[ALWAYS]`, `[IMPORTANT]`, `<important if="...">` tags ([[Boris Cherny Tips Compendium|per Boris]]) — small directional hints embedded in CLAUDE.md.

---

## 10. Program-Aided Language Models (PAL)

**What**: Generate code, run code, return result. The model offloads computation to a code interpreter.

**Claude Code analog**: Bash + Python tools are PAL's natural habitat. When Claude generates a script and runs it, that's PAL. Especially valuable for math and exact computation where models hallucinate.

---

## 11. Adversarial Prompting (and defenses)

The risks side: prompt injection, prompt leaking, jailbreaking. **See [[Reducing Hallucinations]] and the Encyclopedia's "RAG Poisoning" antipattern** for the wiki's coverage.

Defenses:
- **Instruction hardening** (warn the model about attacks in system prompt)
- **Input parameterization** (separate instructions from user inputs)
- **Formatting techniques** (XML tags, quotes, JSON encoding)
- **Adversarial detection** (separate evaluator model)
- **Model selection** (fine-tuned > instruction-tuned for robustness)

For Claude Code specifically:
- [[Hooks|parry]] (prompt-injection scanner)
- [[Everything Claude Code (affaan-m)|AgentShield]] (red-team/blue-team adversarial pipeline)
- [[gstack (Garry Tan)|gstack's layered defense]] (22MB ML classifier + Haiku verification + canary tokens)
- [[Sandboxing]] (limits damage of injected commands)

---

## 12. Multimodal CoT

**What**: Vision + text reasoning. Particularly relevant when working with screenshots, diagrams, UIs.

**Claude Code analog**: Per [[Boris Cherny Tips Compendium|Boris]], take screenshots and share with Claude when stuck. Use [[Claude Code|Computer Use]], Chrome extension, or Playwright MCP for UI verification. The screenshot-to-fix-loop is multimodal CoT in action.

---

## 13. Graph Prompting

**What**: Graph-structured prompts where nodes/edges express relationships explicitly.

**When useful**: Tasks involving structured relationships (knowledge graphs, code dependencies, organizational hierarchies).

**Claude Code analog**: ASCII diagrams in CLAUDE.md ([[Boris Cherny Tips Compendium|Boris recommends them heavily]]). Get Shit Done's wave-based parallelization is graph-shaped (DAG of dependencies).

---

## How to use this catalog

This page is a **lookup**, not a how-to. When you encounter:
- "The agent samples multiple paths" → that's Self-Consistency or Test Time Compute
- "Let's think step by step" → that's Zero-Shot CoT
- "Generate the spec, then implement against it" → that's Prompt Chaining
- "Run this script and use the output" → that's PAL

Knowing the names lets you:
1. Look up established literature on the technique
2. Recognize the same pattern in different ecosystems
3. Compose techniques deliberately (CoT + Self-Consistency = robust reasoning; ReAct + RAG = fact-grounded action)

## Cross-references

- [[Prompt Engineering Guide (dair-ai)]] — canonical primary source for technique definitions
- [[Prompt Engineering Papers Reference]] — the academic-papers layer underneath this catalog (research-paper citations for each technique)
- [[Encyclopedia of Agentic Coding Patterns]] — pattern-level treatment built on these techniques
- [[Reducing Hallucinations]] · [[Test Time Compute]] · [[Agentic Search vs RAG]]
- [[Karpathy Coding Principles]] (Think Before Coding ≈ CoT discipline)
- [[Extended Thinking]] (CoT scaled to model-level mode)
