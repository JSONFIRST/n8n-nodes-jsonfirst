# n8n-nodes-jsonfirst

**Turn natural language into structured, executable JSON intent for AI agents.**

Stop writing brittle prompts. JSONFIRST converts user input into validated JSON your n8n workflows can execute reliably.

---

## Quick Test (5 lines)

Install the node, then run this workflow:

```
Trigger: Manual
↓
JSONFIRST (Process Intent)
  Input text: "Create an order for John, 2 units of product A"
  Mode: ANTI_CREDIT_WASTE_V2
↓
Switch on {{ $json.jdons[0].action.normalized }} → route to sub-workflows
```

Expected output:
```json
{ "action": { "normalized": "create" }, "object": { "type": "order" }, "confidence": 0.94 }
```

---

## Who should try JSONFIRST?

- **AI agent developers** — add a structured intent layer to your LLM pipeline
- **n8n automation builders** — parse natural language into routable workflow actions
- **Developers struggling with fragile prompt parsing** — replace brittle regex/if-else with governed JSON intents

---

## What is JSONFIRST?

[JSONFIRST](https://jsonfirst.com) is a universal intent protocol that transforms human text into machine-executable JSON (called **JDON**). It adds a governance layer to every AI interaction: modes like `ANTI_CREDIT_WASTE_V2` or `STRICT_PROTOCOL` control how the LLM behaves.

**Use cases in n8n:**
- Parse Slack/Telegram messages → structured intent → route to the right sub-workflow
- Build AI-governed automation pipelines with audit trails
- Validate LLM outputs against a JSONFIRST contract before executing actions
- Power no-code AI agents that follow strict operational modes

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

## Example Workflow

```
[Webhook] → [JSONFIRST: Process Intent] → [Switch on action.normalized] → [HTTP Request / Email / Database]
```

The JSONFIRST node takes raw text from a webhook and returns a structured JDON:

```json
{
  "spec": "JSONFIRST",
  "version": "2.0",
  "jdons": [{
    "jdon_id": "jdon_abc123",
    "confidence": 0.95,
    "action": { "raw": "send", "normalized": "send" },
    "object": { "type": "email", "category": "communication" },
    "domain": { "primary": "business" }
  }]
}
```

Use n8n's **Switch** or **IF** node to route based on `action.normalized`.

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
