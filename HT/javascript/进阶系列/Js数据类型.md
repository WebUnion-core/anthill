## 类型
- 空值（ null ）
- 未定义（ undefined ）
- 布尔值（ boolean ）
- 数字（ number ）
- 字符串（ string ）
- 对象（ object ）
- 符号（ symbol ， ES6  中新增

### 注意null

```js
typeof null === "object"; // true
```

**检测null类型**

```js
var a = null;

(!a && typeof a === "object"); // true
```

### function

很多人搞不清函数和Object的关系，查阅规范可以知道，它实际上是 object 的一个 “ 子类型 ” 。具体来说，函数是 “ 可调用对象 ” ，它有一个内部属性 [[Call]] ，该属性使其可以被调用。函数不仅是对象，还可以拥有属性。

```js
function fn(a,b){}

console.log(fn.length)// 2
```
函数对象的 length 属性是其声明的参数的个数

数组也属于object的一个子类型

### 数组

数组通过数字进行索引，但有趣的是它们也是对象，所以也可以包含字符串键值和属性（但这些并不计算在数组长度内）

```js
var a = []

a[0] = 1;
a['asda'] = 'asd'

console.log(a.length) //1
```

**如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理**

```js
var a = [ ];
a["13"] = 42;
a.length; // 14
```

### 类数组

一些DOM操作返回的集合 就是类数组

通过arguments 对象（类数组）将函数的参数当作列表来访问（从 ES6  开始已废止）。

```js
function foo() {
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}
foo("bar", "baz"); // ["bar","baz","bam"]
```

ES6  中的内置工具函数 Array.from(..) 也能实现同样的功能

```js
var arr = Array.from( arguments );
```

### 字符串

字符串和数组的确很相似，它们都是类数组，都有 length 属性以及 indexOf(..) （从 ES5  开始数组支持此方法）和concat(..) 方法：

```js
var a = "foo";
var b = ["f","o","o"];

a.length; // 3
b.length; // 3

a.indexOf( "o" ); // 1
b.indexOf( "o" ); // 1

var c = a.concat( "bar" ); // "foobar"
var d = b.concat( ["b","a","r"] ); // ["f","o","o","b","a","r"]

a === c; // false
b === d; // false

a; // "foo"
b; // ["f","o","o"]

a[1] = "O";
b[1] = "O";

a; // "foo"
b; // ["f","O","o"]
```

JavaScript  中字符串是不可变的，而数组是可变的。并且 a[1] 在 JavaScript  中并非总是合法语法，在老版本的 IE  中就不被允许（现在可以了）。 正确 的方法应该是 a.charAt(1) 。

```js
var a = 'foo'
a[0] = 'h'
console.log(a[0]) // f
```

许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但可以通过 “ 借用 ” 数组的非变更方法来处理字符串

String.prototype.XYZ 简写为 String#XYZ ，对其他 .prototypes 也同样如此。
String#indexOf(..)
在字符串中找到指定子字符串的位置。
String#charAt(..)
获得字符串指定位置上的字符。
String#substr(..) 、 String#substring(..) 和 String#slice(..)
获得字符串的指定部分。
String#toUpperCase() 和 String#toLowerCase()
将字符串转换为大写或小写。
String#trim()
去掉字符串前后的空格，返回新的字符串

**以上方法并不改变原字符串的值，而是返回一个新字符串。**

### 数字

特别大和特别小的数字默认用指数格式显示，与 toExponential() 函数的输出结果相同

```js
var a = 5E10;
a; // 50000000000
a.toExponential(); // "5e+10"
var b = a * a;
b; // 2.5e+21
var c = 1 / a;
c; // 2e-11
```

由于数字值可以使用 Number 对象进行封装（参见第 3  章），因此数字值可以调用 Number.prototype 中的方法。例如， tofixed(..) 方法可指定小数部分的显示位数

```js
var a = 42.59;
a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
a.toFixed( 2 ); // "42.59"
a.toFixed( 3 ); // "42.590"
a.toFixed( 4 ); // "42.5900"
```

toPrecision(..) 方法用来指定 有效数位 的显示位数

```js
var a = 42.59;
a.toPrecision( 1 ); // "4e+1"
a.toPrecision( 2 ); // "43"
a.toPrecision( 3 ); // "42.6"
a.toPrecision( 4 ); // "42.59"
a.toPrecision( 5 ); // "42.590"
a.toPrecision( 6 ); // "42.5900"
```

数字常量还可以用其他格式来表示，如二进制、八进制和十六进制。
当前的 JavaScript  版本都支持这些格式：

```js
0xf3; // 243 的十六进制
0Xf3; //  同上
0363; // 243 的八进制
```

**计算问题**

二进制浮点数中的 0.1 和 0.2 并不是十分精确，它们相加的结果并非刚好等于 0.3 ，而是一个比较接近的数字0.30000000000000004

**整数检测**

要检测一个值是否是整数，可以使用 ES6  中的 Number.isInteger(..) 方法

要检测一个值是否是 安全的整数 ，可以使用 ES6  中的 Number.isSafeInteger(..) 方法

### void 运算符

undefined 是一个内置标识符（除非被重新定义，见前面的介绍），它的值为 undefined ，通过 void 运算符即可得到该值。

```js
var a = 42;
console.log( void a, a ); // undefined 42
```

### 特殊的数字

**不是数字的数字 NAN**

NAN : 不是数字 将它理解为 “ 无效数值 ”“ 失败数值 ” 或者 “ 坏数值 ” 可能更准确些

```js
var a = 2 / "foo";
isNaN( a ); // true
```

很明显 "foo" 不是一个数字 ，但是它也不是 NaN 。这个 bug  自 JavaScript  问世以来就一直存在，至今已超过 19  年

从 ES6  开始我们可以使用工具函数 Number.isNaN(..)


**无穷数**

```js
var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity
```

### 特殊等式

如前所述， NaN 和 -0 在相等比较时的表现有些特别。由于 NaN 和自身不相等，所以必须使用 ES6  中的Number.isNaN(..) （或者 polyfill ）。而 -0 等于 0 （对于 === 也是如此），因此我们必须使用isNegZero(..) 这样的工具函数。

ES6  中新加入了一个工具方法 Object.is(..) 来判断两个值是否绝对相等，可以用来处理上述所有的特殊情况

```js
var a = 2 / "foo";
var b = -3 * 0;
Object.is( a, NaN ); // true  NaN 只和自身不相等
Object.is( b, -0 ); // true
Object.is( b, 0 ); // false
```

## 基本类型和引用类型

基本类型 : 总是 通过值复制的方式来赋值 /  传递，包括 null 、 undefined 、字符串、数字、布尔和 ES6  中的 symbol 。

引用类型 : 当复制保存着对象的某个变量时，操作的是对象的引用，但在为对象添加属性时，操作的是实际的对象。

在复制变量值时，基本类型会在变量对象上创建一个新值，再复制给新变量。此后，两个变量的任何操作都不会影响到对方；而引用类型是将存储在变量对象的值复制一份给新变量，但是两个变量的值都指向存储在堆中的一个对象，也就是说，其实他们引用了同一个对象，改变其中一个变量就会影响到另一个变量。

```js
//基本类型值
var a = 'a';
var b = a;
a = 'b';
console.log(b); //a
```

```js
//引用类型值,以数组为例

//1.对其中一个变量直接赋值不会影响到另一个变量（并未操作引用的对象）
var a = [1,2,2,6,4]
var b = a;
a = [4,5,6,7]
console.log(b) //[ 1, 2, 2, 6, 4 ]

//2.使用push(操作了引用的对象)
var a = [1,2,3];
var b = a;
a.push(4);
console.log(a);//1,2,3,4
console.log(b); //1,2,3,4
```

对象参数传递

```js
var a = [1,2,3,4]

function pusha(arr) {
    arr.push(5)
}

pusha(a)

console.log(a)
```

a的值会被传递到pusha里，此时传的是a的地址，pusha执行的时候其实是在操作a。

## 内部属性 [[class]]

所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]

一般通过 Object.prototype.toString(..) 来查看

```js
Object.prototype.toString.call( [1,2,3] ); // "[object Array]"

Object.prototype.toString.call( /regex-literal/i ); // "[object RegExp]"
```

### 封装对象包装

封装对象（ object wrapper ）扮演着十分重要的角色。由于基本类型值没有 .length 和 .toString() 这样的属性和方法，需要通过封装对象才能访问，此时 JavaScript  会自动为基本类型值 包装一个封装对象

```js
var a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
Object.prototype.toString.call( a ); // "[object String]"
```

js引擎会自动帮我们封装，在我们使用这些属性的时候，所以我们不必提前的将他们对象化，否则会降低执行效率。

### 封装对象释疑

使用封装对象时有些地方需要特别注意。比如 Boolean ：

```js
var a = new Boolean(false);
if (!a) {
    console.log("Oops"); //  执行不到这里
}
```

我们为 false 创建了一个封装对象，然而该对象是真值（ “truthy” ，即总是返回 true），所以这里使用封装对象得到的结果和使用 false 截然相反。如果想要自行封装基本类型值，可以使用 Object(..) 函数（不带 new 关键字）：

```js
var a = "abc";
var b = new String( a );
var c = Object( a );

typeof a; // "string"
typeof b; // "object"
typeof c; // "object"

b instanceof String; // true
c instanceof String; // true

Object.prototype.toString.call( b ); // "[object String]"
Object.prototype.toString.call( c ); // "[object String]"
```

### 拆封

如果想要得到封装对象中的基本类型值，可以使用 valueOf() 函数

```js
var a = new String( "abc" );
var b = new Number( 42 );
var c = new Boolean( true );

a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true
```

## Symbol

ES6  中新加入了一个基本数据类型 —— 符号（ Symbol ）。符号是具有唯一性的特殊值（并非绝对），用它来命名对象属性不容易导致重名。该类型的引入主要源于 ES6  的一些特殊构造，此外符号也可以自行定义。

符号可以用作属性名，但无论是在代码还是开发控制台中都无法查看和访问它的值，只会显示为诸如Symbol(Symbol.create) 这样的值。

ES6  中有一些预定义符号，以 Symbol 的静态属性形式出现，如 Symbol.create 、 Symbol.iterator 等，可以这样来使用

```js
obj[Symbol.iterator] = function(){ /*..*/ };
```

我们可以使用 Symbol(..) 原生构造函数来自定义符号。但它比较特殊，不能带 new 关键字，否则会出错：
```js
var mysym = Symbol( "my own symbol" );
mysym; // Symbol(my own symbol)
mysym.toString(); // "Symbol(my own symbol)"

typeof mysym; // "symbol"
var a = { };

a[mysym] = "foobar";
Object.getOwnPropertySymbols( a );
// [ Symbol(my own symbol) ]
```

## 强制类型转换

### 值类型转换

将值从一种类型转换为另一种类型通常称为 类型转换 （ type casting ），这是显式的情况；隐式的情况称为强制类型转换（ coercion ）

类型转换发生在静态类型语言的编译阶段，而强制类型转换则发生在动态类型语言的运行时（ runtime ）。

然而在 JavaScript  中通常将它们统称为 强制类型转换 

```js
var a = 42;
var b = a + ""; //  隐式强制类型转换
var c = String( a ); //  显式强制类型转换
```

### 抽象值操作

ES5  规范第 9  节中定义了一些 “ 抽象操作 ” （即 “ 仅供内部使用的操作 ” ）和转换规则

**ToString**

基本类型值的字符串化规则为： null 转换为 "null" ， undefined 转换为 "undefined" ， true 转换为 "true" 。数字的字符串化则遵循通用规则，不过那些极小和极大的数字使用指数形式

```js
// 1.07  连续乘以七个 1000
var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
//  七个 1000 一共 21 位数字
a.toString(); // "1.07e21"
```

对普通对象来说，除非自行定义，否则 toString() （ Object.prototype.toString() ）返回 内部 属性[[Class]]的值 如 "[object Object]" 

数组的默认 toString() 方法经过了重新定义，将所有单元字符串化以后再用 "," 连接起来,toString() 可以被显式调用，或者在需要字符串化时自动调用。：

```js
var a = [1,2,3];
a.toString(); // "1,2,3"
```

**JSON  字符串化**

工具函数 JSON.stringify(..) 在将 JSON  对象序列化为字符串时也用到了 ToString 。

所有 安全的 JSON  值都可以使用 JSON.stringify(..) 字符串化。安全的 JSON  值是指能够呈现为有效JSON  格式的值。

JSON.stringify(..) 在对象中遇到 undefined 、 function 和 symbol 时会自动将其忽略，在数组中则会返回 null（以保证单元位置不变）。

对包含循环引用的对象执行 JSON.stringify(..) 会出错。

如果对象中定义了 toJSON() 方法， JSON  字符串化时会首先调用该方法，然后用它的返回值来进行序列化。

如果要对含有非法 JSON  值的对象做字符串化，或者对象中的某些值无法被序列化时，就需要定义 toJSON() 方法来返回一个安全的 JSON  值

**ToNumber**

true 转换为 1 ， false 转换为 0 。 undefined 转换为 NaN ， null 转换为 0 。

处理失败时返回 NaN

**ToBoolean**

强制类型转换为 true ，将 0 强制类型转换为 false ，反之亦然，但它们并不是一回事。

1. 假值（ falsy value ）
    可以被强制类型转换为 false 的值
    其他（被强制类型转换为 true 的值）

    以下这些是假值：
    - undefined
    - null
    - false
    - +0 、 -0 和 NaN
    - ""

2. 假值对象（ falsy object ）

    ```js
    var a = new Boolean( false );
    var b = new Number( 0 );
    var c = new String( "" );   
    ```
    它们都是封装了假值的对象。那它们究竟是 true 还是 false 呢？答案很简单：

    ```js
    var d = Boolean( a && b && c );
    d; // true
    ```
    d 为 true ，说明 a 、 b 、 c 都为 true 。
    
    假值对象看起来和普通对象并无二致（都有属性，等等），但将它们强制类型转换为布尔值时结果为 false 。

    最常见的例子是 **document.all** ，它是一个类数组对象，包含了页面上的所有元素，由 DOM （而不是 JavaScript  引擎）提供给 JavaScript  程序使用。它以前曾是一个真正意义上的对象，布尔强制类型转换结果为 true ，不过现在它是一个假值对象。

3. 真值（ truthy value ）

    真值就是假值列表之外的值。
    ```js
    var a = "false";
    var b = "0";
    var c = "''";
    var d = Boolean( a && b && c );
    d;
    ```
    这里 d 是 true ,上例的字符串看似假值，但所有字符串都是真值。不过 "" 除外，因为它是假值列表中唯一的字符串。
    ```js
    var a = []; //  空数组 —— 是真值还是假值？
    var b = {}; //  空对象 —— 是真值还是假值？
    var c = function(){}; //  空函数 —— 是真值还是假值？
    var d = Boolean( a && b && c );
    d;
    ```
    d 依然是 true 。还是同样的道理， [] 、 {} 和 function(){} 都不在假值列表中，因此它们都是真值。

### 显式强制类型转换

字符串和数字之间的转换是通过 String(..) 和 Number(..) 这两个内建函数（原生构造函数）来实现的，请注意它们前面没有 new 关键字，并不创建封装对象。

String(..) 遵循前面讲过的 ToString 规则,将值转换为字符串基本类型。 

Number(..) 遵循前面讲过的 ToNumber 规则，将值转换为数字基本类型。

#### 日期显式转换为数字

```js
var d = new Date( "Mon, 18 Aug 2014 08:53:06 CDT" );
+d; // 1408369986000

var timestamp = +new Date();
```

JavaScript  有一处奇特的语法，即构造函数没有参数时可以不用带 () 。于是我们可能会碰到 var timestamp = +new Date;

将日期对象转换为时间戳并非只有强制类型转换这一种方法，或许使用更显式的方法会更好一些: 

```js
var timestamp = new Date().getTime();
// var timestamp = (new Date()).getTime();
// var timestamp = (new Date).getTime();
```

不过最好还是使用 ES5  中新加入的静态方法 Date.now() ：

```js
var timestamp = Date.now();

//为老版本浏览器提供 Date.now() 的 polyfill  也很简单：

if (!Date.now) {    
    Date.now = function() {
        return +new Date();
    };
}
```

###  ~ 运算符

一个常被人忽视的地方是 ~ 运算符（即字位操作 “ 非 ” ）相关的强制类型转换

它首先将值强制类型转换为 32  位数字，然后执行字位操作 “ 非 ” （对每一个字位进行反转）。

对 ~ 还可以有另外一种诠释，源自早期的计算机科学和离散数学： ~ 返回 2  的补码。这样一来问题就清楚多了！~x 大致等同于 -(x+1) 。很奇怪，但相对更容易说明问题：

```js
~42; // -(42+1) ==> -43
```

在 -(x+1) 中唯一能够得到 0 （或者严格说是 -0 ）的 x 值是 -1 。也就是说如果 x 为 -1 时， ~ 和一些数字值在一起会返回
假值 0 ，其他情况则返回真值。-1 是一个 “ 哨位值 ” ，哨位值是那些在各个类型中（这里是数字）被赋予了特殊含义的值。

JavaScript  中字符串的 indexOf(..) 方法也遵循这一惯例，该方法在字符串中搜索指定的子字符串，如果找到就返回子字符串所在的位置（从 0  开始），否则返回 -1 。

```js
var a = "Hello World";
if (a.indexOf( "lo" ) >= 0) { // true
//  找到匹配！
}
if (a.indexOf( "lo" ) != -1) { // true
//  找到匹配！
}
if (a.indexOf( "ol" ) < 0) { // true
//  没有找到匹配！
}
if (a.indexOf( "ol" ) == -1) { // true
//  没有找到匹配！
}
```

'>= 0 和 == -1 这样的写法不是很好，称为 “ 抽象渗漏 ” ，意思是在代码中暴露了底层的实现细节，这里是指用 -1 作为失败时的返回值，这些细节应该被屏蔽掉。'

现在我们终于明白 ~ 有什么用处了！ ~ 和 indexOf() 一起可以将结果强制类型转换（实际上仅仅是转换）为真 /  假值

```js
var a = "Hello World";

~a.indexOf("lo"); // -4 <--  真值 !

if (~a.indexOf("lo")) { // true
    //  找到匹配！
}
~a.indexOf("ol"); // 0 <--  假值 !
!~a.indexOf("ol"); // true

if (!~a.indexOf("ol")) { // true
    //  没有找到匹配！
}
```

如果 indexOf(..) 返回 -1 ， ~ 将其转换为假值 0 ，其他情况一律转换为真值。

###  字位截除

一些开发人员使用 ~~ 来截除数字值的小数部分，以为这和 Math.floor(..) 的效果一样，实际上并非如此。

~~ 中的第一个 ~ 执行 ToInt32 并反转字位，然后第二个 ~ 再进行一次字位反转，即将所有字位反转回原值，最后得到的仍然是 ToInt32 的结果。

对 ~~ 我们要多加注意。首先它只适用于 32 位数字，更重要的是它对负数的处理与 Math.floor(..) 不同。

```js
Math.floor( -49.6 ); // -50
~~-49.6; // -49
```

### 显式解析数字字符串

```js
var a = "42";
var b = "42px";
Number( a ); // 42
parseInt( a ); // 42
Number( b ); // NaN
parseInt( b ); // 42
```

解析字符串中的浮点数可以使用parseFloat(..) 函数

ES5  之前的 parseInt(..)会根据字符串的第一个字符来自行决定基数,如果第一个字符是 x 或 X ，则转换为十六进制数字。如果是 0 ，则转换为八进制数字。

从 ES5  开始 parseInt(..) 默认转换为十进制数，除非另外指定。如果你的代码需要在 ES5  之前的环境运行，请记得将第二个参数设置为 10 。

**parseInt(..) 的一个坑**

```js
parseInt( 1/0, 19 ); // 18
```

parseInt(1/0, 19) 实际上是 parseInt("Infinity", 19) 。第一个字符是 "I" ，以 19  为基数时值为 18 。第二个字符 "n" 不是一个有效的数字字符，解析到此为止，和 "42px" 中的 "p" 一样。

此外还有一些看起来奇怪但实际上解释得通的例子：

```js
parseInt( 0.000008 ); // 0 ("0"  来自于 "0.000008")
parseInt( 0.0000008 ); // 8 ("8"  来自于 "8e-7")
parseInt( false, 16 ); // 250 ("fa"  来自于 "false")
parseInt( parseInt, 16 ); // 15 ("f"  来自于 "function..")
parseInt( "0x10" ); // 16
parseInt( "103", 2 ); // 2
```

### 显式转换为布尔值

```js
var a = "0";
var b = [];
var c = {};
var d = "";
var e = 0;
var f = null;
var g;
!!a; // true
!!b; // true
!!c; // true
!!d; // false
!!e; // false
!!f; // false
!!g; // false
```

在 if(..).. 这样的布尔值上下文中，如果没有使用 Boolean(..) 和 !! ，就会自动隐式地进行 ToBoolean 转换

显式 ToBoolean 的另外一个用处，是在 JSON  序列化过程中将值强制类型转换为 true 或 false ：

```js
var a = [
    1,
    function () { /*..*/ },
    2,
    function () { /*..*/ }
];
JSON.stringify(a); // "[1,null,2,null]"
JSON.stringify(a, function (key, val) {
    if (typeof val == "function") {
        //  函数的 ToBoolean 强制类型转换
        return !!val;
    } else {
        return val;
    }
});
// "[1,true,2,true]"
```

另外还有三元运算符

## 隐式强制类型转换

```js
var a = "42";
var b = "0";
var c = 42;
var d = 0;
a + b; // "420"
c + d; // 42
```

通常的理解是，因为某一个或者两个操作数都是字符串，所以 + 执行的是字符串拼接操作。这样解释只对了一半，实际情况要复杂得多。

```js
var a = [1,2];
var b = [3,4];
a + b; // "1,23,4"
```

a 和 b 都不是字符串，但是它们都被强制转换为字符串然后进行拼接。原因何在

如果 + 的其中一个操作数是字符串（或者通过一些操作可以得到字符串），则执行字符串拼接；否则执行数字加法。

**隐式强制类型转换为布尔值**

下面的情况会发生布尔值隐式强制类型转换。

1.  if (..) 语句中的条件判断表达式。
2.  for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）
3.  while (..) 和 do..while(..) 循环中的条件判断表达式。
4.  ? : 中的条件判断表达式
5.  逻辑运算符 || （逻辑或）和 && （逻辑与）左边的操作数（作为条件判断表达式）


**||  和 &&**

&& 和 || 运算符的返回值并不一定是布尔类型，而是两个操作数其中一个的值

```js
var a = 42;
var b = "abc";
var c = null;
a || b; // 42
a && b; // "abc"
c || b; // "abc"
c && b; // null
```

|| 和 && 首先会对 第一个操作数 （ a 和 c ）执行条件判断，如果其不是布尔值（如上例）就先进行 ToBoolean 强制类型转换，然后再执行条件判断。

对于 || 来说，如果条件判断结果为 true 就返回第一个操作数（ a 和 c ）的值，如果为 false 就返回第二个操作数（ b ）的值。

&& 则相反，如果条件判断结果为 true 就返回第二个操作数（ b ）的值，如果为 false 就返回第一个操作数（ a 和 c ）的值。