
# webpack常规配置总结 #

## 目录 ##

1. 参考链接
2. 什么是webpack?
3. 安装所需模块
4. webpack.config.js
5. entry——入口文件配置
6. output——出口文件配置
7. mudule——各种Loader配置

---

## 参考链接 ##

- [webpack踩坑记录](http://www.tuicool.com/articles/7NvYZbv)

- [webpack多页应用架构系列（二）：webpack配置常用部分有哪些？](https://segmentfault.com/a/1190000006863968)

---

## 什么是webpack? ##

继 gulp、grunt 等工程化工具出现一段时间后，webpack 也诞生了，webpack 早期只是为了实现前端各种资源的统一模块化管理，但是随后出现的各种 loader 和 plugin 将前端引入了新时代，webpack 也变得愈加流行。

---

## 安装所需模块 ##

在使用 webpack 之前，需要使用 npm 安装 webpack，即使用命令：`npm install --save-dev webpack`。

如果安装有淘宝镜像(可以快速地安装模块)，则使用命令：`cnpm install --save-dev webpack`。

---

## webpack.config.js ##

使用`webpack`命令可以执行编译，此时 webpack 会读取当前目录下的 webpack.config.js 文件，webpack.config.js 顾名思义，就是一个用来配置 webpack 的脚本文件，它使用 CommonJS 风格来书写。

可以将`webpack`命令写入到 package.json 文件的 script 选项中，然后使用`npm run COMMAND`来快捷使用打包命令。

关于下文可能使用到的一些常量值：

1. APP_PATH：入口文件集合目录的路径；
2. BUILD_PATH：出口文件根目录的路径。

---

## entry——入口文件配置 ##

entry 项的取值有三种形式：

1. 字符串：以单个文件为入口；

    ```
    module.exports = {
        entry: path.resolve(APP_PATH, "./Index/index.js")
    }
    ```

2. 数组：以多个文件为入口；

    ```
    module.exports = {
        entry: [
            path.resolve(APP_PATH, "./Index/index.js"),
            path.resolve(APP_PATH, "./About/about.js")
        ]
    }
    ```

3. 对象：对象是最推荐的写法，对象的 key(键) 相当于入口名，后续可以用来拼生成文件的路径，也可以用来作为此入口的唯一标识。

    ```
    module.exports = {
        entry: {
            "Index/index": path.resolve(APP_PATH, "./Index/index"),
            "About/index": path.resolve(APP_PATH, "./About/index")
        }
    }
    ```

---

## output——出口文件配置 ##

output 项负责配置输出文件的生成方式，所有的入口文件都必须遵循 output 制定的规则输出。output 是一个对象，内部可以使用几个常用的配置项：path、publicPath、filename 及 chunkFilename。

1. path

    path 项表示生成文件的根目录，需要传入一个绝对路径(通常使用 path 获取绝对路径)，path 项和 filename 项共同组成入口文件的完整路径。

2. publicPath

    publicPath 项是一个指向生成文件的根目录 URL，用于生成 css/js/图片/字体等资源，以确保网页能正确加载到这些资源。path 项针对的是本地文件系统下资源存放的位置，而 publicPath 项针对的是浏览器下资源存放的位置。一般情况下，建议 publicPath 项取相对路径，只有在资源存放在不同域的情况下才使用绝对路径。

3. filename

    filename 属性表示的是根据某种规则命名生成的出口文件，命名规则主要有三种：

    1. [name]：按照 entry 对象中的键来命名，这些键可以使用"/"，这样生成出口文件时会生成相应的目录结构；

    2. [hash]：指代本次编译的一个 hash 版本，只要在同一次编译过程中生成的文件，那么这些文件的 hash 值是相同的，在只有一个出口文件时，这个选项可以正常使用，但是在多个出口文件的情况下容易出现问题；

    3. [chunkhash]：与 hash 不同，每一次的编译生成的 chunk 的 hash 是不同的，如果在第二次编译时某个 chunk 根本没有发生变化，则该 chunk 的 hash 是不会改变的。

4. chunkFilename

    chunkFilename 项与 filename 项相似，都是用来定义生成文件的命名方式，只不过，chunkFilename 项指定的是除入口文件外的 chunk(chunk 通常是由 webpack 对代码的优化所生成的) 的命名。

一个常用的 output 配置实例：

```
...
output: {
    path: BUILD_PATH,
    filename: "[name].js",
    chunkFilename: "[id]/bundle.js"
}
...
```

---

## mudule——各种Loader配置 ##

webpack 能够打包任何资源得益于一个名为 Loader 的类似于插件的机制，通过 Loader，webpack 能够针对每一种特定的资源做出相应的处理，使用 Loader 前要用 npm 安装对应的 Loader 模块，常用的 Loader 有以下这些：

1. style-loader、css-loader 和 sass-loader：打包 css 需要 style-loader 和 css-loader，打包 sass 则需要再加上 sass-loader，除了这些以外还有包装其他 CSS Module 的 Loader，这里不多加叙述；

2. url-loader：打包 png、jpg 及 gif 等图片，一般使用 url-loader 时会在后面加上一个查询参数 limit，当图片大小小于 limit 的值时将直接将图片转换为 base64 的形式内嵌在代码中，这样就可以减少一次 http 请求；

3. babel-loader：打包 js 和 jsx 文件，babel-loader 可以识别 ES6 语法和 JSX 写法；

4. file-loader：打包字体包文件(woff、ttf、tff、otf、eot 及 svg 等格式)，file-loader 还可以打包图像，不过通常打包图像资源更常用 url-loader。

module 项有多个子项，其中最主要的就是 loaders 子项，loaders 子项是一个数组，包含所有 Loader 的配置，loaders 项配置 Loader 主要有以下选项：

1. test：用来指示当前配置 Loader 针对哪些资源，它是一个条件值，条件值可以是某个资源的绝对路径字符串，也可以是正则表达式，其中正则表达式是最推荐的写法。此外，它还可以是数组，数组元素是以上几种格式的数据；

2. exclude：用来剔除掉需要忽略的资源，该值同样是一个条件值；

3. include：与 test 选项功能类似，差别不大；

4. loader 和 loaders：用来指示哪些 Loader 来处理目标资源，loader 是一个字符串，每个 Loader 名称间使用"!"分隔，而 loaders 是一个数组，数组元素就是用到的 Loader 名字。

以下是一个 module 实例：
```
...
module: {
    loaders: [
        {
            //样式表打包
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"] //使用loaders
        },
        {
            //图像打包
            test: /\.(png|jpg|gif)$/,
            loader: "url-loader?limit=8192" //使用loader
        },
        {
            //脚本打包
            test: /\.(js|jsx)$/,
            loader: "babel-loader"
        },
        {
            //字体及svg打包
            test: /\.(woff|ttf|tff|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }
    ]
}
...
```

---

```
ARTICLE_ID : 2 
POST_DATE : 2017/08/13
RECENTLY_MODIFY : 2017/08/31
TIME_COUNTER : 1
AUTHER : WJT20
```