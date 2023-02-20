import {Request, Response} from 'express';
import {fail, success, useDatabase} from '../../functions/utils';

// 게시글 리스트 조회
export const getPosts = async (req: Request, res: Response) => {
  const LANG_SQ = req?.query?.LANG_SQ ?? req?.body?.LANG_SQ;

  const {error, result} = await useDatabase(
    `
    SELECT * FROM tb_post
    WHERE LANG_SQ = ?
    ORDER BY POST_MOD_DT;
  `,
    [LANG_SQ],
  );

  if (error) return res.send(fail());

  res.send(success(result));
};

// 게시글 상세 조회
export const getPost = async (req: Request, res: Response) => {
  const POST_SQ = req?.params?.POST_SQ;

  const {error, result} = await useDatabase(
    `
    SELECT * FROM tb_post WHERE POST_SQ = ?;
  `,
    [POST_SQ],
  );

  if (error) return res.send(fail());
  if (!result[0]) return res.send(fail());

  res.send(success(result[0]));
};
