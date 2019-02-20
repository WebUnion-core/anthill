
# Yarn探索笔记 #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [初始化项目](#href3)
4. [添加依赖](#href4)
5. [升级依赖](#href5)
6. [移除依赖](#href6)

## <a name="href1">参考链接</a> ##

- [Yarn中文文档-新手指南](https://yarnpkg.com/zh-Hans/docs/getting-started)
- [关于 Yarn 和 npm 你所需要知道的一切](https://github.com/xitu/gold-miner/blob/master/TODO1/yarn-vs-npm-everything-you-need-to-know.md)

## <a name="href2">介绍</a> ##

Yarn 是一个由 Facebook，Google，Exponent 和 Tilde 构建的新的 JavaScript 包管理器。相比 npm，Yarn 的优点有:

1. 安装包快速且稳定;
2. 安全;
3. 更清晰、精简的输出内容。

## <a name="href3">初始化项目</a> ##

浏览 [Yarn中文文档-新手指南](https://yarnpkg.com/zh-Hans/docs/getting-started)，安装 Yarn 到本地，可以通过`yarn --version`命令查看安装的 Yarn 版本信息，从而验证 Yarn 是否安装成功。

在自己的项目根目录下(我的项目名称为"yarn-template")执行`yarn init`命令输入项目信息接着生成 package.json 文件，这里对比一下`npm init`命令的运行结果，可以明显看出 Yarn 的优势:

1. 输入信息对比。

    `npm init`效果:

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w120.png)

    `yarn init`效果:

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w121.png)

2. 生成的 package.json 内容对比:

    `npm init`效果:

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w122.png)

    `yarn init`效果:

    ![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w123.png)

## <a name="href4">添加依赖</a> ##

添加依赖用到的是`yarn add`命令，其用法为:

```
yarn add [--dev|--peer|--optional] <PACKAGE>[@<VERSION>|<TAG>]
```

`<PACKAGE>`为安装的依赖包名，`<VERSION>`为具体的版本号，`<TAG>`则为指定的标签;

默认情况下，安装的依赖包只注册在 package.json 中的"dependencies"下; 使用`--dev`参数则是注册在"devDependencies"下; 使用`--peer`会注册到"peerDependencies"下; 使用`--optional`则不会记录到 package.json 中。

如果要安装项目的所有依赖，可以使用`yarn`或者`yarn install`。

## <a name="href5">升级依赖</a> ##

升级依赖用的是`yarn upgrade`命令，其用法为:

```
yarn upgrade <PACKAGE>[@<VERSION>|<TAG>]
```

## <a name="href6">移除依赖</a> ##

移除依赖使用`yarn remove <PACKAGE>`命令。

---

```
ID         : 126
DATE       : 2019/02/14
AUTHER     : WJT20
TAG        : 包管理器
```
