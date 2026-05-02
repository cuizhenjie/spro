#!/usr/bin/env node
/**
 * Spro Agent Orchestrator
 * 替代 DevFleet 的手动多 Agent 并行编排
 * 
 * 用法:
 *   node scripts/orchestrate.js --plan plan.json [--execute]
 * 
 * plan.json 格式:
 * {
 *   "name": "项目名",
 *   "workers": [
 *     { "name": "worker-1", "agent": "claude|codex|opencode|gemini", "task": "任务描述", "session": "tmux-session" }
 *   ]
 * }
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const AGENT_COMMANDS = {
  claude: ['claude', '--add'],
  codex: ['codex'],
  opencode: ['opencode'],
  gemini: ['gemini', '-p'],
};

function runAgent(agent, task, session) {
  const cmd = AGENT_COMMANDS[agent];
  if (!cmd) { console.error(`Unknown agent: ${agent}`); return; }
  
  const fullCmd = [...cmd, task];
  const child = spawn('tmux', [
    'send-keys', '-t', `${session}:0`,
    ...fullCmd.map(s => String(s)),
    'Enter'
  ]);
  
  child.on('error', e => console.error(`Error: ${e.message}`));
}

function parsePlan(planPath) {
  const content = fs.readFileSync(planPath, 'utf8');
  return JSON.parse(content);
}

const args = process.argv.slice(2);
if (args.includes('--help') || !args.includes('--plan')) {
  console.log('Usage: node scripts/orchestrate.js --plan plan.json [--execute]');
  console.log('Agents: claude, codex, opencode, gemini');
  process.exit(0);
}

const planPath = args[args.indexOf('--plan') + 1];
const execute = args.includes('--execute');
const plan = parsePlan(planPath);

console.log(`Plan: ${plan.name}`);
console.log(`Workers: ${plan.workers.length}`);
plan.workers.forEach((w, i) => {
  console.log(`  [${i+1}] ${w.agent} → ${w.session} (${w.name})`);
  if (execute) {
    runAgent(w.agent, w.task, w.session);
    console.log(`  ✓ Dispatched to ${w.session}`);
  }
});

if (!execute) console.log('\n→ Add --execute to actually dispatch agents.');
