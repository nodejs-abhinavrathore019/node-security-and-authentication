import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { remove } from '../../database/api-keys';

type DeleteAPIKey = {
  apiKeyId: string;
};

type DeleteAPIKeyResultType = ResponseWithPageType;

const deleteAPIKey = async (params: DeleteAPIKey) => {
  const {
    apiKeyId,
  } = params;

  const res: DeleteAPIKeyResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {},
  };

  remove(apiKeyId);

  return res;
};

export {
  deleteAPIKey,
};
