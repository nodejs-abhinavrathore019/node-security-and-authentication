type APIKeysSchemaType = {
  id: string,
  name: string;
  status: 'active' | 'revoked'
  key?: string,
};

export { APIKeysSchemaType };
