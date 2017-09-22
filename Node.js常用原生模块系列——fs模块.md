
# Node.js常用原生模块系列——fs模块 #

## 目录 ##

1. 参考链接
2. 介绍
3. 读文件
4. 写文件
5. 追加方式写文件
6. 创建目录
7. 查看文件/目录信息
8. 移动/重命名文件或目录
9. 读取目录中的文件
10. 删除文件
11. 判断文件/目录是否存在
12. 删除空目录

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
fs.readFile(fileName[, options], callback)
```

1. fileName：必需，要读取内容的文件绝对URL。
2. options：可选，配置对象。其中的 flag 属性是文件操作选项(类型：字符串)，如r+代表读，w+代表写；encoding 属性则是用于指定字符集。
3. callback：读取文件后的操作回调函数，其第一个参数为错误对象，第二个参数是读取的数据。

示例代码：

```
...
//读文件内容
fs.readFile(__dirname + "/test.txt", { flag: "r+", encoding: "utf8" }, function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});
```

---

## 写文件 ##

写文件使用的是 fs 模块的 writeFile 函数，其语法结构如下：

```
fs.writeFile(fileName, data[, options], callback)
```

1. fileName：必需，要写入内容的文件绝对URL。
2. data：必需，要写入的内容。
3. options：可选，配置对象。同 readFile。
4. callback：写入文件后的操作回调函数，同 readFile。

示例代码：

```
//文件末行写入内容
fs.writeFile(__dirname + "/test.txt", "C: hhh.", {flag: "a"}, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("write success.");
    }
});
```

---

## 追加方式写文件 ##

追加方式写文件与写文件方式不同之处在于，追加方式写文件不会在目标文件中另起行写入内容，而写文件会在目标文件末换行写入内容。其语法结构如下：

```
fs.appendFile(fileName, data, callback)
```

1. fileName：必需，要写入内容的文件绝对URL。
2. data：必需，要写入的内容。
3. callback：追加方式写入文件后的操作回调函数，无参数。

示例代码：

```
//追加方式写文件
fs.appendFile(__dirname + "/test.txt", " I am WJT.", function() {
    console.log("write success.");
});
```

---

## 创建目录 ##

创建目录使用的是 fs 模块的 mkdir 函数，其语法结构如下：

```
fs.mkdir(dirName[, mode], callback)
```

1. dirName：必需，要创建的目录绝对URL。
2. mode：可选，目录权限，默认0777。
3. callback：追加方式写入文件后的操作回调函数，无参数。

示例代码：

```
//创建目录
fs.mkdir(__dirname + "/file", function(err) {
    if (err) {
        console.log(e);
    }
    console.log("create directory success.");
});
```

---

## 查看文件/目录信息 ##

要查看具体的文件/目录的信息，可以使用 fs 模块的 stat 函数，其语法结构如下：

```
fs.stat(path, callback)
```

1. path：必需，要创建的文件/目录绝对URL。
2. callback：查看文件/目录后的操作回调函数，其第一个参数为错误对象，第二个参数是读取的详细信息对象。

示例代码：

```
//查看文件或目录信息
fs.stat(__dirname + "/file/test.txt", function(err, stat) {
    if (err) {
        console.log(err);
    } else {
        console.log(stat);
    }
});
```

---

## 移动/重命名文件或目录 ##

移动和重命名文件或目录是同一个操作，使用的是 fs 模块的 rename 函数，其语法结构如下：

```
fs.rename(oldPath, newPath, callback)
```

1. oldPath：必需，要移动/重命名的文件或目录绝对URL。
2. newPath：必需，移动/重命名后的文件或目录绝对URL。
3. callback：移动/重命名文件或目录后的操作回调函数，其第一个参数为错误对象。

示例代码：

```
//重命名
fs.rename(__dirname + "/file/test.txt", __dirname + "/file/test.md", function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("rename success.");
    }
})
```

---

## 读取目录中的文件 ##

读取目录中的文件使用的是 fs 模块的 readdir 函数，其语法结构如下：

```
fs.readdir(dirName, callback)
```

1. dirName：必需，要读取文件的目录绝对URL。
2. callback：读取目录中文件后的操作回调函数，其第一个参数为错误对象，第二个参数是文件名数组。

示例代码：

```
//读取目录下的文件
fs.readdir(__dirname + "/file", function(err, files) {
    if (err) {
        console.log(err);
    } else {
        files.forEach(function(e, i) {
            console.log("file" + i + 1, e);
        });
    }
});
```

---

## 删除文件 ##

删除文件使用的是 fs 模块的 unlink 函数，其语法结构如下：

```
fs.unlink(path, callback)
```

1. path：必需，要删除的文件或目录绝对URL。
2. callback：删除文件或目录后的操作回调函数，其参数为错误对象。

示例代码：

```
//删除文件
fs.unlink(__dirname + "/file/test.txt", function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("delete file success");
    }
});
```

---

## 判断文件/目录是否存在 ##

判断文件/目录是否存在使用的是 fs 模块的 exists 函数，其语法结构如下：

```
fs.exists(path, callback)
```

1. path：必需，要判断存在的文件或目录绝对URL。
2. callback：判断文件或目录存在后的操作回调函数，参数为表征存在的布尔值。

```
fs.exists(__dirname + "/file", function(ifExist) {
    console.log(ifExist);
})
```

---

## 删除空目录 ##

删除空目录使用的是 fs 模块的 rmdir 函数，其语法结构如下：

```
fs.rmdir(dirName, callback)
```

1. dirName：必需，要删除的空目录绝对URL。
2. callback：删除空目录后的操作回调函数，其参数为错误对象。

示例代码：

```
//清除空目录
fs.rmdir(__dirname + "/file", function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("remove directory success.");
    }
});
```

---

```
ARTICLE_ID : 31
POST_DATE : 2017/09/10
RECENTLY_MODIFY : 2017/09/17
TIME_COUNTER : 2
AUTHER : WJT20
```
