
# express记录 #

## 目录 ##

1. 什么是express
2. 启动express
3. 请求和响应
4. 静态资源配置
5. 启动服务

---

## 什么是express ##

express 是一个简洁、灵活的 node.js 的 web 应用开发框架，提供了一系列强大特性帮助开发者创建各种 Web 应用和丰富的 HTTP 工具。使用 express 可以快速地搭建一个完整功能的网站。

express 的核心特性：

1. 可以设置中间件来响应 HTTP 请求；

2. 定义了路由表用于执行不同的 HTTP 请求动作；

3. 可以通过向模板传递参数来动态渲染 HTML 页面。

---

## 启动express ##

使用 npm 或 cnpm 即可给我们的应用下载 express 模块，使用命令`npm install --save-dev express`即可下载 express 到 node_modules 中。

在 Node.js 应用启动页中，使用 require 可以引入 express，我们引入的 express 其实是一个函数，它执行后会返回一个 express API 对象，通常用一个名为 app 的变量将其保存下来。

```
var express = require("express");
var app = express();
...
```

---

## 请求和响应 ##

express 包装了发起 HTTP 请求的 API，常用的请求类型就是 GET 和 POST 了，发起 GET 和 POST 请求的代码如下：

```
...
//GET请求
app.get("/", function(req, res) {
    res.send("GET");
});

//POST请求
app.post("/", function(req, res) {
    res.send("POST");
});
...
```

req 对象表示 HTTP 请求，包含了许多有用的属性和方法，其中较常用的有：

1. req.baseUrl/originalUrl：获取路由当前安装的URL路径/原始请求URL；

2. req.body：获取请求主体；

3. req.cookies：获取 cookies；

4. req.state：获取请求状态；

5. req.path：获取请求路径；

6. req.protocol/hostname/ip/params/query：获取协议类型/主机名/IP地址/参数/查询字符串；

res 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据，其常用的属性和方法有：

1. res.cookie(key, value[, option])：设置 cookies；

2. res.clearCookie()：清除 cookies；

3. res.json()：传送 JSON 数据；

4. res.jsonp()：传送 JSONP 响应；

5. res.redirect()：页面重定位，并且状态码置为302；

6. res.send()：传送 HTTP 响应；

7. res.sendFile(path[, options][, fn])：传送指定路径文件，Content-Type 会自动设定；

8. res.set()：设置 HTTP 头；

9. res.status()：设置 HTTP 状态码；

10. res.type()：设置 Content-Type 的MIME类型。

---

## 静态资源配置 ##

通过中间件和 express.static 可以设置指定路由下静态资源的访问位置，为了让我们的页面能成功加载图像等资源，这个步骤至关重要，以以下代码为例：

server.js 代码：

```
...
var path = require("path");
app.use("/page/", express.static(path.resolve(__dirname, "src")));//设置静态资源路径
...
```

HTML 代码：

```
...
<link rel="stylesheet" href="/page/css/style.css"/>
...
```

在 server.js 文件中，我们把"/page/"路由下的静态资源调用路径统一设为与 server.js 同级的 src 目录。这样，当我们在 HTML 页面中通过"/page/css/style.css"路径获取的样式文件就是"/src/css/"下的 style.css 文件。

---

## 启动服务 ##

express 启动 Node 服务使用的是 app.listen() 方法，这个方法写法比较灵活。

写法一、指定具体IP和端口：

```
...
var ip = "196.168.1.1",
    port = 80;
app.listen(ip, port, function() {
    console.log("Server running on: http://%s:%s", ip, port);
});
```

写法二、指定具体端口，IP使用默认的127.0.0.1：

```
...
app.listen(80, function() {
    console.log("Server running on: http://%s:%s", ip, port);    
});
```

写法三、不使用任何参数，默认使用 127.0.0.1:8080 作为访问入口：

```
...
app.listen();
console.log("Server running on: http://127.0.0.1:8080");
```

---

```
ARTICLE_ID : 20
POST_DATE : 2017/08/22
RECENTLY_MODIFY : 2017/08/31
TIME_COUNTER : 3
AUTHER : WJT20
```
