const app = require('express');
// 获取路由
const router = app.Router();
let queries = require('./users');
let admins = require('./administrators');

// 用户登录
router.post('/user/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        const result = await queries.login(username, password);
        console.log(result);
        if (result.length == 0) {
            res.json({
                code: 400,
                msg: '账号或密码错误',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '登录成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '登录异常',
            data: []
        })
    }
})

// 用户注册
router.post('/user/register', async (req, res) => {
    let { username, password } = req.body;
    try {
        const result = await queries.register(username, password);
        console.log(result);
        if (result.affectedRows == 0) {
            res.json({
                code: 400,
                msg: '注册失败',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '注册成功',
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '注册异常',
            data: []
        })
    }
})

// 用户修改密码
router.put('/user/changePassword', async (req, res) => {
    let { username, password } = req.body;
    try {
        const result = await queries.changePassword(username, password);
        console.log(result);
        if (result.affectedRows == 0) {
            res.json({
                code: 400,
                msg: '修改失败',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '修改成功',
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '修改异常',
            data: []
        })
    }
})

// 用户点单
router.post('/user/orderGoods', async (req, res) => {
    let { id, username } = req.body;
    try {
        const result = await queries.orderGoods(id, username);
        console.log(result);
        if (result.affectedRows == 0) {
            res.json({
                code: 400,
                msg: '插入失败',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '插入成功',
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '插入异常',
            data: []
        })
    }
})

// 用户查询订单
router.post('/user/selectOrders', async (req, res) => {
    let { username} = req.body;
    try {
        const result = await queries.selectOrders(username);
        console.log(result);
        if (result.length == 0) {
            res.json({
                code: 200,
                msg: '没有数据',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '查询成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '查询失败',
            data: []
        })
    }
})

// 用户查询收货地址
router.post('/user/selectAddress', async (req, res) => {
    let { username } = req.body;
    try {
        const result = await queries.selectAddress(username);
        console.log(result);
        if (result.length == 0) {
            res.json({
                code: 200,
                msg: '没有数据',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '查询成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '查询失败',
            data: []
        })
    }
})

// 用户添加收货地址
router.post('/user/addAddress', async (req, res) => {
    let { username, name, home, phone, isDefault } = req.body;
    try {
        const result = await queries.addAddress(username, name, home, phone, isDefault);
        console.log(result);
        if (result.affectedRows == 0) {
            res.json({
                code: 400,
                msg: '填写失败',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '填写成功',
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '填写异常',
            data: []
        })
    }
})

// 用户删除收货地址
router.delete('/user/deleteAddress', async (req, res) => {
    let { id } = req.body;
    try {
        const result = await queries.deleteAddress(id);
        console.log(result);
        if (result.affectedRows == 0) {
            res.json({
                code: 400,
                msg: '删除失败',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '删除成功',
                data: []
            })
            
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '删除异常',
            data: []
        })
    }
})

// 管理员查询所有用户
router.get('/admin/selectUsers', async (req, res) => {
    try {
        const result = await admins.selectUsers();
        console.log(result);
        if (result.length == 0) {
            res.json({
                code: 200,
                msg: '没有数据',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '查询成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '查询失败',
            data: []
        })
    }
})

// 管理员进行模糊查询
router.get('/admin/selectUserByName', async (req, res) => {
    let { username } = req.query;
    try {
        const result = await admins.selectUserByName(username);
        console.log(result);
        if (result.length == 0) {
            res.json({
                code: 200,
                msg: '没有你要查的数据',
                data: []
            })
        } else {
            res.json({
                code : 200,
                msg: '查询成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '查询失败',
            data: []
        })
    }
})

// 管理员删除用户
router.delete('/admin/deleteUser', async (req, res) => {
    let { id } = req.body;
    try {
        const result = await admins.deleteUser(id);
        console.log(result);
        if (result.affectedRows == 0) {
            res.json({
                code: 400,
                msg: '删除失败',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '删除成功',
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '删除异常',
            data: []
        })
    }
})

// 管理员添加商品信息
router.post('/admin/addGoods', async (req, res) => {
    let {goodsname, price} = req.body;
    try {
        const result = await admins.addGoods(goodsname, price);
        console.log(result);
        if (result.affectedRows == 0) {
            res.json({
                code: 400,
                msg: '商品信息添加失败',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '商品信息添加成功',
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '商品信息添加异常',
            data: []
        })
    }
})

// 管理员修改商品信息
router.put('/admin/updateGoods', async (req, res) => {
    let { id, goodsname, price } = req.body;
    try {
        const result = await admins.updateGoods(id, goodsname, price);
        console.log(result);
        if (result.affectedRows == 0) {
            res.json({
                code: 400,
                msg: '商品信息修改失败',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '商品信息修改成功',
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '商品信息修改异常',
            data: []
        })
    }
})

// 管理员删除商品信息
router.delete('/admin/deleteGoods', async (req, res) => {
    let { id } = req.body;
    try {
        const result = await admins.deleteGoods(id);
        console.log(result);
        if (result.affectedRows == 0) {
            res.json({
                code: 400,
                msg: '商品信息删除失败',
                data: []
            })
        } else {
            res.json({
                code: 200,
                msg: '商品信息删除成功',
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '商品信删除异常',
            data: []
        })
    }
})

module.exports = router; 