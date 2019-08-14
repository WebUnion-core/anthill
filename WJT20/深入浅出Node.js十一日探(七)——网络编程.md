
# 深入浅出Node.js十一日探(七)——网络编程 #

> 在 Web 领域，大多数的编程语言需要专门的 Web服务器作为容器，如 ASP、ASP.NET 需要 IIS 作为服务器，PHP 需要搭载 Apache 或 Nginx 环境等，JSP 需要 Tomcat 服务器等。但对于 Node 而言，只需要几行代码即可构建服务器，无需额外的容器。

> Node 提供了 net、dgram、http、https 这4个模块，分别用于处理 TCP、UDP、HTTP、HTTPS，适用于服务器端和客户端。

## 构建 TCP 服务 ##

### TCP介绍 ###

TCP(传输控制协议)，属于 OSI 七层模型中的传输层协议，许多应用层协议(例如 HTTP、SMTP、IMAP 等)基于 TCP 构建。

TCP 是面向连接的协议，其特点就是有名的"三次握手"会话，简单点说就是:

1. 客户端向服务器请求连接;
2. 服务器对客户端发起响应;
3. 客户端向服务器传输数据。

> 只有会话形成之后，服务器和客户端之间才能互相发送数据。在创建会话的过程中，服务器和客户端分别提供一个套接字，这两个套接字共同形成一个连接。服务器与客户端则通过套接字实现两者之间连接的操作。

### 创建TCP服务器端 ###

通过`net.createServer(listener)`即可创建一个 TCP 服务器，listener 是连接事件 connection 的侦听器，以下是一个创建 TCP 服务器端来接受网络请求的示例:

```js
const net = require('net');

const server = net.createServer(function (socket) {
    // 监听接收
    socket.on('data', function (data) {
        socket.write('Something.');
    });

    // 监听断开连接
    socket.on('end', function () {
        console.log('Disconnect...');
    });

    socket.write('Connect: \n');
});

// 建立连接
server.listen(20153, function () {
    console.log('Server is running in http://127.0.0.1:20153. ');
});
```

通过 net 模块也可以自行构建客户端进行会话，以下是构建一个客户端来测试 TCP 服务的代码:

```js
const net = require('net');

// 建立连接
const client = net.connect({ port: 20153 }, function () {
    console.log('Connected...');
    client.write('I get it.');
});

// 监听接收
client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});

// 监听断开连接
client.on('end', function () {
    console.log('Disconnected...');
});
```

测试结果如图:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w142.png)

---

```
ID         : 135
DATE       : 2019/08/14
AUTHER     : WJT20
TAG        : Node.js
```
