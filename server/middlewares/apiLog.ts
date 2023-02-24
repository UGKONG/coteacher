import {NextFunction, Request, Response} from 'express';

const apiLog = (req: Request, res: Response, next: NextFunction) => {
  const method = req?.method;
  const path = req?.path;

  console.log(`${method}  ${path}`);
  next();
};

export default apiLog;
