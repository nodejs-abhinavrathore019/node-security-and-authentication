import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';
import { find } from '../../database/sign-in';
import { createLibCookieSession } from '../../utils/cookie-session/create';

type SignInParamsType = {
  userName: string;
  password: string;
};

type CreateAPIKeyResultType = ResponseWithPageType & {
  data: {
    cookieSessionLib?: string;
  },
};

const signInForLibCookieSession = async (params: SignInParamsType) => {
  const {
    userName,
    password,
  } = params;

  const res: CreateAPIKeyResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: { },
  };

  const user: UserSchemaType = find(userName, password);

  if (!user || Object.keys(user).length === 0) {
    res.httpStatus = HTTPStatusCodes.UNAUTHORIZED;
    res.apiStatus = ApiStatusCodes.SUCCESS;
    res.message = 'user not found';
    return res;
  }

  const cookieEncodedPayload = createLibCookieSession(user);

  res.data.cookieSessionLib = cookieEncodedPayload;

  return res;
};

export {
  signInForLibCookieSession,
};
