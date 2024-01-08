import getPGClient from "../databases/db"

export default defineEventHandler(async (event) => {
    const pgClient = await getPGClient();
    pgClient.release();
    return
  })