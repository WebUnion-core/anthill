* [对象类型语法](#对象类型语法)
* [可选对象类型属性](#可选对象类型属性)
* [密封对象](#密封对象)
* [未密封对象](#未密封对象)
* [精确对象类型](#精确对象类型)
* [ObjectsAsMaps](#ObjectsAsMaps)



在JavaScript中，对象可以以多种不同的方式使用。为了支持所有不同的用例，有许多不同的方法可以输入它们。

# 对象类型语法

对象类型尽可能地尝试匹配JavaScript中对象的语法。使用冒号使用花括号{}和名称 - 值对：用逗号分隔，。

```js
// @flow
var obj1: { foo: boolean } = { foo: true };
var obj2: {
  foo: number,
  bar: boolean,
  baz: string,
} = {
  foo: 1,
  bar: true,
  baz: 'three',
};
```

> 注意：以前的对象类型使用分号;用于拆分名称 - 值对。虽然语法仍然有效，但您应该使用逗号，

# 可选对象类型属性

在JavaScript中，访问不存在的属性的计算结果为undefined。这是JavaScript程序中常见的错误来源，因此Flow将这些错误转换为类型错误。

```js
// @flow
var obj = { foo: "bar" };
// $ExpectError
obj.bar; // Error!  cannot get `obj.bar` beacuse property `bar` is missing in object litera [1].
```
如果您有一个有时没有属性的对象，可以通过在对象类型中的属性名称之后添加问号使其成为可选属性。

```js
// @flow
var obj: { foo?: boolean } = {};

obj.foo = true;    // Works!
// $ExpectError
obj.foo = 'hello'; // Error! cannot assign `'hello'` to `obj.foo` because string [1] is incomptible with boolean [2]
```

除了它们的设置值类型之外，这些可选属性可以是 void，也可以完全省略。但是，它们不能为 null。

```js
// @flow
function acceptsObject(value: { foo?: string }) {
  // ...
}

acceptsObject({ foo: "bar" });     // Works!
acceptsObject({ foo: undefined }); // Works!
// $ExpectError
acceptsObject({ foo: null });      // Error!
acceptsObject({});                 // Works!
```

## 密封对象

使用其属性创建对象时，可在Flow中创建密封对象类型。这些密封对象将知道您声明它们的所有属性及其值的类型。

```js
// @flow
var obj = {
  foo: 1,
  bar: true,
  baz: 'three'
};

var foo: number  = obj.foo; // Works!
var bar: boolean = obj.bar; // Works!
// $ExpectError
var baz: null    = obj.baz; // Error!
var bat: string  = obj.bat; // Error!
```

但是当对象被密封时，Flow将不允许您向它们添加新属性。

```js
// @flow
var obj = {
  foo: 1
};

// $ExpectError
obj.bar = true;    // Error!
// $ExpectError
obj.baz = 'three'; // Error!
```

此处的解决方法可能是将您的对象转换为未密封的对象。

## 未密封对象

创建没有任何属性的对象时，可以在Flow中创建未密封的对象类型。这些未密封的对象不会知道它们的所有属性，并允许您添加新属性。

```js
// @flow
var obj = {};

obj.foo = 1;       // Works!
obj.bar = true;    // Works!
obj.baz = 'three'; // Works!
```

属性的推断类型(类型注释)将成为您设置的属性。

#### 重新分配未密封的对象属性

类似于var和let变量，如果重新分配未密封对象的属性，默认情况下，Flow会为其指定所有可能分配的类型。

```js
// @flow
var obj = {};

if (Math.random()) obj.prop = true;
else obj.prop = "hello";

// $ExpectError
var val1: boolean = obj.prop; // Error!
// $ExpectError
var val2: string  = obj.prop; // Error!
var val3: boolean | string = obj.prop; // Works!
```

有时，Flow能够在重新分配后（确定地）确定属性的类型。在这种情况下，Flow将为其提供已知类型。

```js
// @flow
var obj = {};

obj.prop = true;
obj.prop = "hello";

// $ExpectError
var val1: boolean = obj.prop; // Error!
var val2: string  = obj.prop; // Works!
```
随着Flow变得越来越聪明，它将在更多场景中找出属性的类型。

#### 未密封对象上的未知属性查找是不安全的

未密封的对象允许随时写入新属性。 Flow确保读取与写入兼容，但不确保在读取之前发生写入（按执行顺序）。

这意味着永远不会检查没有匹配写入的未密封对象的读取。这是Flow的一种不安全行为，将来可能会得到改善。

```js
var obj = {};

obj.foo = 1;
obj.bar = true;

var foo: number  = obj.foo; // Works!
var bar: boolean = obj.bar; // Works!
var baz: string  = obj.baz; // Works?
```

# 精确对象类型

在Flow中，传递具有额外属性的对象被认为是安全的，其中期望正常的对象类型。

```js
// @flow
function method(obj: { foo: string }) {
  // ...
}

method({
  foo: "test", // Works!
  bar: 42      // Works!
});
```

有时禁用此行为并仅允许一组特定属性很有用。为此，Flow支持“精确”对象类型。

```js
{| foo: string, bar: number |}
```
与常规对象类型不同，将具有“额外”属性的对象传递给精确对象类型无效。

```js
// @flow
var foo: {| foo: string |} = { foo: "Hello", bar: "World!" }; // Error!
```

确切对象类型的交集可能无法按预期工作。如果需要组合确切的对象类型，请使用对象类型传播：

```js
// @flow

type FooT = {| foo: string |};
type BarT = {| bar: number |};

type FooBarFailT = FooT & BarT;
type FooBarT = {| ...FooT, ...BarT |};

const fooBarFail: FooBarFailT = { foo: '123', bar: 12 }; // Error!
const fooBar: FooBarT = { foo: '123', bar: 12 }; // Works!
```
## ObjectsAsMaps

较新版本的JavaScript标准包含一个Map类，但将对象用作Maps仍然很常见。在此用例中，对象可能会添加属性并在其整个生命周期中检索。此外，属性键甚至可能不是静态已知的，因此写出类型注释是不可能的。

对于像这样的对象，Flow提供了一种特殊的属性，称为“索引器属性”。索引器属性允许使用与索引器键类型匹配的任何键进行读写。

```js
// @flow
var o: { [string]: number } = {};
o["foo"] = 0;
o["bar"] = 1;
var foo: number = o["foo"];
```

可以选择命名索引器，以用于文档目的：

```js
// @flow
var obj: { [user_id: number]: string } = {};
obj[1] = "Julia";
obj[2] = "Camille";
obj[3] = "Justin";
obj[4] = "Mark";
```
当对象类型具有索引器属性时，假定属性访问具有带注释的类型，即使该对象在运行时没有该槽中的值。程序员有责任确保访问是安全的，就像数组一样。

```js
var obj: { [number]: string } = {};
obj[42].length; //没有类型错误，但会在运行时抛出
```

索引器属性可以与命名属性混合使用：

```js
// @flow
var obj: {
  size: number,
  [id: number]: string
} = {
  size: 0
};

function add(id: number, name: string) {
  obj[id] = name;
  obj.size++;
}
```

## Object Type

有时编写接受任意对象的类型是有用的，对于那些你应该写{}的类似：

```js
function method(obj: {}) {
  // ...
}
```

但是，如果您需要选择退出类型检查程序，并且不想一直转到任何类型检查程序，则可以改为使用Object。Object 不安全，应该避免。

例如，以下代码不会报告任何错误：

```js
function method(obj: Object) {
  obj.foo = 42;               // Works.
  let bar: boolean = obj.bar; // Works.
  obj.baz.bat.bam.bop;        // Works.
}

method({ baz: 3.14, bar: "hello" });
```