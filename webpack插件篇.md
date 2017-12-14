
# webpack插件篇 #

## 目录 ##

## 参考链接 ##

- [react+webpack项目常用的插件(plugins)](https://segmentfault.com/a/1190000009120632)

## HtmlWebpackPlugin ##

HtmlWebpackPlugin 是一个非原生插件，需要在工程中引入 html-webpack-plugin 模块，此插件用于简化创建生成 HTML 文件，如果引入文件中带有 hash 值的话，这个插件就特别有用，不需要手动去更改引入的文件名。

以下是 webpack.config.js 的配置：

```
var webpack = require("webpack");
var path = require("path");

// 路径常量
var SRC_PATH = path.resolve(__dirname, "src");
var DIST_PATH = path.resolve(__dirname, "dist");

// 引入HtmlWebpackPlugin插件
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: path.resolve(SRC_PATH, "entry.js")
    },
    output: {
        path: DIST_PATH,
        publicPath: "./dist/",
        filename: "[name].[hash:8].js", //出口名不能固定不变
        chunkFilename: "[name].[hash:8].js"
    },
    module: {
        loaders: [
            ...
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, "index.html"), //生成html文件名，默认为index.html
            template: path.resolve(__dirname, "template.html"), //选择模板文件
            hash: false
        })
    ]
}
```

webpack 插件的配置写在 webpack.config.js 文件的 plugins 选项中(plugins 是一个数组)，HtmlWebpackPlugin 的配置项说明如下：

1. title: 生成的 html 文件的 title 标签的内容；
2. filename: 生成的文件名，默认为 index.html；
3. template: 页面模板路径；
4. hash: 增加 hash 值，使每次生成的都是唯一的不重复的。

## ExtractTextWebpackPlugin ##

ExtractTextWebpackPlugin 是一个非原生插件，需要在工程中引入 extract-text-webpack-plugin 模块，此插件用于分离样式表，webpack 中引入样式实际上是在页面中动态生成 style 标签植入样式，众所周知，这种做法极不利于维护，ExtractTextWebpackPlugin 可以帮助我们将样式文件单独打包，这样更利于页面样式的维护。

以下是 ExtractTextWebpackPlugin 插件的配置代码：

```
...
//引入非原生插件
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
    ...
    module: {
        loaders: [
            {
                //CSS样式表打包
                test: /\.css$/,
                loaders: ExtractTextWebpackPlugin.extract({
                    use: ["css-loader"], //使用的loader
                    fallback: "style-loader"
                })
            },
            ...
        ]
    },
    plugins: [
        ...
        new ExtractTextWebpackPlugin("[name].[hash:8].css"), //参数是输出的CSS文件URL
    ]
}
```

---

```
ARTICLE_ID : 50
POST_DATE : 2017/12/14
AUTHER : WJT20
```
