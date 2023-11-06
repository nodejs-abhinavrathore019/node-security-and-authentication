import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { getAllAPIKeys } from '../../database/api-keys';
import { APIKeysSchemaType } from '../../types/api-key/APIKeysSchemaType';

type GetAPIKeysResultType = ResponseWithPageType & {
  data: {
    apiKeys?: any[]
  },
};

const getAPIKeys = async () => {
  const res: GetAPIKeysResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {
      apiKeys: [],
    },
  };

  const tableAPIKeys: Map<string, APIKeysSchemaType> = getAllAPIKeys();
  const apiKeys: APIKeysSchemaType[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of tableAPIKeys.entries()) {
    apiKeys.push(value);
  }

  res.data.apiKeys = apiKeys;
  return res;
};

export {
  getAPIKeys,
};
