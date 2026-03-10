import { ICredentialType, INodeProperties, IAuthenticateGeneric } from 'n8n-workflow';

export class JsonFirstApi implements ICredentialType {
  name = 'jsonFirstApi';
  displayName = 'JSONFIRST API';
  documentationUrl = 'https://jsonfirst.com/docs/api';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'Your JSONFIRST API key — get it at jsonfirst.com → Dashboard → API Console',
    },
    {
      displayName: 'API Base URL',
      name: 'apiUrl',
      type: 'string',
      default: 'https://jsonfirst.com',
      description: 'The base URL of your JSONFIRST instance',
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.apiKey}}',
      },
    },
  };
}
