* [相交类型](#相交类型)
* [相交类型语法](#相交类型语法)
* [不可能相交类型](#不可能相交类型)
* [对象相交类型](#对象相交类型)
* [获取类型的类型](#获取类型的类型)

## 相交类型

有时候，创建一个类型(它是一组其他类型的集合)是很有用的。例如，您可能希望编写一个接受对象的函数，该对象是其他对象类型的组合。为此，Flow支持交集类型。

```js
// @flow
type A = { a: number };
type B = { b: boolean };
type C = { c: string };

function method(value: A & B & C) {
  // ...
}

// $ExpectError
method({ a: 1 }); // Error!
// $ExpectError
method({ a: 1, b: true }); // Error!
method({ a: 1, b: true, c: 'three' }); // Works!
```

### 相交类型语法

交集类型是任意数量的类型，这些类型是由&号联接的。

```js
Type1 & Type2 & ... & TypeN
```

交集类型的每个成员可以是任何类型，甚至是另一个交集类型。

```js
type Foo = Type1 & Type2;
type Bar = Type3 & Type4;

type Baz = Foo & Bar;
```

**交集类型需要全部输入，但只需要一个输出。**

交集类型与并集类型相反。当调用接受交集类型的函数时，我们必须传入所有这些类型。但是在我们的函数内部，我们只需要把它当作这些类型中的任何一种。

```js
// @flow
type A = { a: number };
type B = { b: boolean };
type C = { c: string };

function method(value: A & B & C) {
  var a: A = value;
  var b: B = value;
  var c: C = value;
}
```

即使我们只将值视为其中的一种类型，我们也不会得到一个错误，因为它满足了所有类型。

## 不可能相交类型

使用相交类型，可以创建在运行时无法创建的类型。交集类型允许您组合任何类型集，即使是那些相互冲突的类型。

例如，可以创建数字和字符串的相交类型。

```js
// @flow
type NumberAndString = number & string;

function method(value: NumberAndString) {
  // ...
}

// $ExpectError
method(3.14); // Error!
// $ExpectError
method('hi'); // Error!
```

但是您不可能同时创建一个数字和一个字符串的值，但是您可以为它创建一个类型。创建这样的类型没有实际的用途，但是它是交集类型工作方式的副作用。

### 对象相交类型

创建对象相交类型时，可以将它们的所有属性合并在一起。

例如，当您创建具有不同属性集的两个对象的交集时，它将导致具有所有属性的对象。

```js
// @flow
type One = { foo: number };
type Two = { bar: boolean };

type Both = One & Two;

var value: Both = {
  foo: 1,
  bar: true
};
```

但是，当您的属性通过具有相同的名称而重叠时，它也会创建属性类型的交集。

例如，如果将两个对象与名为prop的属性合并，其中一个对象的类型为Number，另一个对象的类型为布尔，则得到的对象将具有数字和布尔值的交集。

```js
// @flow
type One = { prop: number };
type Two = { prop: boolean };

type Both = One & Two;

// $ExpectError
var value: Both = {
  prop: 1 // Error!
};
```

## 获取类型的类型

JavaScript有一个TypeOF操作符，它返回一个描述值的字符串。

```js
typeof 1 === 'number'
typeof true === 'boolean'
typeof 'three' === 'string'
```

但是，由于这个字符串只描述了关于类型的太多内容，所以它是有限的。

```js
typeof { foo: true } === 'object'
typeof { bar: true } === 'object'
typeof [true, false] === 'object'
```

在Flow中，有一个类似类型的操作符，但它的功能要强大得多。ss

### 获取类型语法

TypeOf运算符返回给定值的流类型，以用作类型。

```js
// @flow
let num1 = 42;
let num2: typeof num1 = 3.14;     // Works!
// $ExpectError
let num3: typeof num1 = 'world';  // Error!

let bool1 = true;
let bool2: typeof bool1 = false;  // Works!
// $ExpectError
let bool3: typeof bool1 = 42;     // Error!

let str1 = 'hello';
let str2: typeof str1 = 'world'; // Works!
// $ExpectError
let str3: typeof str1 = false;   // Error!
```

您可以在Typeof中使用任何值：

```js
// @flow
let obj1 = { foo: 1, bar: true, baz: 'three' };
let obj2: typeof obj1 = { foo: 42, bar: false, baz: 'hello' };

let arr1 = [1, 2, 3];
let arr2: typeof arr1 = [3, 2, 1];
```

### 类型继承-推理行为

Flow对您的代码执行各种类型推断，因此您不必键入任何注释。一般情况下，推理会避免妨碍您的方法，同时也会阻止您引入bug。

但是，当您使用Typeof时，您是在获取Flow的推断结果，并将其断言为一个类型。虽然这可能非常有用，但也可能导致一些意想不到的结果。

例如，当您在流中使用文本值时，它们推断的类型就是它所属的基元。因此，数字42具有推断出的数字类型。使用Typeof时可以看到这一点。

```js
// @flow
let num1 = 42;
let num2: typeof num1 = 3.14;    // Works!

let bool1 = true;
let bool2: typeof bool1 = false; // Works!

let str1 = 'hello';
let str2: typeof str1 = 'world'; // Works!
```

但是，这只发生在推断的类型中。如果指定文字类型，则将在Typeof中使用它。

```js
// @flow
let num1: 42 = 42;
// $ExpectError
let num2: typeof num1 = 3.14;    // Error!

let bool1: true = true;
// $ExpectError
let bool2: typeof bool1 = false; // Error!

let str1: 'hello' = 'hello';
// $ExpectError
let str2: typeof str1 = 'world'; // Error!
```

### 类型继承其他类型的行为

flow中有许多不同的类型，其中一些类型的行为与其他类型不同。这些差异对该特定类型是有意义的，但对其他类型则没有意义。

当您使用Typeof时，您插入的是另一个类型及其所有行为。这可以使类型看起来不一致的地方，它不是。

例如，如果在类中使用Typeof，则需要记住类名义上是类型化的，而不是结构类型化的。因此，两个具有相同确切形状的类不被认为是等价的。

```js
// @flow
class MyClass {
  method(val: number) { /* ... */ }
}

class YourClass {
  method(val: number) { /* ... */ }
}

// $ExpectError
let test1: typeof MyClass = YourClass; // Error!
let test2: typeof MyClass = MyClass;   // Works!
```