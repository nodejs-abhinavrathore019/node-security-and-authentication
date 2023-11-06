import { Request, Response } from 'express';
import { createAPIKey } from '../../services/api-key/create';

const createAPIKeyHandler = async (req: Request, res: Response) => {
  const {
    name,
  } = req.body;

  const params = {
    name,
  };

  const response = await createAPIKey(params);

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
  createAPIKeyHandler,
};
