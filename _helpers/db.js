const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "aLeksey2011",
    host: "92.51.38.53",
    port: 5432,
    database: "modman_comm",
    _connectionTimeoutMillis: 10000
})

check()

async function check(){
    try {
        const res = await pool.query(`SELECT * FROM users`);
        console.log('Successfully connected to the database');

        console.log(res.rows[0])
    } catch (error) {
        console.error('Error to connection', error);
    }
}



module.exports = pool