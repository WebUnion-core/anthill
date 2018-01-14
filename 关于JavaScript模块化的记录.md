
# 关于JavaScript模块化的记录 #

## 目录 ##

1. 参考链接
2. 介绍
3. 早期的模块化实现
    1. 函数封装
    2. 对象
    3. 立即执行函数
4. CommonJS
5. AMD和CMD
6. ES6

## 参考链接 ##

- [明白 JS 模块化](https://juejin.im/post/59a575b06fb9a0247c6eee02)

## 介绍 ##

模块化就是将一个大的功能拆分为多个独立的代码块，模块化的好处是避免了全局环境污染，减少命名冲突等问题的出现。

具体的优点有以下几点:

1. 解决命名冲突;
2. 依赖管理;
3. 代码更加可读;
4. 提高复用性。

## 早期的模块化实现 ##

其实，JavaScript 早期阶段根本没有模块化这个概念，没有模块化就出现了一些代码维护上的问题，早期写的代码常见的有以下几种形式。

### 函数封装 ###

```
function fn1() {
    console.log('Function 1');
}
function fn2() {
    console.log('Function 2');
}
```

这种做法的坏处是，污染了全局作用域，随着某个 JavaScript 脚本代码量与日俱增，你就能体会全局污染的恐怖了。

### 对象 ###

你可能这样想: 既然不能在全局作用域下定义函数，那么我将函数定义到一个对象内部，作为该对象的方法保存起来，这样行不行？代码应该类似下面这样：

```
var module = {
    fn1: function() {
        console.log('Function 1');
    },
    fn2: function() {
        console.log('Function 2');
    }
}
```

实际上，这种方案与前一种方案的差不多，只不过缩小了全局变量的数量，勉强算是一个进步，然而这种方案还是有缺点，那就是没有私有变量，外部可改。

### 立即执行函数 ###

第三种方案就更高级一点，那就是借助立即执行函数的写法，大概是这样子的:

```
(function() {
    // TODO
})();
```

在一些经典的项目、框架中，我们经常能看到这样的代码，这相当于人为制造了一个作用域，从而与全局作用域隔离开来，算是一种突破。

## CommonJS ##

随着 Node.js 日益流行，一种模块化规范出现了，这就是 CommonJS 规范，为什么会有这个规范？这是因为 Node.js 可用于服务器开发，服务器开发可必须要讲究模块化。

其简单的用法示例如下:

模块A(a.js)导出配置:

```
module.exports = {
    fn1: function() {
        console.log('Function 1');
    },
    fn2: function() {
        console.log('Function 2');
    }
}
```

模块B(b.js)引入配置:

```
var receiveModule = require('./b.js'); // 假设两个模块在同一级目录下
receiveModule.fn1();
receiveModule.fn2();
```

CommonJS规范是 Node 独有的，浏览器中使用就需要用到 Browserify 解析了，所以后面又蹦出了两个规范。

## AMD和CMD ##

AMD 是由 RequireJS 提出的，CMD 由 SeaJS 提出。两者用法基本相似，现在用的人应该也不多了，这里就不多展开了。

## ES6 ##

ES6 语法也支持模块化了， 用法如下:

模块A(a.js)导出配置:

```
// 提供具体接口
export function fn1() {
    console.log('Function 1');
}

// 提供默认接口
export default function() {
    console.log('Function 2');    
}
```

模块B(b.js)引入配置:

```
// 单个接口引入
import { fn1 } from './a.js';

// 默认引入
import fn2 from './a.js';
```

---

```
ARTICLE_ID : 61
POST_DATE : 2018/01/14
AUTHER : WJT20
```
