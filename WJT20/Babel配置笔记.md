
# Babel配置笔记 #

## 目录 ##

1. [Babel介绍](#href1)
2. [.babelrc](#href2)
3. [开始转码](#href3)

## <a name="href1">Babel介绍</a> ##

Babel 是一个广泛使用的转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行。有了 Babel，我们可以使用 ES6 来编写程序，可以自由使用那些功能强大的语法。

---

## <a name="href2">.babelrc</a> ##

.babelrc 是 Babel 的配置文件，参访在项目的根目录下，配置 .babelrc 是使用 Babel 的第一步。.babelrc 用来设置转码规则和插件。其基本结构是这样的：

```
{
    "presets": [],
    "plugins": []
}
```

其中，presets 字段用于设置转码规则，转码规则需要事先使用 npm 安装，常用的转码规则有以下这些：

1. babel-preset-es2015：ES2015 转码规则；

2. babel-preset-react：react 转码规则；

3. ES7 不同阶段语法提案的转码规则(4个阶段)：babel-preset-stage-0、babel-preset-stage-1、babel-preset-stage-2 和 babel-preset-stage-3，选择其中之一。

将这些规则加入 .babelrc：

```
{
    "presets": [
        "es2015",
        "react",
        "stage-3"
    ],
    "plugins": []
}
```

---

## <a name="href3">开始转码</a> ##

配置好 .babelrc 文件后，创建一个目录用于存放转码源文件(习惯用 lib 命名)和一个用于转码后的文件的目录(习惯命名为 src)，然后在 package.json 文件中的 scripts 集合中自定义一条命令(命名为 build)，命令内容能够为：`babel src -d lib`，之后便可以在项目根目录下使用`npm run build`命令执行转码操作。

---

```
ARTICLE_ID : 3 
POST_DATE : 2017/08/13
RECENTLY_MODIFY : 2017/08/31
TIME_COUNTER : 1
AUTHER : WJT20
```