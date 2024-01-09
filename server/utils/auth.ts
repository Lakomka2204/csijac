import getPGClient from "~/server/databases/db";
import { checkPassword } from "./password";
async function login(
  username: string,
  password: string,
  ip: string,
  ua: string
): Promise<string> {
    const users = await getUserByName(username);
    if (users.length == 0) throw [404, "userNotFound"];
    const { id, password: dbPass } = users[0];
    if (!(await checkPassword(password, dbPass))) throw [403, "wrongPassword"];
    const authTokens = await getAuthTokens(id, ip, ua);
    if (authTokens.length == 0) {
      const token = await createAuthToken(id,ip,ua);
      return token.token;
    }
    else {
      return authTokens[0].token;
    }
}
async function register(username:string,password:string,ip:string,ua:string): Promise<string> {
  const users = await getUserByName(username);
  if (users.length > 0)
    throw [409,"userExists"];
  const user = await createUser(username,password);
  const auth = await createAuthToken(user.id, ip,ua);
  return auth.token;
} 
async function createUser(username: string, password: string): Promise<any> {
  const client = await getPGClient();

  try {
    const hashedPassword = await createHashed(password);
    return (await client
      .query('INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING id;', 
      [username, hashedPassword])).rows[0];
  } finally {
    client.release();
  }
}
async function getUserByName(username: string): Promise<any[]> {
  const client = await getPGClient();
  try {
    return (
      await client.query("SELECT * FROM users WHERE username = $1;", [username])
    ).rows;
  } finally {
    client.release();
  }
}
async function createAuthToken(
  userId: string,
  ip: string,
  ua: string
): Promise<any> {
  const client = await getPGClient();
  try {
    const authQuery = await client.query(
      "INSERT INTO auth(user_id,ip,ua) VALUES($1,$2,$3) RETURNING *;",
      [userId, ip, ua]
    );
    return authQuery.rows[0];
  } finally {
    client.release();
  }
}
async function getAuthTokens(
  userId: string,
  ip: string,
  ua: string
): Promise<any[]> {
  const client = await getPGClient();
  try {
    return (
      await client.query(
        "SELECT * FROM auth WHERE user_id = $1 AND ip = $2 AND ua = $3;",
        [userId, ip, ua]
      )
    ).rows;
  } finally {
    client.release();
  }
}
export {
  checkPassword,
  createAuthToken,
  createUser,
  getAuthTokens,
  getUserByName,
  login,
  register
}