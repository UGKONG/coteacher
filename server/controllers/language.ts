import {Request, Response} from 'express';
import {fail, success, useDatabase} from '../../functions/utils';

export const getLanguages = async (req: Request, res: Response) => {
  const {error, result} = await useDatabase(`
    SELECT * FROM tb_language ORDER BY LANG_NM;
  `);

  if (error) {
    console.log(error);
    return res.send(fail());
  }

  res.send(success(result));
};
