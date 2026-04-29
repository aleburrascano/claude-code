---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, skills, claude-md, hallucination-reduction, principles]
source_path: raw/repos/forrestchang-andrej-karpathy-skills.md
source_date: 2026-04-26
source_author: forrestchang (Jiayuan, x.com/jiayuan_jy)
source_url: https://github.com/forrestchang/andrej-karpathy-skills
---

# Andrej Karpathy Skills (forrestchang)

A single [[Memory|CLAUDE.md]] file (also installable as a [[Plugins|plugin]]) that distills [[Andrej Karpathy]]'s public observations on LLM coding pitfalls into four concrete operating principles for Claude Code. Short, opinionated, high-leverage — the entire intervention fits in one file.

## The pitfalls Karpathy named

> "The models make wrong assumptions on your behalf and just run along with them without checking. They don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should."

> "They really like to overcomplicate code and APIs, bloat abstractions, don't clean up dead code... implement a bloated construction over 1000 lines when 100 would do."

> "They still sometimes change/remove comments and code they don't sufficiently understand as side effects, even if orthogonal to the task."

## The four principles ([[Karpathy Coding Principles]])

| Principle | Addresses |
|---|---|
| **Think Before Coding** | Wrong assumptions, hidden confusion, missing tradeoffs |
| **Simplicity First** | Overcomplication, bloated abstractions |
| **Surgical Changes** | Orthogonal edits, touching code you shouldn't |
| **Goal-Driven Execution** | Leveraging LLMs' looping ability via verifiable success criteria |

Detailed treatment lives in [[Karpathy Coding Principles]]; this source is the canonical primary for that page.

## Key Karpathy insight

> "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go."

The "Goal-Driven Execution" principle operationalizes this: transform imperative tasks ("add validation") into verifiable goals ("write tests for invalid inputs, then make them pass"). Strong success criteria let the model loop independently; weak ones force constant clarification.

## Installation paths

- **Plugin**: `/plugin marketplace add forrestchang/andrej-karpathy-skills` then `/plugin install andrej-karpathy-skills@karpathy-skills`
- **Per-project [[Memory|CLAUDE.md]]**: `curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md`

Also ships a Cursor rule (`.cursor/rules/karpathy-guidelines.mdc`) so the same principles apply in Cursor.

## Tradeoff the author flags

These principles bias toward **caution over speed**. For trivial tasks (typo fixes, obvious one-liners), the full rigor is overkill — use judgment. The goal is reducing costly mistakes on non-trivial work, not slowing down trivial ones.

## My assessment

The most under-appreciated of the four is *Goal-Driven Execution*. Most users phrase requests imperatively; the principle suggests rephrasing them as verification loops. This single reframe pays for itself.

The principles also align tightly with what other ecosystem resources are converging on independently — see [[Superpowers (obra)]] (mandatory workflows, RED-GREEN-REFACTOR), [[Compound Engineering Plugin]] (review-as-pattern-recognition), and the [[claudekit (Carl Rannaberg)|claudekit]] hook system (verification before completion). When several thoughtful authors arrive at the same principles independently, they're worth treating as load-bearing.

Cross-references: [[Karpathy Coding Principles]] · [[Reducing Hallucinations]] · [[Memory]] · [[Andrej Karpathy]] · [[Claude Code Ecosystem]]
