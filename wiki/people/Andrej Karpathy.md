---
type: person
created: 2026-04-26
updated: 2026-04-27
sources: 3
tags: [people, ai-researcher, ai-coding, foundational-thinker]
---

# Andrej Karpathy

Computer scientist, prominent AI/deep learning voice. **Founding member of OpenAI**; former Tesla AI director. Educator (deep-learning lecture series, "Neural Networks: Zero to Hero").

For our wiki, Karpathy matters as the source of the **most-cited public observations about LLM coding pitfalls** (Dec 2025), which became the basis for [[Karpathy Coding Principles]] via [[Andrej Karpathy Skills (forrestchang)|forrestchang's CLAUDE.md]].

The full source: [[Karpathy LLM Coding Notes (Dec 2025)]] (original X post, pasted into the wiki since WebFetch can't access X).

## Why his perspective is load-bearing

Three reasons Karpathy's observations carry weight:

1. **Calibrated language.** When Karpathy says "phase shift in December 2025," he means it. He's not a hype merchant; he's a theoretical researcher who also ships.
2. **Practitioner credibility.** "I rapidly went from about 80% manual+autocomplete coding and 20% agents in November to 80% agent coding and 20% edits+touchups in December." He's writing from his own daily practice.
3. **Naming failure modes precisely.** The observations distill to specific, recognizable failure modes (wrong assumptions, overcomplication, surgical-violation) that other practitioners then operationalized.

## Key insights (from the Dec 2025 notes)

### The four pitfalls (which became [[Karpathy Coding Principles]])
1. **Wrong assumptions made silently** — "they don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should, and they are still a little too sycophantic"
2. **Overcomplication** — "implement an inefficient, bloated, brittle construction over 1000 lines... when you can be like 'umm couldn't you just do this instead?' and they will be like 'of course!' and immediately cut it down to 100 lines"
3. **Side-effect changes** — "still sometimes change/remove comments and code they don't like or don't sufficiently understand as side effects"
4. **Goal-Driven Execution as the leverage** — "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go"

### Beyond the principles

- **Phase shift Dec 2025** — the moment LLM coding crossed a coherence threshold. Pre-shift: 80% manual; post-shift: 80% agent. "Easily the biggest change to my basic coding workflow in ~2 decades of programming."
- **Mistakes are now conceptual, not syntactic** — defenses must operate at the conceptual layer (see [[Reducing Hallucinations]]).
- **Tenacity = stamina-as-bottleneck removed** — agents don't tire. This is the philosophical basis for [[Ralph Wiggum Technique|Ralph loops]] and autonomous work generally.
- **Speedup vs expansion** — "It's possibly a lot more an expansion." You do *more things* you wouldn't have done at all, not just the same things faster. Reframes productivity claims like [[Boris Cherny Tips Compendium|Boris's "141 PRs/day"]] as expansion-driven.
- **Atrophy of generation, not discrimination** — "Generation (writing code) and discrimination (reading code) are different capabilities in the brain." Manual-coding skill atrophies; reading code doesn't. Real tradeoff to know about.
- **Imperative → declarative shift** — "Change your approach from imperative to declarative to get the agents looping longer and gain leverage." The single biggest workflow shift.
- **Naive-then-optimize** — "Write the naive algorithm that is very likely correct first, then ask it to optimize it while preserving correctness." Specific technique.
- **CLAUDE.md alone insufficient** — "All of this happens despite a few simple attempts to fix it via instructions in CLAUDE.md." Justifies stack-of-defenses thinking.

### Open questions Karpathy raised

- **What happens to the "10X engineer" ratio?** Likely grows a lot.
- **Generalists vs specialists?** LLMs better at micro (fill-in-the-blanks) than macro (grand strategy). Generalists likely benefit more.
- **What does LLM coding feel like in the future?** Like StarCraft? Factorio? Playing music?
- **How much of society is bottlenecked by digital knowledge work?**

These are productive questions to keep in mind as the discipline matures.

### "Slopacalypse" — 2026 prediction

> "I am bracing for 2026 as the year of the slopacalypse across all of github, substack, arxiv, X/instagram, and generally all digital media."

Worth keeping in mind when ingesting future sources. **Quality > quantity, increasingly.** The wiki's discipline of focused source pages with explicit "my assessment" sections defends against this.

## Why this matters for our wiki specifically

For Alessandro's focus areas, Karpathy's framing is foundational:

- For [[Reducing Hallucinations]]: Karpathy named the failure modes; the wiki's defenses (TDD, surgical changes, spec-driven dev, hooks) are responses to specific named failures.
- For [[Test Time Compute]]: Karpathy's "leverage" insight aligns with Boris's TTC argument. Both claim that structural design (multiple agents, declarative criteria, naive-then-optimize) extracts more value from the model than clever single-agent prompting.
- For [[Ralph Wiggum Technique]]: Karpathy's stamina-as-bottleneck framing is the philosophical basis. Ralph loops work *because* tenacity is the new abundance.
- For [[Compound Engineering]]: the imperative-→-declarative shift compounds. Each declarative spec is reusable; each imperative request is one-off.

## The `/raw` folder workflow as external reference point

Karpathy keeps a `/raw` folder where he drops papers, tweets, screenshots, and notes — a Memex-style personal knowledge corpus. The wiki you are reading uses the same pattern (this vault's `raw/` folder).

The pattern has now graduated beyond Karpathy's personal practice. **[[graphify (safishamsi)]] cites Karpathy's `/raw` folder explicitly** as the use case it serves: *"Andrej Karpathy keeps a `/raw` folder where he drops papers, tweets, screenshots, and notes. graphify is the answer to that problem — 71.5x fewer tokens per query vs reading the raw files, persistent across sessions, honest about what it found vs guessed."*

This is one of the cleanest examples of an individual's working pattern becoming a tool design target. graphify could in principle be run on this very vault — same shape of corpus.

## Cross-references

- [[Karpathy LLM Coding Notes (Dec 2025)]] (the full source, the original observations)
- [[Karpathy Coding Principles]] (the four-principles distillation)
- [[Andrej Karpathy Skills (forrestchang)]] (the CLAUDE.md operationalization)
- [[graphify (safishamsi)]] (the tool that explicitly serves Karpathy's `/raw` folder pattern)
- [[Second Brain]] / [[Memex]] (the broader pattern Karpathy's `/raw` folder instantiates)
- [[Reducing Hallucinations]] · [[Test Time Compute]] · [[Ralph Wiggum Technique]]
- [[Boris Cherny]] (the practitioner counterpart at Anthropic)
