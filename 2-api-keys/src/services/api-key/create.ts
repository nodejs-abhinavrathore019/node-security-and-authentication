import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { APIKeysSchemaType } from '../../types/api-key/APIKeysSchemaType';
import { createUniqueAPIKey } from '../../utils/api-key/create';
import { create } from '../../database/api-keys';

type CreateAPIKey = {
  name: string;
};

type CreateAPIKeyResultType = ResponseWithPageType & {
  data: {
    apiKey: APIKeysSchemaType;
  },
};

const createAPIKey = async (params: CreateAPIKey) => {
  const {
    name,
  } = params;

  const res: CreateAPIKeyResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {
      apiKey: {} as APIKeysSchemaType,
    },
  };

  const apiKey: string = await createUniqueAPIKey();
  let apiKeyParams: APIKeysSchemaType = {
    id: '',
    name,
    status: 'active',
    key: apiKey,
  };

  apiKeyParams = create(apiKeyParams);

  res.data.apiKey = apiKeyParams;
  return res;
};

export {
  createAPIKey,
};
