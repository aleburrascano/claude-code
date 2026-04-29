---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 8
tags: [foundational, academic, research-papers, agents, reasoning, memory, evaluation]
source_path: (no raw — combined catalog of academic papers)
source_date: 2026-04-29
source_author: various academic authors
source_url: (multiple — see entries)
---

# Foundational Papers

Combined catalog of the academic papers the wiki implicitly stands on. The wiki had been citing these by name across multiple pages ([[Prompt Engineering Techniques]] names ReAct, ToT, Reflexion; [[Token Efficiency]] cites the *Lost in the Middle* finding; [[Memory]] uses the constitution-as-document framing) — without the underlying primary sources. This page closes that gap.

This is an **academic root** for the wiki — the papers that the practitioner content and Anthropic engineering posts build on. Compress format chosen (one combined page) per [[Prompt Engineering Papers Reference]]'s precedent.

---

## ReAct: Synergizing Reasoning and Acting in Language Models

**Citation**: Yao et al., 2022. *ReAct: Synergizing Reasoning and Acting in Language Models.* arXiv:2210.03629. ICLR 2023.
**URL**: https://arxiv.org/abs/2210.03629

The foundational pattern for **interleaving reasoning (Thought) with action (Act) and observation (Obs)** in LLM agents. Established the loop shape that nearly every modern agent harness — including [[Claude Code]] — implements:

```
Thought → Action → Observation → Thought → Action → Observation → ...
```

The paper showed reasoning-and-acting jointly outperforms either alone on HotpotQA, FEVER, ALFWorld, WebShop. Key insight: when the model can reason about what to do *between* tool calls, it recovers from errors and adapts in ways that pure-tool-use loops can't.

**Wiki anchors**: [[Prompt Engineering Techniques]] (ReAct as a named technique), [[Anthropic Tool Use Overview]] (the agent loop), [[Action Space Design]] (the model picks tools based on reasoning, not script).

---

## Lost in the Middle: How Language Models Use Long Contexts

**Citation**: Liu et al., 2024. *Lost in the Middle: How Language Models Use Long Contexts.* TACL 2024 (arXiv:2307.03172).
**URL**: https://arxiv.org/abs/2307.03172

The empirical paper behind **context rot**. Showed that LLMs systematically attend better to the **start** and **end** of context than the **middle** — a U-shaped attention curve. Found across multi-document QA and key-value retrieval tasks.

The headline pattern: information placed in the middle of a long context is **substantially less likely to influence output** than the same information at start or end. Context window size alone does not solve this — *position* matters.

**Wiki anchors**: [[Token Efficiency]] (context rot), [[Prompt Caching]] (why the static-first / dynamic-last layout matters: dynamic content is always at the end where attention is highest), [[Anthropic Effective Context Engineering]] (this paper is the empirical foundation for Anthropic's "context rot" framing).

---

## Constitutional AI: Harmlessness from AI Feedback

**Citation**: Bai et al., 2022. *Constitutional AI: Harmlessness from AI Feedback.* arXiv:2212.08073.
**URL**: https://arxiv.org/abs/2212.08073 · https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback

Anthropic's foundational paper on training models with **a constitution** — a set of principles the model is trained to follow, with AI feedback (RLAIF) replacing much of human feedback in the training loop.

The conceptual contribution that the wiki absorbs: **a written document of principles can shape model behavior.** This is the academic root of the [[Memory|"CLAUDE.md as project constitution"]] framing — your CLAUDE.md is to your project what Anthropic's constitution is to Claude. Same primitive, different scope.

**Wiki anchors**: [[Memory]] (constitution-as-document), [[Karpathy Coding Principles]] (drop-in CLAUDE.md as project constitution), [[Spec-Driven Development]] (Spec Kit's "constitution-first" framing inherits this), [[HumanLayer]] (60-line CLAUDE.md exemplar — the practical form), [[Diwank Field Notes]] (production framing of CLAUDE.md as constitution, not tip-jar).

A 2024 extension exists: *Collective Constitutional AI* (Anthropic) — distributed constitution alignment via public input. Worth a separate ingest if it becomes load-bearing.

---

## MemGPT: Towards LLMs as Operating Systems

**Citation**: Packer et al., 2023. *MemGPT: Towards LLMs as Operating Systems.* arXiv:2310.08560.
**URL**: https://arxiv.org/abs/2310.08560 · https://research.memgpt.ai/

The architectural argument for **hierarchical memory in LLM agents** — analogous to OS-level memory hierarchy (registers → cache → RAM → disk). Splits memory into:

- **Main context** (the LLM's prompt, like RAM)
- **External context** (retrieved on demand, like disk)
- **Function calls to manage memory** between them

Influences nearly every modern long-running-agent pattern: [[claude-mem (thedotmack)]] (cross-session compression), [[Anthropic Effective Context Engineering|Anthropic's Memory tool]] (file-based memory outside context), [[Memory|Auto Memory]] (Claude writes notes for next session). All three are operational descendants of the MemGPT thesis.

**Wiki anchors**: [[Memory]], [[Continuous Learning]], [[claude-mem (thedotmack)]], [[Anthropic Effective Context Engineering]].

---

## Tree of Thoughts: Deliberate Problem Solving with Large Language Models

**Citation**: Yao et al., 2023. *Tree of Thoughts: Deliberate Problem Solving with Large Language Models.* arXiv:2305.10601. NeurIPS 2023.
**URL**: https://arxiv.org/abs/2305.10601

The generalization of **chain-of-thought to a tree** — at each step, generate multiple candidate thoughts, evaluate them, prune unpromising branches, expand the best. Outperforms CoT and chain-of-thought-with-self-consistency on Game of 24, Creative Writing, Mini Crosswords.

The wiki's relevance: **structured exploration of the reasoning space** as an alternative to single-path reasoning. [[Prompt Engineering Techniques]] catalogs ToT; [[Test Time Compute]] generalizes the *more compute → better outcomes* argument that ToT exemplifies; [[Multi-Agent Orchestration|parallel exploration]] (multiple subagents on the same problem with different prompts) is a coarser-grained operationalization.

**Wiki anchors**: [[Prompt Engineering Techniques]], [[Test Time Compute]], [[Multi-Agent Orchestration]] (parallel exploration archetype), [[Reducing Hallucinations]] (structured exploration prevents premature commitment to wrong direction).

---

## Reflexion: Language Agents with Verbal Reinforcement Learning

**Citation**: Shinn et al., 2023. *Reflexion: Language Agents with Verbal Reinforcement Learning.* arXiv:2303.11366. NeurIPS 2023.
**URL**: https://arxiv.org/abs/2303.11366

The paper for **self-improvement via verbal feedback** — agents reflect on past failures, store the reflections in memory, and use them to improve future attempts. Achieves 91% on HumanEval (vs 80% for GPT-4 baseline at the time) by iterating with self-reflection.

The wiki's relevance: this is the academic root of [[Continuous Learning]] (instinct systems, skill healing), [[Compound Engineering]] (mistake-into-lesson), and [[Verification Loops]] (the iteration-with-feedback discipline). All three are practical operationalizations of "agent learns from its own past failures via natural-language reflection."

**Wiki anchors**: [[Verification Loops]], [[Continuous Learning]], [[Compound Engineering]], [[Reducing Hallucinations]] (Reflexion's self-correction is a hallucination defense at the agent-loop layer).

---

## Toolformer: Language Models Can Teach Themselves to Use Tools

**Citation**: Schick et al., 2023. *Toolformer: Language Models Can Teach Themselves to Use Tools.* arXiv:2302.04761. NeurIPS 2023.
**URL**: https://arxiv.org/abs/2302.04761

The paper for **self-supervised tool-use training** — models learn to invoke external tools (calculator, search, calendar, etc.) by training on data where tool calls are inserted only where they would have improved next-token prediction. Result: small models become competitive with much larger ones on tasks where tools help.

The wiki's relevance: the academic foundation for **why tools matter**. [[Anthropic Tool Use Overview|Anthropic's claim]] that "tool access is one of the highest-leverage primitives you can give an agent" is the production-deployed form of Toolformer's research thesis. Generalizes to [[Skills]] (pre-defined tool-like capabilities), [[Action Space Design]] (the *which* tools matter as much as the model).

**Wiki anchors**: [[Anthropic Tool Use Overview]], [[Action Space Design]], [[Skills]], [[Model Context Protocol]].

---

## SWE-bench: Can Language Models Resolve Real-World GitHub Issues?

**Citation**: Jimenez et al., 2024. *SWE-bench: Can Language Models Resolve Real-World GitHub Issues?* ICLR 2024.
**URL**: https://www.swebench.com/ · https://arxiv.org/abs/2310.06770

The **benchmark Claude Code is judged on**. Tests an agent's ability to resolve real GitHub issues from 12 popular Python repos: input is an issue + repo state; output is a patch that resolves the issue and passes the test suite.

Per [[Anthropic Tool Use Overview]] and Erik Schluntz's work at Anthropic: Claude 3.5 Sonnet hit **49% SWE-bench Verified** in 2024, up from 33.4%. **SWE-bench Verified** is a curated subset (500 instances, human-verified) used for headline benchmarking.

The benchmark is significant because it measures *what users actually do*: real codebases, real issues, end-to-end resolution including tests. Not synthetic; not unit-level. The wiki's [[Reducing Hallucinations]] / [[Test-Driven Development with Claude]] / [[Verification Loops]] discipline is what gets agents from baseline performance toward SWE-bench-state-of-the-art.

**Wiki anchors**: [[Reducing Hallucinations]] (one-shot rate as evaluation metric), [[Test-Driven Development with Claude]] (the test-suite evaluation shape SWE-bench enforces), [[Anthropic Tool Use Overview]] (cited as a key benchmark), [[Cost Observability Playbook]] (per-task cost benchmarks).

---

## Where this lands in the wiki

This combined page anchors a chain of inheritance:

1. **Academic foundation** (this page) — research papers on agents, reasoning, memory, evaluation
2. **Anthropic engineering posts** ([[Anthropic Effective Context Engineering]], [[Anthropic Advanced Tool Use]]) — production-grounded principles
3. **Anthropic productizations** ([[Anthropic Compaction]], [[Anthropic Tool Search]]) — API-level features
4. **Practitioner sources** ([[Boris Cherny Tips Compendium]], [[Thariq - Prompt Caching Is Everything]]) — how Claude Code engineers actually think
5. **Ecosystem tooling** ([[claudekit (Carl Rannaberg)]], [[Superpowers (obra)]], [[GitNexus (abhigyanpatwari)]], etc.) — operational patterns built on top

Each layer cites the layer beneath. The wiki had layers 2-5 well-covered; layer 1 was implicit. This page makes it explicit.

## Cross-references

- [[Prompt Engineering Techniques]] (ReAct, ToT, Reflexion as named techniques)
- [[Prompt Engineering Papers Reference]] (the broader paper catalog this complements)
- [[Token Efficiency]] · [[Prompt Caching]] (Lost in the Middle as empirical foundation)
- [[Memory]] · [[Continuous Learning]] (MemGPT, Reflexion as memory/learning roots)
- [[Reducing Hallucinations]] · [[Verification Loops]] (Reflexion, Constitutional AI roots)
- [[Action Space Design]] · [[Anthropic Tool Use Overview]] (Toolformer roots)
- [[Test-Driven Development with Claude]] (SWE-bench as the evaluation lens)

## Future additions (Tier 4 backlog)

When relevant work surfaces, add:
- **Self-Consistency** (Wang et al., 2022) — sample N reasoning paths, take majority. Foundation of [[Test Time Compute]].
- **Chain-of-Verification** (Dhuliawala et al., 2023) — model generates verification questions and answers them. Direct relevance to [[Reducing Hallucinations]].
- **Generative Agents** (Park et al., 2023) — long-running agent simulations; relevant to [[Multi-Agent Orchestration]].
- **A-MEM** (2025) — agentic memory paper claiming 85-93% token reduction. Worth tracking if it becomes load-bearing.
- **Mem0** (2025) — production memory architecture; competitive product but architecturally interesting.
- **Terminal-Bench / TerminalBench 2.0** — interactive CLI competence benchmark; sibling to SWE-bench.
- **Collective Constitutional AI** (Anthropic, 2024) — distributed alignment; extension of CAI.
