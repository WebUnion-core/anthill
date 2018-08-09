<a href="#1">Maybe Types(判断类型))</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;---<a href="#2">Maybe Types 进阶</a><br/>
<a href="#3">Variable Types(变量类型)</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;---<a href="#4">Reassigning variables(重新分配变量)</a><br/>
<a href="#5">Function Types(函数类型))</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;---<a href="#6">函数语法</a><br/>

<h3 id="1"></h3>

# Maybe Types(我称他为判断类型)

如果你想使用一个非number类型的参数，可以如下定义，当然判断类型是可以接受null 和 undefined的参数。
```js
function acceptsMaybeNumber(value: ?number) {
    // ...
}
acceptsMaybeNumber(42);        // Works!
acceptsMaybeNumber();          // Works!
acceptsMaybeNumber(undefined); // Works!
acceptsMaybeNumber(null);      // Works!
acceptsMaybeNumber("42");      // Error!
```


<h3 id="2"></h3>

## Maybe Types 进阶

假设我们有个 Maybe Types ?number, 如果我们想使用该值作为一个数字，我们需要首先检查它是不是null或undefined。

```js
// @flow
function acceptsMaybeNumber(value: ?number) {
  if (value !== null && value !== undefined) {
    return value * 2;
  }
}
```

您可以使用单个!=null检查简化针对null和nudefined的两种检查，这两种检查都可以完成。

```js
// @flow
function acceptsMaybeNumber(value: ?number) {
  if (value != null) {
    return value * 2;
  }
}
```

您也可以将其翻转，并在使用前检查以确保该值具有一种类型的数字。
```js
// @flow
function acceptsMaybeNumber(value: ?number) {
  if (typeof value === 'number') {
    return value * 2;
  }
}
```

<h3 id="3"></h3>

# Variable Types

```js
// @flow
const foo /* : number */ = 1;
const bar: number = 2;
```

当你给变量声明类型的时候，你如果将它重新赋值，必须和他声明的值是一样的。

```js
// @flow
let foo: number = 1;
foo = 2;   // Works!
// $ExpectError
foo = "3"; // Error!
```

<h3 id="4"></h3>

## Reassigning variables(重新分配变量)

默认情况下，当您重新分配一个变量时，Flow将为它提供所有可能的赋值类型

```js
let foo = 42;

if (Math.random()) foo = true;
if (Math.random()) foo = "hello";

let isOneOf: number | boolean | string = foo; // Works!
```

有时，在重新分配后，flow能够(肯定地)找出变量的类型。在这种情况下，Flow将给出已知的类型。

```js
// @flow
let foo = 42;
let isNumber: number = foo; // Works!

foo = true;
let isBoolean: boolean = foo; // Works!

foo = "hello";
let isString: string = foo; // Works!
```

if语句、函数和其他有条件运行的代码都可以阻止Flow精确地计算出类型是什么。

```js
// @flow
let foo = 42;

function mutate() {
  foo = true;
  foo = "hello";
}

mutate();

// $ExpectError
let isString: string = foo; // Error!
```

<h3 id="5"></h3>

# Function Types（函数类型）

函数有两个地方需要定义类型，一个是参数，一个是返回值。
```js
// @flow
function concat(a: string, b: string): string {
  return a + b;
}

concat("foo", "bar"); // Works!
// $ExpectError
concat(true, false);  // Error!
```
即使不用类型注释，有些类型也会自动检测
```js
// @flow
function concat(a, b) {
  return a + b;
}

concat("foo", "bar"); // Works!
// $ExpectError
concat(true, false);  // Error!
```

有时候 Flow 会创建一种你比较希望的类型。

```js
// @flow
function concat(a, b) {
  return a + b;
}

concat("foo", "bar"); // Works!
concat(1, 2);         // Works!
```

<h3 id="6"></h3>

# 函数语法

有三种形式的函数，每种形式都有各自略有不同的语法。

### 函数声明

添加类型和不添加类型的函数声明语法

```js
function method(str, bool, ...nums) {
  // ...
}

function method(str: string, bool?: boolean, ...nums: Array<number>): void {
  // ...
}
```

### 箭头函数

```js
let method = (str, bool, ...nums) => {
  // ...
};

let method = (str: string, bool?: boolean, ...nums: Array<number>): void => {
  // ...
};
```

### 函数类型

```js
(str: string, bool?: boolean, ...nums: Array<number>) => void
```

省略参数名

```js
(string, boolean | void, Array<number>) => void
```

您可以将这些函数类型用于诸如回调之类的操作。

```js
function method(param1: string, param2: boolean) {
  // ...
}
```

### 可选参数

您还可以通过在参数名称后面和冒号:之前添加一个问号来拥有可选参数：

```js
function method(optionalValue?: string) {
  // ...
}
```

可选参数可以不传或者undefined或匹配的类型。但他们不会接受NULL。

```js
// @flow
function method(optionalValue?: string) {
  // ...
}

method();          // Works.
method(undefined); // Works.
method("string");  // Works.
// $ExpectError
method(null);      // Error!
```

### Rest 参数

在参数列表 末尾 末尾 末尾 手机参数数组的参数， 用 ... 来表示

```js
function method(...args: Array<number>) {
  // ...
}
```

你可以将任意多的参数传递到 rest 参数中

```js
// @flow
function method(...args: Array<number>) {
  // ...
}

method();        // Works.
method(1);       // Works.
method(1, 2);    // Works.
method(1, 2, 3); // Works.
```
> > 需要注意的是，如果你向rest参数添加类型注释，则必须是数组类型的。

### 返回值

函数返回还可以使用冒号：添加类型，然后在参数列表后添加类型。如下:

```js
function method(): number {
  // ...
}
```

返回类型确保函数的每个分支返回相同的类型。这样可以防止您在某些情况下意外地不返回值。

```js
// @flow
// $ExpectError
function method(): boolean {
  if (Math.random() > 0.5) {
    return true;
  }
}
```

### this

JavaScript中的每个函数都可以使用一个名为 this 的特殊上下文来调用。您可以使用所需的任何上下文调用函数。

```js
function method() {
  return this;
}

var num: number = method.call(42);
// $ExpectError
var str: string = method.call(42);
```

### Predicate函数 (额...谓词函数)

有时，您可能希望将条件从if语句移动到函数中：
```js
function concat(a: ?string, b: ?string): string {
  if (a && b) {
    return a + b;
  }
  return '';
}
```

但是，Flow将在下面的代码中会出错：

```js
function truthy(a, b): boolean {
  return a && b;
}

function concat(a: ?string, b: ?string): string {
  if (truthy(a, b)) {
    // $ExpectError
    return a + b;
  }
  return '';
}
```

您可以通过使truthy成为谓词函数来解决这个问题，可以使用 %check 注释，如下所示：
```js
function truthy(a, b): boolean %checks {
  return !!a && !!b;
}

function concat(a: ?string, b: ?string): string {
  if (truthy(a, b)) {
    return a + b;
  }
  return '';
}
```

这些谓词函数的主体必须是表达式(即不支持局部变量声明)。但也可以调用谓词函数中的其他谓词函数。例如：

```js
function isString(y): %checks {
  return typeof y === "string";
}

function isNumber(y): %checks {
  return typeof y === "number";
}

function isNumberOrString(y): %checks {
  return isString(y) || isNumber(y);
}

function foo(x): string | number {
  if (isNumberOrString(x)) {
    return x + x;
  } else {
    return x.length; // no error, because Flow infers that x can only be an array
  }
}

foo('a');
foo(5);
foo([]);
```

### Callable Objects 可调用对象（本人对这个也不是特别理解，往有大神指出）

可以输入可调用对象，例如:

```js
type CallableObj = {
  (number, number): number,
  bar: string
};

function add(x, y) {
  return x + y; 
}

// $ExpectError
(add: CallableObj);

add.bar = "hello world";

(add: CallableObj);
```

### Function Type

有时候参数要接受任意函数的类型:

```js
function method(func: () => mixed) {
  // ...
}

```

如果你需要选择退出类型检测程序，同时你有不想用any类型,你可以用function类型
```js
function method(func: Function) {
  func(1, 2);     // Works.
  func("1", "2"); // Works.
  func({}, []);   // Works.
}

method(function(a: number, b: number) {
  // ...
});

```