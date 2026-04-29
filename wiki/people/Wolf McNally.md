---
type: person
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [people, ai-coding, patterns, encyclopedia-author]
---

# Wolf McNally

Author of the [[Encyclopedia of Agentic Coding Patterns]] (aipatternbook.com) — a 245-entry compendium of patterns, antipatterns, and concepts for building software with AI agents. The wiki's canonical secondary source for agentic-coding pattern lookup.

## Relevance to mastering Claude Code

McNally treats agentic coding as a distinct engineering discipline, not just "regular coding with an AI helper." The Encyclopedia's largest section (44 entries on **Agentic Software Construction**) is the signal — he's arguing the new discipline needs its own pattern language.

Three things make his work load-bearing for the wiki:

1. **Pattern-language format** — Context, Problem, Forces, Solution, Consequences, Related Patterns. Classical Alexander/Coplien/Gamma style. Once you understand one entry, you can navigate the rest. Worth borrowing for our own pattern pages.

2. **Inclusion of antipatterns** — 9 explicit "what not to do" entries. Most pattern catalogs only positively define patterns; antipatterns turn the encyclopedia into a *judgment* document.

3. **Inclusion of supporting concepts** — 57 concept entries support the patterns. Captures the underlying ideas that recur across patterns.

## Notable patterns most relevant to our focus

(Section titles; full treatment requires reading individual entries.)

For [[Context Engineering]]: Context Engineering, Prompt, Tool, Model, MCP, Subagent, Human in the Loop, RAG Poisoning (antipattern).

For [[Reducing Hallucinations]]: Bounded Autonomy, Agent Trap (antipattern), Human in the Loop.

## Author philosophy

> "Agentic coding is a paradigm shift, not merely applying existing patterns to AI."

The 44-entry *Agentic Software Construction* section is McNally's bet on this claim. Worth treating seriously; he's not the first to argue agentic coding is its own discipline, but the encyclopedia is currently the most *structured* articulation.

## Accessibility

aipatternbook.com — free web access. Keyboard navigation (`←`/`→` chapters, `S` search). Print functionality for offline use.

## Use this in the wiki

When ingesting a new source and you find a pattern you want to name, check the Encyclopedia first — McNally has likely already named it. This:
- Avoids wiki-internal naming collisions
- Connects the wiki to a broader vocabulary
- Lets cross-references span beyond Claude-Code-only sources

## Cross-references

- [[Encyclopedia of Agentic Coding Patterns]] (the work)
- [[Context Engineering]] · [[Reducing Hallucinations]] · [[Subagents]]
- [[Claude Code Ecosystem]]
