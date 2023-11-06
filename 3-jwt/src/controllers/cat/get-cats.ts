import { Request, Response, NextFunction } from 'express';
import { getCats } from '../../services/cat/get-cats';

const getCatsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { user, query } = req as any;
  const {
    reqNum,
  } = query;

  const payload = {
    reqNum: (!Number.isNaN(Number(reqNum))) ? Number(reqNum) : undefined,
    user,
  };

  const response = await getCats(payload);

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
  getCatsHandler,
};
