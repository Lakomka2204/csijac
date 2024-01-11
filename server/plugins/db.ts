import pg from "pg"

const pool = new pg.Pool({
    application_name: process.env.PG_USER,
    host:"localhost",
    port:5432,
    database: process.env.PG_USER,
    user:process.env.PG_USER,
    password: process.env.PG_PASS,
    
})

export async function withPG<T>(func: (dbClient: pg.PoolClient) => T) {
    const client = await pool.connect() // get new client from pool
    const result = func(client);
    client.release()
    return result // return client to pool
}

export default defineNitroPlugin(async (nitro) => {

    await pool.connect().then((value : pg.PoolClient) => {
        console.log("Postgres connection established");
    })

    nitro.hooks.hookOnce("close", async () => {
        await new Promise<void>((resolve) => pool.end(() => resolve()))
        console.log("db connection closed")
    })
})