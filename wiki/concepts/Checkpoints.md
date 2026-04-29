---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 3
tags: [claude-code, checkpoints, primitive, rewind, safety]
---

# Checkpoints

Conversation-state snapshots that Claude Code creates automatically (and can be created manually) to allow **rewinding** to a previous point. The safety net for risky changes and exploratory work.

## How they work

A checkpoint captures both:
- **Conversation state** — the message history at that point
- **Code state** — the working directory state (typically via git stash or worktree mechanism)

Created automatically with every user prompt (default behavior). Can also be created on demand and at hook-defined moments (e.g., [[claudekit (Carl Rannaberg)]] creates checkpoints on `Stop` and `SubagentStop`).

**Persistence**: Checkpoints persist **across sessions**, so you can access them in resumed conversations. Automatically cleaned up along with sessions after **30 days (configurable)**.

## Rewind options

Press `Esc` twice or use `/rewind`. Five options surface:

1. **Restore code and conversation** — full revert to the checkpoint
2. **Restore conversation** — keep current code, revert messages
3. **Restore code** — keep current messages, revert code
4. **Summarize from here** — keep the checkpoint state but compress what came after
5. **Never mind** — abort

## Use cases

### Risk-free experimentation
Try an aggressive refactor; if it goes badly, rewind. Cheap to try things you wouldn't otherwise.

### A/B branching
Make a checkpoint, take approach A, save the result, rewind, take approach B, compare. The conversation can be a bit clunky for this; for serious branching, use [[Claude Code Tips (ykdojo)|conversation cloning]] or git worktrees.

### Recovery from mistakes
Claude went off-rails or made a destructive change you didn't catch in time. Rewind to before the wrong turn.

### Compacting noise
Use option 4 ("summarize from here") to compress a long exploratory tangent into a brief summary, then continue with cleaner context. Token-efficiency move.

## Patterns from the deep-dives

### Auto-checkpoint on Stop ([[claudekit (Carl Rannaberg)]])
A `Stop` hook auto-saves git state at the end of every Claude turn. Combined with `/checkpoint:restore`, gives undo functionality at the git layer in addition to the conversation layer.

### Conversation cloning ([[Claude Code Tips (ykdojo)]] Tip 23)
Adjacent technique: *fork* the conversation at a decision point rather than rewinding. Gives you both branches simultaneously. "Half-cloning" keeps only recent messages, no summaries — preserves actual reasoning rather than a flattened summary.

### Worktree-based isolation ([[Superpowers (obra)|Superpowers using-git-worktrees]])
Heavier than checkpoints — creates a separate working tree on a feature branch. Use when the work needs full isolation (e.g., subagent-driven development with multiple branches).

## When to use over alternatives

| Situation | Tool |
|---|---|
| About to try something risky | Checkpoint (free, automatic) |
| Want both branches of a decision available | Conversation clone or git worktree |
| Need to compress a long session | Rewind option 4 ("summarize from here") |
| Lost work after a destructive Bash command | Git reflog or rewind option 3 (restore code) |
| Want to start fresh but keep the project context | New session + handoff document ([[Claude Code Tips (ykdojo)]] Tip 8) |

## Anti-patterns

- **Treating checkpoints as the primary save mechanism** — they're for short-term recovery, not project state. Commit your work.
- **Rewinding to mask understanding gaps** — if Claude keeps making the same mistake, rewinding doesn't fix it. Diagnose, then update [[Memory]] or write a [[Hooks|hook]] guardrail.
- **Over-relying on auto-checkpoints in long autonomous sessions** — every checkpoint costs disk; in long sessions, you'll accumulate many. Have a cleanup strategy.

## Limitations (per Anthropic docs)

### Bash command changes NOT tracked
```bash
rm file.txt
mv old.txt new.txt
cp source.txt dest.txt
```
These cannot be undone via rewind. Only **direct file edits made through Claude's file editing tools** are tracked.

This is a significant gap. Any rm/mv/cp from Bash escapes checkpointing. Use [[Sandboxing]] to limit damage from these operations.

### External changes NOT tracked
Manual changes made outside Claude Code, or edits from other concurrent sessions, are normally not captured. Unless they happen to modify the same files as the current session.

### Not a replacement for version control
Checkpoints are **session-level recovery**. Use git for permanent history, branches, collaboration. Think of checkpoints as "local undo" and Git as "permanent history."

## Restore vs Summarize (the option-4 distinction)

The three restore options revert state. **"Summarize from here" works differently**:
- Messages **before** the selected message stay intact (full detail)
- The selected message + subsequent messages get replaced with a compact AI-generated summary
- **No files on disk are changed**
- Original messages preserved in session transcript (Claude can reference if needed)

Like `/compact` but **targeted** — keep early context in full detail, only compress the parts using up space. Type optional instructions to guide the summary focus.

## What checkpoints are *not*

- Not git commits (though they may interact with git via stash/worktree)
- Not [[Memory]] (memory is cross-session; checkpoints are within-session)
- Not session forks (forking creates a parallel session; rewind discards the future) — for branching, use `claude --continue --fork-session`
- **Not a Bash-command undo** — bash side effects escape

## Cross-references

- [[Claude Code]] · [[Memory]] · [[Hooks]]
- [[Token Efficiency]] (rewind-to-summarize as a compaction tactic)
- Sources: [[Claude HowTo (luongnv89)]] (mechanics) · [[claudekit (Carl Rannaberg)]] (auto-checkpoint pattern) · [[Claude Code Tips (ykdojo)]] (cloning as alternative)
