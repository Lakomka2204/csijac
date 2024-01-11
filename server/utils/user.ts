import { withPG } from "../plugins/db";

async function getUser(token:string) {
  withPG(async (client) => {
    client
    .query("SELECT users.id,users.username,users.display_name,users.created_at,users.preferences,users.avatar FROM auth RIGHT JOIN users ON users.id = auth.user_id WHERE token = $1;",
    [token]);
  })
}