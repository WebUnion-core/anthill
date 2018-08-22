
# React架构实践记——模块说明 #

## 目录 ##

1. [前言](#href1)
2. [项目结构](#href2)

## <a name="href1">前言</a> ##

前几年的前端框架之争，可谓百家争鸣，而经过几年的激烈竞争，目前已变成了三大主流框架"鼎立"的局势，这三大框架分别为: Vue、React 和 Angular。这三者各有优点、各有特色，Vue 入门门槛低、轻巧灵活，是国内目前最受欢迎的框架; React 大力提倡组件化设计理念，虚拟 DOM 和 JSX 的大胆应用极为创新; Angular 在国内的使用量虽然较前两者要低，但毋庸置疑的一点是，在构建大型应用方面，Angular 的性能是最好的。

大概介绍了三种前端框架各自的优势之后，再讲讲我个人用的最多的框架，也是这个系列的主题框架，那就是 React 了，为什么用的最多的会是 React？因为那时候 React 是最热门的前端框架技术，国内使用 React 构筑 Web 应用的开发者已成一定规模，说句不是很恰当的话就是，那时候 Vue 和 Angular 还处于"填坑"阶段，所以我投入了 React 的怀抱(但后来发现，就入门难度来说，React 是要高于 Vue 的)。

OK，说了一大堆有的没的，是时候该进入正题了，首先说一下这次 React 架构的技术栈:

1. 在 view 方面，用的是 Webpack4+React+Redux+ES6+Sass 的组合，接口请求工具为 superagent，动画库为 animejs，另外引入了 swiper 工具，代码规范工具 eslint 和一个自己包装的工具模块——ammunition-storage(我的命名方式一直都很奇怪，所以请不要太在意...);

2. 在 server 方面，用的是 express 原班人马打造的 Koa 框架，由于 Koa 用到一些新的 ECMAScript 特性，所以推荐 node 版本升级到7以上;

3. 在 data 方面，使用 MongoDB 作为数据库，需安装 mongoose 模块来操作数据库，后续会开发不使用数据库的版本，单纯使用文件系统管理数据。

## <a name="href2">项目结构</a> ##

此项目名为"Bona Storm"，GitHub 地址为 [https://github.com/WebUnion-core/bona-storm](https://github.com/WebUnion-core/bona-storm)，项目的目录结构如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w79.PNG)

主要的一级目录及文件说明如下:

1. asset: 放置一些项目说明内容(主要是图片)和雪碧图资源(这里安利一下一个非常好用的免费图标下载网站: [https://icons8.cn/](https://icons8.cn/));

2. bin: 放置一些自编写的命令行工具，例如将生成的雪碧图 css 文件中的 px 单位转 rem 的工具、执行 webpack 打包前对 .babel 文件进行修改的工具等等;

3. config: 这是一个非常重要的目录，其中放置的 config.json 文件用于集中管理所有的工程配置参数，例如服务器的 IP 地址和端口配置、本地 MongoDB 连接地址和 WebApp 信息等等，除了 config.json 外，一些打包配置文件也放置其中;

4. data: 这是 server 中操作数据的地方，放置专门编写数据访问 API 和生成数据 Model 的服务层的脚本;

5. dist: 用于放置 view 层打包生成资源，当执行打包命令时会自动生成这个目录;

6. src: 与 view 层相关，各个 Web 应用视为独立入口，其中包含各种页面逻辑模块，例如路由、状态管理、页面组件等等;

7. .eslintrc: eslint 代码规范的各种规则配置;

8. .babelrc: babel 的配置文件，不知道 babel 是干什么的请自行百度;

9. db.bat: 这是一个自编写的快捷启动本地 MongoDB 的命令行文件，里面的 MongoDB 本地根位置等内容需自行配置;

10. postcss.config.js: postcss-loader 的配置文件，postcss-loader 可以在 webpack 打包时为一些存在兼容问题样式规则的自动添加前缀;

11. server.js: 启动 server 的入口文件，主要配置了一些 Koa 中间件和服务器配置等等;

12. webpack.config.js: webpack 打包的入口文件，里面编写的是一些基本的 webpack 配置，而不同打包模式的配置选项则抽取到了 config 目录中了。

---

```
ARTICLE_ID : 29
POST_DATE : 2018/08/19
AUTHER : WJT20
```
