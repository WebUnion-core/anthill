
# Node.js常用原生模块系列——path模块 #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [获取路径信息](#href3)
4. [路径操作](#href4)
5. [其他](#href5)

## <a name="href1">参考链接</a> ##

- [Node.js v10.8.0 文档](http://nodejs.cn/api/path.html)

## <a name="href2">介绍</a> ##

path 模块提供了一些工具函数，用于处理文件与目录的路径，通过`const path = require('path')`引入模块。path 模块的默认操作会根据 Node.js 应用程序运行的操作系统的不同而变化。

## <a name="href3">获取路径信息</a> ##

1. `path.basename(PATH[, EXT])`: 获取指定文件路径(PATH 参数)的文件名部分，可选参数 EXT 为校验用的文件扩展名，如果路径不匹配此扩展名则直接抛出错误;

    ```js
    console.log(path.basename('/src/index.html')); // 输出: "index.html"
    console.log(path.basename('/src/index.html', '.js')); // 报错
    ```

2. `path.dirname(PATH)`: 获取 PATH 的目录名;

    ```js
    console.log(path.dirname('/src/index.html')); // 输出: "/src"
    ```

3. `path.extname(PATH)`: 获取 PATH 的文件扩展名;

    ```js
    console.log(path.extname('/src/index.html')); // 输出: ".html"
    ```

## <a name="href4">路径操作</a> ##

1. `path.format(PATH_OBJECT)`: 将路径参数对象(PATH_OBJECT 参数)转换为路径字符串，需要注意的是，PATH_OBJECT 中优先级高的选项会覆盖优先级低的选项，例如 dir 会覆盖 root，base 会覆盖 name 和 ext，另外需要注意，返回的路径字符串中是以反斜杠为分隔符的;

    ```js
    console.log(path.format({
        dir: '\\route\\path',
        root: '\\home',
        base: 'index.html',
        name: 'page',
        ext: '.js'
    })); // 输出: "\route\path\index.html"
    ```

2. `path.parse(PATH)`: 与`path.format`用法相反，根据 PATH 字符串返回对应的路径参数对象;

    ```js
    console.log(path.parse('/src/home/image/page/test.png'));
    // 输出: { root: '/', dir: '/src/home/image/page', base: 'test.png', ext: '.png', name: 'test' }
    ```

3. `path.join([...PATHS])`: 使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录;

    ```js
    console.log(path.join('src/home', '/image', 'page', '/test.png')); // 输出: "src\home\image\page\test.png"
    ```

4. `path.normalize(PATH)`: 路径格式化，自动移除无用的`..`和`.`片段，并用当前系统的分隔符转换路径;

    ```js
    console.log(path.normalize('/src/../all/index.html')); // ".."被移除，斜杠被替换为反斜杠，输出: "\all\index.html"
    ```

5. `path.relative(FROM, TO)`: 返回 TO 路径相对 FROM 的相对路径;

    ```js
    console.log(path.relative('/src/home/image', '/src/home/info/file.txt')); // 输出: "..\info\file.txt"
    ```

6. `path.resolve([...PATHS])`: 在当前工作目录的基础上组合多个路径参数，最终返回绝对路径;

    ```js
    console.log(path.resolve('/src/home/image', './img.png')); // 输出: "D:\src\home\image\img.png"
    ```

## <a name="href5">其他</a> ##

1. `path.isAbsolute(PATH)`: 判断 PATH 是否为绝对路径;

    ```js
    console.log(path.isAbsolute('/src/index.html')); // true
    console.log(path.isAbsolute('./../src/index.html')); // false
    ```

2. `path.sep`: 返回当前系统规定的路径分隔符，Windows 的分隔符为`\`，POSIX 则是`/`;

---

```
ID         : 106
DATE       : 2018/09/13
AUTHER     : WJT20
TAG        : 
```
