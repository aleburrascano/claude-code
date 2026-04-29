---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [prompt-engineering, llm, reference, meta-guide]
source_path: raw/repos/dair-ai-Prompt-Engineering-Guide.md
source_date: 2026-04-26
source_author: Elvis Saravia (DAIR.AI)
source_url: https://github.com/dair-ai/Prompt-Engineering-Guide
---

# Prompt Engineering Guide (dair-ai)

Comprehensive prompt-engineering reference by Elvis Saravia (DAIR.AI). Reached #1 on Hacker News in 2023. 3M+ learners. Web version at [promptingguide.ai](https://www.promptingguide.ai/).

For our wiki, this source is the **canonical reference for prompt-engineering techniques** at the LLM-general level (not Claude Code specific). It complements [[Encyclopedia of Agentic Coding Patterns]] (which is *agent*-pattern-focused) by covering the *prompt*-level techniques those patterns build on.

## What it covers

The guide is structured as a tree of topics, with the most useful sections being **Techniques** and **Risks**.

### Techniques (the 14 named techniques)
- **Zero-Shot Prompting** — no examples
- **Few-Shot Prompting** — N examples
- **[[Chain-of-Thought]] (CoT) Prompting** — "let's think step by step"
- **Self-Consistency** — sample multiple CoT paths, take majority answer
- **Generate Knowledge Prompting** — generate facts before answering
- **Prompt Chaining** — multi-step prompts that pass results
- **Tree of Thoughts (ToT)** — branching exploration with pruning
- **Retrieval Augmented Generation (RAG)** — fetch context, then generate
- **Automatic Reasoning and Tool-use (ART)** — interleave reasoning + tool calls
- **Automatic Prompt Engineer (APE)** — LLM generates and evaluates prompts
- **Active-Prompt** — curate examples actively
- **Directional Stimulus Prompting** — hint-based steering
- **Program-Aided Language Models (PAL)** — generate code, run code, return result
- **ReAct Prompting** — Reason + Act loop with tool use
- **Multimodal CoT** — vision + text reasoning
- **Graph Prompting** — graph-structured prompts

### Risks
- **Adversarial Prompting** — prompt injection, jailbreaks
- **Factuality** — hallucination
- **Biases**

### Other sections
- LLM Settings (temperature, top-p, max tokens)
- Prompt Elements
- General Tips for Designing Prompts
- Prompt Hub (categorized example prompts)
- Models (model-specific guidance for ChatGPT, GPT-4, Gemini, Llama, Mistral, etc.)
- Papers, Tools, Notebooks, Datasets, Additional Readings

## Why this matters for our wiki

Many of these techniques recur in the Claude Code ecosystem under different names:

| Technique | Claude Code analog |
|---|---|
| **Chain-of-Thought (CoT)** | [[Extended Thinking]]; standard in [[Karpathy Coding Principles]] "Think Before Coding" |
| **Self-Consistency** | [[Context Engineering Kit (NeoLabHQ)\|MAKER pattern]] (multi-agent voting) |
| **Tree of Thoughts** | [[Context Engineering Kit (NeoLabHQ)\|ToT exploration]] in their FPF reasoning |
| **Prompt Chaining** | Most multi-skill workflows; [[Compound Engineering]] cycle |
| **RAG** | Less central to Claude Code (per Boris's "[[Agentic Search vs RAG\|agentic search > RAG]]" insight) |
| **ReAct** | The core Claude Code agent loop (per [[Learn Claude Code (shareAI-lab)]]) |
| **PAL** | Bash/script execution within reasoning; built into Claude Code |
| **Adversarial Prompting** | Covered by [[Hooks\|prompt-injection scanners]] like parry; [[Everything Claude Code (affaan-m)\|AgentShield]] adversarial pipeline |

The guide is **technique-level**, our wiki's [[Encyclopedia of Agentic Coding Patterns]] is **pattern-level**, and the deep-dive sources are **implementation-level**. Stack them: technique informs pattern informs implementation.

## Standout techniques relevant to our focus

For [[Reducing Hallucinations]]:
- **Chain-of-Thought** — surface reasoning steps; assumptions become inspectable.
- **Self-Consistency** — multiple paths, take majority; reduces single-path errors.
- **Generate Knowledge** — explicit fact generation before reasoning; reduces fabrication.
- **Active-Prompt** — high-quality examples beat many low-quality ones.

For [[Context Engineering]]:
- **Few-Shot Prompting** — examples are context; choose them deliberately.
- **Prompt Chaining** — staged context delivery rather than monolithic prompts.
- **Directional Stimulus** — small hints that steer the model.

For [[Token Efficiency]]:
- **Prompt Chaining** — short prompts in sequence vs one giant one.
- **APE** — generated prompts are often shorter and more targeted than human-written.

## Where the guide is weak (for our purposes)

- Not Claude-specific (LLM-general). Anthropic-specific quirks (prompt caching, tool use, system prompt structure) aren't covered here. Use [[Claude Code System Prompts (Piebald)]] for that.
- Pre-dates the agentic-coding wave to a large extent. The agent-loop, tool-use, and harness-engineering layers (per [[Learn Claude Code (shareAI-lab)]]) get less coverage than they deserve in 2026.
- Heavy focus on text completions; less on multi-turn agent workflows.

## Companion resources

- DAIR.AI Academy courses on prompt engineering, RAG, and AI Agents (paid).
- The web version (promptingguide.ai) has the most up-to-date content.
- The repo has a slide deck and a 1-hour video lecture by Elvis Saravia.
- Notebook with code: `notebooks/pe-lecture.ipynb`.

## My assessment

For Claude Code mastery, this is **secondary reading**, not primary. The Claude Code-specific resources in our wiki cover most of what matters operationally. But for the *theoretical underpinning* — why CoT works, what RAG actually does, how Self-Consistency reduces variance — this is the right reference.

Especially valuable when:
- You're trying to understand *why* a Claude Code pattern works (not just how to use it).
- You're building your own prompts at the API level (where [[Claude Code]] harness assistance doesn't apply).
- You're curious about techniques the Claude Code ecosystem hasn't yet adopted (e.g., active-prompt, APE).

Worth bookmarking the web version. Worth reading the Risks section in particular (adversarial prompting, factuality).

License: MIT.

Cross-references: [[Encyclopedia of Agentic Coding Patterns]] · [[Prompt Engineering Techniques]] (concept page) · [[Reducing Hallucinations]] · [[Context Engineering]] · [[Extended Thinking]]
