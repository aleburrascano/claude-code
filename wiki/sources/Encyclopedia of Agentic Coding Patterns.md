---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, patterns, encyclopedia, reference]
source_url: https://aipatternbook.com/
source_author: Wolf McNally
---

# Encyclopedia of Agentic Coding Patterns

A 245-entry pattern compendium for building software with AI agents, by [[Wolf McNally]]. Free web access. Spans strategic decisions ("what to build") to tactical implementation ("directing agent workflows"). For this wiki, **the meta-reference**: when a pattern recurs across multiple sources, this encyclopedia probably has a name and a treatment for it.

## Composition

- **179 patterns** — recommended approaches
- **9 antipatterns** — explicit "what not to do"
- **57 concepts** — supporting ideas

The mix of patterns + antipatterns + concepts is unusual for a pattern catalog. Most catalogs only list patterns; the antipatterns here turn the encyclopedia into a *judgment* document, not just a catalog.

## Pattern format

Each entry follows a consistent structure (classical pattern-language style):
- **Context** — when this applies
- **Problem** — what you're trying to solve
- **Forces** — competing pressures
- **Solution** — the pattern
- **Consequences** — what you give up
- **Related Patterns** — how it composes

This format makes the encyclopedia *learnable* — once you understand one entry, you can navigate the rest.

## Major sections

| Section | Entries | Theme |
|---|---|---|
| Product & Strategy | 19 | What to build and why |
| Intent & Scope | 12 | Decision-making before coding |
| Structure & Decomposition | 18 | System architecture |
| Data, State, Truth | 25 | Information consistency |
| Computation & Interaction | 8 | Algorithms, APIs |
| **Correctness & Testing** | **37** | Quality assurance & evolution |
| Security & Trust | 18 | Threat modeling |
| **Agentic Software Construction** | **44** | Building *with* AI agents |
| Agent Governance & Feedback | 21 | Approval, evaluation, oversight |
| Operations & Change Management | 14 | Deployment, rollback |
| Socio-Technical Systems | 10 | Team & org patterns |
| Design Heuristics & Smells | 13 | Judgment rules, warning signs |

The two largest sections are *Correctness & Testing* (37) and *Agentic Software Construction* (44). The latter being McNally's signal that agentic coding is its own engineering discipline, not just "regular coding with an AI helper."

## Patterns most relevant to our focus

(Names extracted from section titles — full treatment requires reading individual entries.)

For [[Context Engineering]]:
- **Context Engineering** itself
- **Prompt** — foundational pattern for directing agent behavior
- **Tool** — extending agent capabilities
- **MCP** — structured communication
- **Subagent** — task decomposition
- **RAG Poisoning** (antipattern) — preventing contaminated context injection

For [[Reducing Hallucinations]]:
- **Bounded Autonomy** — constraining agent action scope for safety
- **Human in the Loop** — critical feedback mechanisms
- **Agent Trap** (antipattern) — failure modes where agents get stuck

For [[Token Efficiency]]:
- (less direct — token efficiency is a downstream concern of context engineering and subagent patterns above)

For [[Skill Building]]:
- The pattern format itself is a model for skill structure: skills with explicit Context/Problem/Solution sections will be more usable than ad-hoc skill bundles.

## Author's framing

McNally treats agentic coding as "a paradigm shift, not merely applying existing patterns to AI." The 44-entry *Agentic Software Construction* section is the largest in the book, signaling that the new discipline needs its own pattern language.

Notable: the encyclopedia is not Claude-specific. It's model-agnostic. This makes it more durable than a Claude Code-only reference — the patterns survive model upgrades.

## Accessibility

Web-based, free browser access. Keyboard navigation (`←`/`→` chapters, `S` search, `?` help). Print functionality for offline.

## My assessment

When you find yourself reinventing a pattern in the wiki, check here first — McNally has probably named it. The encyclopedia is most useful as a **reference index** during ingest of new sources: "is this pattern already named? does this source contradict an antipattern?"

The patterns are also worth using directly in our wiki:
- The **pattern-language format** (Context/Problem/Forces/Solution/Consequences) is a candidate format for future pattern concept pages we author.
- The **antipatterns** are particularly worth folding into [[Reducing Hallucinations]] and any guidance pages — they pre-name failure modes Alessandro can watch for.

I'd treat this as the wiki's **canonical secondary source** for agentic coding patterns. The deep-dive sources we've ingested cover specific implementations; the encyclopedia covers the underlying patterns those implementations exemplify.

Cross-references: [[Wolf McNally]] · [[Context Engineering]] · [[Reducing Hallucinations]] · [[Subagents]] · [[Claude Code Ecosystem]]
