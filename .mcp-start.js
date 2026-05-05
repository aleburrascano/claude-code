#!/usr/bin/env node
// vaultkit MCP launcher. Single source of truth — copied verbatim into each
// vault as .mcp-start.js by vault-init.sh / vault-connect.sh / vault-update.sh.
//
// Security model: at MCP registration time, vaultkit pins the SHA-256 of this
// file by passing --expected-sha256=<hex> as an arg. On every Claude Code
// session start, the launcher re-verifies its own hash before running. If a
// `git pull` would change this file (upstream tampering or legitimate update),
// the launcher refuses to start and tells the user to run `vaultkit verify`.
const { spawnSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const VAULT_DIR = __dirname;
const VAULT_NAME = path.basename(VAULT_DIR);

const expectedFlag = process.argv.find(a => typeof a === 'string' && a.startsWith('--expected-sha256='));
const EXPECTED = expectedFlag ? expectedFlag.slice('--expected-sha256='.length) : null;

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function abort(lines) {
  for (const l of lines) process.stderr.write('[vaultkit] ' + l + '\n');
  process.exit(1);
}

// 1. Pre-pull verification: detect in-place tampering.
if (EXPECTED) {
  const actual = sha256(__filename);
  if (actual !== EXPECTED) {
    abort([
      'Launcher SHA-256 mismatch in vault "' + VAULT_NAME + '" — refusing to start.',
      '  Expected: ' + EXPECTED,
      '  Actual:   ' + actual,
      'Inspect: cat "' + __filename + '"',
      'Re-trust: vaultkit verify ' + VAULT_NAME,
    ]);
  }
} else {
  process.stderr.write(
    '[vaultkit] Warning: vault "' + VAULT_NAME + '" registered without a pinned SHA-256.\n' +
    '[vaultkit] Run `vaultkit update ' + VAULT_NAME + '` to enable launcher verification.\n'
  );
}

// 2. Fetch (don't merge yet) so we can inspect what's incoming.
const fetchResult = spawnSync('git', ['fetch', '--quiet'], {
  cwd: VAULT_DIR,
  stdio: 'ignore',
  timeout: 5000,
});
if (fetchResult.status !== 0) {
  process.stderr.write('[vaultkit] Warning: git fetch failed for "' + VAULT_NAME + '" — running with cached state.\n');
}

// 3. Refuse to merge if upstream changes .mcp-start.js — force explicit re-verify.
const diff = spawnSync('git', ['diff', '--name-only', 'HEAD..@{u}', '--', '.mcp-start.js'], {
  cwd: VAULT_DIR,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'ignore'],
  timeout: 5000,
});
if (diff.status === 0 && (diff.stdout || '').trim() === '.mcp-start.js') {
  abort([
    'Vault "' + VAULT_NAME + '" has a new .mcp-start.js upstream — refusing to auto-update.',
    'Inspect: cd "' + VAULT_DIR + '" && git diff HEAD..@{u} -- .mcp-start.js',
    'Re-trust: vaultkit verify ' + VAULT_NAME,
  ]);
}

// 4. Safe to fast-forward — content changes only, no launcher tampering.
const headBefore = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: VAULT_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
const mergeResult = spawnSync('git', ['merge', '--ff-only', '--quiet', '@{u}'], {
  cwd: VAULT_DIR,
  stdio: 'ignore',
  timeout: 5000,
});
if (mergeResult.status !== 0) {
  process.stderr.write('[vaultkit] Warning: could not fast-forward "' + VAULT_NAME + '" — local branch may have diverged.\n');
  process.stderr.write('[vaultkit] Run: cd "' + VAULT_DIR + '" && git status\n');
} else {
  const headAfter = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: VAULT_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  if (headAfter.stdout && headBefore.stdout && headAfter.stdout.trim() !== headBefore.stdout.trim()) {
    process.stderr.write('[vaultkit] Pulled new commits for "' + VAULT_NAME + '".\n');
  }
}

// 5. Ensure .obsidian/ exists for vault structure validation (gitignored by design).
const obsidianDir = path.join(VAULT_DIR, '.obsidian');
if (!fs.existsSync(obsidianDir)) {
  try { fs.mkdirSync(obsidianDir, { recursive: true }); } catch (_) { /* best-effort */ }
}

// 6. Windows: npx ships as npx.cmd which CreateProcess rejects. Prepend node's
// directory to PATH and use shell:true so cmd.exe resolves the .cmd shim.
if (process.platform === 'win32') {
  const nodeDir = path.dirname(process.execPath);
  process.env.PATH = nodeDir + ';' + (process.env.PATH || '');
}

// 7. Spawn vaultkit's own MCP server (replaces obsidian-mcp-pro per ADR-0011).
// Goes through npx so it resolves the globally-installed vaultkit binary
// regardless of PATH quirks. The --vault-dir arg tells the server which
// vault to bind to; the registry has the canonical name keyed by this dir.
const r = spawnSync('npx', ['vaultkit', 'mcp-server', '--vault-dir', VAULT_DIR], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
if (r.error) {
  abort([
    'Failed to start MCP server: ' + r.error.message,
    'Check that vaultkit is installed: npm i -g @aleburrascano/vaultkit',
  ]);
}
process.exit(r.status ?? 1);
