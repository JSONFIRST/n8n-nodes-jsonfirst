#!/usr/bin/env node
const args = process.argv.slice(2);

if (args[0] === 'help' || args.length === 0) {
  console.log(`
JSONFIRST n8n Node — CLI

Usage:
  npx n8n-nodes-jsonfirst              Show this help
  npx n8n-nodes-jsonfirst quickstart   Show quickstart guide
  npx n8n-nodes-jsonfirst version      Show current version

Quick install in n8n:
  1. Settings → Community Nodes → Install
  2. Enter: n8n-nodes-jsonfirst
  3. Add JSONFIRST API credential (get key at https://jsonfirst.com)

Example workflow node config:
  Operation : Process Intent
  Input text: "Create an order for John, 2 units of product A"
  Mode      : ANTI_CREDIT_WASTE_V2

Docs    → https://jsonfirst.com
Issues  → https://github.com/jsonfirst/n8n-nodes-jsonfirst/issues
`);
}

if (args[0] === 'quickstart') {
  console.log(`
JSONFIRST Quickstart
────────────────────
1. Install in n8n: Settings → Community Nodes → n8n-nodes-jsonfirst
2. Get API key: https://jsonfirst.com → Dashboard → API Console
3. Add credential: JSONFIRST API → paste your key
4. Add node: search "JSONFIRST" in n8n node list
5. Set operation: "Process Intent"
6. Connect to your workflow

Full docs: https://jsonfirst.com/quickstart
`);
}

if (args[0] === 'version') {
  const pkg = require('./package.json');
  console.log(`n8n-nodes-jsonfirst v${pkg.version}`);
}
