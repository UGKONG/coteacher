import {ConnectionConfig, createConnection} from 'mysql';

interface ConnectionReturn {
  error: Error | null;
  result: any;
  sql: string;
}

/**
 * @example
 * const { error, result, sql } = await SQL(`
 *   SELECT * FROM 테이블명
 *   WHERE USER_ID = ? AND USER_PW = ?;
 * `, ['USER_ID', 'USER_PW']);
 */
export default function SQL(
  sql: string,
  sqlParams?: Array<string | number>,
): Promise<ConnectionReturn> {
  const config: ConnectionConfig = {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    dateStrings: true,
    multipleStatements: true,
  };

  const db = createConnection(config);

  let sqlString = sql;

  if (sqlParams) {
    sqlParams?.forEach(param => {
      sqlString = sqlString.replace('?', String(param));
    });
  }

  return new Promise(success => {
    db.query(sql, sqlParams ?? [], (error: Error | null, result: any) => {
      db.end();
      if (error) console.log(error);
      success({error, result, sql: sqlString});
    });
  });
}
