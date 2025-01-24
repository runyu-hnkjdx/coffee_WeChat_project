const { pool } = require('../db/db');

// 1.管理员查询所有用户
function selectUsers() {
    return new Promise(function (resolve, reject) {
        const sql = 'select * from users';
        pool.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 2.管理员进行模糊查询
function selectUserByName(username) {
    return new Promise(function (resolve, reject) {
        const sql = 'select * from users where username like concat("%", ?, "%")';
        pool.query(sql, [username], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 3.管理员删除用户
function deleteUser(id) {
    return new Promise(function (resolve, reject) {
        const sql = 'delete from users where id=?';
        pool.query(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 4.管理员添加商品信息
function addGoods(goodsname, price) {
    return new Promise(function (resolve, reject) {
        const sql = 'insert into goods(goodsname, price) values (?, ?)';
        pool.query(sql, [goodsname, price], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 5.管理员修改商品信息
function updateGoods(id, goodsname, price) {
    return new Promise(function (resolve, reject) {
        const sql = 'update goods set goodsname=?, price=? where id=?';
        pool.query(sql, [goodsname, price, id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

// 6.管理员删除商品信息
function deleteGoods(id) {
    return new Promise(function (resolve, reject) {
        const sql = 'delete from goods where id=?';
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
    selectUsers,
    selectUserByName,
    deleteUser,
    addGoods,
    updateGoods,
    deleteGoods
}