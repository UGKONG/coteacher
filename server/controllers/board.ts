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
    ORDER BY CMT_SQ DESC;

    UPDATE tb_board SET
    BD_VIEW_CNT = BD_VIEW_CNT + 1
    WHERE BD_SQ = ?;
  `,
    [BD_SQ, BD_SQ],
  );

  if (error) return res.send(fail());

  res.send(success(result[0]));
};

export const getMyComment = async (req: Request, res: Response) => {
  const USER_SQ = req?.params?.USER_SQ;

  const {error, result} = await SQL(
    `
    SELECT
    aa.CMT_SQ, aa.CMT_CN, cc.USER_NM AS CMT_USER_NM,
    bb.*, aa.CMT_CRT_DT
    FROM tb_comment aa
    LEFT JOIN (
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
        AND a.USER_SQ = ?
      ORDER BY a.BD_CRT_DT DESC
    ) bb ON aa.BD_SQ = bb.BD_SQ
    LEFT JOIN tb_user cc
      ON aa.USER_SQ = cc.USER_SQ
    WHERE bb.BD_SQ IS NOT NULL
    ORDER BY aa.CMT_CRT_DT DESC;
  `,
    [USER_SQ],
  );

  if (error) return res.send(fail());

  res.send(success(result));
};

export const postBoard = async (req: Request, res: Response) => {
  const BD_CN = req?.query?.BD_CN ?? req?.body?.BD_CN;
  const BD_TAG = req?.query?.BD_TAG ?? req?.body?.BD_TAG;
  const USER_SQ = req?.query?.USER_SQ ?? req?.body?.USER_SQ;

  if (!BD_CN || !USER_SQ) return res.send(fail());

  const {error} = await SQL(
    `
    INSERT INTO tb_board (
      BD_CN, BD_TAG, USER_SQ
    ) VALUES (
      ?, ?, ?
    );
  `,
    [BD_CN, BD_TAG, USER_SQ],
  );

  if (error) return res.send(fail());

  res.send(success());
};

export const deleteBoard = async (req: Request, res: Response) => {
  const BD_SQ = req?.params?.BD_SQ;

  const {error} = await SQL(
    `
    DELETE FROM tb_board WHERE BD_SQ = ?;
  `,
    [BD_SQ],
  );

  if (error) return res.send(fail());

  res.send(success());
};
