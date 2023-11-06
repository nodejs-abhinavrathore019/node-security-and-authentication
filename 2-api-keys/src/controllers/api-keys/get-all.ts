import { Request, Response, NextFunction } from 'express';
import { getAPIKeys } from '../../services/api-key/get-api-keys';

const getAPIKeysHandler = async (req: Request, res: Response, next: NextFunction) => {
  const response = await getAPIKeys();

  const {
    httpStatus,
    apiStatus,
    message,
    data,
  } = response;

  res.status(httpStatus).send({
    status: apiStatus,
    message,
    data,
  });
};

export {
  getAPIKeysHandler,
};
