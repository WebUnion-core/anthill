
## JavaScript数据类型与类型转换 ##

### 目录 ###

1. 数据类型
    1. 类型判断
    2. Undefined类型
    3. Null类型
    4. Boolean类型
    5. Number类型
2. 类型转换
    1. 强制类型转换
    2. 隐性类型转换

---

### 数据类型 ###

#### 类型判断 ####

JavaScript 有5种基本数据类型 Undefined、Null、Boolean、Number 和 String，和1种复杂数据类型 Object。可以使用 typeof 操作符可以返回一个值的数据类型，例如：

```
var str = "a bird";
console.log(typeof str);//"string"
console.log(typeof 1);//"number"
```

---

#### Undefined 类型 ####

Undefined 类型只有一个值 undefined，如果使用 var 定义的变量未初始化值，则获取的值为 undefined。

```
var str;
console.log(str);//undefined
```

#### Null 类型 ####

Null 类型只有一个值 null，null值表示指定的值是一个空对象，所以 typeof 操作 null 值的结果是"object"。

#### Boolean 类型 ####

Boolean 类型有两个值 true 和 false。

#### Number 类型 ####

Number 类型取值是所有数值，JavaScript 不区分整型数值和浮点型数值，正因为如此所以浮点型数值计算时会产生精度问题，所以应避免浮点型数值的计算。

```
console.log(0.1 + 0.2 == 0.3)//false
```

JavaScript 定义的数值可以是十进制、八进制和十六进制值，定义的所有进制的值最终都会被转换为十进制值。

```
var n1 = 10;//十进制，值10
var n2 = 0o10;//八进制，值8
var n3 = 0x10;//十六进制，值16
```

Number 有一个特殊值 NaN，表示一个本来要返回数值的操作值未返回数值的情况。

```
console.log(Number("a") + 10);//NaN
```

判断一个值是否为 NaN 只能通过 isNaN()方法。

```
console.log(isNaN("a"));//返回false
```

`NaN == NaN`返回 false。

#### String 类型 ####

声明字符串：`var str = "WJT";`

字符串中可以嵌入字符字面量，例如：`var str = "WJT\nHello";//\n表示换行`

字符串属于类数组对象(可以通过索引号访问指定位置元素，有 length 属性)

```
var l = "ABC".length;
console.log(l);//输出3
```

可以使用+号拼接字符串：`var str = "A" + "B" + "C";`

使用字符串的 concat() 方法也可以拼接字符串：`var str = "A".concat("B");//返回一个"A"字符串后拼接"B"字符串的新字符串，"AB"`

#### Object 类型 ####

Object 类型(对象)其实是一个键值对集合，可以直接使用花括号创建对象，然后定义属性或方法。

```
var obj = {
    name: "WJT",//定义属性
    sayHello: function(name) {
        console.log("Hello, " + name);
    }//右边是一个匿名/回调函数
};
obj.id = 123;//外部定义属性
console.log(obj.name);//访问属性，输出："WJT"
obj.sayHello("WJT20");//调用方法，输出："Hello, WJT20"
```

---

### 类型转换 ###

#### 强制类型转换 ####

1. 转字符串

    将其他类型值转为字符串有两种方法：String() 标准强制类型转换方法和对象的 toString() 方法。

    全局对象的 String() 方法可以将任何类型转为字符串；变量对象的 toString() 方法可以将除 undefined 和 null 外的其他类型值转为字符串，undefined 和 null 不能转换的原因是这两个值没有 toString() 方法。

    特殊的，Object 类型使用 toString() 转为字符串不会将对象内容输出，而是输出"[object Object]"作为代替。

    ```
    console.log(11.toString(), typeof 11.toString());//数值->字符串，输出："11" "string"
    console.log(true.toString(), typeof true.toString());//布尔值->字符串，输出："true" "string"
    console.log(String(undefined), typeof String(undefined));//undefined->字符串，输出："undefined" "string"
    console.log({}.toString(), typeof {}.toString());//Object->字符串，输出："[object Object]" "string"
    ```

2. 转数值

    将其他类型值转为数值有两种方法：Number() 标准强制类型转换方法和全局对象的 parseInt() 方法。

    parseInt() 会先将操作对象转换为字符串，然后逐个字符检测字符串是否有可转换为数值的部分直到所检测的字符不能转为数值，如果有可转换为数值的部分则取出该数值返回，否则返回 NaN。

    Object 类型、undefined 值和 null 转为数值的结果都是 NaN。对于布尔值，parseInt() 返回的结果都是 NaN，而 Number() 会把 true 转为1，把 false 转为0。

    ```
    console.log(parseInt("11abc"), typeof parseInt("11abc"));//输出：11 "number"
    console.log(Number(true), typeof Number(true));//输出：1 "number"
    console.log(parseInt({}), typeof Number({}));//输出：NaN "number"
    console.log(parseInt(undefined), typeof Number(undefined));//输出：NaN "number"
    ```

3. 转布尔值

    转布尔值使用的是 Boolean() 标准类型转换方法。对于非空字符串和非零数值一律返回 true，否则返回 false；undefined 和 null 返回 false，Object 类型返回 true。

#### 隐性类型转换 ####

1. 数值转字符串：`console.log(typeof "" + 123);//输出："number"`
    加号两边只要有一个值是字符串类型，则另一个值会先转换为字符串类型再将两个字符串进行拼接。

2. 字符串转数值：`console.log(+"123a", typeof +"123a");//输出：NaN "number"`
    转换规则同 Number()。

3. 其他类型转布尔：`console.log(!!"123");//输出：true`
    转换规则同 Boolean()。

---

```
ARTICLE_ID      : 21
POST_DATE       : 2017/08/24
RECENTLY_MODIFY : 2017/08/24
TIME_COUNTER    : 1D
AUTHER          : WJT20
```
