* [接口类型](#接口类型)
* [接口语法](#接口语法)
* [接口泛型](#接口泛型)
* [接口属性变量(只读和只写)](#接口属性变量(只读和只写))

----

* [通用类型](#通用类型)
* [泛型特性](#泛型特性)



# 接口类型

Flow中的类名义上是键入的。这意味着当你有两个单独的类时，即使它们具有相同的属性和方法，也不能使用一个类代替另一个。

```js
// @flow
class Foo {
  serialize() { return '[Foo]'; }
}

class Bar {
  serialize() { return '[Bar]'; }
}

// $ExpectError
const foo: Foo = new Bar(); // Error!
```

相反，您可以使用接口来声明您期望的类的结构。

```js
// @flow
interface Serializable {
  serialize(): string;
}

class Foo {
  serialize() { return '[Foo]'; }
}

class Bar {
  serialize() { return '[Bar]'; }
}

const foo: Serializable = new Foo(); // Works!
const bar: Serializable = new Bar(); // Works!
```

您还可以使用implements来告诉Flow您希望该类与接口匹配。这可以防止您在编辑类时进行不兼容的更改。

```js
// @flow
interface Serializable {
  serialize(): string;
}

class Foo implements Serializable {
  serialize() { return '[Foo]'; } // Works!
}

class Bar implements Serializable {
  // $ExpectError
  serialize() { return 42; } // Error!
}
```

您还可以使用具有多个接口的工具。

```js
class Foo implements Bar, Baz {
  // ...
}
```

## 接口语法

接口是使用关键字interface，后跟其名称和包含类型定义主体的块创建的。

```js
interface MyInterface {
  // ...
}
```
块的语法与对象类型的语法匹配，并具有所有相同的功能

```js

```

### 接口方法

您可以按照与对象方法相同的语法向接口添加方法。

```js
interface MyInterface {
  method(value: string): number;
}
```

### 接口属性

您可以按照与对象属性相同的语法向接口添加属性。

```js
interface MyInterface {
  property: string;
}
```
接口属性也是可选的。

```js
interface MyInterface {
  property?: string;
}
```

### 接口Maps
您可以使用与对象相同的方式创建“索引器属性”。

```js
interface MyInterface {
  [key: string]: number;
}
```

## 接口泛型

接口也可以有自己的泛型。

```js
interface MyInterface<A, B, C> {
  property: A;
  method(val: B): C;
}
```

接口泛型已参数化。使用接口时，需要为每个泛型传递参数。

```js
// @flow
interface MyInterface<A, B, C> {
  foo: A;
  bar: B;
  baz: C;
}

var val: MyInterface<number, boolean, string> = {
  foo: 1,
  bar: true,
  baz: 'three',
};
```

## 接口属性变量(只读和只写)

默认情况下，接口属性是不变的。但是您可以添加修饰符以使它们协变（只读）或逆变（只写）。

```js
interface MyInterface {
  +covariant: number;     // read-only
  -contravariant: number; // write-only
}
```

### 接口上的协变（只读）属性

您可以通过在属性名称前添加加号+来使属性协变。

```js
interface MyInterface {
  +readOnly: number | string;
}
```

这允许您传递更具体的类型来代替该属性。

```js
// @flow
// $ExpectError
interface Invariant {  property: number | string }
interface Covariant { +readOnly: number | string }

var value1: Invariant = { property: 42 }; // Error!
var value2: Covariant = { readOnly: 42 }; // Works!
```

由于协方差的工作原理，协变属性在使用时也变为只读。这对普通属性有用。

```js
// @flow
interface Invariant {  property: number | string }
interface Covariant { +readOnly: number | string }

function method1(value: Invariant) {
  value.property;        // Works!
  value.property = 3.14; // Works!
}

function method2(value: Covariant) {
  value.readOnly;        // Works!
  // $ExpectError
  value.readOnly = 3.14; // Error!
}
```

### 接口上的逆变（只写）属性

您可以通过在属性名称前添加减号来创建属性逆变。

```js
interface InterfaceName {
  -writeOnly: number;
}
```

这允许您传递一个不太具体的类型来代替该属性。

```js
// @flow
interface Invariant     {  property: number }
interface Contravariant { -writeOnly: number }

var numberOrString = Math.random() > 0.5 ? 42 : 'forty-two';

// $ExpectError
var value1: Invariant     = { property: numberOrString };  // Error!
var value2: Contravariant = { writeOnly: numberOrString }; // Works!
```

由于逆变的工作原理，逆变属性在使用时也会变为只写。这对普通属性有用。

```js
interface Invariant     {   property: number }
interface Contravariant { -writeOnly: number }

function method1(value: Invariant) {
  value.property;        // Works!
  value.property = 3.14; // Works!
}

function method2(value: Contravariant) {
  // $ExpectError
  value.writeOnly;        // Error!
  value.writeOnly = 3.14; // Works!
}
```

# 泛型

泛型（有时称为多态类型）是一种抽象类型的方法。 想象一下编写以下身份函数，它返回传递的任何值。

```js
function identity(value) {
  return value;
}
```

我们在尝试为此函数编写特定类型时会遇到很多麻烦，因为它可能是任何东西。

```js
function identity(value: string): string {
  return value;
}
```

相反，我们可以在函数中创建泛型（或多态类型），并使用它代替其他类型。

```js
function identity<T>(value: T): T {
  return value;
}
```

泛型可以在函数，函数类型，类，类型别名和接口中使用。

> 警告：Flow不会推断泛型类型。如果您希望某些东西具有泛型类型，请对其进行注释。否则，Flow可能会推断出比您预期的多态性更低的类型。

在下面的示例中，我们忘记使用泛型类型正确地注释 identity ，因此当我们尝试将其分配给func时会遇到麻烦。另一方面，genericIdentity已正确输入，我们可以按预期使用它。

```js
// @flow

type IdentityWrapper = {
  func<T>(T): T
}

function identity(value) {
  return value;
}

function genericIdentity<T>(value: T): T {
  return value;
}

// $ExpectError
const bad: IdentityWrapper = { func: identity }; // Error!
const good: IdentityWrapper = { func: genericIdentity }; // Works!
```

## 具有泛型的函数

函数可以通过在函数参数列表之前添加类型参数列表<T>来创建泛型。 您可以在函数（参数或返回类型）中添加任何其他类型的相同位置使用泛型。

```js
function method<T>(param: T): T {
  // ...
}

function<T>(param: T): T {
  // ...
}
```

## 具有泛型的函数类型

函数类型可以通过在函数类型参数列表之前添加类型参数list <T>，以与普通函数相同的方式创建泛型。 您可以在函数类型（参数或返回类型）中添加任何其他类型的相同位置使用泛型。

```js
<T>(param: T) => T
```

然后将其用作自己的类型。

```js
function method(func: <T>(param: T) => T) {
  // ...
}
```

## 具有泛型的类

类可以通过将类型参数列表放在类的主体之前来创建泛型。

```js
class Item<T> {
  // ...
}
```

您可以在类中添加任何其他类型的相同位置使用泛型（属性类型和方法参数/返回类型）。

```js
class Item<T> {
  prop: T;

  constructor(param: T) {
    this.prop = param;
  }

  method(): T {
    return this.prop;
  }
}
```

## 具有泛型的类型别名

```js
type Item<T> = {
  foo: T,
  bar: T,
};
```

## 具有泛型的接口

```js
interface Item<T> {
  foo: T,
  bar: T,
}
```

# 泛型特性

### 泛型就像变量一样

泛型类型很像变量或函数参数，除了它们用于类型。只要它们在范围内，您就可以使用它们。

```js
function constant<T>(value: T) {
  return function(): T {
    return value;
  };
}
```

### 根据需要创建尽可能多的泛型

您可以在类型参数列表中根据需要使用这些泛型，并根据需要命名它们：

```js
function identity<One, Two, Three>(one: One, two: Two, three: Three) {
  // ...
}
```

### 泛型跟踪

当对值使用泛型类型时，Flow将跟踪该值并确保您不会将其替换为其他值。

```js
// @flow
function identity<T>(value: T): T {
  // $ExpectError
  return "foo"; // Error!
}

function identity<T>(value: T): T {
  // $ExpectError
  value = "foo"; // Error!
  // $ExpectError
  return value;  // Error!
}
```

Flow跟踪您通过泛型的值的特定类型，以便稍后使用。

```js
// @flow
function identity<T>(value: T): T {
  return value;
}

let one: 1 = identity(1);
let two: 2 = identity(2);
// $ExpectError
let three: 3 = identity(42);
```

### 将类型添加到泛型

与 mixed 类似，泛型具有“未知”类型。您不能使用泛型，就好像它是特定类型一样。

```js
// @flow
function logFoo<T>(obj: T): T {
  // $ExpectError
  console.log(obj.foo); // Error!
  return obj;
}
```

您可以优化类型，但泛型仍然允许传入任何类型。

```js
// @flow
function logFoo<T>(obj: T): T {
  if (obj && obj.foo) {
    console.log(obj.foo); // Works.
  }
  return obj;
}

logFoo({ foo: 'foo', bar: 'bar' });  // Works.
logFoo({ bar: 'bar' }); // Works. :(
```

相反，您可以像使用函数参数一样为泛型添加类型。

```js
// @flow
function logFoo<T: { foo: string }>(obj: T): T {
  console.log(obj.foo); // Works!
  return obj;
}

logFoo({ foo: 'foo', bar: 'bar' });  // Works!
// $ExpectError
logFoo({ bar: 'bar' }); // Error!
```

这样，您可以保留泛型的行为，同时仅允许使用某些类型。

```js
// @flow
function identity<T: number>(value: T): T {
  return value;
}

let one: 1 = identity(1);
let two: 2 = identity(2);
// $ExpectError
let three: "three" = identity("three");
```

### 泛型充当边界

```js
// @flow
function identity<T>(val: T): T {
  return val;
}

let foo: 'foo' = 'foo';           // Works!
let bar: 'bar' = identity('bar'); // Works!
```

在Flow中，大多数情况下，当您将一种类型传递到另一种类型时，您将失去原始类型。因此，当您将特定类型传递给不太具体的一个流程“界限”时，它曾经是更具体的东西。

```js
// @flow
function identity(val: string): string {
  return val;
}

let foo: 'foo' = 'foo';           // Works!
// $ExpectError
let bar: 'bar' = identity('bar'); // Error!
```

泛型允许您在添加约束时保留更具体的类型。通过这种方式，泛型上的类型充当“边界”。

```js
// @flow
function identity<T: string>(val: T): T {
  return val;
}

let foo: 'foo' = 'foo';           // Works!
let bar: 'bar' = identity('bar'); // Works!
```

请注意，如果您具有绑定泛型类型的值，则不能将其用作更具体的类型。

```js
// @flow
function identity<T: string>(val: T): T {
  let str: string = val; // Works!
  // $ExpectError
  let bar: 'bar'  = val; // Error!
  return val;
}

identity('bar');
```

### 参数化泛型


泛型有时允许您将类似参数的类型传递给函数。这些被称为参数化泛型（或参数多态）。 

例如，参数化具有泛型的类型别名。当你去使用它时，你必须提供一个类型参数。

```js
type Item<T> = {
  prop: T,
}

let item: Item<string> = {
  prop: "value"
};
```

您可以将此视为将函数传递给函数，只有返回值是您可以使用的类型。 

类（当用作类型时），类型别名和接口都要求您传递类型参数。函数和函数类型没有参数化泛型。


#### classes
```js
// @flow
class Item<T> {
  prop: T;
  constructor(param: T) {
    this.prop = param;
  }
}

let item1: Item<number> = new Item(42); // Works!
// $ExpectError
let item2: Item = new Item(42); // Error!
```

#### Type Aliases 类型别名

```js
// @flow
type Item<T> = {
  prop: T,
};

let item1: Item<number> = { prop: 42 }; // Works!
// $ExpectError
let item2: Item = { prop: 42 }; // Error!
```

#### 接口

```js
// @flow
interface HasProp<T> {
  prop: T,
}

class Item {
  prop: string;
}

(Item.prototype: HasProp<string>); // Works!
// $ExpectError
(Item.prototype: HasProp); // Error!
```

### 添加参数化泛型的默认值

您还可以像参数函数一样为参数化泛型提供默认值。

```js
type Item<T: number = 1> = {
  prop: T,
};

let foo: Item<> = { prop: 1 };
let bar: Item<2> = { prop: 2 };
```

使用类型时，必须始终包括括号<>（就像函数调用的括号一样）。