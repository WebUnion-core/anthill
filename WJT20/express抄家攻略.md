
# express抄家攻略 #

## 目录 ##

1. [什么是express](#href1)
2. [启动express](#href2)
3. [请求和响应](#href3)
    1. [请求报文对象](#href3-1)
    2. [响应报文对象](#href3-2)
4. [静态资源配置](#href4)
5. [启动服务](#href5)
6. [示例模板](#href6)

## <a name="href1">什么是express</a> ##

express 是一个简洁、灵活的 Node.js Web 应用开发框架，提供了一系列强大特性帮助开发者创建各种Web应用和丰富的HTTP工具。使用 express 可以快速地搭建一个完整功能的网站。

express 的核心特性:

1. 可以设置中间件来响应HTTP请求;

2. 定义了路由表用于执行不同的HTTP请求动作;

3. 可以通过向模板传递参数来动态渲染HTML页面。

## <a name="href2">安装和启动express</a> ##

使用命令`npm install --save-dev express`将 express 安装到开发环境。

在主程序中导入 express 模块，执行后获取一个app对象。

```js
const express = require('express');
const app = express();
...
```

## <a name="href3">请求和响应</a> ##

express 包装了发起HTTP请求的API，常用的请求类型就是GET和POST了，发起GET和POST请求的代码如下:

```js
...
// GET请求
app.get('/', function (req, res) {
    res.send('GET');
});

// POST请求
app.post('/', function (req, res) {
    res.send('POST');
});
...
```

### <a name="href3-1">请求报文对象</a> ###

请求报文对象req表示HTTP请求，包含了许多有用的属性，其中较常用的有:

1. `req.baseUrl/originalUrl`: 获取路由当前安装的URL路径/原始请求URL;

2. `req.body`: 获取请求主体;

3. `req.cookies`: 获取 cookies;

4. `req.state`: 获取请求状态;

5. `req.path`: 获取请求路径;

6. `req.protocol/hostname/ip/params/query`: 获取协议类型/主机名/IP地址/参数/查询字符串。

示例:

```js
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

// POST请求需要引入body-parser模块对请求报文进行解析，否则req.body获取不到数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post(`/v1.0.0/home/activity`, (req, res) => {
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.body);
    console.log(req.cookies);
    console.log(req.state);
    console.log(req.path);
    console.log(req.protocol);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.params);
    console.log(req.query);
});
...
```

发起一次模拟请求:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w104.png)

打印结果如图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w105.png)

### <a name="href3-2">响应报文对象</a> ###

响应报文对象res表示HTTP响应，即在接收到请求时向客户端发送的HTTP响应数据，其常用的方法有:

1. `res.cookie(key, value[, option])`: 设置 cookies;

2. `res.clearCookie()`: 清除 cookies;

3. `res.json()`: 传送JSON数据;

4. `res.jsonp()`: 传送 JSONP 响应;

5. `res.redirect()`: 页面重定位，并且状态码置为302;

6. `res.send()`: 传送HTTP响应;

7. `res.sendFile(path[, options][, fn])`: 传送指定路径文件，Content-Type 会自动设定;

8. `res.set()`: 设置HTTP头;

9. `res.status()`: 设置HTTP状态码;

10. `res.type()`: 设置 Content-Type 的MIME类型。

修改主程序路由:

```js
...
app.post(`/v1.0.0/home/activity`, (req, res) => {
    // 设置Header
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json;charset=UTF-8'
    });
    res.cookie('name', 'WJT20'); // 设置cookie
    res.status(502); // 设置响应状态码
    res.json({ status: 'success' }); // 返回Json
});
...
```

再模拟请求一下，响应报文如图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w106.png)

## <a name="href4">静态资源配置</a> ##

通过中间件和`express.static`可以设置指定路由下静态资源的访问位置，为了让我们的页面能成功加载图像等资源，这个步骤至关重要，以以下代码为例:

server.js 代码:

```js
...
const path = require('path');
app.use('/page/', express.static(path.resolve(__dirname, 'src'))); // 设置静态资源路径
...
```

HTML代码:

```html
...
<link rel="stylesheet" href="/page/css/style.css"/>
...
```

在 server.js 文件中，我们把"/page/"路由下的静态资源调用路径统一设为与 server.js 同级的src目录。这样，当我们在HTML页面中通过"/page/css/style.css"路径获取的样式文件就是"/src/css/"下的 style.css 文件。

## <a name="href5">启动服务</a> ##

express 启动 Node.js 服务使用的是`app.listen()`方法，这个方法写法比较灵活。

写法一、指定具体IP和端口:

```js
...
const ip = '196.168.1.1';
const port = 80;
app.listen(ip, port, function () {
    console.log('Server running on: http://%s:%s', ip, port);
});
```

写法二、指定具体端口，IP使用默认的127.0.0.1:

```js
...
app.listen(80, function () {
    console.log('Server running on: http://%s:%s', ip, port);    
});
```

写法三、不使用任何参数，默认使用127.0.0.1:8080作为访问入口:

```js
...
app.listen();
console.log('Server running on: http://127.0.0.1:8080');
```

## <a name="href6">示例模板</a> ##

```js
// 模块
const express = require('express');
const path = require('path');
const app = express();

// IP及端口
const port = process.env.PORT || 8080;
const ip = process.env.IP || '127.0.0.1';

// 静态资源
app.use('/', express.static(path.resolve(__dirname, 'dist')));

// 路由
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './view/index.html'));
});

// 监听
app.listen(port, ip, function () {
    console.log('Server running on: http://%s:%s', ip, port);
});
```

---

```
ARTICLE_ID : 20
POST_DATE : 2017/08/22
AUTHER : WJT20
```
