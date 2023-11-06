// eslint-disable-next-line import/no-relative-packages
import catsTestData from '../../../../assets/cats-response.json';
import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';

// total records available in db
const TOTAL_RECORDS = 10;

type GetCatsParamsType = {
  reqNum: undefined | number;
  user: UserSchemaType
};

type GetCatsResultType = ResponseWithPageType & {
  data: {
    cats?: any[]
  },
};

const getCats = async (params: GetCatsParamsType) => {
  const {
    user,
  } = params;

  const res: GetCatsResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {
      totalCount: TOTAL_RECORDS,
      cats: [],
      processId: process.pid,
      user,
    },
  };

  const response = catsTestData;

  res.data.cats = response.data.cats;
  return res;
};

export {
  getCats,
};
