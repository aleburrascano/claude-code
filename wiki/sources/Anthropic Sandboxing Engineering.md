---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, engineering-blog, sandboxing, security, claude-code, isolation]
source_path: (no raw)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://www.anthropic.com/engineering/claude-code-sandboxing
---

# Anthropic Sandboxing Engineering

The engineering deep-dive that companions [[Sandboxing]] (the wiki's concept page). The 84% reduction metric and the bubblewrap/seatbelt implementation details all originate from this post.

## Architecture: dual isolation boundaries

Sandboxing implements **two boundaries** simultaneously at the OS level:

1. **Filesystem isolation** — restricts Claude to specific directories. Even if prompt-injected, Claude cannot modify sensitive system files outside its sandbox.
2. **Network isolation** — limits connections to approved servers via a proxy. Blocks credential exfiltration and malware downloads.

> "Effective sandboxing requires both filesystem and network isolation. Without network isolation alone, a compromised agent could exfiltrate SSH keys; without filesystem isolation, escape to network access becomes possible."

The pairing is non-negotiable. Single-axis sandboxing (filesystem only OR network only) is incomplete — the missing axis becomes the escape vector.

## Per-platform OS primitives

| Platform | Mechanism |
|---|---|
| **Linux** | `bubblewrap` |
| **macOS** | `seatbelt` (sandbox-exec) |
| Windows | (not detailed in this post — likely AppContainer-style) |

Coverage extends beyond the agent itself: **"This covers not just direct interactions but subprocesses spawned by commands."** Critical because agents launch shell commands constantly — sandboxing the agent without sandboxing its subprocesses would be theater.

## Network architecture

The network isolation uses **"a unix domain socket connected to a proxy server running outside the sandbox"**:

- Proxy validates domain access against a configured allow-list
- Confirmation prompts for new domains
- User-customizable proxy rules
- Credential validation kept *outside* the sandbox (sandbox never sees the credentials)

This is why network rules can be enforced even if the agent itself is compromised — the credentials live where the sandbox can't reach them.

## The 84% metric

> "Sandboxing safely reduces permission prompts by 84%" — internal Anthropic usage.

The framing matters: this isn't "reduce permission prompts at the cost of safety" — it's "remove the permission prompts that were *only protecting against actions sandboxing makes impossible*." 84% of prompts were guarding against things the sandbox already prevented; eliminating them is pure ergonomics + addresses approval fatigue (per [[Auto Mode|the 93% rubber-stamp problem]]).

## Permission-mode integration

Sandboxing **supplements** the permission model:
- Claude Code operates read-only by default; auto-allows safe commands like `echo`/`cat`
- Sandboxing creates **pre-defined work boundaries**; Claude operates autonomously within them
- Attempts to access resources outside the sandbox trigger immediate notification + user choice

Combine with [[Auto Mode]] for full defense-in-depth: Auto Mode's classifier blocks scope-escalation; sandbox blocks anything that escapes the classifier.

## Claude Code on the Web (cloud sandboxing)

The sandbox extends to cloud execution. **Git credentials are isolated through a custom proxy** that validates authentication and branch restrictions before attaching tokens — keeping credentials outside the sandbox entirely. Same architectural pattern as the local network proxy, applied to git auth.

## What sandboxing doesn't protect against

The post doesn't explicitly enumerate limitations, but architecturally:
- Logic errors in code Claude writes (sandboxing doesn't review code quality)
- Data exfiltration via *allowed* network endpoints (proxy approves the domain; data still leaves)
- Side-channel attacks within the allowed boundary (e.g., overwriting files Claude *is* allowed to modify)
- Anything the user explicitly approves outside the sandbox

Pair with [[Reducing Hallucinations]] defenses + [[Auto Mode]] classifier + [[parry-guard (Dmytro Onypko)|parry-guard]] for layered coverage.

## Where this lands in the wiki

- **[[Sandboxing]]** — the concept page; this is its primary citation source. Originally cited only via Boris's tips; now anchored on the engineering blog directly.
- **[[Permission Modes]]** — sandbox is orthogonal to mode; pair with Auto Mode for defense-in-depth
- **[[Auto Mode]]** — sibling defense (server-side classifier + sandbox = the full Anthropic-shipped defense pair)
- **[[Reducing Hallucinations]]** — defense #13 (sandboxing limits damage of hallucinated commands)
- **[[Token Efficiency]]** — sandbox's effect on system prompt size (84% prompt reduction is an *approval-prompt* number, but the system prompt also shrinks under sandbox per Boris's tips)

## Cross-references

- [[Sandboxing]] (concept; primary anchor)
- [[Auto Mode]] (sibling defense)
- [[Permission Modes]] (orthogonal axis)
- [[Anthropic Prompt Injection Defenses]] (the model-layer counterpart)
- [[Reducing Hallucinations]] (defense layer 13)
- [[Boris Cherny Tips Compendium]] (Apr 6 sandbox tips)
