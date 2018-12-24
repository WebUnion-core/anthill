
# JavaScript设计模式重啃——单例模式 #

## 目录 ##

1. [介绍](#href1)
2. [单例逻辑](#href2)
3. [代理类接入](#href3)
4. [JavaScript单例模式实现](#href4)

## <a name="href1">介绍</a> ##

在编写程序时，有些实例对象通常只需要创建一次，在整个程序环境中保持唯一性，而创建这种"唯一"的实例对象，就用到了单例模式。实现标准的单例模式并不难，只要用一个变量来标志当前是否已经为某个类创建过对象，如果是，则下次创建该类的实例时直接把已存在的实例对象返回，否则就创建一个实例对象。

## <a name="href2">单例逻辑</a> ##

示例代码:

```js
var Singleton = (function() {
    var instance = null;

    var Singleton = function(name) {
        if (instance) {
            return instance;
        }
        this.name = name;
        return instance = this;//this是生成的实例对象
    }

    return Singleton;
})();

var o1 = new Singleton("object 1");
var o2 = new Singleton("object 2");

console.log(o1); // 输出: { name: "object 1" }
console.log(o2); // 输出: { name: "object 1" }
console.log(o1 === o2); // 输出: true
```

解析:

以上代码生成了一个单例类 Singleton，其内部使用闭包将生成的实例对象保存进一个 instance 变量中，然后在内部定义了一个真正的 Singleton 类，在这个类里面，我们先判断是否实例对象已生成(instance 变量是否为空)，如果已生成就将其返回，否则就初始化属性等。

接着，传入不同的参数生成两个看似完全不同的实例对象，但是在控制台输出日志后我们发现，这两个实例对象的内容都是一样的，对这两个实例对象进行完全相等判断，发现返回的是 true！由此证明，我们创建的这个 Singleton 用到了单例模式逻辑。

## <a name="href3">代理类接入</a> ##

前面实现的单例模式逻辑代码有不足的地方，单例模式的逻辑和创建对象的逻辑混在一起，这不符合"单一职责原则"，为了实现更完美的单例模式逻辑，我们可以借助代理类。以下是接入代理类后实现的单例逻辑代码:

```js
// 分离出的创建对象的代码
var Singleton = function(name) {
    this.name = name;
}

// 单例逻辑代码放在代理类中
var ProxySingleton = (function() {
    var instance = null;

    return function(name) {
        if (!instance) {
            instance = new Singleton(name);
        }

        return instance;
    }
})();

var o1 = new ProxySingleton('new object1');
var o2 = new ProxySingleton('new object2');

console.log(o1); // 输出: { name: "object 1" }
console.log(o2); // 输出: { name: "object 1" }
console.log(o1 === o2); // 输出: true
```

使用代理类的好处是，将负责创建对象的 Singleton 类提取到外面，它成了一个普通的类，而管理单例逻辑的代码则在 ProxySingleton 类中，从而实现了功能上的分离。

## <a name="href4">JavaScript单例模式实现</a> ##

前面讲解的无论是单例逻辑代码还是接入代理类的单例模式代码，都是传统面向对象语言中的实现，而 JavaScript 中实现单例不必那么复杂。

首先，我们重温下 JavaScript 的语言特性，主要有以下两点:

1. 无类;
2. 基于对象。

正因为 JavaScript 无类，创建一个"对象"就可以替代所谓的"类"，所以，又为什么要生搬"类"的那一套呢？(前面写的两个章节是先让你们了解什么是单例模式，不要吐槽)。

JavaScript 中的单例模式逻辑，其实应该是这样的:

```js
var singleton = (function() {
    var obj = null;

    return function(name) {
        if (!obj) {
            obj = {
                name: name
            }
        }

        return obj;
    }
})();

var o1 = singleton("new object1");
var o2 = singleton("new object2");

console.log(o1); // 输出: { name: "object 1" }
console.log(o2); // 输出: { name: "object 1" }
console.log(o1 === o2); // 输出: true
```

以上这段代码依然是不完美的，因为创建对象的逻辑和单例模式的逻辑又混在一起了，改造的方法很简单，请见下面代码:

```js
// 创建对象的逻辑代码
var createObject = function(name) {
    return {
        name: name
    }
}

// 通用的单例模式逻辑代码
var getSingle = function(fn) {
    var result;

    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}

// 单例化
var createSingleObject = getSingle(createObject);

var o1 = createSingleObject("new object1");
var o2 = createSingleObject("new object2");

console.log(o1); // 输出: { name: "object 1" }
console.log(o2); // 输出: { name: "object 1" }
console.log(o1 === o2); // 输出: true
```

---

```
ID         : 35
DATE       : 2017/09/24
AUTHER     : WJT20
TAG        : JavaScript
```
