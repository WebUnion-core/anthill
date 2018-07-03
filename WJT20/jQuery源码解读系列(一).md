
# jQuery源码解读系列(一) #

## 目录 ##

1. 正则技巧

---

## 正则技巧 ##

1. 检查 HTML 标签和匹配`#id`形式的字符串:

```
var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
console.log(rquickExpr.exec('<h1></h1>')); // 输出: ["<h1></h1>", "<h1></h1>", undefined]
console.log(rquickExpr.exec('#head')); // 输出: ["#head", undefined, "head"]
```

2. 匹配最外层 HTML 标签名:

```
var rquickExpr = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
console.log(rquickExpr.exec('<h1><span></span></h1>')[1]); // 输出: "h1"
```

## 工具类 ##

1.

---

```
ARTICLE_ID : 29
POST_DATE : 2017/09/01
AUTHER : WJT20
```
