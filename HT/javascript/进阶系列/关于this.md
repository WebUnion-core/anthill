## this

什么是this,其实你可以理解为它类似一个指针

在浏览器环境中，全局作用域下，this指的是windows，在node环境中，全局下this打印的是一个空对象{};

```js

function foo(){
    console.log(this);
}

foo();
```

上面这段代码运行之后，在浏览器环境中，会打印window对象。再看下面这段代码。

```js

function foo(){
    console.log(this);
}

var fn1 = foo;

fn1();
```

上面的代码执行之后，打印的还是window,我们在看。

```js

function foo(){
    console.log(this)
}

var fn1 = {
    a: 1,
    foo: foo
}

fn1.foo();
```

这段代码执行之后返回的是fn1对象。接下来再看

```js

function foo(){
    console.log(this)
}

var arr = [foo,2,3]

arr[0]()
```

上述代码执行完成后，打印的是arr数组对象。



**通过之前的代码我们可以很明显的看到，this 是在运行时进行绑定的，并不是在编写时绑定，当我们把函数赋值到引用对象里调用的时候，那this就指向当前的调用环境，就是调用的对象本身**

## 什么是执行上下文

javascript是一个单线程语言，这意味着在浏览器中同时只能做一件事情。当javascript解释器初始执行代码，它首先默认进入全局上下文。每次调用一个函数将会创建一个新的执行上下文。

每次新创建的一个执行上下文会被添加到作用域链的顶部，有时也称为执行或调用栈。浏览器总是运行位于作用域链顶部的当前执行上下文。一旦完成，当前执行上下文将从栈顶被移除并且将控制权归还给之前的执行上下文。比如我调用了这个函数，那么这个函数的执行上下文 就会被添加到作用域链的顶部，然后这个函数执行完成这个上下文就会被移除，然后控制权交给之前的上下文。


### 执行上下文的建立过程

我们现在已经知道，每当调用一个函数时，一个新的执行上下文就会被创建出来。然而，在javascript引擎内部，这个上下文的创建过程具体分为两个阶段:

1. 建立阶段(发生在当调用一个函数时，但是在执行函数体内的具体代码以前)
    - 建立变量，函数，arguments对象，参数
    - 建立作用域链
    - 确定this的值

2. 代码执行阶段:
    - 变量赋值，函数引用，执行其它代码

我们可以看到，当一个函数调用的时候，会建立执行上下文，建立的时候会确定this的值，所以我们现在，就是要探讨他的this的值是怎么确定的。


## 调用位置

```js

function baz() {
    // 当前调用栈是：baz
    // 因此，当前调用位置是全局作用域
    console.log("baz");
    bar(); // <-- bar 的调用位置
}

function bar() {
    // 当前调用栈是 baz -> bar
    // 因此，当前调用位置在 baz 中
    console.log("bar");
    foo(); // <-- foo 的调用位置
}

function foo() {
    // 当前调用栈是 baz -> bar -> foo
    // 因此，当前调用位置在 bar 中
    console.log("foo");
}
baz(); // <-- baz 的调用位置
```

注意我们是如何（从调用栈中）分析出真正的调用位置的，因为它决定了 this 的绑定

## 绑定规则

我们来看看在函数的执行过程中调用位置如何决定 this 的绑定对象。

你必须找到调用位置，然后判断需要应用下面四条规则中的哪一条。我们首先会分别解释这四条规则，然后解释多条规则都可用时它们的优先级如何排列。

### 规则一 默认绑定

独立调用。可以把这条规则看作是无法应用其他规则时的默认规则。

```js

function foo() {
    console.log(this.a);
}
var a = 2;
foo(); // 2
```

在代码中， foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。

如果使用严格模式（ strict mode ），那么全局对象将无法使用默认绑定，因此 this 会绑定到 undefined

### 规则二 隐式绑定

另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。

```js

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2
```

调用位置会使用 obj 上下文来引用函数，因此你可以说函数被调用时 obj 对象“拥有”或者“包含”它。

当 foo() 被调用时，它的落脚点确实指向 obj 对象。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。因为调用 foo() 时 this 被绑定到 obj ，因此 this.a 和 obj.a 是一样的。

对象属性引用链中只有最顶层或者说最后一层会影响调用位置。举例来说：

```js

function foo() {
    console.log(this.a);
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo(); // 42
```

**隐式丢失**

```js

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```

虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：

```js

function foo() {
    console.log(this.a);
}

function doFoo(fn) {
    // fn 其实引用的是 foo
    fn(); // <-- 调用位置！
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
doFoo(obj.foo); // "oops, global"
```

### 规则三 显式绑定

使用 call(..) 和 apply(..) 方法。

