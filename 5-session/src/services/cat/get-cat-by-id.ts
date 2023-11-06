import { ResponseType } from '../../types/response';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
// eslint-disable-next-line import/no-relative-packages
import catByIdTestData from '../../../../assets/cat-by-id-response.json';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';

type GetCatByIdParamsType = {
  id: string | number;
  user: UserSchemaType
};

type GetCatByIdResultType = ResponseType & {
  data: {
    cat?: any
  },
};

const getCatById = async (params: GetCatByIdParamsType) => {
  const {
    user,
  } = params;

  const res: GetCatByIdResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {
      processId: process.pid,
      user,
    },
  };

  const response = catByIdTestData;

  res.data.cat = response.data.cat;
  return res;
};

export {
  getCatById,
};
