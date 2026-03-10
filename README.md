# n8n-nodes-jsonfirst

Official **JSONFIRST** community node for [n8n](https://n8n.io) — the workflow automation platform.

Convert natural language into structured **JDON intents** with AI governance, directly inside your n8n workflows.

---

## What is JSONFIRST?

[JSONFIRST](https://jsonfirst.com) is a universal intent protocol that transforms human text into machine-executable JSON (called **JDON**). It adds a governance layer to every AI interaction: modes like `ANTI_CREDIT_WASTE_V2` or `STRICT_PROTOCOL` control how the LLM behaves.

**Use cases in n8n:**
- Parse user messages from Slack/Telegram → structured intent → route to the right sub-workflow
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

1. Add a **JSONFIRST API** credential:
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

The JSONFIRST node takes raw text from a webhook and returns a structured JDON like:

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

You can then use n8n's **Switch** or **IF** node to route based on `action.normalized`.

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
- [GitHub](https://github.com/jsonfirst/n8n-nodes-jsonfirst)
- [Contact](mailto:contact@jsonfirst.com)

---

## License

MIT © [JSONFIRST](https://jsonfirst.com)
