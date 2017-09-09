
# jQuery源码解读系列(一) #

## 目录 ##

1. 封闭作用域
2. 封装(一)
3. 封装(二)

---

## 封闭作用域 ##

源码：
```
(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                } else {
                    factory(global);
                }
            }
    } else {
        factory(global);
    }
})(typeof window != "undefined" ? window : this, function(window, noGlobal) {...});
```

解读：

首先通过一个闭包将 jQuery 内部作用域与全局作用域隔离开。为了让 jQuery 内部，可以使用 window 对象便将其作为第一个参数传入，传入之前又对其做了一些处理，如果 window 不为未定义则直接将其传入使用，否则(像 Node.js 环境下是不存在 window 对象的)将全局对象(用 this 可以直接访问)传入，之所以传入全局对象，是为了防止内部判断 global.document 时出错，因为如果直接将 undefined 传入，它本身就不具有任何有用的属性和方法，更何况 document 属性了。

第二个参数是一个包含了基本API的函数(应该也是一个闭包)，暂时不解析其内部构成。

内部作用域里面，先判断 module 对象是否存在，其实真正的目的就是判断当前环境是否为 CommonJS 或类 CommonJS 环境，如果是 CommonJS 或类 CommonJS 环境的话，使用 module.exports 导出模块，导出模块前又要判断传入的全局对象是否有 document 属性，因为 jQuery 围绕的是 document 对象进行DOM操作，所以这个判断逻辑不可或缺，如果包含 document 属性，那么可以给 factory 传入全局对象和一个表征非本地的布尔值(暂不清楚其作用)。

另一方面，如果没有 document 属性的话，导出一个回调函数，从这里就可以判断出第二个参数 factory 也是一个闭包，它包含一个参数w，它同样也是一个全局对象，只不过这是在外部脚本中请求 jQuery 时传入的，CommonJS 引入的格式是这样的：`var jQuery = require("jquery")(window);`，既然传入了，那么就又要对其进行判断，如果不包含 document 对象就抛出一条错误，否则就调用 factory 并传入全局对象，这样就可以使用里面包装好的API了。

如果当前环境非 CommonJS 环境，那么就直接在外部脚本中调用 factory 展开 jQuery API 就可以了。

---

## 封装(一) ##

```
function(window, noGlobal) {
    var arr = [];
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    ...
}
```

解读：
作为内部作用域传入的第二个参数是一个包含 jQuery API 的回调函数，在内部作用域内作为形参 factory。它首先在内部将诸如 slice、concat等数组API和 Object 类型自带的 toString()、hasOwnProperty()等方法都封装起来，这样，在函数内部就可以使用 this 指针调用这些包装好的方法了。

至于 support 对象，暂不清楚其作用。

---

## 封装(二) ##

```
function(window, noGlobal) {
    ...
    var document = window.document,

        version = "2.1.4",

        jQuery = function( selector, context ) {
        	return new jQuery.fn.init( selector, context );
        },

        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        rmsPrefix = /^-ms-/,

        rdashAlpha = /-([\da-z])/gi,

        fcamelCase = function( all, letter ) {
        	return letter.toUpperCase();
        };
    ...
}
```

解读：
传入的 window 对象的 document 属性也用变量保存下来，version 变量为版本号，剩下的几个变量暂不清楚它们的功能。

```
ARTICLE_ID : 29
POST_DATE : 2017/09/01
RECENTLY_MODIFY : 2017/09/09
TIME_COUNTER : 3
AUTHER : WJT20
```
