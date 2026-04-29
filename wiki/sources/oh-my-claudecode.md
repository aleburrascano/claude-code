---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, multi-agent, orchestration, framework, model-routing]
source_url: https://github.com/Yeachan-Heo/oh-my-claudecode
source_author: Yeachan Heo
license: MIT
---

# oh-my-claudecode (OMC)

Multi-agent orchestration framework. 31k stars per [[shanraisshan Claude Code Best Practice|shanraisshan]]. Tagline: "zero learning curve" via natural-language interfaces.

## Components

- **19 specialized agents** with tier variants — architecture, research, design, testing, data science
- **Skills** stored in `.omc/skills/` — auto-trigger on keyword match
- **Custom skills** scoped per-project (`.omc/skills/`) or per-user (`~/.omc/skills/`)

## Orchestration modes

- **Team** (canonical) — staged pipeline: `team-plan → team-prd → team-exec → team-verify → team-fix`
- **Autopilot** — autonomous single-lead execution
- **Ultrawork** — maximum parallelism
- **Ralph** — persistent verification loops ([[Ralph Wiggum Technique]])

## Distinctive techniques

### Smart model routing — 30-50% cost optimization
Haiku for simple tasks, Opus for complex reasoning. Automatic. Significant for [[Token Efficiency]].

### Stateful autoresearch (`/deep-interview`)
Socratic questioning to clarify requirements before execution. Same shape as [[Matt Pocock Skills|grill-me]] and [[jeffallan claude-skills|/common-ground]] but framed as "interview before code."

### Team-mode pipeline
Explicit staged pipeline (plan → PRD → exec → verify → fix) is more rigid than alternatives but more reproducible.

## Installation

```bash
npm i -g oh-my-claude-sisyphus@latest    # npm package name differs from repo
# OR
/plugin install oh-my-claudecode
/setup
```

(npm package is "oh-my-claude-sisyphus" but repo is "oh-my-claudecode" — naming inconsistency to be aware of.)

## My assessment

OMC's main contributions for our wiki:
- **Smart model routing as a default** — auto Haiku/Opus selection. Most frameworks require manual model choice; OMC automates. Significant for [[Token Efficiency]].
- **Multiple orchestration modes** — Team (default), Autopilot, Ultrawork, Ralph. Lets users dial autonomy up or down without switching frameworks. Lightweight version of what [[Everything Claude Code (affaan-m)|ECC]] does with hook profiles.

Less unique: yet another spec-driven workflow. Quality is solid, but the design space is well-covered.

Cross-references: [[Token Efficiency]] · [[Subagents]] · [[Ralph Wiggum Technique]] · [[Spec-Driven Development]] · [[Claude Code Ecosystem]]
