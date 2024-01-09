import getPGClient from "~/server/databases/db";
import decodeResponse from "~/utils/decodeResponse";
import encodeResponse from "~/utils/encodeResponse";
/*
{
  username : str 0 - 32
  password : str 0 - 32
  method : login - 0 | register - 1
}
*/
export default defineEventHandler(async (event) => {
  const authCookie = getCookie(event, "A1");
  if (authCookie) return setResponseStatus(event, 405, "doubleLogout");
  const b = await readBody(event);
  const dec = decodeResponse(b);
  console.log("DEC",dec);
  if (
    !dec?.username ||
    !dec?.password ||
    !dec?.method ||
    (dec.method != '0' && dec.method != '1')
  )
    return setResponseStatus(event, 400, "noProp");
  const client = await getPGClient();
  const users = await client.query(
    "SELECT id, password FROM users WHERE username = $1;",
    [dec.username]
    );
    client.release();
  switch (dec.method) {
    case '0':
      if (users.rowCount == 0)
        return setResponseStatus(event, 404, "userNotFound");
      const { id, password } = users.rows[0];
      if (!(await checkPassword(dec.password,password)))
        return setResponseStatus(event, 403, "wrongPassword");
      return id;
    case '1':
      if (users.rowCount && users.rowCount > 0)
        return setResponseStatus(event,409,"userAlreadyExists");
      const encPass = await createHashed(dec.password);
      const insClient = await getPGClient();
      const query = await insClient.query("INSERT INTO users(username,password) VALUES($1,$2) RETURNING id;",[dec.username,encPass]);
      insClient.release();
      return query.rows[0].id;
  }
});
