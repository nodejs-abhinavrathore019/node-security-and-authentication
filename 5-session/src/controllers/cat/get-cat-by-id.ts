import { Request, Response } from 'express';
import { getCatById } from '../../services/cat/get-cat-by-id';

const getCatByIdHandler = async (req: Request, res: Response) => {
  const { user, params } = req as any;

  const {
    id,
  } = params;

  const payload = {
    id,
    user,
  };

  const response = await getCatById(payload);

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
  getCatByIdHandler,
};
