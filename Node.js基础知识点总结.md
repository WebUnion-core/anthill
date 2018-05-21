
# Node.js基础知识点总结 #

## 目录 ##

1. 参考链接
2. 模块  
3. 常用模块和组件
4. Node.js的用途  
    1. Web开发
    2. Web聊天室
    3. Web爬虫
    4. Web博客
5. 进程与线程  
    1. 单线程
    2. 同步与异步
    3. 进程与线程的区别
6. 模块与包  
    1. package.json文件
    2. package.json属性
7. 异步式I/O与事件驱动
8. 路径变量
9. 项目文件结构
10. 使用HTTP服务器
    1. 简单的Web服务器
    2. 页面重定向
    3. url模块
    4. 事件模块
11. 缓冲
    1. Buffer模块
    2. Buffer类
    3. 写入缓冲区
    4. 复制缓冲区
12. 流
    1. 流模块
    2. 可读流
    3. 可写流

---

## 参考链接 ##

- [Node.js 知识点详解(一)基础部分](https://segmentfault.com/a/1190000000728401)  

- [Node.js 知识点详解(二)HTTP 模块与事件模块](https://segmentfault.com/a/1190000001002276)  

- [Node.js 知识点详解(三)缓冲与流模块](https://segmentfault.com/a/1190000002452266)

## 模块 ##

Node.js 模块使用 exports 和 require 两个接口对象，exports 是模块公开接口对象，require 是模块接口获取对象。一般将代码合理拆分到不同 JS 文件，每一个文件就是一个模块。

例如，message.js 文件导出以下方法接口：

```js
// message.js 文件导出方法接口
exports.writeMessage = function() {
    console.log("Write.");
}
exports.sendMessage = function() {
    console.log("Send.");
}
```

receiver.js 文件获取 message 模块后，可以使用导入的方法：

```js
// receiver.js 文件导入模块
var msg = require('./message');
msg.writeMessage();
msg.sendMessage();
```

require 可以接受以下几种参数形式且模块名中的 .js 扩展名可以省略。

1. 原生模块(http、fs、path等)
2. 非原生模块(自安装模块等)
3. 相对路径文件模块
4. 绝对路径文件模块

模块化的优点：

1. 可维护性
    - 灵活架构，焦点分离
    - 方便模块间组合、分解
    - 方便单个模块功能调试、升级
    - 多人协作互不干扰
2. 可测试性
    - 可分单元测试

模块化的缺点：会造成性能损耗，具体体现为系统分层导致调用链会很长；模块间通信，模块间发送信息导致的性能损耗。

## 常用模块和组件 ##

- 包管理：npm
- 模板：Jade、Ejs
- 中间件：Connect
- WebSocket：Socket.io
- 数据库：MongoDB(使用 Mongoose 控制)
- 调错：Node Inspector
- 测试：Mocha + should.js

## Node.js的用途 ##

### Web开发 ###

使用框架：Express + Ejs + Mongoose/MySQL。  

- express：轻量灵活的 Node.js Web 应用框架，对 Node.js 的 Http 模块进行包装，从而实现 Web 请求处理功能。  

- ejs：一个嵌入的 JavaScript 模板引擎，通过编译生成 HTML 代码。  

- mongoose：MongoDB 的对象模型工具，可以进行访问 MongoDB 的操作。  

- mysql：连接 MySQL 数据库的通信 API，可以进行访问 MySQL 的操作。

### Web聊天室 ###

使用框架：Express + Socket.io。  

- socket.io：完全由 JavaScript 实现的，基于 Node.js 架构体系的，支持 websocket 协议的，用于实时通信的软件包。  

### Web爬虫 ###

cheerio：一个快速、灵活、封装 jQuery 核心功能的工具包。去除了 jQuery 中所有 DOM 不一致性和浏览器不兼容的部分。DOM 的解析、操作、渲染更高效。

### Web博客 ###

Hexo：一个基于 Node 的静态博客框架，可以部署在 Node 服务器或 github 上面。

## 进程与线程 ##

一个进程可以包括多个线程。

### 单线程 ###

单线程指的是一次只能完成一件任务。如果有多个任务，就必须排队。  

这种模式的好处是实现起来比较简单，执行环境相对单纯。坏处是若执行的任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段 Javascript 代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。  

大部分 Web 应用的瓶颈都在I/O，即读写磁盘，读写网络，读写数据库。

### 同步与异步 ###

同步(Synchronous)和异步(Asynchronous)两种执行模式是用来解决单线程中执行任务时间过长导致拖延整个程序执行的问题。

同步模式：程序的执行顺序与任务的排列顺序是一致的、同步的。  

异步模式： 每一个任务有一个或多个回调函数，前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。  

在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应，最好的例子就是 Ajax 操作。在服务器端，异步模式甚至是唯一的模式，因为执行环境是单线程的，如果允许同步执行所有 http 请求，服务器性能会急剧下降，很快就会失去响应。

### 进程与线程的区别 ###

线程和进程的区别在于，子进程和父进程有不同的代码和数据空间，而多个线程则共享数据空间，每个线程有自己的执行堆栈和程序计数器为其执行上下文。  

多线程主要是为了节约 CPU 时间。线程的运行中需要使用计算机的内存资源和 CPU。

## 模块与包 ##

npm 允许开发人员使用 package.json 文件来指定在应用程序中要用的模块，并且通过单个命令来安装它们：`npm install`。

### package.json文件 ###

package.json 文件仅包含以特定格式表示的项目信息。package.json 相关的命令：

```
npm install <name> 安装nodejs的依赖包

npm install <name> -g 将包安装到全局环境中

npm install <name> --save 安装的同时，将信息写入package.json中

npm install <name> --save-dev 自动把模块和版本号添加到devdependencies部分

npm init 会引导你创建一个package.json文件，包括名称、版本、作者这些信息等

npm remove <name> 移除包

npm update <name> 更新包
```

### package.json属性 ###

1. `name`: 包的名称
2. `version`: 包的版本
3. `description`: 包的描述
4. `homepage`: 包主页
5. `author`: 包的作者
6. `contributors`: 贡献者到包的名字
7. `dependencies`: 依赖关系的列表。npm 自动安装所有在这里的包 node_module 文件夹中提到的依赖关系。
8. `repository`: 包的库类型和URL
9. `main`: 包的入口点
10. `keywords`: 关键字

## 异步式I/O与事件驱动 ##

Node.js 的异步机制是基于事件的，I/O 是输入输出的意思，指的是计算机和人或者数据处理系统之间的通信。

每一个 I/O 就是一次请求，所有的磁盘 I/O、网络通信、数据库查询都以非阻塞的方式请求，返回的结果由事件循环来处理。

Node.js 进程在同一时刻只会处理一个事件，完成后立即进入事件循环检查并处理后面的事件。这样做的好处是，CPU 和内存在同一时间集中处理一件事，同时尽可能让耗时的 I/O 操作并行执行。

## 路径变量 ##

服务端脚本可以使用以下两个路径变量：

1. \_\_dirname：当前代码所在的目录；
2. \_\_filename：当前代码所在的文件。

使用`path.join(...)`可以将作为参数的多个路径组合生成并返回新的路径值。

## 项目文件结构 ##

- `.gitignore`：从git上忽略的文件清单；
- `.npmignore`：不包括npm注册库中的文件清单；
- `LICENSE`：包的授权文件；
- `README.md`：以markdown格式编写的 readme 文件；
- `bin`：保存包可执行文件的文件夹；
- `doc`：保存包文档的文件夹；
- `examples`：保存如何使用包的实例文件夹；
- `lib`：保存包代码的文件夹；
- `man`：保存包的手册页的文件夹；
- `package.json`：描述包的json文件；
- `src`：保存C/C++源文件的文件夹；
- `deps`：保存包所用到的依赖文件夹；
- `test`：保存模块测试的文件夹；
- `index.js`：包的入口文件。

## 使用HTTP服务器 ##

### 简单的Web服务器 ###

```js
var http = require('http');
http.createServer(function(req, res) {
    res.write("Start...");
}).listern(80, '127.0.0.1');
console.log("Server running at 127.0.0.1:80.");
```

### 页面重定向 ###

实现页面重定向，需要先发送301响应信息来通知客户页面资源已转移，并提供一个重定向的位置头。

```js
var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(301, {
        'Location': 'http://xxx' //写入位置头
    });
    res.end();
}).listen(80, '127.0.0.1');
console.log('Server running at 127.0.0.1:80.');
```

### url模块 ###

Node.js 服务器可以直接请求 url 模块，url 模块的 parse() 方法，可以接受一个 URL 字符串参数，解析 URL 字符串返回一个包含 URL 具体信息的对象，其中常用的有 port、search、path 等信息。

```js
var url = require('url');
var urlString = "http://www.xxx.com:80/webpage?id=001",
    urlObj = url.parse(urlString);

console.log(urlObj.port, urlObj.search); //输出"80 ?id=001"
```

### 事件模块 ###

事件模块是 Node.js 的核心，许多其他模块用它来围绕事件架构功能。

1. 引入 events 模块并实例化 EventEmitter 类

    ```js
    var events = require('events');
    var eventEmitter = new events.EventEmitter();
    ```

2. 使用 on() 方法绑定事件处理程序(侦听器)，on() 方法接受两个参数，第一个参数为事件描述字符串，第二个参数为事件处理函数。

    ```js
    function handle(data) {
        console.log("Hello", data);
    }
    eventEmitter.on('say hello', handle);
    ```

3. 使用 listeners() 方法可以获取指定事件的侦听器数组。

    ```js
    console.log(eventEmitter.listeners('say hello');
    ```

4. 触发事件处理程序并发送数据。

    ```js
    eventEmitter.emit('say hello', 'WJT');
    ```

5. 使用 deleteListener() 方法可以从绑定事件的侦听器数组中删除某个侦听器。

    ```js
    eventEmitter.deleteListener('say hello', handle);
    ```

## 缓冲 ##

### Buffer模块 ###

Buffer 模块为 Node.js带来了一种存储原始数据的方法，使得 Node.js 可以在 js 上下文中使用二进制数据，每当需要 Node.js 中处理 I/O操作中移动的数据时，就有可能使用 Buffer 模块。

### Buffer类 ###

Buffer 类是一个全局变量类型，用来直接处理2进制数据的。 它能够使用多种方式构建。  

原始数据保存在Buffer类的实例中。一个 Buffer 实例类似于一个整数数组。  

__创建Buffer实例__

1. new Buffer(size)：分配一个新的 buffer 大小是 size 的8位字节。
2. new Buffer(array)：分配一个新的 buffer 使用一个8位字节 array 数组。
3. new Buffer(str, [encoding]):encoding String 类型 - 使用什么编码方式，参数可选.

__Buffer类(静态)方法__

1. Buffer.isEncoding(encoding)：如果给定的编码 encoding 是有效的，返回 true，否则返回 false。

2. Buffer.isBuffer(obj)：测试这个 obj 是否是一个 Buffer 实例对象，返回布尔值。

3. Buffer.concat(list, [totalLength])：list 参数为数组类型，是一个 Buffer 数组，用于被连接。totalLength 参数是 Number 类型，为上述 Buffer 数组的所有 Buffer 的总大小。

### 写入缓冲区 ###

将数据写入缓存区用到了 Buffer 实例对象的 write() 方法，接受第一个参数为写入内容，第二个参数是采用的编码格式。

```js
var buffer = new Buffer(8);//创建一个分配了8个字节内存的缓冲区
console.log(buffer.write('a','utf8'));//字符"a"的"utf8"编码占1个字节，输出1
```

### 复制缓冲区 ###

Buffer 实例对象的 copy(bufferToCopyTo) 方法可以将一个 Buffer 实例的整体内容复制到另一个 Buffer 实例中，bufferToCopyTo 参数指要复制的目标 Buffer 实例对象。  

```js
var buffer1 = new Buffer(8);
buffer1.write('Good', 'utf8');
var buffer2 = new Buffer(8);
buffer1.copy(buffer2);
console.log(buffer2.toString());//输出"Good"
```

## 流 ##

### 流模块 ###

流主要有三种类型：  

1. 标准输入
2. 标准输出
3. 标准错误

### 可读流 ###

缓冲区是 Node.js 处理原始数据的方式，流是 Node.js 移动数据的方式。Node.js 中的流是可读的或者是可写的。Node.js 中许多模块都使用了流。  

fs 模块使用文件流读取 data.txt 文件：  

```js
var fs = require('fs');
var stream = fs.ReadStream('data.txt');//创建可读流
stream.setEncoding('utf8');
stream.on('data', function(chunk) {
    console.log('read some data');//收到新数据时触发事件数据
});
stream.on('close', function() {
    console.log('all the data is read');//当文件读取完成后触发关闭事件
});
```

### 可写流 ###

创建可写流可以很方便地写数据。

fs 模块使用文件流读取 A.txt 文件数据并写入 B.txt 文件中：  

```js
var fs = require('fs');
var readablesStream = fs.ReadStream('A.txt');//创建可读流
var writableStream = fs.WriteStream('B.txt');//创建可写流
readablesStream.setEncoding('utf8');
readablesStream.on('data', function(chunk) {
    writableStream.write(chunk);//收到数据时将数据写入可写流
});
readablesStream.on('close', function() {
    writableStream.end();//接受完数据时关闭可写流
});
```

---

```
ARTICLE_ID : 12
POST_DATE : 2017/08/14
AUTHER : WJT20
```
