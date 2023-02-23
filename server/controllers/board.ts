import {Request, Response} from 'express';
import SQL from '../../functions/sql';
import {fail, success} from '../../functions/utils';

export const getBoards = async (req: Request, res: Response) => {
  const {error, result} = await SQL(
    `
    SELECT
    a.BD_SQ, a.BD_CN, a.BD_TAG, a.USER_SQ,
    b.USER_NM, b.USER_IMG, a.BD_VIEW_CNT,
    IF(c.CNT > 0, c.CNT, 0) AS BD_CMT_CNT,
    a.BD_MOD_DT, a.BD_CRT_DT
    FROM tb_board a
    LEFT JOIN tb_user b
      ON a.USER_SQ = b.USER_SQ
    LEFT JOIN (
      SELECT BD_SQ, COUNT(BD_SQ) AS CNT
      FROM tb_comment GROUP BY BD_SQ
    ) c ON a.BD_SQ = c.BD_SQ
    WHERE a.IS_DEL = 0
    ORDER BY a.BD_CRT_DT DESC;
  `,
    [],
  );

  if (error) return res.send(fail());

  res.send(success(result));
};

export const getBoard = async (req: Request, res: Response) => {
  const BD_SQ = req?.params?.BD_SQ;

  const {error, result} = await SQL(
    `
    SELECT
    a.CMT_SQ, a.CMT_CN, a.BD_SQ, 
    a.USER_SQ, b.USER_NM, b.USER_IMG,
    a.CMT_MOD_DT, a.CMT_CRT_DT
    FROM tb_comment a
    LEFT JOIN tb_user b
      ON a.USER_SQ = b.USER_SQ
    WHERE a.BD_SQ = ?
    ORDER BY CMT_SQ;
  `,
    [BD_SQ],
  );

  if (error) return res.send(fail());

  res.send(success(result));
};