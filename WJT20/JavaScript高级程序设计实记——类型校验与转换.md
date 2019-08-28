
# JavaScript高级程序设计实记——类型校验与转换 #

## 目录 ##

1. [类型判断](#href1)
    1. [typeof](#href1-1)
    2. [相等符与全等符](#href1-2)
    3. [instanceof与constructor判断](#href1-3)
    4. [最推荐的判断方式](#href1-4)
2. [类型转换](#href2)
    1. [强制类型转换](#href2-1)
    2. [隐性类型转换](#href2-2)
3. [特殊转换](#href3)
    1. [Object转JSON](#href3-1)
    2. [String转RegExp](#href3-2)

## <a name="href1">类型判断</a> ##

### <a name="href1-1">typeof</a> ###

可以使用`typeof`操作符可以返回一个值的数据类型，例如:

```js
var str = 'a bird';
console.log(typeof str); // "string"
console.log(typeof 1); // "number"
```

但是`typeof`的判断并不是特别精准，比如无法区分数组和对象，返回的值都是"object"。

### <a name="href1-2">相等符与全等符</a> ###

`===`为全等符(恒等符)，当等号两边的值和类型都相同时返回 true，否则返回 false。

`==`为相等符(等值符)，当等号两边为相同类型时就比较两边的值，两边类型不同时会发生类型的自动转换，转换为相同的类型后再作比较。

以下是一些使用`==`的特殊场景:

1. 如果一个是 null，一个是 undefined，那么相等;
2. 如果一个是字符串，一个是数值，把字符串转换成数值再进行比较;
3. 如果任一值是 true，把它转换成1再比较，如果任一值是 false，把它转换成0再比较;
4. 如果一个是对象，另一个是数值或字符串，把对象转换成基础类型的值再比较。对象转换成基础类型，利用它的 `toString()`或者`valueOf()`方法。JavaScript 核心内置类，会尝试`valueOf()`先于`toString()`，例外的是 Date，Date 利用的是`toString()`转换。那些不是 JavaScript 语言核心中的对象则通过各自的实现中定义的方法转换为原始值;
5. 任何其他组合，都不相等。

尽量少使用`==`进行值判断，因为问题太多，可能产生一些意料之外的 Bug。

### <a name="href1-3">instanceof与constructor判断</a> ###

Undefined 以外的数据可以根据"所有数据都基于 Object"的特点，即利用 constructor 属性进行判断，代码如下:

```js
var str = 'a bird';
console.log(str.constructor === String); // true
```

这种方式还可以用于判断变量是否为 Array、Date 等原生对象。

利用`instanceof`关键字也可以判断原生对象，不过任何原生对象与 Object 比较的结果都是 true，这点需要注意。示例代码如下:

```js
console.log(([]) instanceof Array); // true
console.log(([]) instanceof Object); // true
console.log((new Date()) instanceof Date); // true
```

`instanceof`左边为一个实例对象，右边是一个构造函数，`instanceof`实际上是用左实例对象的`__proto__`与右构造函数的`prototype`进行比较，会一直沿着隐式原型链`__proto__`向上查找直到`x.__proto__.__proto__......===y.prototype`为止:

```js
function A (name) {
    this.name = name;
}
function B (name) {
    this.name = name;
}

// 如果将这句代码注释掉，会发现最终的输出结果都是false
A.prototype = B.prototype;

var a = new A('ABC');
console.log(a.__proto__ === B.prototype, a instanceof B); // true true
```

### <a name="href1-4">最推荐的判断方式</a> ###

`Object.prototype.toString.call()`是最准确最常用的判断方式，用法如下:

```js
Object.prototype.toString.call(''); // [object String]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(new Function()); // [object Function]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(new RegExp()); // [object RegExp]
Object.prototype.toString.call(new Error()); // [object Error]
```

## <a name="href2">类型转换</a> ##

### <a name="href2-1">强制类型转换</a> ###

1. 转字符串

    将其他类型值转为字符串有两种方法: `String()`标准强制类型转换方法和对象的`toString()`方法。

        全局对象的`String()`方法可以将任何类型转为字符串；变量对象的`toString()`方法可以将除 undefined 和 null 外的其他类型值转为字符串，undefined 和 null 不能转换的原因是这两个值没有`toString()`方法。

    特殊的，Object 类型使用`toString()`转为字符串不会将对象内容输出，而是输出"[object Object]"作为代替。

    ```js
    console.log((11).toString(), typeof (11).toString()); // 数值->字符串，输出: "11" "string"
    console.log(true.toString(), typeof true.toString()); // 布尔值->字符串，输出: "true" "string"
    console.log(String(undefined), typeof String(undefined)); // undefined->字符串，输出: "undefined" "string"
    console.log({}.toString(), typeof {}.toString()); // Object->字符串，输出: "[object Object]" "string"
    ```

    此外，Number 类为数字到字符串的类型转换场景定义了三个方法:

    1. `toFixed()`: 根据小数点后的指定位数将数字转换为字符串，它从不使用指数计数法;
    2. `toExponential()`: 使用指数计数法将数字转换为指数形式的字符串，其中小数点前只有一位，小数点后的位数则由参数指定;
    3. `toPrecision()`: 根据指定的有效数字位数将数字转换为字符串，如果有效数字的位数少于数字整数部分的位数，则转换成指数形式。

2. 转数值

    将其他类型值转为数值有两种方法: `Number()`标准强制类型转换方法和全局对象的`parseXXX()`方法。

    `parseXXX()`包括`parseInt()`、`parseFloat()`等等方法，这些方法会先将操作对象转换为字符串，然后逐个字符检测字符串是否有可转换为数值的部分，如果有可转换为数值的部分则取出该数值返回，否则返回 NaN。

    Object 类型、undefined 值和 null 转为数值的结果都是 NaN。对于布尔值，`parseXXX()`返回的结果都是 NaN，而`Number()`会把 true 转为1，把 false 转为0。

    ```js
    console.log(parseInt('11abc', 10), typeof parseInt('11abc')); // 输出: 11 "number"
    console.log(Number(true), typeof Number(true)); // 输出: 1 "number"
    console.log(parseInt({}, 10), typeof Number({})); // 输出: NaN "number"
    console.log(parseInt(undefined, 10), typeof Number(undefined)); // 输出: NaN "number"
    ```

3. 转布尔值

    转布尔值使用的是`Boolean()`标准类型转换方法。对于非空字符串和非零数值一律返回 true，否则返回 false；undefined 和 null 返回 false，Object 类型返回 true。

### <a name="href2-2">隐性类型转换</a> ###

1. 数值转字符串:

    ```js
    console.log(typeof ('' + 123)); // 输出: "string"
    ```

    加号两边只要有一个值是字符串类型，则另一个值会先转换为字符串类型再将两个字符串进行拼接。

2. 字符串转数值:

    ```js
    console.log(+'123', typeof +'123'); // 输出: 123 "number"
    ```

    转换规则同`Number()`。

3. 其他类型转布尔:

    ```js
    console.log(!!'123'); // 输出: true
    ```

    转换规则同`Boolean()`。

## <a name="href3">特殊转换</a> ##

### <a name="href3-1">Object转JSON</a> ###

之前说过，Object 类型直接使用`toString()`方法是不能转为正确的格式的，那么要如何以字符串的形式显示 Object 的内容呢？JavaScript 提供了一套API专门用于 Object 和JSON之间的转换:

1. `JSON.stringify(OBJECT[, REPLACER[, SPACE]])`: 将 OBJECT 参数转换为JSON字符串，REPLACER 参数(可选)用于转换结果的函数或数组，SPACE 参数(可选)可以为文本添加缩进、空格和换行符;

2. `JSON.parse(JSONSTRING[, REVIVER])`: 将 JSONSTRING 参数转换为 Object 类型，如果 JSONSTRING 不符合JSON格式规范，则直接抛出错误，REVIVER 参数(可选)是一个转换结果的函数。

示例:

```js
var data = {
    name: 'WJT20',
    id: 1
};
var json = JSON.stringify(data);
console.log(json); // '{"name":"WJT20","id":1}'
console.log(JSON.parse(json)); // {name:"WJT20",id:1}
```

### <a name="href3-2">String转RegExp</a> ###

RegExp 即正则类型，将处理后的字符串作为匹配规则(转为正则表达式)是一个常见的操作，可以使用`new RegExp(STRING[, MODIFIER])`，STRING 即作为匹配规则的字符串，MODIFIER(可选)为修饰符组合("i"、"g"、"m"任意组合)。

示例:

```js
var regExp = new RegExp('WJT[0-9]{2}', 'gi');
console.log(regExp.test('I am wjt20')); // true
```

注意，作为匹配规则的字符串中的通配符前要多加一个反斜杠，例如，"\\w"要写为"\\\\w"。

---

```
ID         : 90
DATE       : 2018/08/01
AUTHER     : WJT20
TAG        : JavaScript
```
