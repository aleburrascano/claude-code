---
type: overview
created: 2026-04-26
updated: 2026-04-26
sources: 14
tags: [topic, hub, claude-code, goal]
---

# Getting the Most from Claude Code

The wiki's top-level dashboard. Read this first when you sit down to work on Claude Code mastery — it points to the right deeper page for whatever you're optimizing.

The wiki's purpose (per [[CLAUDE]]): get the most out of Claude Code — pushing reasoning, reducing hallucinations, building good context, using skills and subagents well, and not burning tokens needlessly.

---

## The five focus topics

| Topic | When to read it |
|---|---|
| [[Context Engineering]] | You want Claude to *understand your project* better — what to put in CLAUDE.md, when to use skills vs hooks vs memory, priming patterns |
| [[Token Efficiency]] | Your sessions feel expensive, slow, or you hit context limits — system prompt slimming, conversation cloning, compaction, on-demand knowledge |
| [[Reducing Hallucinations]] | Claude is making up APIs / silently picking wrong interpretations / drifting from intent — Karpathy principles, TDD, spec-driven dev, structural defenses |
| [[Skill Building]] | You want to build skills that actually fire and stay maintainable — progressive disclosure, the 500-line rule, activation hooks, meta-skills |
| [[When to Delegate to Subagents]] | You're orchestrating multi-step work — when context isolation pays off, parallel review patterns, anti-patterns |

Each one synthesizes across multiple sources. Each one points to specific repos worth installing or studying.

---

## The Claude Code primitives (quick reference)

If you don't yet have a clean mental model of what Claude Code *is*:

| Primitive | One-line | Page |
|---|---|---|
| [[Slash Commands]] | User-invoked prompts (`/cmd`) | manual shortcut |
| [[Memory]] | CLAUDE.md files loaded every session | persistent context |
| [[Skills]] | Auto-invoked capabilities | model-controlled |
| [[Subagents]] | Isolated-context delegation | task distribution |
| [[Model Context Protocol]] | External tool servers (MCP) | extension |
| [[Hooks]] | Event-triggered shell commands | guardrails + automation |
| [[Plugins]] | Bundles of all the above | distribution |
| [[Checkpoints]] | Conversation/code rewind | safety net |
| [[Planning Mode]] | Plan-before-execute mode | for non-trivial work |
| [[Extended Thinking]] | Deep reasoning toggle (`Alt+T`) | when problem warrants |
| [[Output Styles]] | Response presentation control | underused lever |

Then [[Claude Code]] for the platform overview.

---

## The cross-cutting patterns

These are *practices*, not *features* — patterns that recur across many tools and sources:

| Pattern | What it is |
|---|---|
| [[Karpathy Coding Principles]] | The four-principle CLAUDE.md (Think, Simple, Surgical, Goal-Driven) |
| [[Spec-Driven Development]] | Spec → plan → execute → verify, with gates between |
| [[Compound Engineering]] | Each cycle makes the next easier (vs accumulating debt) |
| [[Test-Driven Development with Claude]] | RED-GREEN-REFACTOR as the structural defense |
| [[Vertical Slice]] | Decomposition unit — end-to-end thin, demoable, verifiable |
| [[Ralph Wiggum Technique]] | Autonomous loop until done; the joke that works |

---

## Reading paths

If you have **30 minutes** and want the highest-leverage takeaways:
1. [[Karpathy Coding Principles]] — install today; one CLAUDE.md edit
2. [[Token Efficiency]] — ykdojo's Tip 15 (system prompt slimming) and Tip 23 (half-cloning)
3. [[Skill Building]] — the 500-line rule and activation pattern

If you have **a weekend** and want a comprehensive setup:
1. [[Claude HowTo (luongnv89)]] — work the 10-module roadmap
2. Install one heavy framework — pick from [[Superpowers (obra)]], [[claudekit (Carl Rannaberg)]], or [[Compound Engineering Plugin]]
3. Add [[Claude Code Infrastructure Showcase (diet103)|diet103's skill-activation hooks]]
4. Audit your CLAUDE.md against [[Memory]]'s anti-patterns
5. Read [[Learn Claude Code (shareAI-lab)]] sessions 1–6 to ground your mental model

If you have **a month** and want mastery:
1. All of the above
2. Read [[Encyclopedia of Agentic Coding Patterns]] — at least the "Agentic Software Construction" + "Context Engineering" sections
3. Read [[Claude Code System Prompts (Piebald)]] — at least the Bash tool description, the memory instruction prompt, and the subagent delegation prompt
4. Build your own meta-skill (compare [[Matt Pocock Skills|`mattpocock/skills/write-a-skill`]], [[TACHES Claude Code Resources|TÂCHES create-agent-skills]], [[Superpowers (obra)|writing-skills]])
5. Practice [[Compound Engineering]]: at session end, write back what you learned

---

## What this wiki *doesn't* cover (deliberately)

Per [[CLAUDE|the schema's Focus section]]:
- Status line cosmetics
- IDE integration wrappers (VS Code, Emacs, JetBrains chats)
- Alternative clients (mobile, desktop UIs)
- Single-language CLAUDE.md showcases
- Generic usage monitors

These exist (the [[Awesome Claude Code (hesreallyhim)|awesome list]] is comprehensive on them). They're just not the focus.

---

## Cross-references

- [[Claude Code]] · [[Claude Code Ecosystem]]
- All five focus topic pages
- All primitive concept pages
- All pattern concept pages
