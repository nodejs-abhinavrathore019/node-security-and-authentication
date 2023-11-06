import { Request, Response, NextFunction } from 'express';
import { deleteAPIKey } from '../../services/api-key/delete';

const deleteAPIKeyHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { apiKeyId } = req as any;

  const params = {
    apiKeyId,
  };

  const response = await deleteAPIKey(params);

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
  deleteAPIKeyHandler,
};
