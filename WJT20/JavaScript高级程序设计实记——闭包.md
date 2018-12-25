
# JavaScript高级程序设计实记——闭包 #

## 目录 ##

1. [什么是闭包](#href1)
2. [特点](#href2)
3. [应用](#href3)

## <a name="href1">什么是闭包</a> ##

闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式就是在一个函数内部创建另一个函数。闭包可以用于设计私有的方法和变量，避免全局变量污染，一般应该避免在全局作用域下定义过多的变量及函数。

## <a name="href2">特点</a> ##

闭包的缺点是会常驻内存，会增大内存使用量，使用不当容易造成内存泄漏，所以只有在绝对必要的情况下才使用闭包。

```js
function fn() {
    var a = 0;
    a++;
    return a;
}
console.log(fn()); // 输出: 1
console.log(fn()); // 输出: 1
```

以上代码每次调用完`fn()`后，函数内的a变量就会被从内存中销毁，故每次输出的结果都是1，a变量定义在函数内部，函数外部无法访问。如此声明的变量有两个特点: 私有、无法长期存在。

```js
var a = 0;
function fn() {
    a++;
    return a;
}
console.log(fn()); // 输出: 1
console.log(fn()); // 输出: 2
```

以上代码在全局环境下声明了a变量，a变量此时作为全局变量会长期存在，调用`fn()`函数时只是对全局变量a进行赋值操作。如此声明的变量有两个特点: 公开、可以长期存在。

如果我们想要包装一个私有且可以长期存在的变量，那么可以使用闭包:

```js
var fn = (function() {
    var a = 0;

    return function() {
        a++;
        return a;
    }
})();

console.log(fn()); // 输出: 1
console.log(fn()); // 输出: 2
```

我们在一个外部匿名函数内声明a变量，然后返回一个内部匿名函数，此时，外部匿名函数定义的变量或方法就长期驻存于内存中，且只有这个外部匿名函数及内部匿名函数可以使用这些变量或方法。我们把外部匿名函数即刻调用，将返回结果(内部匿名函数)保存为fn，每次调用fn就会对a变量累加。用闭包包装的变量具有两个特点: 私有、可以长期存在。

## <a name="href3">应用</a> ##

闭包只能取得包装函数中任何变量的最后一个值。

```js
function createFn() {
    var arr1 = [];
    for(var i = 0; i < 5; i++) {
        arr1[i] = function() {
            console.log(i);
        };
    }
    return arr1;
}

var arr2 = createFn();

for(var i = 0; i < arr2.length; i++) {
    arr2[i](); // 输出的都是: 5
}
```

以上代码中，`createFn()`函数内包装了一个长度为5的数组，每个数组元素保存的值是一个函数，整个`createFn()`是一个闭包，每个数组元素包装的函数引用的都是闭包内的i，所以循环结束后i的值变为5，每个包装函数内引用的i亦为5，最终逐个调用这些包装函数输出的都是5。

要让每个包装函数返回的值是各自的索引值，只需要添加一个作用域将每个包装函数与闭包分隔开，让每个包装函数引用的值来自这个作用域而不是闭包:

```js
function createFn() {
    var arr1 = [];
    for(var i = 0; i < 5; i++) {
        arr1[i] = (function(num) {
            return function() {
                console.log(num);
            }
        })(i);
    }
    return arr1;
}

var arr2 = createFn();

for(var i = 0; i < arr2.length; i++) {
    arr2[i]();
}
```

---

```
ID         : 95
DATE       : 2018/08/07
AUTHER     : WJT20
TAG        : JavaScript
```
