
# Node.js常用原生模块系列——fs模块 #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [异步API](#href3)
    1. [读文件](#href3-1)
    2. [写文件](#href3-2)
    3. [创建目录](#href3-3)
    4. [查看文件/目录信息](#href3-4)
    5. [移动/重命名文件或目录](#href3-5)
    6. [读取目录中的文件](#href3-6)
    7. [删除文件](#href3-7)
    8. [判断文件/目录是否存在](#href3-8)
    9. [删除空目录](#href3-9)
4. [同步API](#href4)
    1. [读文件](#href4-10)
    2. [写文件](#href4-11)
    3. [创建目录](#href4-12)
    4. [查看文件/目录信息](#href4-13)
    5. [移动/重命名文件或目录](#href4-14)
    6. [读取目录中的文件](#href4-15)
    7. [删除文件](#href4-16)
    8. [判断文件/目录是否存在](#href4-17)
    9. [删除空目录](#href4-18)

## <a name="href1">参考链接</a> ##

- [node.js之fs模块](http://www.jianshu.com/p/5683c8a93511)

- [Node.js v10.1.0 文档](http://nodejs.cn/api/fs.html)

## <a name="href2">介绍</a> ##

fs(全称: file system)模块，是我们可以直接使用的几个 Node.js 模块之一，它提供了对文件的读取、写入、更名、删除、遍历目录、链接等 API。在脚本文件中可以使用 CommonJS 风格引入 fs 依赖，代码如: `const fs = require('fs')`

## <a name="href3">异步API</a> ##

以下仅说明比较常用的几个异步 API。

### <a name="href3-1">读文件</a> ###

读文件使用的是 fs 模块的 readFile 函数，其语法结构如下:

```js
fs.readFile(fileName[, options], callback)
```

1. fileName: 必需，要读取内容的文件绝对URL;  
2. options: 可选，配置对象。其中的 flag 属性是文件操作选项(类型: 字符串)，如`r+`代表读，`w+`代表写; encoding 属性则是用于指定字符集;  
3. callback: 读取文件后的操作回调函数，其第一个参数为错误对象，第二个参数是读取的数据。

示例代码:

```js
fs.readFile(
    __dirname + '/test.txt',
    { flag: 'r+', encoding: 'utf8' },
    function(err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
        }
    }
);
```

### <a name="href3-2">写文件</a> ###

写文件使用的是 fs 模块的 writeFile 函数，其语法结构如下:

```js
fs.writeFile(fileName, data[, options], callback)
```

1. fileName: 必需，要写入内容的文件绝对URL;
2. data: 必需，要写入的内容;
3. options: 可选，配置对象。同 readFile;
4. callback: 写入文件后的操作回调函数，同 readFile。

示例代码:  

```js
fs.writeFile(
    __dirname + '/test.txt',
    'C: hhh.',
    { flag: 'a' },
    function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('write success.');
        }
    }
);
```

### <a name="href3-3">创建目录</a> ###

创建目录使用的是 fs 模块的 mkdir 函数，其语法结构如下:

```js
fs.mkdir(dirName[, mode], callback);
```

1. dirName: 必需，要创建的目录绝对URL;  
2. mode: 可选，目录权限，默认0777;  
3. callback: 追加方式写入文件后的操作回调函数，无参数。

示例代码:  

```js
fs.mkdir(
    __dirname + '/file',
    function(err) {
        if (err) {
            console.log(e);
        }
        console.log('create directory success.');
    }
);
```

### <a name="href3-4">查看文件/目录信息</a> ###

要查看具体的文件/目录的信息，可以使用 fs 模块的 stat 函数，其语法结构如下:  

```js
fs.stat(path, callback);
```

1. path: 必需，要创建的文件/目录绝对URL;  
2. callback: 查看文件/目录后的操作回调函数，其第一个参数为错误对象，第二个参数是读取的详细信息对象。

示例代码:  

```js
fs.stat(
    __dirname + '/file/test.txt',
    function(err, stat) {
        if (err) {
            console.log(err);
        } else {
            console.log(stat);
        }
    }
);
```

### <a name="href3-5">移动/重命名文件或目录</a> ###

移动和重命名文件或目录是同一个操作，使用的是 fs 模块的 rename 函数，其语法结构如下:

```js
fs.rename(oldPath, newPath, callback);
```

1. oldPath: 必需，要移动/重命名的文件或目录绝对URL;  
2. newPath: 必需，移动/重命名后的文件或目录绝对URL;  
3. callback: 移动/重命名文件或目录后的操作回调函数，其第一个参数为错误对象。  

示例代码:  

```js
fs.rename(
    __dirname + '/file/test.txt',
    __dirname + '/file/test.md',
    function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('rename success.');
        }
    }
);
```

### <a name="href3-6">读取目录中的文件</a> ###

读取目录中的文件使用的是 fs 模块的 readdir 函数，其语法结构如下:

```js
fs.readdir(dirName, callback);
```

1. dirName: 必需，要读取文件的目录绝对URL;  
2. callback: 读取目录中文件后的操作回调函数，其第一个参数为错误对象，第二个参数是文件名数组。  

示例代码:  

```js
fs.readdir(
    __dirname + '/file',
    function(err, files) {
        if (err) {
            console.log(err);
        } else {
            files.forEach(function(e, i) {
                console.log('file' + i + 1, e);
            });
        }
    }
);
```

### <a name="href3-7">删除文件</a> ###

删除文件使用的是 fs 模块的 unlink 函数，其语法结构如下:

```js
fs.unlink(path, callback);
```

1. path: 必需，要删除的文件或目录绝对URL;  
2. callback: 删除文件或目录后的操作回调函数，其参数为错误对象。

示例代码:

```js
fs.unlink(
    __dirname + '/file/test.txt',
    function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('delete file success');
        }
    }
);
```

### <a name="href3-8">判断文件/目录是否存在</a> ###

判断文件/目录是否存在使用的是 fs 模块的 exists 函数，其语法结构如下:

```js
fs.exists(path, callback);
```

1. path: 必需，要判断存在的文件或目录绝对URL。
2. callback: 判断文件或目录存在后的操作回调函数，参数为表征存在的布尔值。

```js
fs.exists(
    __dirname + '/file',
    function(ifExist) {
        console.log(ifExist);
    }
);
```

### <a name="href3-9">删除空目录</a> ###

删除空目录使用的是 fs 模块的 rmdir 函数，其语法结构如下:

```js
fs.rmdir(dirName, callback);
```

1. dirName: 必需，要删除的空目录绝对URL;
2. callback: 删除空目录后的操作回调函数，其参数为错误对象。

示例代码:

```js
fs.rmdir(
    __dirname + '/file',
    function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('remove directory success.');
        }
    }
);
```

## <a name="href4">同步API</a> ##

以下仅说明比较常用的几个同步 API。

### <a name="href4-10">读文件</a> ###

非异步方式读取文件内容，返回的值就是读到的文件内容:  

```js
fs.readFileSync(fileName[, options]);
```

1. fileName: 必需，要读取内容的文件绝对URL;  
2. options: 可选，配置对象。其中的 flag 属性是文件操作选项(类型: 字符串)，如`r+`代表读，`w+`代表写; encoding 属性则是用于指定字符集。  

示例代码:  

```js
const content = fs.readFileSync(
    __dirname + '/file/test.txt',
    'utf-8'
);
```

### <a name="href4-11">写文件</a> ###

非异步方式写内容到指定文件:  

```js
fs.writeFileSync(fileName, data[, options]);
```

1. fileName: 必需，要写入内容的文件绝对URL;  
2. data: 必需，要写入的内容;  
3. options: 可选，配置对象。同 readFileSync。

示例代码:

```js
fs.writeFileSync(
    __dirname + '/file/test.txt',
    'Hello, world! ',
    'utf-8'
);
```

### <a name="href4-12">创建目录</a> ###

非异步创建目录:  

```js
fs.mkdirSync(dirName[, mode]);
```

1. dirName: 必需，要创建的目录绝对URL;  
2. mode: 可选，目录权限，默认0777。  

示例代码:  

```js
fs.mkdirSync(__dirname + '/file');
```

### <a name="href4-13">查看文件/目录信息</a> ###

非异步方式查看文件/目录信息:  

```js
fs.statSync(path);
```

1. path: 必需，要查看的文件/目录绝对URL。  

示例代码:  

```js
const data = fs.statSync(__dirname + '/file');
```

### <a name="href4-14">移动/重命名文件或目录</a> ###

非异步方式移动/重命名文件或目录:  

```js
fs.renameSync(oldPath, newPath);
```

1. oldPath: 必需，要移动/重命名的文件或目录绝对URL;  
2. newPath: 必需，移动/重命名后的文件或目录绝对URL。  

示例代码:  

```js
fs.renameSync(
    __dirname + '/file/test.txt',
    __dirname + '/file/test.md'
);
```

### <a name="href4-15">读取目录中的文件</a> ###

非异步方式读取目录中的文件:  

```js
fs.readdirSync(path[, options]);
```

1. dirName: 必需，要读取文件的目录绝对 URL;  
2. options: 可选，配置对象。其中的 flag 属性是文件操作选项(类型: 字符串)，如`r+`代表读，`w+`代表写; encoding 属性则是用于指定字符集，默认为`utf-8`。  

示例代码:  

```js
fs.readdirSync(__dirname + '/file');
```

### <a name="href4-16">删除文件</a> ###

非异步方式移除文件:  

```js
fs.unlinkSync(path);
```

1. path: 必需，要判断是否存在的文件绝对URL。  

示例代码:  

```js
fs.unlinkSync(__dirname + '/file/test.txt');
```

### <a name="href4-17">判断文件/目录是否存在</a> ###

非异步方式获取指定文件/目录是否存在，返回的 Boolean 值表示文件是否存在:

```js
fs.existsSync(path);
```

1. path: 必需，要判断是否存在的文件/目录绝对URL。  

示例代码:  

```js
const ifExist = fs.existsSync(__dirname + '/file');
```

### <a name="href4-18">删除空目录</a> ###

非异步方式移除目录:  

```js
fs.rmdirSync(path);
```

1. path: 必需，要判断是否存在的目录绝对URL。  

示例代码:  

```js
fs.rmdirSync(__dirname + '/file');
```

---

```
ID         : 31
DATE       : 2017/09/10
AUTHER     : WJT20
TAG        : 
```
