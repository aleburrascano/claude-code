---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [prompt-engineering, papers, research, reference, dair-ai]
source_url: https://www.promptingguide.ai/papers
source_author: DAIR.AI (Elvis Saravia)
---

# Prompt Engineering Papers Reference

The papers section of [[Prompt Engineering Guide (dair-ai)]]. Curated catalog of prompt-engineering research papers organized into 4 categories: **Overviews, Approaches, Applications, Collections**.

For our wiki, this is the **canonical research paper reference** for the techniques covered in [[Prompt Engineering Techniques]].

## Foundational survey papers (5 essentials)

If reading only a few, prioritize these:

| Paper | Date | Why |
|---|---|---|
| **The Prompt Report: A Systematic Survey of Prompting Techniques** | June 2024 | Most recent comprehensive taxonomy — the modern reference |
| **Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in NLP** | July 2021 | Foundational framework distinguishing prompting from fine-tuning |
| **A Survey of Large Language Models** | April 2023 | Broad LLM landscape; useful context |
| **Reasoning with Language Model Prompting: A Survey** | December 2022 | Reasoning-specific |
| **A Survey for In-context Learning** | December 2022 | How models learn from demonstrations |

**For Claude Code mastery**: The Prompt Report (June 2024) is the highest-leverage single read. It's the most-current canonical taxonomy.

## Landmark technique papers

The original papers introducing techniques covered in [[Prompt Engineering Techniques]]:

| Technique | Paper | Date |
|---|---|---|
| **Chain-of-Thought** | "Chain of Thought Prompting Elicits Reasoning in Large Language Models" | Jan 2022 |
| **Self-Consistency** | "Self-Consistency Improves Chain of Thought Reasoning in Language Models" | Mar 2022 |
| **Tree of Thoughts** | "Tree of Thoughts: Deliberate Problem Solving with Large Language Models" | May 2023 |
| **ReAct** | "ReAct: Synergizing Reasoning and Acting in Language Models" | Oct 2022 |
| **RAG** | "Demonstrate-Search-Predict: Composing retrieval and language models for knowledge-intensive NLP" | Dec 2022 |
| **ART** | "ART: Automatic multi-step reasoning and tool-use for large language models" | Mar 2023 |

## Domain-specific application papers

- **Code Generation**: "Exploring Chain-of-Thought Style Prompting for Text-to-SQL" (May 2023)
- **Medical/Healthcare**: "Towards Expert-Level Medical Question Answering with Large Language Models" (May 2023)
- **Scientific**: "Learning to Generate Novel Scientific Directions with Contextualized Literature-based Discovery" (May 2023)
- **Business**: "Large Language Models in the Workplace: A Case Study on Prompt Engineering for Job Type Classification" (Mar 2023)
- **Dialogue**: "PLACES: Prompting Language Models for Social Conversation Synthesis" (Feb 2023)

## Recent papers (2023-2024) worth knowing

- **"Chain-of-Verification Reduces Hallucination in Large Language Models"** (September 2023) — direct relevance for [[Reducing Hallucinations]]
- **"LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models"** (October 2023) — relevant for [[Token Efficiency]]
- **"Enhancing Zero-Shot Chain-of-Thought Reasoning in Large Language Models through Logic"** (February 2024)
- **"The Prompt Report: A Systematic Survey of Prompting Techniques"** (June 2024) — already noted

## What to prioritize for our focus areas

### For [[Reducing Hallucinations]]
- **CoT** paper — establishes that reasoning steps help
- **Self-Consistency** — variance reduction via sampling
- **Chain-of-Verification** (Sept 2023) — explicit verification mechanism

### For [[Token Efficiency]]
- **LLMLingua** — prompt compression
- **The Prompt Report** — technique survey
- Papers on prompt chaining (decomposing prompts)

### For [[Skill Building]] / agent design
- **ReAct** — the agent loop pattern (Claude Code IS a ReAct system)
- **ART** — tool use selection and composition
- **Tree of Thoughts** — branching exploration

### For [[Reasoning Quality]] (if/when written)
- **CoT** + **Self-Consistency** + **ToT** stack
- **The Prompt Report** for the broader taxonomy

## Why read the originals

Three reasons to read the actual papers, not just summaries:

1. **The intuition is in the failure modes** — papers explain *why* a technique works by showing where simpler approaches fail. Summaries usually skip this.
2. **Empirical results calibrate expectations** — "X% improvement" framings (and on which tasks) prevent over-applying techniques.
3. **The limitations sections** — what doesn't work and why. Often more valuable than the headline contribution.

## Format / accessibility

All papers linked from [promptingguide.ai/papers](https://www.promptingguide.ai/papers). Free links to arXiv where available.

## My assessment

For our wiki, this is **deep reference, not active reading**. Most Claude Code mastery doesn't require reading research papers — the wiki's concept pages, source pages, and topic syntheses cover what matters operationally.

**When research papers do matter**:
- When designing novel skills/subagents and you want to understand the underlying technique
- When debugging why a particular prompting pattern isn't working as expected
- When evaluating a new technique someone proposes ("is this actually new, or a rediscovery?")
- For the rigor of seeing empirical results rather than blog post claims

For Alessandro: bookmark the page; read **The Prompt Report (June 2024)** if/when you have a few hours and want comprehensive grounding. Otherwise, treat this as lookup-when-needed.

Cross-references: [[Prompt Engineering Guide (dair-ai)]] (the parent reference) · [[Prompt Engineering Techniques]] (the wiki's catalog of techniques) · [[Encyclopedia of Agentic Coding Patterns]] (pattern-level reference) · [[Reducing Hallucinations]] · [[Token Efficiency]]
