
# JavaScript-D系列——类型校验与转换 #

## 目录 ##

1. [类型判断](#href1)
2. [类型转换](#href2)
    1. [强制类型转换](#href2-1)
    2. [隐性类型转换](#href2-2)

## <a name="href1">类型判断</a> ##

可以使用 typeof 操作符可以返回一个值的数据类型，例如:

```js
var str = 'a bird';
console.log(typeof str); // "string"
console.log(typeof 1); // "number"
```

但是 typeof 的判断并不是特别精准。

除 Undefined 外的数据可以根据"所有数据都基于 Object"的特点，即利用 constructor 属性进行判断，代码如下:

```js
var str = 'a bird';
console.log(str.constructor === String); // true，为字符串类型
```

这种方式还可以用于判断变量是否为 Array、Date 等原生对象。

## <a name="href2">类型转换</a> ##

### <a name="href2-1">强制类型转换</a> ###

1. 转字符串

    将其他类型值转为字符串有两种方法：String() 标准强制类型转换方法和对象的 toString() 方法。

    全局对象的 String() 方法可以将任何类型转为字符串；变量对象的 toString() 方法可以将除 undefined 和 null 外的其他类型值转为字符串，undefined 和 null 不能转换的原因是这两个值没有 toString() 方法。

    特殊的，Object 类型使用 toString() 转为字符串不会将对象内容输出，而是输出"[object Object]"作为代替。

    ```js
    console.log((11).toString(), typeof (11).toString()); // 数值->字符串，输出: "11" "string"
    console.log(true.toString(), typeof true.toString()); // 布尔值->字符串，输出: "true" "string"
    console.log(String(undefined), typeof String(undefined)); // undefined->字符串，输出: "undefined" "string"
    console.log({}.toString(), typeof {}.toString()); // Object->字符串，输出: "[object Object]" "string"
    ```

2. 转数值

    将其他类型值转为数值有两种方法：Number() 标准强制类型转换方法和全局对象的 parseInt() 方法。

    parseInt() 会先将操作对象转换为字符串，然后逐个字符检测字符串是否有可转换为数值的部分直到所检测的字符不能转为数值，如果有可转换为数值的部分则取出该数值返回，否则返回 NaN。

    Object 类型、undefined 值和 null 转为数值的结果都是 NaN。对于布尔值，parseInt() 返回的结果都是 NaN，而 Number() 会把 true 转为1，把 false 转为0。

    ```js
    console.log(parseInt('11abc', 10), typeof parseInt('11abc')); // 输出: 11 "number"
    console.log(Number(true), typeof Number(true)); // 输出: 1 "number"
    console.log(parseInt({}, 10), typeof Number({})); // 输出: NaN "number"
    console.log(parseInt(undefined, 10), typeof Number(undefined)); // 输出: NaN "number"
    ```

3. 转布尔值

    转布尔值使用的是 Boolean() 标准类型转换方法。对于非空字符串和非零数值一律返回 true，否则返回 false；undefined 和 null 返回 false，Object 类型返回 true。

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

    转换规则同 Number()。

3. 其他类型转布尔:

    ```js
    console.log(!!'123'); // 输出: true
    ```

    转换规则同 Boolean()。

---

```
ID         : 90
DATE       : 2018/08/01
AUTHER     : WJT20
TAG        : JavaScript
```
