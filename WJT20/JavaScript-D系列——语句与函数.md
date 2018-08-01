
# JavaScript-D系列——语句与函数 #

## 目录 ##

1. [语句](#href1)
    1. [if-else](#href1-1)
    2. [do-while](#href1-2)
    3. [while](#href1-3)
    4. [for](#href1-4)
    5. [switch](#href1-5)
2. [函数](#href2)
    1. [arguments](#href2-1)
    2. [匿名函数](#href2-2)

## <a name="href1">语句</a> ##

编程语言的语句大多都是类似的，本篇只列举常用的一些 JavaScript 语句。

### <a name="href1-1">if-else语句</a> ###

```js
if (10 > 5) {
    console.log(10);
} else {
    console.log(5);
}
```

### <a name="href1-2">do-while语句</a> ###

do-while 循环体内的代码至少会被执行一次。

```js
var i = 10;
do {
    i++;
} while (i < 5)
console.log(i); // 输出: 11
```

### <a name="href1-3">while语句</a> ###

```js
var i = 0;
while(i < 10){
  i++;
}
console.log(i); // 输出: 10
```

while 常用于逐个取出数组元素:  

```js
var arr = [1, "2", true];
console.log(arr); // 取出前
while(arr.length > 0) {
    console.log(arr.shift()); // shift()方法会把数组第一个元素取出
}
console.log(arr); // 取出后
```

### <a name="href1-4">for语句</a> ###

for 与 while 功能相似。

```js
for(var i = 0; i < 10; i++) {
    // 操作
}
console.log(i); // 输出: 10
```

for常用于遍历数组元素:

```js
var arr = [1, 2, 3];
for(var i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 通过索引号访问数组元素
}
```

### <a name="href1-5">switch语句</a> ###

```js
var n = 7;
switch (n) {
    case 1: console.log("星期一"); break;
    case 2: console.log("星期二"); break;
    case 3: console.log("星期三"); break;
    case 4: console.log("星期四"); break;
    case 5: console.log("星期五"); break;
    case 6: console.log("星期六"); break;
    default: console.log("星期天");
}
```

switch 括号里面的值和 case 值相等的话就执行 case 后的代码，否则进行下一次比较直到 defalut 为止。case 后跟的值可以是表达式。

```js
var a2 = 4;
switch (true) {
    case a2 < 5: console.log("小于5"); break;
    case a2 < 10: console.log("小于10"); break;
    default: console.log("其他");
}
```

## <a name="href2">函数</a> ##

JavaScript 定义函数使用的是 function 关键字，后跟一组参数以及函数体。

```js
function add(a, b, c) {
    console.log(a + b + c);
}
```

可以通过 return 关键字在函数体中返回值，return 后的内容不会被浏览器识别和执行。

### <a name="href2-1">arguments</a> ###

函数内存在一个 arguments 类数组对象用于包含函数调用时传入的参数，arguments.length 可以获取传入参数的个数，`arguments[index]` 可以访问指定索引号的参数。

JavaScript 对函数具体传入的参数个数没有限制，形参和实参个数不一定相等。

```js
function add(a, b) {
    console.log(a === arguments[0]); // 返回true
    console.log(arguments.length);
}
add(1, 2, 3); // 可以传入更多参数
```

### <a name="href2-2">匿名函数</a> ###

定义时不带函数名的函数称为匿名函数，根据场景的不同，匿名函数又被附加上其他名字，例如，以下代码中的匿名函数被当做一个对象的属性，此时其被称为"方法"——say:

```js
var obj = {
    name: 'ABC',
    say: function(name) {
        console.log('I am ' + name);
    }
}
```

匿名函数可以作为参数传入其他的接口函数，此时其被称为"回调函数":

```js
function requestData(callback) {
    // Ajax handle...
    if (callback) callback();
}

// 传入的匿名函数称为回调函数
requestData(function() {
    console.log('GET.');
});
```

---

```
ARTICLE_ID : 22
POST_DATE : 2017/08/24
AUTHER : WJT20
```
