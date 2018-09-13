
# Node.js常用原生模块系列——path模块 #

## 参考链接 ##

- [Node.js v10.8.0 文档](http://nodejs.cn/api/path.html)

## 介绍 ##

path 模块提供了一些工具函数，用于处理文件与目录的路径，通过`const path = require('path')`引入模块。path 模块的默认操作会根据 Node.js 应用程序运行的操作系统的不同而变化。

## 获取路径信息 ##

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

4. `path.format(PATH_OBJECT)`: 将路径参数对象(PATH_OBJECT 参数)转换为路径字符串，需要注意的是，PATH_OBJECT 中优先级高的选项会覆盖优先级低的选项，例如 dir 会覆盖 root，base 会覆盖 name 和 ext，另外需要注意，返回的路径字符串中是以反斜杠为分隔符的;

    ```js
    console.log(path.format({
        dir: '\\route\\path',
        root: '\\home',
        base: 'index.html',
        name: 'page',
        ext: '.js'
    })); // 输出: "\route\path\index.html"
    ```



---

```
ARTICLE_ID : 106
POST_DATE : 2018/09/13
AUTHER : WJT20
```
