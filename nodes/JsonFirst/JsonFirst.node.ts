import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from 'n8n-workflow';

export class JsonFirst implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'JSONFIRST',
    name: 'jsonFirst',
    icon: 'file:jsonfirst.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Convert natural language to structured JDON intents using the JSONFIRST Protocol',
    defaults: { name: 'JSONFIRST' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'jsonFirstApi', required: true }],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Process Intent', value: 'processIntent', description: 'Convert text → JDON', action: 'Process an intent' },
          { name: 'Execute Intent', value: 'executeIntent', description: 'Process + execute end-to-end', action: 'Execute an intent' },
          { name: 'Validate JDON', value: 'validateJdon', description: 'Validate a JDON object', action: 'Validate a jdon' },
          { name: 'Get Governance Modes', value: 'getModes', description: 'List available modes', action: 'Get governance modes' },
        ],
        default: 'processIntent',
      },
      {
        displayName: 'Input Text',
        name: 'inputText',
        type: 'string',
        typeOptions: { rows: 3 },
        default: '',
        required: true,
        description: 'Natural language text to convert',
        displayOptions: { show: { operation: ['processIntent', 'executeIntent'] } },
      },
      {
        displayName: 'Governance Mode',
        name: 'mode',
        type: 'options',
        options: [
          { name: 'ANTI_CREDIT_WASTE_V2 (Default)', value: 'ANTI_CREDIT_WASTE_V2' },
          { name: 'MAX_PERFORMANCE', value: 'MAX_PERFORMANCE' },
          { name: 'STRICT_PROTOCOL', value: 'STRICT_PROTOCOL' },
          { name: 'EXPRESS_ROUTE', value: 'EXPRESS_ROUTE' },
          { name: 'GUARDIAN_MODE', value: 'GUARDIAN_MODE' },
        ],
        default: 'ANTI_CREDIT_WASTE_V2',
        displayOptions: { show: { operation: ['processIntent', 'executeIntent'] } },
      },
      {
        displayName: 'JDON Object',
        name: 'jdonObject',
        type: 'json',
        default: '{}',
        required: true,
        displayOptions: { show: { operation: ['validateJdon'] } },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const credentials = await this.getCredentials('jsonFirstApi');
    const baseUrl = ((credentials.apiUrl as string) || 'https://jsonfirst.com').replace(/\/$/, '');

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter('operation', i) as string;
      try {
        let responseData: object;
        if (operation === 'processIntent') {
          const body = {
            text: this.getNodeParameter('inputText', i) as string,
            mode: this.getNodeParameter('mode', i) as string,
          };
          responseData = await this.helpers.httpRequestWithAuthentication('jsonFirstApi', {
            method: 'POST',
            url: `${baseUrl}/api/jsonfirst`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }) as object;
        } else if (operation === 'executeIntent') {
          const body = {
            text: this.getNodeParameter('inputText', i) as string,
            mode: this.getNodeParameter('mode', i) as string,
          };
          responseData = await this.helpers.httpRequestWithAuthentication('jsonFirstApi', {
            method: 'POST',
            url: `${baseUrl}/api/jsonfirst/execute`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }) as object;
        } else if (operation === 'validateJdon') {
          const jdon = this.getNodeParameter('jdonObject', i);
          responseData = await this.helpers.httpRequestWithAuthentication('jsonFirstApi', {
            method: 'POST',
            url: `${baseUrl}/api/jsonfirst/verify`,
            headers: { 'Content-Type': 'application/json' },
            body: typeof jdon === 'string' ? jdon : JSON.stringify(jdon),
          }) as object;
        } else {
          responseData = await this.helpers.httpRequestWithAuthentication('jsonFirstApi', {
            method: 'GET',
            url: `${baseUrl}/api/jsonfirst/modes`,
          }) as object;
        }
        const parsed = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;
        returnData.push({ json: parsed, pairedItem: { item: i } });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
          continue;
        }
        throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
      }
    }
    return [returnData];
  }
}
