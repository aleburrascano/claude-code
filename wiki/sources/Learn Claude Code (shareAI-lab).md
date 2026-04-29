---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, internals, learning-resource, harness-engineering]
source_url: https://github.com/shareAI-lab/learn-claude-code
source_author: shareAI-lab (Tencent AI researchers)
license: MIT
---

# Learn Claude Code (shareAI-lab)

A pedagogical reverse-engineering of Claude Code's architecture, rebuilt from first principles across **12 progressive sessions** (~500 lines of Python per session). Not a tutorial on *using* Claude Code — a tutorial on the **harness engineering** that surrounds an AI model and lets it operate as an agent.

For our focus areas this source is uniquely useful: it explains *why* certain context-engineering and skill-design practices work, by showing you what the model is actually plugged into.

## The core mental model

> "Agency — the ability to perceive, reason, and act — comes from model training, not from external code orchestration."

The author argues that production agents split into two layers:

| Layer | What it is | Source of |
|---|---|---|
| **Model** | The intelligence (trained on billions of tokens/sequences) | Reasoning capability |
| **Harness** | Environment, tools, knowledge, boundaries | The operational world |

Most "agent frameworks" mistake harness for intelligence — stacking prompt-chain orchestration and if-else routing as if procedural logic could engineer agency. The actual path: **trust the model's reasoning, design the world it inhabits**.

This framing reframes a lot of the focus areas:
- Skill design = harness design — what tools/knowledge does the model have access to?
- [[Context Engineering]] = world design — what does the model perceive at each turn?
- [[Reducing Hallucinations]] = constraint design — what can/can't the model do, and what feedback does it get?

## The minimal agent loop (invariant across all 12 sessions)

```
while stop_reason != "tool_use":
    response = client.messages.create(...)
    if tool_use: execute → append results → loop back
    else: return text
```

Every harness mechanism wraps this loop:

| Session | Mechanism |
|---|---|
| s02 | Tool handlers |
| s03 | Planning |
| s04 | Subagent spawning |
| s05 | On-demand skill injection |
| s06 | Context compression |
| s07 | Task persistence |
| s08 | Daemon threads (background tasks) |
| s09–s11 | Team mailboxes (multi-agent coordination) |
| s12 | Worktree isolation |

Reading these sequentially is the most efficient way to build an internal model of how Claude Code's pieces fit.

## Five high-leverage design insights

1. **Tools are handlers, not orchestration.** New capability = one function added to a dispatch map. The model decides when to call. (Implication: don't build elaborate flow logic; expose tools and trust the model.)

2. **Knowledge arrives on-demand.** Load skill files (product docs, API specs) via tool *results*, not upfront in the system prompt. Prevents context bloat. (Direct implication for [[Skill Building]] and [[Token Efficiency]].)

3. **Context compression is essential.** A three-layer strategy — summarize old turns, drop low-relevance messages, archive to retrieval — allows infinite sessions. (Cross-reference [[Token Efficiency]] and Claude Code's actual compaction behavior in [[Claude Code System Prompts (Piebald)]].)

4. **Subagents isolate noise.** Each subtask spawns a fresh `messages[]` array, preventing reasoning clutter in the main conversation. (Directly relevant to [[When to Delegate to Subagents]] — explains *why* the cost is worth it.)

5. **Tasks persist beyond sessions.** File-based task graphs with dependencies enable multi-step planning and team coordination. (Implication for cross-session continuity — see also [[Memory]].)

## Author

shareAI-lab, organized by Tencent AI researchers. MIT licensed.

## My assessment

This source is *load-bearing* for the wiki's focus areas in a way the other deep-dives aren't. The other sources teach patterns *for using* Claude Code; this source teaches what's *underneath* Claude Code. Once you understand the agent loop and the harness layers wrapping it, decisions about skill structure, context engineering, and subagent delegation become principled instead of heuristic.

Specifically:
- The "tools as handlers" insight clarifies why MCP and tool descriptions matter so much.
- The "knowledge on-demand" insight is the theoretical justification for [[Claude Code Infrastructure Showcase (diet103)|diet103's 500-line rule]] and TÂCHES's progressive-disclosure-style skills.
- The compression insight pairs with [[Claude Code Tips (ykdojo)]]'s practical compaction tactics.

Recommended companion reading: read this *first* among the deep-dives, then the others land with a stronger foundation.

Cross-references: [[Claude Code]] · [[Context Engineering]] · [[Skill Building]] · [[Token Efficiency]] · [[Subagents]] · [[Memory]] · [[Claude Code Ecosystem]]
