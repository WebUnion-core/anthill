
# JavaScript实战技巧 #

## 目录 ##

1. [数组升序排序](#href1)
2. [检查HTML标签和匹配"#id"形式的字符串](#href2)
3. [匹配最外层HTML标签名](#href3)
4. [console api总结](#href4)
	1. [普通打印](#href4-1)
	1. [分组打印](#href4-2)
	2. [表格打印](#href4-3)
	3. [计数和计时](#href4-4)
	4. [条件打印和打印跟踪](#href4-5)

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

## <a name="href4">console api总结</a> ##

### <a name="href4-1">普通打印</a> ###

普通(基本)的打印方法有以下四种，都可接收多个参数:

1. `console.log`: 用得最多的一种，基本上没有任何限制;
2. `console.info`: 打印信息;
3. `console.error`: 打印报错内容;
4. `console.warn`: 打印警告内容。

示例:

```js
console.log('log: ', 'log content.');
console.log('info: ', 'info content.');
console.log('error: ', 'error content.');
console.log('warn: ', 'warn content.');
```

### <a name="href4-2">分组打印</a> ###

分组打印用到的是`console.group()`和`console.groupEnd()`方法，用法如下:

```js
console.group('Group 1: ');
console.log('1. Dva');
console.log('2. Joe');
console.groupEnd();
console.group('Group 2: ');
console.log('1. WJT20');
console.groupEnd();
```

### <a name="href4-3">表格打印</a> ###

表格打印方法`console.table()`可以美观地打印数组和对象:

```js
console.table({
	name: 'WJT20',
	id: 1
});
console.table([
	{ name: 'WJT20', id: 1 },
	{ name: 'Dva', id: 2 }
]);
```

### <a name="href4-4">计数和计时</a> ###

计数即`console.count()`，传入的参数表示字段，每次调用都会统计这个字段调用的次数:

```js
for (var i = 0; i < 5; i++) {
	console.count('counter'); // 共调用5次
}
```

计时常用于计算程序花费的时长，用的是`console.time()`和`console.timeEnd()`:

```js
console.time('test');
for (var i = 0; i < 1000; i++) {} // 1000次循环
console.timeEnd('test');
```

### <a name="href4-5">条件打印和打印跟踪</a> ###

条件打印即`console.assert()`:

```js
for (var i = 0; i < 10; i++) {
	console.assert(i >= 5, { msg: i + ' is less than 5' });
}
```

打印跟踪即`console.trace()`:

```js
console.trace();
```

---

```
ARTICLE_ID : 71
POST_DATE : 2018/05/03
AUTHER : WJT20
```
