* [类型转换表达式](#类型转换表达式)
* [类型断言](#类型断言)
* [铸造类型](#铸造类型)
* [类型铸造](#类型铸造)

## 类型转换表达式

有时候，断言类型而不用函数或变量这样做是有用的。对于这个flow，它支持内联类型转换表达式语法，可以多种不同的方式使用它。

### 类型转换表达式语法

为了围绕值创建类型转换表达式，添加一个冒号：withtheType，并用圆括号()包装表达式。

```js
(value: Type)
```

> 注意：括号是必要的，以避免与其他语法的歧义

类型转换表达式可以出现在表达式可以出现的任何地方。

```js
let val = (value: Type);
let obj = { prop: (value: Type) };
let arr = ([(value: Type), (value: Type)]: Array<Type>);
```

值本身也可以是表达式：

```js
(2 + 2: number);
```

当您剥离类型时，只剩下值。

```js
(value: Type);

value;
```

## 类型断言

使用类型转换表达式，您可以断言值是某些类型。

```js
// @flow
let value = 42;

(value: 42);     // Works!
(value: number); // Works!
(value: string); // Error!
```

以这种方式断言类型的工作方式与其他任何地方的类型相同。

## 铸造类型

当您编写类型转换表达式时，该表达式的结果是具有所提供类型的值。如果您持有结果值，则它将具有新类型。

```js
// @flow
let value = 42;

(value: 42);     // Works!
(value: number); // Works!

let newValue = (value: number);

// $ExpectError
(newValue: 42);     // Error!
(newValue: number); // Works!
```

#### 使用类型转换表达式

> 注意：我们将通过一个简单的示例来演示如何使用类型转换表达式。这个例子在实践中没有得到很好的解决。

## 类型铸造

因为类型强制转换与所有其他类型注释的工作方式相同，所以只能将值强制转换为不太特定的类型。您不能更改类型或使其更具体。

但是您可以使用任何类型的转换来转换为您想要的任何类型。

```js
let value = 42;

(value: number); // Works!
// $ExpectError
(value: string); // Error!

let newValue = ((value: any): string);

// $ExpectError
(newValue: number); // Error!
(newValue: string); // Works!
```

通过将值强制转换为任何值，然后可以将其转换为任何您想要的值。

这是不安全的，不推荐使用。但是，当您使用一个很难或不可能键入的值并希望确保结果具有所需的类型时，它有时是有用的。

例如，下面的函数用于克隆对象。

```js
function cloneObject(obj) {
  const clone = {};

  Object.keys(obj).forEach(key => {
    clone[key] = obj[key];
  });

  return clone;
}
```

要为此创建一个类型是很困难的，因为我们正在基于另一个对象创建一个新对象。

如果我们对任何类型进行强制转换，则可以返回一个更有用的类型。

```js
// @flow
function cloneObject(obj) {
  const clone = {};

  Object.keys(obj).forEach(key => {
    clone[key] = obj[key];
  });

  return ((clone: any): typeof obj); // <<
}

const clone = cloneObject({
  foo: 1,
  bar: true,
  baz: 'three'
});

(clone.foo: 1);       // Works!
(clone.bar: true);    // Works!
(clone.baz: 'three'); // Works!
```

### 通过类型断言进行类型检查

如果我们想要验证来自之前的cloneObject方法中的类型，我们可以编写以下注释：

```js
function cloneObject(obj: { [key: string]: mixed }) {
  // ...
}
```

但现在我们有麻烦了。我们的Typeofobj注释也得到了这个新注释，它破坏了整个目的。

```js
// @flow
function cloneObject(obj: { [key: string]: mixed }) {
  const clone = {};
  // ...
  return ((clone: any): typeof obj);
}

const clone = cloneObject({
  foo: 1,
  bar: true,
  baz: 'three'
});

// $ExpectError
(clone.foo: 1);       // Error!
// $ExpectError
(clone.bar: true);    // Error!
// $ExpectError
(clone.baz: 'three'); // Error!
```

相反，我们可以使用类型断言来断言函数中的类型，现在我们正在验证我们的输入。

```js
// @flow
function cloneObject(obj) {
  (obj: { [key: string]: mixed });
  // ...
}

cloneObject({ foo: 1 }); // Works!
// $ExpectError
cloneObject([1, 2, 3]);  // Error!
```

现在，类型推断可以继续为Typeofobj工作，它返回对象的预期形状。

```js
// @flow
function cloneObject(obj) {
  (obj: { [key: string]: mixed }); // <<

  const clone = {};
  // ...
  return ((clone: any): typeof obj);
}

const clone = cloneObject({
  foo: 1,
  bar: true,
  baz: 'three'
});

(clone.foo: 1);       // Works!
(clone.bar: true);    // Works!
(clone.baz: 'three'); // Works!
```

> 注：这不是解决上述问题的正确方法，仅用于演示。正确的解决方案是注释该函数，如下所示：

```js
function cloneObject<T: { [key: string]: mixed }>(obj: T): $Shape<T> {
 // ...
}
```