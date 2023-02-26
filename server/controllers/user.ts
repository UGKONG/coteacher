import {Request, Response} from 'express';
import SQL from '../../functions/sql';
import {
  fail,
  success,
  useRandomChoiceArray,
  useRandomNumber,
} from '../../functions/utils';
import {animals} from '../../public/strings';

// 회원 리스트 조회
export const getUsers = async (req: Request, res: Response) => {
  const {error, result} = await SQL(
    `
    SELECT * FROM tb_user
    ORDER BY USER_SQ;
  `,
  );

  if (error) return res.send(fail());

  res.send(success(result));
};

// 회원 정보 변경
export const putUserName = async (req: Request, res: Response) => {
  const USER_SQ = req?.params?.USER_SQ;
  const USER_NM =
    req?.query?.USER_NM ??
    req?.body?.USER_NM ??
    useRandomChoiceArray(animals) + useRandomNumber(4);

  const {error} = await SQL(
    `
    UPDATE tb_user SET
    USER_NM = ?
    WHERE USER_SQ = ?;
  `,
    [USER_NM, USER_SQ],
  );

  if (error) return res.send(fail());

  res.send(success());
};

// 회원탈퇴
export const deleteUser = async (req: Request, res: Response) => {
  const USER_SQ = req?.params?.USER_SQ;

  const {error} = await SQL(
    `
    UPDATE tb_user SET
    USER_SNS_SQ = '', USER_IMG = NULL
    WHERE USER_SQ = ?;
  `,
    [USER_SQ],
  );

  if (error) return res.send(fail());

  res.send(success());
};
