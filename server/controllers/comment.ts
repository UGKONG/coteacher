import {Request, Response} from 'express';
import SQL from '../../functions/sql';
import {fail, success} from '../../functions/utils';

export const postComment = async (req: Request, res: Response) => {
  const BD_SQ = req?.params?.BD_SQ;
  const CMT_CN = req?.query?.CMT_CN ?? req?.body?.CMT_CN;
  const USER_SQ = req?.query?.USER_SQ ?? req?.body?.USER_SQ ?? 0;

  if (!USER_SQ) return res.send(fail());

  const {error} = await SQL(
    `
    INSERT INTO tb_comment (
      BD_SQ, CMT_CN, USER_SQ
    ) VALUES (
      ?, ?, ?
    );
  `,
    [BD_SQ, CMT_CN, USER_SQ],
  );

  if (error) return res.send(fail(error));

  res.send(success());
};

export const deleteComment = async (req: Request, res: Response) => {
  const CMT_SQ = req?.params?.CMT_SQ;

  const {error} = await SQL(
    `
    DELETE FROM tb_comment WHERE CMT_SQ = ?;
  `,
    [CMT_SQ],
  );

  if (error) return res.send(fail(error));

  res.send(success());
};
