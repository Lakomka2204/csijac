import getPGClient from "../databases/db";

export default defineEventHandler(async (event) => {
  const con = await getPGClient();
  const r = await con.query("SELECT * from users;");
  con.release();
  return r.rows;
})
