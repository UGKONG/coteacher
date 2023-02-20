import {Request, Response} from 'express';
import {success} from '../../functions/utils';

export const getTest = async (req: Request, res: Response) => {
  res.send(success('React Native Server API Test'));
};
