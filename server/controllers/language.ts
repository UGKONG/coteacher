import {Request, Response} from 'express';
import SQL from '../../functions/sql';
import {fail, success} from '../../functions/utils';

export const getLanguages = async (req: Request, res: Response) => {
  const {error, result} = await SQL(`
    SELECT * FROM tb_language ORDER BY LANG_NM;
  `);

  if (error) {
    console.log(error);
    return res.send(fail());
  }

  res.send(success(result));
};
