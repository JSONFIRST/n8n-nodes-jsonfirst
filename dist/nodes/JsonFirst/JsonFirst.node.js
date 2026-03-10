"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFirst = void 0;

class JsonFirst {
  constructor() {
    this.description = {
      displayName: "JSONFIRST",
      name: "jsonFirst",
      icon: "file:jsonfirst.svg",
      group: ["transform"],
      version: 1,
      subtitle: '={{$parameter["operation"]}}',
      description: "Convert natural language to structured JDON intents using the JSONFIRST Protocol",
      defaults: {
        name: "JSONFIRST",
      },
      inputs: ["main"],
      outputs: ["main"],
      credentials: [
        {
          name: "jsonFirstApi",
          required: true,
        },
      ],
      properties: [
        // ─── Operation ───────────────────────────────────────────────────────
        {
          displayName: "Operation",
          name: "operation",
          type: "options",
          noDataExpression: true,
          options: [
            {
              name: "Process Intent",
              value: "processIntent",
              description: "Convert natural language text into a structured JDON intent",
              action: "Process an intent",
            },
            {
              name: "Execute Intent",
              value: "executeIntent",
              description: "Execute a JSONFIRST intent and return the governed output",
              action: "Execute an intent",
            },
            {
              name: "Validate JDON",
              value: "validateJdon",
              description: "Validate a JDON object against the JSONFIRST specification",
              action: "Validate a jdon",
            },
            {
              name: "Get Governance Modes",
              value: "getModes",
              description: "List all available governance modes",
              action: "Get governance modes",
            },
          ],
          default: "processIntent",
        },

        // ─── Process Intent fields ────────────────────────────────────────
        {
          displayName: "Input Text",
          name: "inputText",
          type: "string",
          typeOptions: {
            rows: 3,
          },
          default: "",
          required: true,
          description: "The natural language text to convert into a JDON intent",
          displayOptions: {
            show: {
              operation: ["processIntent", "executeIntent"],
            },
          },
        },
        {
          displayName: "Governance Mode",
          name: "mode",
          type: "options",
          options: [
            {
              name: "ANTI_CREDIT_WASTE_V2 (Default)",
              value: "ANTI_CREDIT_WASTE_V2",
              description: "Optimizes for minimal token usage while preserving full intent structure",
            },
            {
              name: "MAX_PERFORMANCE",
              value: "MAX_PERFORMANCE",
              description: "Full LLM processing for maximum accuracy",
            },
            {
              name: "STRICT_PROTOCOL",
              value: "STRICT_PROTOCOL",
              description: "Enforces strict JSONFIRST protocol compliance",
            },
            {
              name: "EXPRESS_ROUTE",
              value: "EXPRESS_ROUTE",
              description: "Fastest processing, instant response",
            },
            {
              name: "GUARDIAN_MODE",
              value: "GUARDIAN_MODE",
              description: "Enhanced safety and content filtering",
            },
          ],
          default: "ANTI_CREDIT_WASTE_V2",
          description: "The governance mode to apply during processing",
          displayOptions: {
            show: {
              operation: ["processIntent", "executeIntent"],
            },
          },
        },
        {
          displayName: "Model",
          name: "model",
          type: "options",
          options: [
            { name: "Claude Haiku (Fast)", value: "claude-haiku" },
            { name: "GPT-4o Mini", value: "gpt-4o-mini" },
            { name: "GPT-5.2", value: "gpt-5.2" },
            { name: "Gemini Flash", value: "gemini-flash" },
          ],
          default: "claude-haiku",
          description: "The AI model to use for processing (only relevant in MAX_PERFORMANCE mode)",
          displayOptions: {
            show: {
              operation: ["processIntent"],
            },
          },
        },

        // ─── Validate JDON fields ─────────────────────────────────────────
        {
          displayName: "JDON Object",
          name: "jdonObject",
          type: "json",
          default: "{}",
          required: true,
          description: "The JDON object to validate",
          displayOptions: {
            show: {
              operation: ["validateJdon"],
            },
          },
        },

        // ─── Options ─────────────────────────────────────────────────────
        {
          displayName: "Options",
          name: "options",
          type: "collection",
          placeholder: "Add Option",
          default: {},
          displayOptions: {
            show: {
              operation: ["processIntent", "executeIntent"],
            },
          },
          options: [
            {
              displayName: "Autocorrect",
              name: "autocorrect",
              type: "boolean",
              default: true,
              description: "Whether to automatically correct common input errors",
            },
            {
              displayName: "Tool",
              name: "tool",
              type: "string",
              default: "",
              description: "Target tool or platform (e.g., make, zapier, n8n)",
            },
          ],
        },
      ],
    };
  }

  async execute() {
    const items = this.getInputData();
    const returnData = [];
    const credentials = await this.getCredentials("jsonFirstApi");
    const baseUrl = (credentials.apiUrl || "https://jsonfirst.com").replace(/\/$/, "");

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter("operation", i);

      try {
        let responseData;

        if (operation === "processIntent") {
          const inputText = this.getNodeParameter("inputText", i);
          const mode = this.getNodeParameter("mode", i);
          const model = this.getNodeParameter("model", i);
          const options = this.getNodeParameter("options", i, {});

          const body = {
            text: inputText,
            mode: mode,
            model: model,
            autocorrect: options.autocorrect !== false,
          };
          if (options.tool) body.tool = options.tool;

          const response = await this.helpers.httpRequestWithAuthentication("jsonFirstApi", {
            method: "POST",
            url: `${baseUrl}/api/jsonfirst`,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          responseData =
            typeof response === "string" ? JSON.parse(response) : response;
        } else if (operation === "executeIntent") {
          const inputText = this.getNodeParameter("inputText", i);
          const mode = this.getNodeParameter("mode", i);
          const options = this.getNodeParameter("options", i, {});

          const body = { text: inputText, mode: mode };
          if (options.tool) body.tool = options.tool;

          const response = await this.helpers.httpRequestWithAuthentication("jsonFirstApi", {
            method: "POST",
            url: `${baseUrl}/api/jsonfirst/execute`,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          responseData =
            typeof response === "string" ? JSON.parse(response) : response;
        } else if (operation === "validateJdon") {
          const jdonObject = this.getNodeParameter("jdonObject", i);

          const body =
            typeof jdonObject === "string"
              ? JSON.parse(jdonObject)
              : jdonObject;

          const response = await this.helpers.httpRequestWithAuthentication("jsonFirstApi", {
            method: "POST",
            url: `${baseUrl}/api/jsonfirst/verify`,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          responseData =
            typeof response === "string" ? JSON.parse(response) : response;
        } else if (operation === "getModes") {
          const response = await this.helpers.httpRequestWithAuthentication("jsonFirstApi", {
            method: "GET",
            url: `${baseUrl}/api/jsonfirst/modes`,
          });

          responseData =
            typeof response === "string" ? JSON.parse(response) : response;
        }

        returnData.push({
          json: responseData,
          pairedItem: { item: i },
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: error.message },
            pairedItem: { item: i },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

exports.JsonFirst = JsonFirst;
