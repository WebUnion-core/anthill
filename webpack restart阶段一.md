
## webpack restart阶段一 ##

---

### 目录 ###

1. 参考链接
2. 导语
3. 引用链接
4. webpack常用命令
5. 配置路径常量
6. 出口和入口配置

---

### 参考链接 ###

- ![webpack 入门及实践](https://www.w3ctech.com//topic/1557)

- ![webpack常规配置总结](https://github.com/WeiJietao/LogBase/blob/master/webpack%E5%B8%B8%E8%A7%84%E9%85%8D%E7%BD%AE%E6%80%BB%E7%BB%93.md)

---

### 导语 ###

虽然之前写过![webpack常规配置总结](https://github.com/WeiJietao/LogBase/blob/master/webpack%E5%B8%B8%E8%A7%84%E9%85%8D%E7%BD%AE%E6%80%BB%E7%BB%93.md)一文，但对于 webpack 的了解还是不深，于是决定从头开始再学一遍 webpack，本文是 webpack restart 系列第一篇，主要记录 webpack 最基本的配置选项和常用的命令等。

脚手架源码：

---

### webpack常用命令 ###

1. `webpack`：最基本的启动命令；
2. `webpack -w`：watch方法，实时进行打包更新；
3. `webpack -p`：对打包后的文件进行压缩；
4. `webpack -d`：提供 SourceMaps，方便调试；
5. `webpack --colors`：输出结果带色彩；
6. `webpack --profile`：输出性能数据；
7. `webpack --display-modules`：默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块。

---

### 配置路径常量 ###

通常为方便引用打包源文件和目标文件路径，我们可以在 webpack.config.js 中添加路径常量，也可以将路径常量单独写入一个模块，在 webpack.config.js 中引入。

> 示例：

```
var path = require("path");

// 路径常量
var SRCPATH = path.resolve(__dirname, "src");
var BUILDPATH = path.resolve(__dirname, "build");
```

---

### 出口和入口配置 ###

webpack 的配置项中最基本的就是 entry(入口) 和 output(出口)。entry 可以写为入口文件的URL字符串，也可以写为数组或对象包含多个入口文件，对于SPA来说，入口文件通常为一个；另一个基本配置项 output 是一个对象，path 指明出口绝对路径，publicPath 指明访问路径，filename 指明出口文件。

> 示例：

```
module.exports = {
    entry: [
        path.resolve(SRC_PATH, "/entry.js")
    ],
    output: {
        path: DIST_PATH,
        publicPath: "/dist/",
        filename: "index.js"
    }
}
```

关于 entry 的三种写法和 output 的详细说明，参考![webpack常规配置总结](https://github.com/WeiJietao/LogBase/blob/master/webpack%E5%B8%B8%E8%A7%84%E9%85%8D%E7%BD%AE%E6%80%BB%E7%BB%93.md)。

---

```
ARTICLE_ID      : 1 
POST_DATE       : 2017/08/13
RECENTLY_MODIFY : 2017/08/13
TIME_COUNTER    : 2D
AUTHER          : WJT20
```