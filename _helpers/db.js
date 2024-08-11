const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "aLeksey2011",
    host: "92.51.38.53",
    port: 5432,
    database: "modman_comm"
})


module.exports = pool