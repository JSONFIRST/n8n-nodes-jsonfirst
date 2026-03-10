"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFirstApi = void 0;

class JsonFirstApi {
  constructor() {
    this.name = "jsonFirstApi";
    this.displayName = "JSONFIRST API";
    this.documentationUrl = "https://jsonfirst.com/docs/api";
    this.properties = [
      {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        typeOptions: { password: true },
        default: "",
        required: true,
        description: "Your JSONFIRST API key (get it from jsonfirst.com → Dashboard → API Console)",
      },
      {
        displayName: "API Base URL",
        name: "apiUrl",
        type: "string",
        default: "https://jsonfirst.com",
        description: "The base URL of your JSONFIRST instance",
      },
    ];
    this.authenticate = {
      type: "generic",
      properties: {
        headers: {
          Authorization: "=Bearer {{$credentials.apiKey}}",
        },
      },
    };
    this.test = {
      request: {
        baseURL: "={{$credentials.apiUrl}}",
        url: "/api/models",
      },
    };
  }
}

exports.JsonFirstApi = JsonFirstApi;
