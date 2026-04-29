---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, hooks, ast, permission-fatigue, safety]
source_url: https://github.com/ldayton/Dippy
source_author: Lily Dayton
license: MIT
---

# Dippy (Lily Dayton)

A shell-command hook that **uses AST-based bash parsing to auto-approve safe commands while blocking destructive ones**. By Lily Dayton. Cross-platform: Claude Code, Gemini CLI, Cursor.

The pitch: eliminate permission fatigue without disabling safety. Most permission systems are pattern-based (string match `rm -rf`); Dippy parses bash command syntax trees to **understand intent**.

## AST-based bash parsing

Built on **Parable**, a hand-written bash parser. Examines actual command structure: pipes, redirects, command substitution, chains. **Distinguishes genuinely safe operations from subtle mutations hidden in complex chains.**

Pattern-matchers can be fooled:
- `git $(echo rm) foo.txt` — pattern says it's a git command; AST shows it's `rm` via subshell injection
- `curl https://example.com > script.sh` — pattern allows curl; AST sees the file write redirect

AST sees through these. **The ecosystem's most sophisticated bash safety analysis** at the wiki's writing.

## Auto-approved examples

```bash
# Complex read pipelines
ps aux | grep python | awk '{print $2}' | head -10

# Chained inspections
git status && git log --oneline -5 && git diff --stat

# Cloud querying (read-only)
aws ec2 describe-instances --filters "Name=tag:Environment,Values=prod"

# Container diagnostics, safe redirects to /dev/null or stderr
```

## Blocked examples

```bash
# Subshell injection
git $(echo rm) foo.txt

# File writes via redirect
curl https://example.com > script.sh

# Hidden destructive operations
git stash drop
npm unpublish

# Cloud deletions
aws s3 rm s3://bucket --recursive

# Destructive chains
```

## Customizable deny messages

When Dippy blocks, it can return **instructional messages** that guide Claude toward safer alternatives. Prevents wasted turns where Claude doesn't understand why an action was blocked.

Example: blocking `rm -rf old/` could return "This deletes irreversibly. Try `git rm` if tracked, or use `mv old/ /tmp/_trash_$(date +%s)/` for reversible deletion."

This is a UX touch most safety hooks miss. Pair with [[Hooks]] guidance.

## Cross-platform support

Same hook configures across Claude Code, Gemini CLI, Cursor via standardized hook mechanism. Configures in `~/.claude/settings.json`. Reads global `~/.dippy/config` and project-level `.dippy` files.

## Installation

```bash
brew tap ldayton/dippy
brew install dippy
```

Or manual install (clone + add config to settings).

## My assessment

Dippy's distinctive contributions:

1. **AST-based parsing** — qualitatively better than pattern matching. Catches injection attempts and chained mutations that escape regex-based safety. Worth understanding the technique.

2. **Customizable deny-with-guidance** — most safety tools just block; Dippy returns instructional context. This prevents wasted turns where Claude tries variations of the same blocked action.

3. **Cross-platform via standardized hooks** — works the same way across CC, Gemini, Cursor. Demonstrates the value of a shared hook standard.

For Alessandro's focus areas:
- For [[Reducing Hallucinations]]: Dippy catches command injection attempts that pattern matchers miss. Significant when Claude is processing untrusted input.
- For [[Token Efficiency]]: instructional deny messages prevent retry loops. Net effect: fewer wasted turns.
- For [[Auto Mode]]: complementary. Auto Mode classifier uses model judgment; Dippy uses AST parsing. Different defense layers.

Best suited to **production setups where bash safety matters** but you don't want to disable bash entirely. For pure exploration/prototyping, may be overkill.

Cross-references: [[Hooks]] · [[Sandboxing]] · [[Auto Mode]] · [[Reducing Hallucinations]] · [[Token Efficiency]] · [[parry-guard (Dmytro Onypko)]] (sibling defense layer) · [[Claude Code Ecosystem]]
