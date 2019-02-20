
# JavaScript高级程序设计实记——数据类型 #

## 目录 ##

1. [参考链接](#href1)
2. [基本数据类型](#href2)
    1. [Undefined类型](#href2-1)
    2. [Null类型](#href2-2)
    3. [Boolean类型](#href2-3)
    4. [Number类型](#href2-4)
    5. [String类型](#href2-5)
3. [引用数据类型](#href3)
    1. [Object类型](#href3-6)
    2. [Date类型](#href3-7)
    3. [Array类型](#href3-8)
    4. [Math类型](#href3-9)
4. [深拷贝与浅拷贝](#href4)
    1. [内存存取原理](#href4-10)
    2. [如何实现深拷贝](#href4-11)

## <a name="href1">参考链接</a> ##

- [深拷贝与浅拷贝的区别，实现深拷贝的几种方法](https://www.cnblogs.com/echolun/p/7889848.html)

## <a name="href2">基本数据类型</a> ##

JavaScript 有5种基本数据类型: Undefined、Null、Boolean、Number 和 String。

### <a name="href2-1">Undefined类型</a> ###

Undefined 类型只有一个值 undefined，如果使用`var`定义的变量未初始化值，其默认的值为 undefined。

```js
var str;
console.log(str); // undefined
```

### <a name="href2-2">Null类型</a> ###

Null 类型只有一个值null，表示空对象，所以`typeof`操作null值的结果是"object"。

### <a name="href2-3">Boolean类型</a> ###

Boolean 类型有两个值true和 false，分别表示"是"和"否"。

### <a name="href2-4">Number类型</a> ###

Number 类型取值是所有数值，JavaScript 不区分整型数值和浮点型数值，正因如此，浮点型数值计算时会产生精度问题，所以应避免浮点型数值的计算。如果一定要进行浮点型数值计算，可以将相加的两个浮点数转为整数，最后再将相加结果转为浮点数。

```js
// 普通的浮点计算
var sum1 = 0.1 + 0.2;
console.log(sum1); // 0.30000000000000004
console.log(sum1 === 0.3); // false

// 特殊处理的浮点计算
var sum2 = 0.1 * 10 + 0.2 * 10;
console.log(sum2 / 10); // 0.3
console.log(sum2 === 0.3); // true
```

JavaScript 定义的数值可以是十进制、八进制和十六进制值，定义的所有进制的值最终都会被转换为十进制值。

```js
var n1 = 10; // 十进制，值10
var n2 = 0o10; // 八进制，值8
var n3 = 0x10; // 十六进制，值16
```

Number 有一个特殊值NaN，表示一个本来要返回数值的操作值未返回数值的情况。

```js
console.log(Number('a') + 10); // NaN
```

判断一个值是否为NaN只能通过`isNaN()`方法。

```js
console.log(isNaN('a')); // false
console.log(isNaN(1 + 'n')); // true
```

注: `NaN == NaN`返回 false。

### <a name="href2-5">String类型</a> ###

声明字符串: `var str = 'WJT'`。

字符串中可以嵌入字符字面量，例如: `var str = 'WJT\nHello'`，其中，`\n`表示换行符。

字符串属于类数组对象(类数组对象的特点: 可以通过索引号访问指定位置元素，有 length 属性):  

```js
var l = 'ABC'.length;
console.log(l); // 输出3
```

可以使用+号拼接字符串: `var str = 'AB' + 'C';`。

使用字符串的`concat()`方法也可以拼接字符串: `var str = 'A'.concat('B')`，这句代码返回一个由"A"拼接"B"形成的新字符串——"AB"。

字符串常用的属性和方法参考: [JavaScript高级程序设计实记——数组与字符串API](https://github.com/WebUnion-core/anthill/blob/master/WJT20/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%AE%9E%E8%AE%B0%E2%80%94%E2%80%94%E6%95%B0%E7%BB%84%E4%B8%8E%E5%AD%97%E7%AC%A6%E4%B8%B2API.md)

## <a name="href3">引用数据类型</a> ##

### <a name="href3-6">Object类型</a> ###

Object 类型(对象)其实是一个键值对集合，可以直接使用花括号创建对象，然后定义属性或方法。所有引用类型都基于 Object 类型。

```js
var obj = {
    name: 'WJT', // 定义属性

    // 定义方法
    sayHello: function(name) {
        console.log('Hello, ' + name);
    }
};

obj.id = 123; // 外部定义属性
console.log(obj.name); // 访问属性，输出: "WJT"
obj.sayHello('WJT20'); // 调用方法，输出: "Hello, WJT20"
```

### <a name="href3-7">Date类型</a> ###

Date类型就是日期时间的访问操作接口，使用new关键字可以创建一个Date实例对象。

```js
var time = new Date();
```

将日期对象转为数值可以使用"+"号，也可以使用`valueOf()`方法获取，本人比较推荐使用第二种:

```js
var time = new Date();
console.log(+time); // 1533089048343
console.log(time.valueOf()); // 1533089048343
```

Date 日期对象常用 API:  

1. `dateObj.getFullYear()`: 返回创建时的年份;
2. `dateObj.getMonth() + 1`: 从0开始计起，返回0实际上是一月;
3. `dateObj.getDate()`: 返回创建时的日期;
4. `dateObj.getHours()`: 返回创建时的小时;
5. `dateObj.getMinutes()`: 返回创建时的分钟;
6. `dateObj.getSeconds()`: 返回创建时的秒数;
7. `dateObj.getMilliseconds()`: 返回创建时的毫秒数;
8. `dateObj.getDay()`: 返回创建时的星期(数值0-6)。

函数实现: 返回"2018-08-01 10:48:24 Wed"格式的日期字符串。

```js
function getCurrentTime() {
    var time = new Date();
    var ary = [];
    ary.push(time.toISOString().substr(0, 10));
    ary.push(time.toTimeString().match(/[0-9]+:[0-9]+:[0-9]+/)[0]);
    ary.push(time.toUTCString().match(/\w+,/)[0].slice(0, -1));
    return ary.join(' ');
}
```

### <a name="href3-8">Array类型</a> ###

创建数组有两种方式: 使用`new Array()`和使用数组字面量表示法。JavaScript 数组不限制数组元素的数据类型保持统一，一个数组可以包含各种类型的值。

数组实例对象具有一个 length 属性返回数组的元素个数，length 属性可以手动修改，例如想要重置一个数组只要将 length 属性值设为0。数组元素可以通过"[]"加索引号访问。

```js
var arr1 = new Array(5); // 创建一个包含5个空值的数组
var arr2 = new Array('a', 1, true); // 创建数组并填充元素
var arr3 = ['a', 1, true]; // 推荐使用数组字面量写法

console.log(arr3.length); // 输出: 3
console.log(arr3[0]); // 输出: "a"
console.log(arr3[arr3.length - 1]); // 访问最后一个元素: true

arr3.length = 0;
console.log(arr3[0]); // 输出: undefined
```

数组常用的属性和方法参考: [JavaScript高级程序设计实记——数组与字符串API](https://github.com/WebUnion-core/anthill/blob/master/WJT20/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E5%AE%9E%E8%AE%B0%E2%80%94%E2%80%94%E6%95%B0%E7%BB%84%E4%B8%8E%E5%AD%97%E7%AC%A6%E4%B8%B2API.md)

### <a name="href3-9">Math类型</a> ###

Math类型包含了一些常用于数学计算的属性和方法，常用的属性常量有: `Math.PI`，即获取π的值: 3.141592653589793。

`Math.min(num1, ...)`和 `Math.max(num1, ...)`，接收一段数值参数，分别返回其中的最大值和最小值。

```js
var num3 = 10;
var num4 = 5;
console.log(Math.min(num3, num4)); // 输出: 5
console.log(Math.max(num3, num4)); // 输出: 10
```

舍入方法:

1. `Math.ceil(num)`: 向上舍入;
2. `Math.floor(num)`: 向下舍入;
3. `Math.round(num)`: 四舍五入。

`Math.random()`用于获取大于等于0小于1的浮点数，获取a到b之间的整数使用语句: `Math.floor(Math.random() * (b - a + 1) + a)`。

```js
var num7 = Math.floor(Math.random() * 10); // 获取大于等于0小于10的任意整数
var num1 = Math.floor(Math.random() * (10 - 5 + 1) + 5); // 获取大于等于5小于11(5到10之间)的任意整数
```

## <a name="href4">深拷贝与浅拷贝</a> ##

区分深拷贝与浅拷贝的方法，举个例子，A拷贝B，改变A的值，若B也跟着改变，则此拷贝过程为浅拷贝，否则为深拷贝。深拷贝和浅拷贝发生于引用数据类型，拷贝对象通常是 Object 或 Array。

### <a name="href4-10">内存存取原理</a> ###

在进入深拷贝和浅拷贝主题前，先要了解下数据是如何存储到内存中的。

对于基本数据类型，数据名值都是存储于栈内存中，当进行复制操作时，栈内存会新开辟一个内存，正因如此，两者互不干预。示例:

```js
var a = 1;
var b = a;
console.log(a, b); // 1 1
b = 2;
console.log(a, b); // 1 2
```

可以看到，将 b 赋值为2，a 的值也不会变为2。

引用数据类型则不一样，当定义一个引用类型的数据时，栈内存会提供一个引用的地址指向堆内存中的值，当进行复制操作时，复制拿到的是引用的地址而不是真正的值，如果这个时候改变副本的某个值，直接改变的是堆内存中的值，这就导致引用此地址的另一个数据里的值跟着一起变，这就达不到深拷贝的效果。

### <a name="href4-11">如何实现深拷贝</a> ###

实现深拷贝有以下两种方法:

1. 使用递归(这里不考虑算法性能)，示例代码如下:

```js
function deepClone(obj) {
    var clonedObj = obj.constructor === Array ? [] : {};
    if (typeof obj === 'object') {
        for (var key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                // 如果子元素为对象，则递归复制
                clonedObj[key] = deepClone(obj[key]);
            } else {
                // 非引用类型直接复制
                clonedObj[key] = obj[key];
            }
        }
    }
    return clonedObj;
}

var data1 = {
    name: 'WJT20',
    grade: [100, 95, 90]
};
var data2 = deepClone(data1);
data2.grade = [60, 70, 80];
console.log(data1, data2); // {name:"WJT20",grade:[100,95,90]} {name:"WJT20",grade:[60,70,80]}
```

2. 使用`JSON.parse()`和`JSON.stringify()`方法，这种方法比第一种方法简单的多:

```js
function deepClone(obj) {
    var clonedObj;
    var json;
    if (obj && typeof obj === 'object') {
        json = JSON.stringify(obj);
        clonedObj = JSON.parse(json);
    }
    return clonedObj;
}

var data1 = {
    name: 'WJT20',
    grade: [100, 95, 90]
};
var data2 = deepClone(data1);
data2.grade = [60, 70, 80];
console.log(data1, data2); // {name:"WJT20",grade:[100,95,90]} {name:"WJT20",grade:[60,70,80]}
```

---

```
ID         : 21
DATE       : 2017/08/24
AUTHER     : WJT20
TAG        : JavaScript
```
