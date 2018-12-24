
# JavaScript-D系列——面向对象 #

## 目录 ##

1. [创建类](#href1)
    1. [工厂模式](#href1-1)
    2. [构造函数模式](#href1-2)
    3. [原型模式](#href1-3)
    4. [组合使用构造函数模式和原型模式](#href1-4)
2. [apply()和call()](#href2)
3. [继承](#href3)
    1. [原型链](#href3-5)
    2. [借用构造函数](#href3-6)

## <a name="href1">创建类</a> ##

### <a name="href1-1">工厂模式</a> ###

```js
function createPerson(name, id) {
    return {
        name: name,
        id: id,
        sayHello: function() {
            console.log("Hello, " + this.name);
        }
    }
}

var p = createPerson("WJT", "001");

p.sayHello();
console.log(p.constructor); // 输出的总是Object构造函数，没什么卵用
```

工厂模式的特点是在函数内部将传入的参数包装成一个对象返回，在这个对象内部可以使用 this 对象引用其他的属性和方法，例如上面这段代码`sayHello()`方法中通过`this.name`访问对象的 name 属性值。

工厂模式的缺点是每次使用它创建实例时都会在函数内部创建一个逻辑功能完全相同的对象返回，这样会产生大量重复的代码。并且工厂模式创建的实例对象对应的构造函数是 Object，并不能为我们提供更多有用的信息。

### <a name="href1-2">构造函数模式</a> ###

JavaScript 包装了 Object、Array 等原生构造函数，在运行时会自动出现在执行环境中，JavaScript 允许我们创建自定义的构造函数，创建一个构造函数的形式与创建一个普通函数十分类似，注意区分。

```js
// 构造函数命名首字母要大写(命名习惯)
function Person(name, id) {
    this.name = name;
    this.id = id;
    this.sayHello = function() {
        console.log("Hello, " + this.name);
    }
}

var p = new Person("WJT", "001");

p.sayHello();
console.log(p.constructor); // 输出的是Person构造函数，可以清晰地看出对应的构造函数信息
```

创建自定义的构造函数可以将它的实例标识为一种特定的类型，这也是构造函数模式胜于工厂模式的地方。

构造函数也同样存在一些问题，构造函数内部包装的方法会在每次创建实例时重新创建一次，这种重新创建方法的机制是不必要的，因为这些方法的功能是完全一样的。

### <a name="href1-3">原型模式</a> ###

原型模式的实现原理在于使用了每个函数都有的一个名为 prototype(原型) 属性，prototype 属性是一个指针，指向一个对象。把构造函数的 prototype 属性指向一个对象，此时这个对象就叫做根据这个构造函数创建的实例的原型对象，当创建的实例调用一个方法或访问一个属性时，如果构造函数内不存在这些方法或属性，则会到原型对象上去查找。

```js
function Person() {}

var p1 = new Person2(); // 创建一个空实例
p1.sayHello(); // 报错，此时实例对象p1不具有任何属性

// 在原型对象上定义一些属性和方法
Person.prototype.name = "WJT";
Person.prototype.id = "001";
Person.prototype.sayHello = function() {
    console.log("Hello, " + this.name);
}

var p2 = new Person();
p2.sayHello(); // 输出: "Hello, WJT"
```

以上代码中，我们先定义了一个空的 Person2 构造函数，然后创建一个 p4 实例对象，调用`sayHello()`方法发现出错，因为构造函数内没有这个方法。接着给 Person2 的 prototype 属性上添加一些属性和方法，再创建另一个实例对象，同样调用`sayHello()`方法发现返回了一条信息并没有报错。

原因在于，当实例对象调用`sayHello()`这个方法时，会现在构造函数 Person2 上查找有没有`sayHello()`这个方法，如果没有找到则到原型对象上找，这里在原型对象上找到了该方法，就返回使用。

可以直接将 prototype 属性定义为一个对象，一次性定义多个属性和方法:

```js
function Person() {}
Person.prototype = {
    name: name,
    id: id,
    sayHello: function() {
        console.log("Hello, " + this.name);
    }
}
```

原型模式实现了属性和方法在实例对象中共享，再也不必在每次创建实例对象时包装返回一个对象(工厂模式的问题)及包装一些重复的方法(构造函数模式的问题)。

构造函数的 prototype 属性指向的是实例的原型对象，实例对象的`__proto__`属性同样也是指向实例的原型对象。然而操纵原型对象的指向，更提倡使用 prototype 属性来操作，因为 prototype 属性是 JavaScript 包装好的一个接口，而`__proto__`属性则是浏览器厂家自己包装的接口，用于测试。

```js
function Person() {}

var p = new Person();
console.log(p.__proto__ === Person.prototype); // 输出: true
```

### <a name="href1-4">组合使用构造函数模式和原型模式</a> ###

最常见的创建类的方法就是组合使用构造函数和原型模式。构造函数用于定义属性(避免构造函数模式定义实例方法出现的问题)，而原型模式用于定义方法和共享属性。这种创建类的方法最大限度地节省了内存。

```js
function Person(name, id) {
    this.name = name;
    this.id = id;
}

Person.prototype = {
    constructor: Person, // 将constructor属性指向构造函数
    sayHello: function() {
        console.log("Hello, " + this.name);
    }
}

var p = new Person("WJT", "001");
p.sayHello();
```

## <a name="href2">apply()和call()</a> ##

`apply()`和`call()`方法可以改变函数中 this 指向，两者的区别在于传入的参数个数，`apply()`只能传入两个参数，而`call()`的参数个数不固定，第一个参数都是 this 指向的对象，`apply()`第二个参数是一个数组，将数组元素作为参数传给调用函数; `call()`则是将第一个参数以外的参数逐个传给调用函数。

```js
var str1 = Array.prototype.join.apply("ABC", ["-"]);
var str2 = Array.prototype.join.call("ABC", "-");

console.log(str1, str2); // 输出: "A-B-C" "A-B-C"
```

## <a name="href3">继承</a> ##

### <a name="href3-5">原型链</a> ###

原型链的基本思想是把我们要创建的实例对应的构造函数A的 prototype 属性指向另一个构造函数B创建的实例，接着将构造函数B的 prototype 属性指向下一个构造函数C创建的实例，依次类推。最终构造函数A创建的实例继承了构造函数B、C...的所有属性和方法，形成一条继承链。

```js
function A() {}

function B() {
    this.name = "WJT";
}

function C() {
    this.id = "001";
}

function D() {
    this.sayHello = function() {
        console.log("Hello, " + this.name + ", " + this.id);
    }
}

// 注意: 必须按以下顺序设置prototype属性
C.prototype = new D(); // C继承D
B.prototype = new C(); // B继承C
A.prototype = new B(); // A继承B

var p = new A();
p.sayHello(); // 输出: "Hello, WJT, 001"
```

原型链有两个缺点:

1. 无法在创建实例时传递参数给prototype指向的对象;
2. 无法给每个实例对象创建专属的引用类型的属性。

```js
function A(name, id) {}

function B() {
    this.name = name;
}

function C() {
    this.id = id;
}

function D() {
    this.sayHello = function() {
        console.log("Hello, " + this.name + ", " + this.id);
    }
}

C.prototype = new D();
B.prototype = new C();
A.prototype = new B();

var p = new A("WJT", "001");
p.sayHello();
```

以上代码中，我们想在创建p实例时传入 name 和 id 参数交给继承的B、C和D类，但发现这三个类根本无法获取到这个"WJT"和"001"的值，最终抛出错误，这就是原型链的传参问题。

```js
function A() {}

function B() {
    this.name = [];
}

A.prototype = new B(); // A继承B

var p1 = new A();
var p2 = new A();

console.log(p1.name, p2.name); // 输出: [] []

p1.name.push("WJT"); // 我们只想修改p1的name属性值
console.log(p1.name, p2.name); // 输出: ["WJT"] ["WJT"]
```

以上代码中，name 数组是引用类型属性，我们修改其中一个实例的 name 属性值，结果发现另一个实例的 name 属性值也发生了改变。

### <a name="href3-6">借用构造函数</a> ###

借用构造函数，即使用`apply()`和`call()`方法在新创建的对象上执行函数实现继承。

```js
function A(name, id) {
    B.call(this, name); // 使用call()改变this指向并传值给继承的构造函数
    C.call(this, id);
    D.call(this);
}

function B(name) {
    this.name = name;
}

function C(id) {
    this.id = id;
}

function D() {
    this.sayHello = function() {
        console.log("Hello, " + this.name + ", " + this.id);
    }
}

var p = new A("WJT", "001");
p.sayHello(); // 输出: "Hello, WJT, 001"
```

这是两种常见的类的继承方式，当然不止这两种，其他继承方式可以自己查资料。

---

```
ID         : 96
DATE       : 2018/08/08
AUTHER     : WJT20
TAG        : JavaScript
```
