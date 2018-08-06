
# JavaScript实战技巧 #

## 目录 ##

1. [数组升序排序](#href1)
2. [检查HTML标签和匹配"#id"形式的字符串](#href2)
3. [匹配最外层HTML标签名](#href3)

## <a name="href1">数组升序排序</a> ##

```js
function lexSort(a, b) {
	return a === b ? 0 : a > b ? 1 : -1
}

var ary = [2, 5, 3, 1, 4];
console.log(ary.sort(lexSort)); // => [1,2,3,4,5]
```

## <a name="href2">检查HTML标签和匹配"#id"形式的字符串</a> ##

```js
var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
console.log(rquickExpr.exec('<h1></h1>')); // => ["<h1></h1>", "<h1></h1>", undefined]
console.log(rquickExpr.exec('#head')); // => ["#head", undefined, "head"]
```

## <a name="href3">匹配最外层HTML标签名</a> ##

```js
var rquickExpr = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
console.log(rquickExpr.exec('<h1><span></span></h1>')[1]); // => "h1"
```

---

```
ARTICLE_ID : 71
POST_DATE : 2018/05/03
AUTHER : WJT20
```
