const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    port: 3306,
    host: '127.0.0.1',
    // database: 'db_glassesshop',
    database: 'db_coffee',
    user: 'root',
    password: '123456',
    // 如果没有可用连接，等待而不是立即抛出错误
    waitForConnections: true, 
    // 连接池中最大连接数
    connectionLimit: 10,
    // 最大排队数量，0表示不限制
    queueLimit: 0
})
// pool.query("SELECT * FROM users", (err, data) => {
//     console.log(data);
// })
module.exports = pool;