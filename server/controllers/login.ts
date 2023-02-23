import {Request, Response} from 'express';
import SQL from '../../functions/sql';
import {
  fail,
  success,
  useRandomChoiceArray,
  useRandomNumber,
} from '../../functions/utils';
import {animals} from '../../public/strings';

export const postLogin = async (req: Request, res: Response) => {
  const id = req?.query?.id ?? req?.body?.id;
  const name = req?.query?.name ?? req?.body?.name;
  const img = req?.query?.img ?? req?.body?.img;
  const platform = req?.query?.platform ?? req?.body?.platform;
  const os = req?.query?.os ?? req?.body?.os;

  if (!id || !name || !platform) return res.send(fail());

  const {error: selectError, result: selectResult} = await SQL(
    `
    SELECT * FROM tb_user
    WHERE USER_SNS_SQ = ?
    AND USER_SNS_NM = ?
    LIMIT 1;
  `,
    [id, platform],
  );

  if (selectError) return res.send(fail());

  let user = selectResult[0];
  if (user) {
    const {error: updateError} = await SQL(
      `
      UPDATE tb_user SET 
      USER_VISIT_CNT = USER_VISIT_CNT + 1,
      USER_VISIT_DT = NOW()
      WHERE USER_SQ = ?;
    `,
      [user?.USER_SQ],
    );

    if (updateError) return res.send(fail());
    res.send(success(user));
  } else {
    const {error: insertError, result: insertResult} = await SQL(
      `
      INSERT INTO tb_user (
        USER_NM, USER_SNS_SQ, USER_SNS_NM, USER_OS, USER_IMG
      ) VALUES (
        ?, ?, ?, ?, ?
      );

      SET @LAST_SQ = LAST_INSERT_ID();

      SELECT * FROM tb_user
      WHERE USER_SQ = @LAST_SQ
      LIMIT 1;
    `,
      [
        useRandomChoiceArray(animals) + useRandomNumber(4),
        id,
        platform,
        os,
        img,
      ],
    );

    if (insertError) return res.send(fail());

    user = insertResult[2][0];
    res.send(success(user));
  }
};
