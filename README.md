# n8n-nodes-jsonfirst

[![npm version](https://img.shields.io/npm/v/n8n-nodes-jsonfirst.svg)](https://www.npmjs.com/package/n8n-nodes-jsonfirst)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-jsonfirst.svg)](https://www.npmjs.com/package/n8n-nodes-jsonfirst)

Stop writing fragile prompts for AI agents.

JSONFIRST converts natural language into structured JSON intent your agents can execute safely.

**Intent → JSON → Execution.**

JSONFIRST helps build reliable AI agents by converting natural language into structured JSON intent.

```
User input
    ↓
JSONFIRST parsing
    ↓
JDON (structured intent)
    ↓
Agent execution
```

---

## Quick Example

```
[Webhook] → [JSONFIRST: Process Intent] → [Switch on action.normalized] → [HTTP Request / Email / DB]
```

Input:
```
"Create an order for John, 2 units of product A"
```

Output:
```json
{
  "action": { "normalized": "create" },
  "object": { "type": "order" },
  "confidence": 0.94
}
```

Route your workflow on `{{ $json.jdons[0].action.normalized }}`.

---

## Who is this for

- **n8n automation builders** — parse natural language into routable workflow actions
- **AI agent developers** — add a structured intent layer to your LLM pipeline
- **Developers done with fragile prompts** — replace brittle regex with governed JSON intents

---

## Installation

In your **self-hosted n8n** instance:

1. Go to **Settings → Community Nodes**
2. Click **Install**
3. Enter: `n8n-nodes-jsonfirst`
4. Click **Install**

---

## Configuration

Add a **JSONFIRST API** credential:
- **API Key** — get yours at [jsonfirst.com](https://jsonfirst.com) → Dashboard → API Console
- **API Base URL** — defaults to `https://jsonfirst.com`

---

## Operations

| Operation | Description |
|---|---|
| **Process Intent** | Convert text → JDON (structured intent object) |
| **Execute Intent** | Process + execute the intent end-to-end |
| **Validate JDON** | Check a JDON object against the JSONFIRST spec |
| **Get Governance Modes** | List all available modes for your plan |

### Governance Modes

| Mode | Description |
|---|---|
| `ANTI_CREDIT_WASTE_V2` | Default — optimizes token usage, instant response |
| `MAX_PERFORMANCE` | Full LLM processing for maximum accuracy |
| `STRICT_PROTOCOL` | Enforces strict JSONFIRST compliance |
| `EXPRESS_ROUTE` | Fastest possible processing |
| `GUARDIAN_MODE` | Enhanced safety and content filtering |

---

## Early Testers

> **Looking for the first 20 developers testing n8n-nodes-jsonfirst.**
> Open an issue using the [Early Tester template](https://github.com/JSONFIRST/n8n-nodes-jsonfirst/issues/new?template=first-user.md) and your project will be listed here.

| # | Project | Use case |
|---|---|---|
| — | *Be the first* | [Open an issue](https://github.com/JSONFIRST/n8n-nodes-jsonfirst/issues/new?template=first-user.md) |

---

## Plans & Pricing

| Plan | Intents/month | Price |
|---|---|---|
| Free Trial | 50 | €0 |
| No-Code Builder | 1,000 | €29/mo |
| Pro | 2,000 | €49/mo |
| Business | 10,000 | €149/mo |

[Get started at jsonfirst.com](https://jsonfirst.com)

---

## Links

- [Documentation](https://jsonfirst.com/docs)
- [npm](https://www.npmjs.com/package/n8n-nodes-jsonfirst)
- [GitHub](https://github.com/JSONFIRST/n8n-nodes-jsonfirst)
- [Contact](mailto:support@jsonfirst.com)

---

## License

MIT © [JSONFIRST](https://jsonfirst.com)
