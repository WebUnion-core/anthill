
# Node.js实用技巧笔记 #

## 目录 ##

- [获取指定图像的base64字符串](#href1)
- [快速配置一个Node.js Server](#href2)

## <a name="href1">获取指定图像的base64字符串</a> ##

代码如下:

```js
const fs = require('fs');
const path = require('path');
const base64js = require('base64-js')

const IMG_PATH = path.resolve(__dirname, './../config/support.png');
const IMG_TYPE = 'png'; // png、gif或jpeg
const IMG_BUFFER_DATA = fs.readFileSync(IMG_PATH); // 文件流数据
const BASE64 = IMG_BUFFER_DATA.toString('base64'); // base64字符串
const PREFIX = 'data:image/' + IMG_TYPE + ';base64,'; // 前缀

console.log(PREFIX + BASE64);
```

## <a name="href2">快速配置一个Node.js Server</a> ##

```js
const http = require('http');
const url = require('url');

// 服务器配置
function onRequest(req, res) {
    // 解析查询字符串，获取请求参数
    const query = url.parse(req.url, true, true).query;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end('<h1 style="color:red">Hello, world! GET:' + JSON.stringify(query) + '</h1>');
}

http.createServer(onRequest)
    .listen(2015, function() {
        console.log('Server start: http://127.0.0.1:2015');
    });
```

---

```
ARTICLE_ID : 87
POST_DATE : 2018/07/19
AUTHER : WJT20
```
