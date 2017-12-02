
# JavaScript技巧总结 #

## 目录 ##

1. 参考链接
2. 立即执行函数
3. 闭包

---

## 参考链接 ##

- [10个JavaScript难点](https://segmentfault.com/a/1190000010371988)

---

### 立即执行函数 ###

立即执行函数(IIFE)，意为创建函数的同时立即执行函数，可以将其理解为立即执行一个匿名函数。立即执行函数最常见的应用场景就是：将var变量的作用域限制于你们函数内，这样可以避免命名冲突。

```
(function() {
    var a = 1;
    console.log(a);
})();
console.log(a);//报错: a未定义
```

---

### 闭包 ###

闭包(closure)，特征是一个函数内部返回另一个函数，如果内部函数内引用了外部函数的变量，那么这个变量将会长期存在而不会在外部函数执行完后立即销毁回收，闭包会导致变量长期贮存在内存中，所以要慎用。

```
function callAdd(start) {
    return function() {
        return ++start;
    }
}
var add = callAdd(5);
console.log(add());//输出: 6
console.log(add());//输出: 7
console.log(add());//输出: 8
```

使用闭包可以定义私有变量，示例代码如下：

```
function Person(name) {
    this.getName = function() {
        return name;
    }
}
var person = new Person("WJT");
console.log(person.getName());//输出: "WJT"
console.log(person.name);//输出: undefined，person.name为私有变量，不能直接访问
```

---

```
ARTICLE_ID : 46
POST_DATE : 2017/12/02
AUTHER : WJT20
```
