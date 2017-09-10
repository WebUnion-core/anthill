
# Node.js常用原生模块系列——fs模块 #

## 目录 ##

1. 参考链接
2. 介绍
3. 读文件

---

## 参考链接 ##

- [node.js之fs模块](http://www.jianshu.com/p/5683c8a93511)

---

## 介绍 ##

fs(全称：file system)模块，是我们可以直接使用的几个 Node.js 模块之一，它提供了对文件的读取、写入、更名、删除、遍历目录、链接等 API。

在脚本文件中可以使用 CommonJS 风格引入 fs 依赖，代码如：`var fs = require("fs");`

---

## 读文件 ##

读文件使用的是 fs 模块的 readFile 函数，其语法结构如下：

```
fs.readFile(filename[, options], callback)
```

1. filename：必需，要读取内容的文件绝对URL。
2. options：可选，配置对象。其中的 flag 属性是文件操作选项(类型：字符串)，如r+代表读，w+代表写；encoding 属性则是用于指定字符集。
3. callback：必需，读取文件后的操作回调函数，其第一个参数为错误对象，第二个参数是读取的数据。

示例代码：

```
...
//读当前目录下的test.txt文件内容
fs.readFile(__dirname + "/test.txt", { flag: "r+", encoding: "utf8" }, function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});
```

---

```
ARTICLE_ID : 31
POST_DATE : 2017/09/10
RECENTLY_MODIFY : 2017/09/10
TIME_COUNTER : 0
AUTHER : WJT20
```
