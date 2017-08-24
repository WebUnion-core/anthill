
# JavaScript数据类型与类型转换 #

## 目录 ##

```
1 数据类型
    1.1 类型判断
    1.2 基本数据类型
        1.2.1 Undefined类型
        1.2.2 Null类型
        1.2.3 Boolean类型
        1.2.4 Number类型
        1.2.5 String类型
    1.3 引用数据类型
        1.3.1 Object类型
        1.3.2 Date类型
        1.3.3 Array类型
2 类型转换
    1 强制类型转换
    2 隐性类型转换
```

---

## 数据类型 ##

### 类型判断 ###

JavaScript 有5种基本数据类型 Undefined、Null、Boolean、Number 和 String，和1种复杂数据类型 Object。可以使用 typeof 操作符可以返回一个值的数据类型，例如：

```
var str = "a bird";
console.log(typeof str);//"string"
console.log(typeof 1);//"number"
```

### 基本数据类型 ###

#### Undefined类型 ####

Undefined 类型只有一个值 undefined，如果使用 var 定义的变量未初始化值，则获取的值为 undefined。

```
var str;
console.log(str);//undefined
```

#### Null类型 ####

Null 类型只有一个值 null，null值表示指定的值是一个空对象，所以 typeof 操作 null 值的结果是"object"。

#### Boolean类型 ####

Boolean 类型有两个值 true 和 false。

#### Number类型 ####

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

#### String类型 ####

声明字符串：`var str = "WJT";`

字符串中可以嵌入字符字面量，例如：`var str = "WJT\nHello";//\n表示换行`

字符串属于类数组对象(可以通过索引号访问指定位置元素，有 length 属性)

```
var l = "ABC".length;
console.log(l);//输出3
```

可以使用+号拼接字符串：`var str = "A" + "B" + "C";`

使用字符串的 concat() 方法也可以拼接字符串：`var str = "A".concat("B");//返回一个"A"字符串后拼接"B"字符串的新字符串，"AB"`

### 引用数据类型 ###

#### Object类型 ####

Object 类型(对象)其实是一个键值对集合，可以直接使用花括号创建对象，然后定义属性或方法。所有引用类型都基于 Object 类型

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

#### Date类型 ####

Date 类型就是日期时间的访问操作接口，使用 new 关键字可以创建一个 Date 实例对象。

```
var time = new Date();
```

可以使用+号将日期对象转换为创建此对象时对应的毫秒值，这种方法常用于分析代码效率的工作。

```
var start = +new Date();
for(var i = 0; i < 100; i++) {}
var end = +new Date();
console.log(end - start);//输出for循环花费的时间
```

Date 日期对象常用 API：

1. dateObj.getFullYear()：返回创建时的年份
2. dateObj.getMonth() + 1：从0开始计起，返回0实际上是一月
3. dateObj.getDate()：返回创建时的日期
4. dateObj.getHours()：返回创建时的小时
5. dateObj.getMinutes()：返回创建时的分钟
6. dateObj.getSeconds()：返回创建时的秒数
7. dateObj.getMilliseconds()：返回创建时的毫秒数
8. dateObj.getDay()：返回创建时的星期(数值0-6)

算法实现：返回"2017-05-23 20:05:05 星期二"格式的日期字符串

```
function getCurrentTime() {
    var time = new Date(),
        year = time.getFullYear(),
        month = getRegularTime(time.getMonth() + 1),
        date = getRegularTime(time.getDate()),
        hours = getRegularTime(time.getHours()),
        minutes = getRegularTime(time.getMinutes()),
        seconds = getRegularTime(time.getSeconds()),
        day = time.getDay(),
        dayStr;

    function getRegularTime(v) {
        var s = v.toString();
        if (s.length > 1) {
            return s;
        } else {
            return "0" + s;
        }
    }

    switch(day) {
        case 1: dayStr = "星期一"; break;
        case 2: dayStr = "星期二"; break;
        case 3: dayStr = "星期三"; break;
        case 4: dayStr = "星期四"; break;
        case 5: dayStr = "星期五"; break;
        case 6: dayStr = "星期六"; break;
        default: dayStr = "星期天";
    }

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + " " + dayStr;
}
console.log(getCurrentTime(new Date()));
```

#### Array类型 ####

创建数组有两种方式：使用 new Array() 和使用数组字面量表示法。

JavaScript 数组不同于其他语言的数组的一点是，JavaScript 数组不限制数组元素的数据类型保持统一，一个数组可以包含各种类型的值。

数组实例对象具有一个 length 属性返回数组的元素个数，length 属性可以手动修改，例如想要重置一个数组只要将 length 属性值设为0。数组元素可以通过"[]"加索引号访问。

```
var arr1 = new Array(5);//创建一个包含5个空值的数组
var arr2 = new Array("a", 1, true);//创建数组并填充元素
var arr3 = ["a", 1, true];//推荐使用数组字面量写法

console.log(arr3.length);//输出：3
console.log(arr3[0]);//输出："a"
console.log(arr3[arr3.length - 1]);//访问最后一个元素：true
arr3.length = 0;
console.log(arr3[0]);//输出：undefibed
```

检测一个变量是否为数组的方法有多种，最准确的一种是：

```
var arr4 = [];
console.log(arr4.constructor === Array);//输出：true
```

数组操作常用 API：

1. array.push(elem1, ..)：从数组尾部加入数组元素，返回加入数组的元素。

    ```
    var arr = [1, 2, 3];
    var new = arr.push(4);
    console.log(arr, new);//输出：[1,2,3,4] 4
    ```

2. array.pop()：从数组尾部移除一个数组元素，返回取出的元素。

    ```
    var arr = [1, 2, 3];
    var out = arr.pop();
    console.log(arr, out1);//输出：[1,2] 3
    ```

3. array.unshift(elem1, ..)：从数组头部加入数组元素，返回加入数组的元素。

    ```
    var arr = [1, 2, 3];
    arr.unshift(0);
    console.log(arr);//输出：[0,1,2,3]
    ```

4. array.shift()：从数组头部移除一个数组元素，返回取出的元素。

    ```
    var arr = [1, 2, 3];
    var out = arr.shift();
    console.log(arr, out2);//输出：[2,3] 1
    ```

5. array.reverse()：将原数组反转并返回。

    ```
    var arr = [1, 2, 3];
    arr.reverse();
    console.log(arr);//输出：[3,2,1]
    ```

6. array.sort(compareFunc)：默认以字符编码对数组元素进行排序，可选参数 compareFunc 为一个用于比较的回调函数，具有两个参数，不调换位置应返回负数；调换位置应返回正数。

    ```
    var arr = [1, 2, 10, 15, 3];
    function descSort(a, b) {
        if (a > b) {
            return -1;
        } else {
            return 1;
        }
    }
    function asceSort(a, b) {
        if (a < b) {
            return -1;
        } else {
            return 1;
        }
    }
    arr.sort();//根据字符编码排序
    console.log(arr);//输出：[1,10,15,2,3]
    arr.sort(descSort);//降序排序
    console.log(arr);//输出：[15,10,3,2,1]
    arr.sort(asceSort);//升序排序
    console.log(arr);//输出：[1,2,3,10,15]
    ```

7. array.concat(elem1, ..)：在调用数组对象后逐个插入参数(可以是数组)，最终返回新的拼接结果数组。

    ```
    var arr1 = [1, 2],
        arr2 = [3, 4],
        arr3;
    arr3 = arr1.concat(arr2);//将arr2的元素拼接在arr1后面，将拼接结果数组返回
    console.log(arr3);//输出：[1,2,3,4]
    ```

8. array.slice(start, end)：返回一个数组副本，元素为必需参数 start 开始到可选参数 end(不包括)之间的数组元素，不指定 end 参数时，默认获取之后所有的元素，两个参数都不指定则返回一个原数组的副本。

    ```
    var arr = [1, 2, 3];
    console.log(arr.slice() === arr);//输出：false
    console.log(arr.slice(1, 2));//输出：[2]
    console.log(arr.slice(1));//输出：[2, 3]
    ```

9. array.splice(start, length, elem1, ..)：从原数组中 start 位置开始移除 length 个数组元素，并插入多个数组元素，如果只提供两个参数则只是移除指定元素，最终将取出的元素返回。使用 splice() 可以实现删除、插入、删除并插入数组元素等操作。

    ```
    var arr1 = [1, 2, 3, 4];
    var arr2 = arr1.splice(2, 2, 5, 6);//删除并插入操作
    console.log(arr1, arr2);//输出：[1,2,5,6] [3,4]
    arr1.splice(2, 0, 3, 4);//插入操作
    console.log(arr1);//输出：[1,2,3,4,5,6]
    arr1.splice(4, 2);//删除操作
    console.log(arr1);//输出：[1,2,3,4]
    ```

10. array.join(mark)：根据分隔符 mark 将数组元素拼接为字符串返回，默认分隔符为","。

    ```
    var arr = [1, 2, 3, 4];
    var str1 = arr.join(),
    str2 = arr.join("-");
    console.log(str1, str2);//输出："1,2,3,4" "1-2-3-4"
    ```

---

## 类型转换 ##

### 强制类型转换 ###

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

### 隐性类型转换 ###

1. 数值转字符串：`console.log(typeof "" + 123);//输出："number"`
    加号两边只要有一个值是字符串类型，则另一个值会先转换为字符串类型再将两个字符串进行拼接。

2. 字符串转数值：`console.log(+"123a", typeof +"123a");//输出：NaN "number"`
    转换规则同 Number()。

3. 其他类型转布尔：`console.log(!!"123");//输出：true`
    转换规则同 Boolean()。

---

```
ARTICLE_ID : 21
POST_DATE : 2017/08/24
RECENTLY_MODIFY : 2017/08/24
TIME_COUNTER : 2D
AUTHER : WJT20
```
