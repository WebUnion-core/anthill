
# JavaScript高级程序设计实记——语句与变量 #

## 目录 ##

1. [语句](#href1)
    1. [if-else](#href1-1)
    2. [do-while](#href1-2)
    3. [while](#href1-3)
    4. [for](#href1-4)
    5. [switch](#href1-5)
2. [变量](#href2)
3. [函数](#href3)
    1. [arguments](#href3-6)
    2. [匿名函数](#href3-7)
    3. [作用域](#href3-8)

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

## <a name="href2">变量</a> ##

声明变量使用的是 var 关键字，JavaScript 是弱类型语言，也就是说用 var 声明的变量可赋任何类型的值。

JavaScript 解释器有自己的内存管理机制，可以自动对内存进行垃圾回收，当不再有任何引用指向一个对象，解释器就会知道这个对象没用了，然后自动回收掉它所占用的内存资源。

## <a name="href3">函数</a> ##

JavaScript 中的函数是特殊的变量，定义函数使用的是 function 关键字，后跟一组参数以及函数体。

```js
function add(a, b, c) {
    console.log(a + b + c);
}
```

可以通过 return 关键字在函数体中返回值，return 后的内容不会被浏览器识别和执行。

### <a name="href3-6">arguments</a> ###

函数内存在一个 arguments 类数组对象用于包含函数调用时传入的参数，arguments.length 可以获取传入参数的个数，`arguments[index]` 可以访问指定索引号的参数。

JavaScript 对函数具体传入的参数个数没有限制，形参和实参个数不一定相等。

```js
function add(a, b) {
    console.log(a === arguments[0]); // 返回true
    console.log(arguments.length);
}
add(1, 2, 3); // 可以传入更多参数
```

### <a name="href3-7">匿名函数</a> ###

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

### <a name="href3-8">作用域</a> ###

JavaScript 的函数作用域是指在函数内部声明的所有变量在函数体内始终是可见的，这意味着变量在声明之前甚至是可用的，JavaScript 的这个特性被非正式地称为"声明提前"或者"变量提升"。

例如:

```js
var name = 'WJT20';

function call() {
    console.log(name); // undefined
    var name = 'John';
    console.log(name); // "John"
}

call();
```

函数`call()`内引用的 name 变量之所以是 undefined 而不是"WJT20"，是因为 name 的声明被提升到函数作用域的最顶部，也就是说实际上，以上代码的执行情况等同于以下代码:

```js
var name = 'WJT20';

function call() {
    var name;
    console.log(name); // undefined
    name = 'John';
    console.log(name); // "John"
}

call();
```

由于 JavaScript 没有块级作用域，因此将变量声明放在函数体顶部，而不是将声明靠近放在使用变量之处，这种做法使得源代码非常清晰地反映真实的变量作用域。

每一段 JavaScript 代码(全局代码或函数)都有一个与之关联的作用域链，这个作用域链是一个对象列表或者链表，这组对象定义了这段代码"作用域中"的变量。当 JavaScript 需要查找变量 x 的值时(此过程被称为"变量解析")，它会从链中的第一个对象开始查找，如果这个对象有一个名为 x 的属性，则会直接使用这个属性的值，否则 JavaScript 会继续查找链上的下一个对象，以此类推，如果作用域链上没有任何一个对象含有属性 x，那么就认为这段代码的作用域链上不存在 x，并最终抛出一个引用错误异常。

---

```
ID         : 22
DATE       : 2017/08/24
AUTHER     : WJT20
TAG        : JavaScript
```
