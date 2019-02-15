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

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样

### 规则三 显式绑定

使用 call(..) 和 apply(..) 方法可以强制绑定this的指向。

```js

function foo(){
    console.log(this.a)
}

var obj = {
    a: 2,
}

foo.call(obj)
```

如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式（也就是 new String(..) 、 new Boolean(..) 或者
new Number(..) ）。这通常被称为“装箱”。

### 规则四 new 绑定

在javascript中，使用new 操作符的时候，其实和其他大多数语言中使用new操作符的机制不太一样，当我们使用了new 操作符调用函数，这个函数就会被当做构造函数来调用。

调用构造函数的时候，会发生四件事情：

1. 创建一个空对象。
2. 将这个空对象的__proto__成员指向了构造函数的prototype成员对象
3. 这个新对象会绑定到函数调用的 this
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

关于构造函数可查看 https://www.jianshu.com/p/794672ea66c5

## 绑定优先级

默认绑定的优先级是最低的。

先看隐式绑定和显式绑定哪个优先级更高：

```js

function foo() {
  console.log(this.a);
}
var obj1 = {
  a: 2,
  foo: foo
};
var obj2 = {
  a: 3,
  foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

可以看到，显式绑定优先级更高，也就是说在判断时应当先考虑是否可以应用显式绑定。

现在我们需要搞清楚 new 绑定和隐式绑定的优先级谁高谁低：

```js

function foo(val){
  this.a = val;
}

var obj = {
  foo: foo,
}

obj.foo(3);
console.log(obj.a); // 3

var bar = new obj.foo(4);

console.log(bar.a);
console.log(obj.a)
```

可以看到 new 绑定比隐式绑定优先级高。但是 new 绑定和显式绑定谁的优先级更高呢

```js

function foo(something) {
  this.a = something;
}
var obj1 = {};
var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2
var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```

## 判断this

现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则

1. 函数是否在 new 中调用（ new 绑定）？如果是的话 this 绑定的是新创建的对象。
```js
var bar = new foo()
```
2. 函数是否通过 call 、 apply （显式绑定）或者硬绑定调用？如果是的话， this 绑定的是指定的对象
```js
var bar = foo.call(obj2)
```
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话， this 绑定的是那个上下文对象。
```js
var bar = obj1.foo()
```
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined ，否则绑定到全局对象。
```js
var bar = foo()
```

### 被忽略的this

如果你把 null 或者 undefined 作为 this 的绑定对象传入 call 、 apply 或者 bind ，这些值在调用时会被忽略，实际应用的是默认绑定规则

```js

function foo() {
  console.log(this.a);
}
var a = 2;
foo.call(null); // 2
```

一般我们要展开数组，或者是对参数进行柯里化（预先设置一些参数）的时候，会经常传入一些null值进行占位u，es6中展开数组可以用拓展运算符...，但是还没有参数柯里化的相关语法。

```js

function foo(a, b) {

  console.log("a:" + a + ", b:" + b);
}
// 把数组“展开”成参数
foo.apply(null, [2, 3]); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind(null, 2);
bar(3); // a:2, b:3
```

这两种方法都需要传入一个参数当作 this 的绑定对象。如果函数并不关心 this 的话，你仍然需要传入一个占位值，这时 null 可能是一个不错的选择,

### 更安全的this

```js

function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}
// 我们的 DMZ 空对象
var ø = Object.create(null);
// 把数组展开成参数
foo.apply(ø, [2, 3]); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind(ø, 2);
bar(3); // a:2, b:3
```

使用变量名 ø 不仅让函数变得更加“安全”，而且可以提高代码的可读性，因为 ø 表示“我希望 this 是空”，这比 null 的含义更清楚。

### 间接引用

另一个需要注意的是，你有可能（有意或者无意地）创建一个函数的“间接引用”，在这种情况下，调用这个函数会应用默认绑定规则。

```js

function foo() {
  console.log(this.a);
}

var a = 2;
var o = {
  a: 3,
  foo: foo
};
var p = {
  a: 4
};
o.foo(); // 3
(p.foo = o.foo)(); // 2
```

赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是p.foo() 或者 o.foo() 。根据我们之前说过的，这里会应用默认绑定。

## 箭头函数

箭头函数不适用this的四种标准规则。而是根据外层作用域来决定this。

```js

function foo() {
  return () => {
    console.log(this.a);
  }
}

var obj = {
  a: 2,
  foo: foo
}

var obj2 = {
  a: 4
}

var bar = foo.call(obj2)

bar.call(obj); // 4
```

foo() 内部创建的箭头函数会捕获调用时 foo() 的 this,由于 foo() 的 this 绑定到 obj2,bar （引用箭头函数）的 this 也会绑定到 obj2,头函数的绑定无法被修改。（ new 也不行！）

## 总结

如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后就可以顺序应用下面这四条规则来判断 this 的绑定对象。

1. 由 new 调用？绑定到新创建的对象。
2. 由 call 或者 apply （或者 bind ）调用？绑定到指定的对象。
3. 由上下文对象调用？绑定到那个上下文对象。
4. 默认：在严格模式下绑定到 undefined ，否则绑定到全局对象。

一定要注意，有些调用可能在无意中使用默认绑定规则。如果想“更安全”地忽略 this 绑定，你可以使用一个 DMZ 对象，比如 ø = Object.create(null) ，以保护全局对象。

ES6 中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定this ，具体来说，箭头函数会继承外层函数调用的 this 绑定（无论 this 绑定到什么）。这其实和 ES6 之前代码中的 self = this 机制一样。