import { Request, Response, NextFunction } from 'express';
import { revokeAPIKey } from '../../services/api-key/revoke';

const revokeAPIKeyHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { apiKeyId } = req as any;

  const params = {
    apiKeyId,
  };
  const response = await revokeAPIKey(params);

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
  revokeAPIKeyHandler,
};
