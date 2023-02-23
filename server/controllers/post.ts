import {Request, Response} from 'express';
import SQL from '../../functions/sql';
import {fail, success} from '../../functions/utils';

// 게시글 리스트 조회
export const getPosts = async (req: Request, res: Response) => {
  const LANG_SQ = req?.query?.LANG_SQ ?? req?.body?.LANG_SQ;

  const {error, result} = await SQL(
    `
    SELECT
    a.POST_SQ, a.LANG_SQ, b.LANG_NM, a.POST_TTL,
    a.POST_CN, a.POST_CD, a.POST_VIDEO_SQ, a.POST_MOD_DT, 
    a.POST_CRT_DT
    FROM tb_post a
    LEFT JOIN tb_language b
      ON a.LANG_SQ = b.LANG_SQ
    WHERE a.LANG_SQ = ${LANG_SQ ? LANG_SQ : 'a.LANG_SQ'}
    ORDER BY a.POST_SQ;
  `,
    [],
  );

  if (error) return res.send(fail());

  res.send(success(result));
};

// 게시글 상세 조회
export const getPost = async (req: Request, res: Response) => {
  const POST_SQ = req?.params?.POST_SQ;
  const USER_SQ = req?.query?.USER_SQ ?? req?.body?.USER_SQ;

  const {error, result} = await SQL(
    `
    SELECT
    a.POST_SQ, a.LANG_SQ, b.LANG_NM, a.POST_TTL,
    a.POST_CN, a.POST_CD, a.POST_VIDEO_SQ, a.POST_MOD_DT, 
    a.POST_CRT_DT, IF(c.IS_BOOK > 0, 1, 0) AS IS_BOOK, c.BOOK_SQ
    FROM tb_post a
    LEFT JOIN tb_language b
      ON a.LANG_SQ = b.LANG_SQ
    LEFT JOIN (
      SELECT BOOK_SQ, POST_SQ, COUNT(*) AS IS_BOOK FROM tb_bookmark
      WHERE USER_SQ = ? AND POST_SQ = ?
    ) c ON a.POST_SQ = c.POST_SQ
    WHERE a.POST_SQ = ?;
  `,
    [USER_SQ, POST_SQ, POST_SQ],
  );

  if (error) return res.send(fail());
  if (!result[0]) return res.send(fail());

  res.send(success(result[0]));
};
