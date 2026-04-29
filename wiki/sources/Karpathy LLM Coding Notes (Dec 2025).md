---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [karpathy, foundational, primary-source, llm-coding, phase-shift]
source_path: raw/notes/Karpathy LLM Coding Notes.md
source_date: 2025-12 (approx)
source_author: Andrej Karpathy
source_url: https://x.com/karpathy/status/2015883857489522876
---

# Karpathy LLM Coding Notes (Dec 2025)

The original [[Andrej Karpathy]] X post that became the basis for [[Karpathy Coding Principles|the four principles]] (via [[Andrej Karpathy Skills (forrestchang)|forrestchang's CLAUDE.md]]). Pasted by Alessandro after WebFetch couldn't access X.

For our wiki, this is the **canonical primary source** for the LLM-coding-pitfalls observations. The forrestchang CLAUDE.md is one *operationalization* of the observations; this is the observations themselves, in full context.

## What's here that wasn't in the principles distillation

The four-principles CLAUDE.md captured the *failure modes*. The original tweet has much more:

### The phase-shift framing
> "LLM agent capabilities (Claude & Codex especially) have crossed some kind of threshold of coherence around December 2025 and caused a phase shift in software engineering and closely related."

> "Easily the biggest change to my basic coding workflow in ~2 decades of programming and it happened over the course of a few weeks."

Karpathy locates the phase shift specifically in **December 2025**. Pre-shift: 80% manual + autocomplete, 20% agents. Post-shift: 80% agent, 20% edits+touchups.

### Mistakes have *changed character*
> "They are not simple syntax errors anymore, they are subtle conceptual errors that a slightly sloppy, hasty junior dev might do."

Pre-LLM: machines made syntax errors, humans made conceptual errors. Post-LLM: machines now make conceptual errors. Implication for [[Reducing Hallucinations]]: the defenses must operate at the conceptual layer (TDD, spec-driven, surgical changes), not just the syntax layer (linters, type checkers).

### The CLAUDE.md is necessary but not sufficient
> "All of this happens despite a few simple attempts to fix it via instructions in CLAUDE.md."

Karpathy himself notes that CLAUDE.md alone doesn't fix the failure modes. This justifies the wiki's [[Reducing Hallucinations|stack-of-defenses approach]] — discipline (CLAUDE.md) + verification (TDD) + structural (hooks, sandboxing, classifier) + meta (compound learning).

### Tenacity as the new capability
> "It's a 'feel the AGI' moment to watch it struggle with something for a long time just to come out victorious 30 minutes later. You realize that stamina is a core bottleneck to work and that with LLMs in hand it has been dramatically increased."

Stamina-as-bottleneck is the right framing for [[Ralph Wiggum Technique]] and autonomous loops. The Ralph joke isn't that the loop is smart; it's that **stamina was the missing capability humans don't have**, and LLM tenacity supplies it.

### Leverage = goal-driven execution + declarative
> "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go. Get it to write tests first and then pass them. Put it in the loop with a browser MCP. Write the naive algorithm that is very likely correct first, then ask it to optimize it while preserving correctness. **Change your approach from imperative to declarative to get the agents looping longer and gain leverage.**"

The "imperative → declarative" shift is the critical insight. Most users prompt imperatively ("add validation"). The leverage is in **declarative success criteria** ("invalid inputs should fail with X message; valid inputs should pass; here are 5 examples"). This generalizes [[Karpathy Coding Principles|Goal-Driven Execution]] to the workflow level.

> "Write the naive algorithm that is very likely correct first, then ask it to optimize it while preserving correctness."

This is a specific technique not captured elsewhere in the wiki. Right shape: build correctness first, then optimize. Easier for the model than building correct-and-fast in one step. Worth folding into [[Karpathy Coding Principles]] as a related technique.

### Speedup vs expansion
> "Certainly it's speedup, but it's possibly a lot more an expansion."

Two distinct effects:
1. **Speedup**: faster at what you'd do anyway
2. **Expansion**: doing things you wouldn't have done at all (because not worth it before, or beyond your skill)

Karpathy thinks expansion >> speedup. This reframes productivity claims from [[Boris Cherny Tips Compendium|Boris (141 PRs/day)]], [[gstack (Garry Tan)|Garry Tan (810×)]], [[Daniel Rosehill|Daniel Rosehill (75+ repos)]] — these are mostly *expansion* (doing things they wouldn't have done at all), not just doing the same things faster.

### Atrophy as a real phenomenon
> "I've already noticed that I am slowly starting to atrophy my ability to write code manually. Generation (writing code) and discrimination (reading code) are different capabilities in the brain."

Important caveat for prolific Claude Code use. Discrimination (reading code) survives; generation (writing code) atrophies. Worth knowing — and worth deciding whether to preserve manual-coding muscle memory through deliberate practice if needed for your career.

### The "10X engineer" question
> "What happens to the '10X engineer' - the ratio of productivity between the mean and the max engineer? It's quite possible that this grows *a lot*."

Open question; likely consequence: leverage compounds for those who structure their work well. The wiki's focus areas (skill building, context engineering, etc.) are the systematizable inputs to "max engineer" output.

### Generalists vs specialists question
> "Armed with LLMs, do generalists increasingly outperform specialists? LLMs are a lot better at fill in the blanks (the micro) than grand strategy (the macro)."

Karpathy's hypothesis: macro thinking (architecture, strategy) becomes more important; micro execution (specific syntax, framework details) commoditizes. Aligns with [[12 Factor Agents (HumanLayer)|12 Factor Agents Factor 8]] ("Own Your Control Flow") — the human owns the orchestration, the LLM does the implementation.

### "Slopacalypse" warning for 2026
> "I am bracing for 2026 as the year of the slopacalypse across all of github, substack, arxiv, X/instagram, and generally all digital media."

Real concern. The wiki's [[Reducing Hallucinations|verification discipline]] is one defense; choosing high-signal sources (and avoiding generic LLM-generated content) is another. Worth keeping in mind when ingesting future sources — quality > quantity, even more so as content volumes grow.

## What this means for the wiki

Several existing pages should reflect Karpathy's full framing:

- [[Karpathy Coding Principles]] — already captures the four principles; should add the **imperative → declarative shift** and **naive-then-optimize** techniques.
- [[Reducing Hallucinations]] — Karpathy's "subtle conceptual errors not syntax errors" framing strengthens the case for conceptual defenses.
- [[Andrej Karpathy]] — significantly expanded with full context.
- [[Ralph Wiggum Technique]] — Karpathy's stamina-as-bottleneck framing is the philosophical basis for why Ralph loops work.
- [[Test Time Compute]] — Karpathy's "leverage" framing aligns with Boris's TTC argument; both about getting more from the model via structural design.

## My assessment

This is among the most important sources in the wiki because:

1. **It's the original.** Other sources cite or operationalize it; this is the foundation.
2. **It's broader than the four principles.** The full notes cover phase-shift framing, expansion vs speedup, atrophy, the open questions about engineering structure. The principles distillation captures one slice.
3. **It's from Karpathy.** Founding member of OpenAI, deep theoretical and practical perspective. When he says "phase shift in December 2025," that's calibrated language.

For Alessandro: read the raw file in full. The principles you've already absorbed (via forrestchang); the broader framing is what makes this primary source uniquely valuable.

Cross-references: [[Andrej Karpathy]] · [[Karpathy Coding Principles]] · [[Andrej Karpathy Skills (forrestchang)]] (the operationalization) · [[Reducing Hallucinations]] · [[Test Time Compute]] · [[Ralph Wiggum Technique]] · [[Compound Engineering]] · [[12 Factor Agents (HumanLayer)]]
