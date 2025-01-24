// const e = require('cors');
const { pool } = require('../db/db');

// 1.用户登录
function login(username, password) {
    return new Promise(function (resolve, reject) {
        const sql = 'select * from users where username=? and password=?';
        pool.query(sql, [username, password], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 2.用户注册
function register(username, password) {
    return new Promise(function (resolve, reject) {
        const sql = 'insert into users(username, password, status) values(?,?,0)';
        pool.query(sql, [username, password], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 3.用户修改密码
function changePassword(username, password) {
    return new Promise(function (resolve, reject) {
        const sql = 'update users set password=? where username=?';
        pool.query(sql, [password, username], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 4.用户点单
function orderGoods(id, username) {
    return new Promise(function (resolve, reject) {
        const sql = 'insert into orders (uid, gid) select id,? from users where username=? limit 1';
        pool.query(sql, [id, username], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 5.用户查询订单
function selectOrders(username) {
    return new Promise(function (resolve, reject) {
        const sql = 'select g.* from goods g join(select gid from orders where uid=(select id from users where username=?)) o on g.id=o.gid';
        pool.query(sql, [username], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 6.用户查询收货地址
function selectAddress(username) {
    return new Promise(function (resolve, reject) {
        const sql = 'select * from address where uid=(select id from users where username=?)';
        pool.query(sql, [username], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// // 7.用户添加收货地址
// function addAddress(username, name, home, phone, isDefault) {
//     return new Promise(function (resolve, reject) {
//         const sql = 'insert into address (uid, name, home, phone, isDefault) select id,?,?,?,? from users where username=?';
//         pool.query(sql, [name, home, phone, isDefault, username], (err, rows) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(rows);
//             }
//         });
//     })
// }
function addAddress(username, name, home, phone, isDefault) {
    return new Promise(function (resolve, reject) {
        const sql = 'insert into address (uid, name, home, phone, isDefault) select id,?,?,?,? from users where username=?';
        pool.query(sql, [name, home, phone, isDefault, username], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                // 在插入操作完成后调用存储过程
                const callProcSql = 'CALL update_default_address()';
                pool.query(callProcSql, [], (callErr, callRows) => {
                    if (callErr) {
                        reject(callErr);
                    } else {
                        resolve(rows);
                    }
                });
            }
        });
    });
}

// 8.用户删除收货地址
function deleteAddress(id) {
    return new Promise(function (resolve, reject) {
        const sql = 'delete from address where id=?';
        pool.query(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}



module.exports = {
    login,
    register,
    changePassword,
    orderGoods,
    selectOrders,
    selectAddress,
    addAddress,
    deleteAddress
}


