<a href="#1">Maybe Types(判断类型))</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;---<a href="#2">Maybe Types 进阶</a><br/>
<a href="#3">Variable Types(变量类型)</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;---<a href="#4">Reassigning variables(重新分配变量)</a><br/>

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