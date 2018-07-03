
# webpack配置附加记录(一) #

## 目录 ##

1. .babelrc配置

## .babelrc配置 ##

示例:

```
{
    "presets": [
        "react", <-- react转码规则
        "es2015", <-- ES2015转码规则
        "stage-2" <-- ES7不同阶段语法提案的转码规则(包括0、1、2、3四个阶段)
    ],
    "plugins": [
        "transform-object-assign",
        "transform-runtime",
        "array-includes"
    ],
    "env": {
        "development": {
            "sourceMaps": true,
            "retainLines": true,
            "plugins": [
                "react-hot-loader/babel"
            ]
        }
    }
}
```

插件说明:

1. babel-plugin-transform-object-assign: 用于兼容处理Object.assign语法;
2. babel-plugin-transform-runtime: 一些全局对象可能会重复出现在一些模块里，导致编译后的代码体积变大。Babel 为了解决这个问题，提供了单独的包 babel-runtime 供编译模块复用工具函数。参考链接: [https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1](https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1)。

---

```
ARTICLE_ID : 67
POST_DATE : 2018/02/11
AUTHER : WJT20
```
