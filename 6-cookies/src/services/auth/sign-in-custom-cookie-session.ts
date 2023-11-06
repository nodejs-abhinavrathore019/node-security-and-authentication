import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';
import { find } from '../../database/sign-in';
import { createCustomCookieSession } from '../../utils/cookie-session/create';

type SignInParamsType = {
  userName: string;
  password: string;
};

type CreateAPIKeyResultType = ResponseWithPageType & {
  data: {
    cookieSessionCustom?: string;
  },
};

const signInForCustomCookieSession = async (params: SignInParamsType) => {
  const {
    userName,
    password,
  } = params;

  const res: CreateAPIKeyResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {},
  };

  const user: UserSchemaType = find(userName, password);

  if (!user || Object.keys(user).length === 0) {
    res.httpStatus = HTTPStatusCodes.UNAUTHORIZED;
    res.apiStatus = ApiStatusCodes.SUCCESS;
    res.message = 'user not found';
    return res;
  }

  const signedCookie = createCustomCookieSession(user);

  res.data.cookieSessionCustom = signedCookie;

  return res;
};

export {
  signInForCustomCookieSession,
};
