const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
// 解析请求体数据为 json 格式
app.use(bodyParser.json());

app.use(express.static('./'));
// 解析表单，支持 get 请求参数，post 请求参数、文件上传
// 原本使用的 body-parser 模块无法对包含文件的二进制上传表单加以处理 所以需要使用该模块
const formidable = require('formidable');
// path 模块用于处理文件/目录路径的一个内置模块
const path = require('path');

app.post('/upload', function (req, res) {
    // 使用 new 关键字创建 formidable 的实例
    var form = new formidable.IncomingForm({
        keepExtensions: true,   // 设置该属性为 true 可以使得上传的文件保持原来的文件的扩展名
        // path.resolve 方法用于将相对路径转为绝对路径，__dirname 是获得当前执行文件所在目录的完整目录名
        uploadDir: path.resolve(__dirname, './upfile')
    });
    form.parse(req, function (err, fields, files) {
        if (err) {
            // 更详细的错误处理
            res.status(500).json({ success: false, message: '文件上传失败: ' + err.message });
        } else {
            console.log('上传成功：' + JSON.stringify(files));
            var fileUrl = 'http://127.0.0.1:5000/upfile/';
            for (var i in files) {
                fileUrl += files[i].newFilename;
                break;
            }
            res.json({ success: true, file: fileUrl });
        }
    });
});


// 设置一级路由，引入二级路由
app.use('/glasses', require('./routes/sys'));


app.listen(5000, () => {
    console.log('5000 端口开启');
    // 检查上传目录是否存在，若不存在则创建
    const uploadDir = path.resolve(__dirname, './upfile');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
});

