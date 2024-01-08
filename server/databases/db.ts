import pg from 'pg';

const client = new pg.Pool({
    application_name: process.env.PG_USER,
    host:"localhost",
    port:5432,
    database: process.env.PG_USER,
    user:process.env.PG_USER,
    password: process.env.PG_PASS,

})
async function getPGClient() {
    return await client.connect();
}
export default getPGClient;