---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, security, skills, professional, audit]
source_url: https://github.com/trailofbits/skills
source_author: Trail of Bits
license: CC BY-SA 4.0
---

# Trail of Bits Security Skills

A 40+ plugin marketplace from Trail of Bits — one of the industry's leading security research firms — focused on AI-assisted security analysis, vulnerability detection, and audit workflows. Production-grade tooling.

For our wiki, this source matters less for the security focus per se (peripheral to Alessandro's stated focus) and more as **exemplary skill design from a security-first organization** — these skills demonstrate how a professional team packages complex domain expertise into reusable plugins.

## Skills, by domain

### Code Auditing
- **static-analysis** — CodeQL and Semgrep integration
- **differential-review** — security-focused code change analysis
- **variant-analysis** — find similar vulnerabilities across codebases
- **semgrep-rule-creator** — custom vulnerability detection patterns
- **semgrep-rule-variant-creator** — port rules to new languages with TDD validation

### Smart Contract Security
- **building-secure-contracts** — vulnerability scanners for 6 blockchains
- **entry-point-analyzer** — state-changing functions in audits

### Verification
- **constant-time-analysis** — detect timing side-channels in cryptographic code
- **property-based-testing** guidance
- **mutation-testing** configuration
- **zeroize-audit** — detect missing secret cleanup

### Other domains
- Malware analysis (YARA authoring)
- Reverse engineering (DWARF debugging)
- Mobile security (Firebase APK scanning)
- Supply-chain risk auditing

## Notable design patterns (worth lifting)

### Mandatory gate reviews — `fp-check`
Implements mandatory false-positive verification gates. Output of one skill flows through a check before being acted on. Pattern: any skill that produces decisions (not just code) should have a paired verification skill.

### Audit context building — ultra-granular
Establishes architectural understanding *before* any analysis. Map this to [[Context Engineering]] — security audit needs the same upfront context-building as any other complex task.

### Dimensional analysis
Annotates code to detect unit mismatches and formula bugs. Surprisingly novel — most static analysis is type-based; dimensional analysis catches a different class of bugs (the kind of bugs that crashed Mars Climate Orbiter).

### Skill-improver pattern
Iterative refinement through automated fix-review cycles. Reflects QA methodology applied to skill maintenance itself. Conceptually adjacent to [[TACHES Claude Code Resources|TÂCHES `/heal-skill`]] and [[Compound Engineering Plugin|/ce-compound]].

### Trailmark
Code graph analysis + Mermaid diagrams + mutation testing triage. Visualization + structured reasoning + validation in one skill. The combination is unusual.

### Insecure-defaults detection
Hardcoded credentials, fail-open patterns. Pragmatic — catches the boring vulnerabilities that account for most real breaches.

## What this teaches about skill design

Trail of Bits skills demonstrate principles that match [[Thariq Anthropic Skills + Sessions|Thariq's design principles]]:

- **Domain-specialized** (one category per skill) — matches Thariq's category-discipline principle
- **Tool-integrated** (Semgrep, CodeQL, YARA) — they don't reinvent; they wrap proven tools
- **Verification-paired** (fp-check, mutation-testing) — quality gates per skill domain
- **Reusable scripts and patterns** — skills include real implementation code, not just instructions

This is **what mature skill design looks like at scale** for a domain.

## Trophy case

The repo includes a "trophy case" of real vulnerabilities discovered using these skills. Validates practical effectiveness. Worth checking before adopting — most skill collections claim utility; few demonstrate it with named CVEs.

## Installation

```
/plugin marketplace add trailofbits/skills
/plugin menu        # browse
```

Codex users: `.codex/scripts/install-for-codex.sh`.

Local development: clone and add from parent directory.

## Author / license

Trail of Bits. **CC BY-SA 4.0** (more permissive than typical: attribution + share-alike). More restrictive than MIT for derivative works.

## My assessment

For Alessandro's focus areas, Trail of Bits matters in two ways:

1. **As skill-design study material** — these are professionally-built skills with real verification, real tooling integration, real validation. Worth reading 2-3 SKILL.md files just to see what production-grade skill design looks like.

2. **As security infrastructure for sensitive projects** — if Alessandro builds anything that handles credentials, secrets, smart contracts, crypto, or untrusted input, the relevant Trail of Bits skills (semgrep-rule-creator, insecure-defaults, zeroize-audit, etc.) are worth installing.

The dimensional-analysis skill is the most under-appreciated — it catches a class of bugs most static analysis misses entirely.

Pair conceptually with:
- [[Everything Claude Code (affaan-m)|AgentShield]] (red-team/blue-team/auditor pipeline) for adversarial AI security
- [[claudekit (Carl Rannaberg)|claudekit hooks]] for runtime guardrails
- [[Karpathy Coding Principles]] (Surgical Changes) for security-relevant change discipline

Cross-references: [[Skills]] · [[Skill Building]] · [[Hooks]] · [[Subagents]] · [[Claude Code Ecosystem]]
