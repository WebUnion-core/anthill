
# React架构实践记——webpack配置部分 #

## 目录 ##

1. [前言](#href1)
2. [基本配置](#href2)
3. [webpack-dev-server配置](#href3)
4. [开发模式配置](#href4)
5. [生产模式配置](#href5)
6. [其他配置](#href6)
7. [before-pack](#href7)

## <a name="href1">前言</a> ##

一千个人有一千种 Webpack 配置方法，本篇讲解的是我个人的 Webpack 配置方法，如若各位有觉得不合理的地方，欢迎指出。

涉及 Webpack 的 npm 命令主要有以下几条:

1. dev: 命令内容为`set NODE_ENV=debug&&node ./bin/before-pack.js&&webpack-dev-server --profile`，用于启动 Webpack-dev-server;

2. build-dev: 命令内容为`set NODE_ENV=development&&node ./bin/before-pack.js&&webpack`，用于启动开发模式打包;

3. build-prod: 命令内容为`set NODE_ENV=production&&node ./bin/before-pack.js&&webpack`，用于启动生产模式打包;

4. build-sprite: 命令内容为`webpack&&node ./bin/reset-sprite.js`，用于打包雪碧图资源。

打包入口文件为 webpack.config.js 文件，根据环境变量 NODE_ENV 的不同，动态添加4种打包配置。

## <a name="href2">基本配置</a> ##

Webpack 的基本配置抽取到 config/base.config.js 文件中，内容为:

[https://github.com/WebUnion-core/bona-storm/blob/master/config/base.config.js](https://github.com/WebUnion-core/bona-storm/blob/master/config/base.config.js)

此模块只是导出一个配置对象，每个选项的说明如下:

1. mode: 打包模式，webpack 可选值有 production、development 和 none 三种，不能直接取 process.env.NODE_ENV，加入其传值为 production 和 development 以外的值，就把 mode 设为 none;

2. entry: 打包入口，为一个空对象，由后续操作逐步填充;

3. module: 打包插件的配置，主要配置 rules，即各种 loader，着重说明以下几个点:

    1. `babel-loader?cacheDirectory=true`将 cacheDirectory 参数设为 true，可以大大提升打包效率;

    2. `exclude: /node_modules/`的用处是不让 babel-loader 编译 node_modules 目录下的模块;

    3. css 和 scss 编译使用的 loader 引入顺序为 MiniCssExtractPlugin.loader、css-loader、postcss-loader 和 sass-loader，引入顺序会影响打包结果，其中 MiniCssExtractPlugin.loader 是 Webpack4 使用的抽取 css 的模块。

4. resolve: 直接指明第三方模块的绝对路径，减少查找，同样能提升 Webpack 打包效率;

5. optimization: Webpack4 新增的配置选项，splitChunks 下 vendor 的配置会将 vendor 单独提取出来，minimizer 中引入 UglifyJsPlugin 和 OptimizeCSSAssetsPlugin 插件，分别用于混淆 JS 和 CSS;

6. plugins: 使用 webpack.DefinePlugin 插件定义了一个`__DEV__`环境常量，view 层可以利用此常量识别当前环境。

## <a name="href3">webpack-dev-server配置</a> ##

使用 webpack-dev-server 主要是利用其热更新的功能，方便调试和开发，调试模式下传入的 NODE_ENV 为 debug，配置文件为 config/debug.config.js:

[https://github.com/WebUnion-core/bona-storm/blob/master/config/debug.config.js](https://github.com/WebUnion-core/bona-storm/blob/master/config/debug.config.js)

以下为动态添加的配置选项说明:

1. plugins: 第一个添加的插件是 webpack.HotModuleReplacementPlugin，用于配置热更新。第二个插件是 MiniCssExtractPlugin，用于提取 css。第三个是 HtmlWebpackPlugin(页面模板插件)，需要先读取 config.json 中 apps 的数据，为每个独立的应用添加对应的 HTML 模板，模板中注入的常量主要有三个:

    1. version: 版本号;
    2. site: 数据服务器域名(主机名加端口);
    3. cdn: cdn地址，图片等资源都是用 cdn 引入，不参与打包。

2. devtool: 用于增强调试过程，使用的是 cheap-module-eval-source-map 格式;

3. output: 打包出口配置选项;

4. entry: 每个 web 应用都有各自独立的入口配置，配置来源于 config.json 中 apps 的数据，此外，还要加上三个 webpack-dev-server 相关的配置选项:

    1. react-hot-loader/patch: react 专用的热更新插件;
    2. webpack-dev-server/client: 加入 webpack-dev-server 服务器配置;
    3. webpack/hot/only-dev-server: 给 webpack-dev-server 加上热更新功能。

5. devServer: webpack-dev-server 的具体配置(端口、主机名等等)。

## <a name="href4">开发模式配置</a> ##

开发模式传入的 NODE_ENV 为 development，配置文件为 config/development.config.js:

[https://github.com/WebUnion-core/bona-storm/blob/master/config/development.config.js](https://github.com/WebUnion-core/bona-storm/blob/master/config/development.config.js)

development 模式与 debug 模式的配置差不多，涉及到的选项有 plugins、devtool、output 和 entry，不同的是，development 模式不需要使用 webpack-dev-server，所以移除了 devServer、plugin 和 entry 等相关设置，此外，开发模式需要将 vendor 抽取出来，所以 entry 增加了 vendor 的抽取配置。

## <a name="href5">生产模式配置</a> ##

生产模式传入的 NODE_ENV 为 product，配置文件为 production.config.js:

[https://github.com/WebUnion-core/bona-storm/blob/master/config/production.config.js](https://github.com/WebUnion-core/bona-storm/blob/master/config/production.config.js)

生产模式涉及的选项和开发模式的差不多，只不过部分配置需要调整:

1. plugins: 新增 CleanWebpackPlugin 插件，用于清除 /dist 目录下的所有文件;

2. output: 和 MiniCssExtractPlugin 插件一样，导出的 js 和 css 文件加上哈希;

3. entry: 和开发模式基本一样;

4. devtool: 移除。

## <a name="href6">其他配置</a> ##

这里的"其他配置"指的是雪碧图的打包配置，这种模式不需要传入 NODE_ENV，涉及的配置选项也比较简单:

1. entry: 伪入口，没有实际意义;

2. plugins: 仅使用 SpritesmithPlugin 插件，由于本项目涉及多种不同尺寸的雪碧图，所以 plugins 插入多个 SpritesmithPlugin 配置。

## <a name="href7">before-pack</a> ##

仔细看 dev、build-dev 和 build-prod 三条命令可以发现在启动 Webpack 之前执行了一个 before-pack.js 文件。这个文件的作用是操作 .bebelrc 文件，在 development 和 production 模式下移除 plugins 中的 react-hot-loader/babel 配置，这个配置项和 debug 模式下的热更新功能相关，development 和 production 模式下还使用这个配置项就会导致程序出错，这是一个巨坑，当第一次遇到这个问题时，我以为是 webpack 的配置出错，最后发现竟然是 .babelrc 这个东东在搞鬼。

---

```
ARTICLE_ID : 50
POST_DATE : 2018/09/14
AUTHER : WJT20
```
