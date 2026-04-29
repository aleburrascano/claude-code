---
type: person
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [people, typescript, claude-code, educator]
---

# Matt Pocock

TypeScript educator and tooling author; runs aihero.dev and the @total-typescript brand. Active in the Claude Code community; ships skills aimed at "real engineering, not vibe coding."

## Relevance to mastering Claude Code

Maintains [[Matt Pocock Skills|`mattpocock/skills`]] — a personal directory of Claude Code skills covering planning, development, tooling, and writing. Notable contributions to the wiki's focus areas:

- **`write-a-skill`** — meta-skill for skill construction, with progressive disclosure and bundled resources. One of four converging meta-skills in the wiki ([[Skill Building]]).
- **`tdd`** — RED-GREEN-REFACTOR per [[Vertical Slice]]. Canonical Claude-Code-flavored TDD implementation.
- **`to-prd` / `to-issues`** — synthesize conversation into PRDs and decompose into vertical-slice issues. Emblematic of his "conversation-as-source" pattern.
- **`grill-me`** — relentless interview about a plan until every branch is resolved. Surfaces hidden assumptions ([[Reducing Hallucinations]]).
- **`obsidian-vault`** — search/manage Obsidian vault with wikilinks. Notable for our setup specifically; he has tooling for the exact pattern this wiki implements.
- **`git-guardrails-claude-code`** — hook-based blocking of dangerous git commands.

## Distribution model

Pocock distributes skills via `npx skills@latest add mattpocock/skills/<name>` — fine-grained, single-skill installation. Notable contrast to plugin-bundle distribution. Lets users pick individual skills without committing to a framework.

## Author framing

The "real engineers, not vibe coding" framing in his README is doing real work — signals that his skills assume software-engineering discipline (PRDs, TDD, DDD, vertical slices, type safety). They're tools for *sustained* engineering work, not one-shot generation.

## Newsletter / community

Runs the aihero.dev newsletter ("Sign Up To The Newsletter — ~60,000 devs"). Active educator across TypeScript, AI tooling, and Claude Code spaces.

## Cross-references

- [[Matt Pocock Skills]] · [[Skill Building]] · [[Vertical Slice]] · [[Test-Driven Development with Claude]]
- [[Reducing Hallucinations]] · [[Skills]]
