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
      defaults: { name: "JSONFIRST" },
      inputs: ["main"],
      outputs: ["main"],
      credentials: [{ name: "jsonFirstApi", required: true }],
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
              name: "Request Execution",
              value: "requestExecution",
              description: "Flag an existing JDON intent as ready for execution",
              action: "Request execution",
            },
            {
              name: "Verify Execution",
              value: "verifyExecution",
              description: "Submit execution proof for a JDON intent and update its state",
              action: "Verify execution",
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
          typeOptions: { rows: 3 },
          default: "",
          required: true,
          description: "The natural language text to convert into a JDON intent",
          displayOptions: { show: { operation: ["processIntent"] } },
        },
        {
          displayName: "Governance Mode",
          name: "mode",
          type: "options",
          options: [
            { name: "ANTI_CREDIT_WASTE_V2 (Default)", value: "ANTI_CREDIT_WASTE_V2", description: "Optimizes for minimal token usage" },
            { name: "MAX_PERFORMANCE", value: "MAX_PERFORMANCE", description: "Full LLM processing for maximum accuracy" },
            { name: "STRICT_PROTOCOL", value: "STRICT_PROTOCOL", description: "Enforces strict JSONFIRST protocol compliance" },
            { name: "EXPRESS_ROUTE", value: "EXPRESS_ROUTE", description: "Fastest processing, instant response" },
            { name: "GUARDIAN_MODE", value: "GUARDIAN_MODE", description: "Enhanced safety and content filtering" },
          ],
          default: "ANTI_CREDIT_WASTE_V2",
          description: "The governance mode to apply during processing",
          displayOptions: { show: { operation: ["processIntent"] } },
        },

        // ─── Request/Verify Execution fields ─────────────────────────────
        {
          displayName: "History ID",
          name: "historyId",
          type: "string",
          default: "",
          required: true,
          description: 'The history_id returned by the "Process Intent" operation',
          displayOptions: { show: { operation: ["requestExecution", "verifyExecution"] } },
        },
        {
          displayName: "Executor",
          name: "executor",
          type: "string",
          default: "n8n-workflow",
          description: "Identifier of the system that executed the intent",
          displayOptions: { show: { operation: ["verifyExecution"] } },
        },
        {
          displayName: "Execution Result",
          name: "result",
          type: "options",
          options: [
            { name: "Success", value: "SUCCESS" },
            { name: "Partial", value: "PARTIAL" },
            { name: "Failed", value: "FAILED" },
          ],
          default: "SUCCESS",
          displayOptions: { show: { operation: ["verifyExecution"] } },
        },
        {
          displayName: "Verification Proof",
          name: "verificationProof",
          type: "string",
          typeOptions: { rows: 2 },
          default: "",
          required: true,
          description: "Evidence that the intent was executed (e.g. API response, transaction ID)",
          displayOptions: { show: { operation: ["verifyExecution"] } },
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
          const body = {
            text: this.getNodeParameter("inputText", i),
            mode: this.getNodeParameter("mode", i),
          };
          const response = await this.helpers.httpRequestWithAuthentication("jsonFirstApi", {
            method: "POST",
            url: `${baseUrl}/api/jsonfirst`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          responseData = typeof response === "string" ? JSON.parse(response) : response;

        } else if (operation === "requestExecution") {
          const body = { history_id: this.getNodeParameter("historyId", i) };
          const response = await this.helpers.httpRequestWithAuthentication("jsonFirstApi", {
            method: "POST",
            url: `${baseUrl}/api/jsonfirst/execute`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          responseData = typeof response === "string" ? JSON.parse(response) : response;

        } else if (operation === "verifyExecution") {
          const body = {
            history_id: this.getNodeParameter("historyId", i),
            executor: this.getNodeParameter("executor", i),
            result: this.getNodeParameter("result", i),
            verification_method: "n8n_workflow",
            verification_proof: this.getNodeParameter("verificationProof", i),
          };
          const response = await this.helpers.httpRequestWithAuthentication("jsonFirstApi", {
            method: "POST",
            url: `${baseUrl}/api/jsonfirst/verify`,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          responseData = typeof response === "string" ? JSON.parse(response) : response;

        } else if (operation === "getModes") {
          const response = await this.helpers.httpRequestWithAuthentication("jsonFirstApi", {
            method: "GET",
            url: `${baseUrl}/api/jsonfirst/modes`,
          });
          responseData = typeof response === "string" ? JSON.parse(response) : response;
        }

        returnData.push({ json: responseData, pairedItem: { item: i } });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
}

exports.JsonFirst = JsonFirst;
