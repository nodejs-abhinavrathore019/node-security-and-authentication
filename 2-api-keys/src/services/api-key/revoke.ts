import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { APIKeysSchemaType } from '../../types/api-key/APIKeysSchemaType';
import { findById, update } from '../../database/api-keys';

type RevokeAPIKey = {
  apiKeyId: string;
};

type RevokeAPIKeyResultType = ResponseWithPageType & {
  data: {
    apiKey: APIKeysSchemaType;
  },
};

const revokeAPIKey = async (params: RevokeAPIKey) => {
  const {
    apiKeyId,
  } = params;

  const res: RevokeAPIKeyResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {
      apiKey: {} as APIKeysSchemaType,
    },
  };

  const apiKeyData: APIKeysSchemaType = findById(apiKeyId);

  apiKeyData.status = 'revoked';
  update(apiKeyData.id, apiKeyData);

  res.data.apiKey = apiKeyData;
  return res;
};

export {
  revokeAPIKey,
};
