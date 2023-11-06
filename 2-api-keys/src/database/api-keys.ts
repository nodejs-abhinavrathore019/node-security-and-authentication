// in memory database.
// crud operations

import { APIKeysSchemaType } from '../types/api-key/APIKeysSchemaType';
import { logger } from '../utils/logger';

const tableAPIKeys = new Map<string, APIKeysSchemaType>();

const getAllAPIKeys = () => {
  return tableAPIKeys;
};

const create = (params: APIKeysSchemaType) => {
  const apiKeyParams:APIKeysSchemaType = {
    ...params,
  };

  const apiKeyId = crypto.randomUUID();
  apiKeyParams.id = apiKeyId;
  tableAPIKeys.set(apiKeyId, apiKeyParams);

  return apiKeyParams;
};

const findById = (apiKeyId: string) => {
  const result:APIKeysSchemaType = tableAPIKeys.get(apiKeyId) ?? {} as APIKeysSchemaType;
  return result;
};

const read = (apiKey: string) => {
  logger.debug('tableAPIKeys', tableAPIKeys);

  let result = {} as APIKeysSchemaType;
  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of tableAPIKeys.entries()) {
    if (value.key === `${apiKey}`) {
      result = value;
      break;
    }
  }
  return result;
};

const update = (keyId:string, params: APIKeysSchemaType) => {
  tableAPIKeys.set(keyId, params);
};

const remove = (keyId:string) => {
  tableAPIKeys.delete(keyId);
};

export {
  getAllAPIKeys,
  create,
  read,
  findById,
  update,
  remove,
};
