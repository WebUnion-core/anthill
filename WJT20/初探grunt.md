
# 初探grunt #

## 目录 ##

1. 参考链接
2. 介绍
3. 安装cli
4. 安装grunt和grunt插件
5. Gruntfile.js

## 参考链接 ##

- [Grunt 官方文档](http://www.gruntjs.net/getting-started)

## 介绍 ##

套用官方的介绍: Grunt 是一个自动化的项目构建工具。如果你需要重复的执行像压缩、编译、单元测试，代码检查以及打包发布的任务。 那么你可以使用 Grunt 来处理这些任务，你所需要做的只是配置好 Grunt，这样能很大程度的简化你的工作。jQuery、bootstrap、UEditor 等都在在使用 grunt，学习 grunt 还是很有价值的。

## 安装cli ##

首先使用 npm 命令全局安装 grunt-cli 模块，grunt-cli 的任务很简单: 调用与 Gruntfile 在同一目录中 grunt。

```
npm install -g grunt-cli
```

## 安装grunt和grunt插件 ##

首先在项目根目录下使用 npm 命令安装 grunt 模块。

```
npm install --save-dev grunt
```

然后安装所需的 grunt 插件，关于现有的 grunt 插件，可以参考: [http://www.gruntjs.net/plugins](http://www.gruntjs.net/plugins)。这里以安装 grunt-contrib-jshint、grunt-contrib-nodeunit 和 grunt-contrib-uglify 三种插件为例:

```
npm install --save-dev grunt-contrib-jshint grunt-contrib-nodeunit grunt-contrib-uglify
```

## Gruntfile.js ##

Gruntfile.js 位于项目根目录之下，用于配置或定义任务(task)并加载 grunt 插件的。Gruntfile.js 由以下几部分构成:

1. "wrapper" 函数；
2. 项目与任务配置；
3. 加载grunt插件和任务；
4. 自定义任务。

---

```
ARTICLE_ID : 69
POST_DATE : 2018/02/16
AUTHER : WJT20
```
