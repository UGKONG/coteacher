import {Request, Response} from 'express';
import {fail, success, useDatabase} from '../../functions/utils';

// 북마크 리스트 조회
export const getBooks = async (req: Request, res: Response) => {
  const USER_SQ = req?.query?.USER_SQ ?? req?.body?.USER_SQ;

  const {error, result} = await useDatabase(
    `
    SELECT
    a.BOOK_SQ, a.USER_SQ, a.POST_SQ, a.BOOK_CRT_DT,
    b.LANG_SQ, b.POST_TTL, b.POST_CN, b.POST_CD,
    b.POST_VIDEO_SQ, b.POST_MOD_DT, b.POST_CRT_DT, c.LANG_NM
    FROM tb_bookmark a
    LEFT JOIN tb_post b
      ON a.POST_SQ = b.POST_SQ
    LEFT JOIN tb_language c
      ON b.LANG_SQ = c.LANG_SQ
    WHERE a.USER_SQ = ?
    ORDER BY a.BOOK_CRT_DT DESC;
  `,
    [USER_SQ],
  );

  if (error) return res.send(fail());

  res.send(success(result));
};

// 북마크 삭제
export const postBook = async (req: Request, res: Response) => {
  const USER_SQ = req?.query?.USER_SQ ?? req?.body?.USER_SQ;
  const POST_SQ = req?.query?.POST_SQ ?? req?.body?.POST_SQ;

  const {error} = await useDatabase(
    `
    INSERT INTO tb_bookmark (
      USER_SQ, POST_SQ
    ) VALUES (
      ?, ?
    );
  `,
    [USER_SQ, POST_SQ],
  );

  if (error) return res.send(fail());
  res.send(success());
};

// 북마크 삭제
export const deleteBook = async (req: Request, res: Response) => {
  const BOOK_SQ = req?.params?.BOOK_SQ;

  const {error} = await useDatabase(
    `
    DELETE FROM tb_bookmark
    WHERE BOOK_SQ = ?;
  `,
    [BOOK_SQ],
  );

  if (error) return res.send(fail());
  res.send(success());
};
