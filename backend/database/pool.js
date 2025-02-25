const {Pool} = require('pg');

const pool =new Pool({
    user: "postgres",
    host: "localhost",
    database: "users",
    password:"123n456n",
    post: 5432,
})

pool.connect()
.then(()=> console.log('✅ Connected to PostgreSQL'))
.catch(err=> console.error('❌ Connection error', err))

module.exports= pool;