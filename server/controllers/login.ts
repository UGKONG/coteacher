import {Request, Response} from 'express';
import {fail, success, useDatabase} from '../../functions/utils';

export const postLogin = async (req: Request, res: Response) => {
  const id = req?.query?.id ?? req?.body?.id;
  const name = req?.query?.name ?? req?.body?.name;
  const platform = req?.query?.platform ?? req?.body?.platform;
  const os = req?.query?.os ?? req?.body?.os;

  if (!id || !name || !platform) return res.send(fail());

  const {error: selectError, result: selectResult} = await useDatabase(
    `
    SELECT * FROM tb_user
    WHERE USER_SNS_SQ = ?
    AND USER_NM = ?
    AND USER_SNS_NM = ?
    LIMIT 1;
  `,
    [id, name, platform],
  );

  if (selectError) return res.send(fail());

  let user = selectResult[0];
  if (user) {
    const {error: updateError} = await useDatabase(
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
    const {error: insertError, result: insertResult} = await useDatabase(
      `
      INSERT INTO tb_user (
        USER_NM, USER_SNS_SQ, USER_SNS_NM, USER_OS
      ) VALUES (
        ?, ?, ?, ?
      );

      SET @LAST_SQ = LAST_INSERT_ID();

      SELECT * FROM tb_user
      WHERE USER_SQ = @LAST_SQ
      LIMIT 1;
    `,
      [name, id, platform, os],
    );

    if (insertError) return res.send(fail());

    user = insertResult[2][0];
    res.send(success(user));
  }
};
