
# ES6常用知识点总结 #

## 目录 ##

1. [参考链接](#href1)
2. [ES6概述](#href2)
3. [let命令](#href3)
4. [const命令](#href4)
5. [解构赋值](#href5)
 [](#href6)   1. 数组解构赋值
 [](#href7)   2. 不完全解构
 [](#href8)   3. 解构赋默认值
 [](#href9)   4. 对象解构赋值
 [](#href10)   5. 函数参数解构赋值
 [](#href11)   6. 其他类型解构赋值
6. [模板字符串](#href12)
7. [rest](#href13) 参数
8. [箭头函数](#href14)
9. [类(class)](#href15)
 [](#href16)   1. 类的写法
 [](#href17)   2. 类的继承(extends)
10. [模块(module)](#href18)
 [](#href19)   1. export
 [](#href20)   2. import

## <a name="href1">参考链接</a> ##

- [ECMAScript6入门](http://es6.ruanyifeng.com/)

- [关于ES6/ES2015的学习笔记](https://segmentfault.com/a/1190000008791037)

---

## <a name="href2">ES6概述</a> ##

ECMAScript6(简称 ES6) 是 JavaScript 语言的下一代标准，也称 ECMAScript2015。Node.js 环境下可以使用 Babel 转码器将 ES6 转换为 ES5 代码，从而使代码在现有环境中执行。

关于 Babel 的安装和使用，可以参考文章：[Babel配置笔记](https://github.com/WeiJietao/LogBase/blob/master/Babel%E9%85%8D%E7%BD%AE%E7%AC%94%E8%AE%B0.md)

---

## <a name="href3">let命令</a> ##

let 命令是 ES6 新增的用来声明变量的命令，与 var 类似，不同之处在于 let 声明的变量只在 let 命令所在的代码块内有效。

let 不会像 var 那样存在变量提升现象，所以变量一定要在声明后使用，否则会报错。let 命令声明变量之前，该变量都是不可使用，这被成为暂时性死区(temporal dead zone，简称TDZ)。

使用 let 命令可以解决某些之前需要闭包才能解决的问题：

```
var a = [];
for(let i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i);
    };
}
a[6]();//输出：6，如果不使用let声明，输出结果为10
```

---

## <a name="href4">const命令</a> ##

const 命令用于声明一个只读的常量，const 声明的变量必须立即初始化，const 的作用于与 let 命令一样只在声明所在的作用域内有效。

注意，const 和 let 声明了某个变量后，该变量就不能重新声明了，否则会报错。

---

## <a name="href5">解构赋值</a> ##

## <a name="href6">数组解构赋值</a> ##

ES6 允许按照一定模式从数组和对象中提取值对变量进行赋值，这被称为解构(Destructuring)，最常见的解构是数组解构。如：

```
var [a, b, c] = [1, 2, 3];
console.log(a, b, c);//输出：1 2 3
```

如果解构不成功，变量的值就会变成 undefined。

## <a name="href7">不完全解构</a> ##

等号左边的模式只匹配一部分的等号右边的数组，这种情况被称为不完全解构。如：

```
var [x, y] = [1, 2, 3];
console.log(x, y);//输出：1 2
var [a, [b], c] = [1, [2, 3], 4];
console.log(a, b, c);//输出：1 2 4
```

## <a name="href8">解构赋默认值</a> ##

解构赋值允许指定默认值，只要在左边模式中赋给变量一个值即可，此时如果右边模式对应的值严格等于 undefined 则变量值将采用之前所赋的值。如果默认值是一个表达式，则这个表达式是惰性求值的，只有在用到时才会求值。

```
var [x = 0] = [undefined];
var [y = 0, z = 0] = [null, ];
console.log(x, y, z);//输出：0 null 0

function f() {
    console.log('Hello');
}
var [a = f()] = [undefined];//不会立即执行函数
```

## <a name="href9">对象解构赋值</a> ##

对象同样可以用于解构，对象的属性没有次序，变量必须与属性同名，才能取得正确的值。

```
var { name, id } = { id: '511421010015', name: 'WJT20' };
console.log(name, id);//输出："WJT" "511421010015"
```

如果变量名与属性名不一致，则应将变量作为一个已知的属性的值来赋值，如：

```
var { x: a, y: b } = { x: 1, y: 0 };
console.log(x, y, a, b);//输出：undefined undefined 1 0
```

## <a name="href10">函数参数解构赋值</a> ##

函数解构赋值原理也是相同的，也同样可以赋默认值。

```
//数组参数解构
function add([x, y]) {
    console.log(x + y);
}
add([1, 2]);//输出：3

//对象参数解构
function subtract({ x, y } = {}) {
    console.log(x - y);
}
subtract({2, 1});//输出：1

//赋默认值的两种形式
function multiply({ x = 1, y = 1 } = {}) {
    console.log(x * y);
}
multiply({ 5 });//输出：5

function divide({ x, y } = { x: 1, y: 1 }) {
    console.log(x / y);
}
divide({ 5 });//输出：NaN
divide({ x:5 });//输出：5
```

## <a name="href11">其他类型解构赋值</a> ##

字符串、数值和布尔值也可以解构，字符串是一种特殊的类数组对象，所以可以用于解构赋值，数值和布尔值解构前会转换为对象。

```
//字符串解构
var [a, b, c, d] = 'what';
console.log(a, b, c, d);//输出："w" "h" "a" "t"

//数值和布尔值解构
var { toString: e } = 123;//先将数值123转换为对象，布尔值同
console.log(e === String.prototype.toString);//输出：true
```

---

## <a name="href12">模板字符串</a> ##

ES6 中，我们可以使用模板字符串(放在反引号“\`”中)的写法替代传统模板输出写法，模板字符串中，“${}”中可以放入变量名、JavaScript 语句或算术运算表达式等内容，这些内容在模板植入时会自动识别，此外，模板字符串可以写成多行形式。如：

```
var name = 'WJT20';
var p = document.createElement('p');
p.innerHTML = `I am <bold>${ name }</bold><br />
Nice to meet you.`;
```

---

## <a name="href13">rest参数</a> ##

ES6 引入 rest 参数(形式为“...”)，用于获取函数的多余参数，其替代了 arguments 对象，rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中，注意，rest 参数之后不能再有其他参数，否则会报错。

```
function add(...values) {
    let sum = 0;

    for(let i = 0; i < values.length; i++) {
        sum += values[i];
    }

    return sum;
}
console.log(add(1, 2, 3));//输出：6
```

---

## <a name="href14">箭头函数</a> ##

ES6 允许使用“箭头”，即“=>”来定义函数，箭头函数使得函数表达更加简洁。

```
//无参数写法
const f1 = () => 'Hello, WJT20';

//多参数写法
const f2 = (x, y) => x + y;

//多行写法
const f3 = (x, y, z) => {
    let r1 = x + y + z;
    let r2 = x - y - z;
    return r2 / r1;
}
```

箭头函数的使用需要注意以下三点：

- 函数体内的 this 对象，就是定义时存在的对象，而不是使用时所在的对象。简单点说就是，通常情况下，this 的指向是可变的，然而在箭头函数中它是固定的。

- 箭头函数不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出错误。

- 不可以使用 arguments 对象，该对象在函数体内不存在，可以使用 rest 参数替代之。

箭头函数可以使 this 固定化，并不是因为箭头函数内部有绑定 this 的机制，实际原因是箭头函数根本没有自己的 this，导致，内部的 this 就是外层代码块的 this，也正是它没有 this，所以不能用作构造函数。由于箭头函数没有自己的 this，所以不能使用 call、apply、bind 等方法去改变 this 的去向，箭头函数固定化 this 很大程度上解决了一直以来 this 带来的困扰。

---

## <a name="href15">类(class)</a> ##

## <a name="href16">类的写法</a> ##

ES6 提供了更接近传统语言的面向对象写法，引入了 class(类)的概念作为对象的模板，通过 class 关键字可以定义类。如：

```
class Person {//创建类
    constructor(name, id) {//构造方法
        this.name = name;
        this.id = id;
    }
    sayHello() {//自定义方法
        console.log('Hello, I am ' + this.name);
    }
}

var person = new Person('WJT20', '511421010015');//创建实例
```

类的内部所有定义的方法都是不可枚举的(与 ES5 不同)，且类的所有方法都定义在 prototype 上。

## <a name="href17">类的继承(extends)</a> ##

类之间可以通过 extends 关键字实现继承，这比 ES5 的通过修改原型链实现继承要清晰和方便的多。

```
class Ball() {//父类
    constructor(type) {
        this.type = type;
        this.shape = 'rounded';
    }
    report(content) {
        console.log(content);
    }
}

class FootBall extends Ball {//子类继承父类
    constructor() {
        super('football');
        this.color = 'black & white';
    }
    roll() {
        super.report('Rolling...');
    }
}

var football = new FootBall();
football.roll();//输出：'Rolling...'
console.log(football.type, football.shape, football.color);//输出："football" "rounded" "black & white"
```

子类中的 super 代表的是父类的构造函数，用于给子类提供 this 对象(this 对象指向父类)。

---

## <a name="href18">模块(module)</a> ##

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

## <a name="href19">export</a> ##

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果想外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。export 命令可以出现在模块的任何位置，只要处于模块顶层就可以，一般习惯放在文件最底部。

```
var name = 'WJT';
var id = 20;
var year = 1995;
export {name, id, year};
```

除了输出变量，还可以输出函数或类：

```
export function multiply(x, y) {
  return x * y;
};
```

可以使用 as 关键字改变 export 输出的变量名，可以给一个变量定义多个名字：

```
function f1(a, b) {
    return a + b;
}
export {
    f1 as addFunc,
    f1 ad add
};
```

## <a name="href20">import</a> ##

使用 export 命令定义了模块的对外接口以后，其他 JS 文件就可以通过 import 命令加载这个模块。import 命令具有提升效果，会提升到整个模块的头部，首先执行。

```
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从 fs 模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

引入整个模块：

```
import 'lodash';
```

---

```
ARTICLE_ID : 4 
POST_DATE : 2017/08/13
RECENTLY_MODIFY : 2017/08/31
TIME_COUNTER : 1
AUTHER : WJT20
```
