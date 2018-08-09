<a href="#1">Literal Types(绝对类型)</a><br/>
<a href="#2">Mixed Types(混合型)</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;---<a href="#3">进得去出不来</a><br/>
<a href="#4">Any Types(任何类型)</a><br/>
&nbsp;&nbsp;&nbsp;&nbsp;---<a href="#5">Avoid leaking any</a><br/>



<h3 id="1"></h3>

# Literal Types(绝对类型)

flow不仅可以使用原始类型，还可以使用值作为类型注释。
```js
// @flow
function acceptsTwo(value: 2) {
  // ...
}
acceptsTwo(2);   // Works!
// $ExpectError
acceptsTwo(3);   // Error!
// $ExpectError
acceptsTwo("2"); // Error!
```
多个值

```js
// @flow
function getColor(name: "success" | "warning" | "danger") {
  switch (name) {
    case "success" : return "green";
    case "warning" : return "yellow";
    case "danger"  : return "red";
  }
}

getColor("success"); // Works!
getColor("danger");  // Works!
// $ExpectError
getColor("error");   // Error!
```


<h3 id="2"></h3>

# Mixed Types(混合型)

**单一类型**
```js
function square(n: number) {
  return n * n;
}
```

**多种类型**
```js
function stringifyBasicValue(value: string | number) {
  return '' + value;
}
```

**基于另一种类型的类型**

返回值的类型与传入函数中的值的类型相同。
```js
function identity<T>(value: T): T {
  return value;
}
```
以上三种是比较常用的类型。

**任意类型即混合型**
```js
function getTypeOf(value: mixed): string {
  return typeof value;
}
```

<h3 id="3"></h3>

## 进得去出不来

混合类型将接受所有的值。

```js
// @flow
function stringify(value: mixed) {
  // ...
}

stringify("foo");
stringify(3.14);
stringify(null);
stringify({});
```

当您尝试使用一个混合类型的值时，您必须首先弄清楚实际的类型是什么，否则将以错误告终。

```js
// @flow
function stringify(value: mixed) {
  // $ExpectError
  return "" + value; // Error!
}

stringify("foo");
```

你必须来判断他是哪种值,代码才能运行

```js
// @flow
function stringify(value: mixed) {
  if (typeof value === 'string') {
    return "" + value; // Works!
  } else {
    return "";
  }
}

stringify("foo");
```

<h3 id="4"></h3>

# Any Types(任何类型)

如果你想要一种不进行类型检测的方法。可以使用任何类型，但是要尽量避免使用，这是完全不安全的。

```js
// @flow
function add(one: any, two: any): number {
  return one + two;
}

add(1, 2);     // Works.
add("1", "2"); // Works.
add({}, []);   // Works.
```

即使导致运行错误的代码也不会被捕获：
```js
// @flow
function getNestedProperty(obj: any) {
  return obj.foo.bar.baz;
}

getNestedProperty({});
```
只有几种情况可以考虑使用：

- 当您正在将现有代码转换为使用流类型的过程中，并且您当前在检查代码类型时被阻塞(可能需要首先转换其他代码)。
- 当您确定您的代码正常工作时，由于某种原因，Flow无法输入，请对其进行正确的检查。在JavaScript中，有越来越多的习惯用法无法静态地输入。

<h3 id="5"></h3>

## Avoid leaking any
当您有一个类型为Any的值时，您可以使Flow推断出您执行的所有操作的结果是any。\

如果您在输入ANY的对象上获得了一个属性，那么得到的值也将具有any类型。

```js
// @flow
function fn(obj: any) {
  let foo /* (:any) */ = obj.foo;
}
```

然后，您可以在另一个操作中使用结果值，例如将其添加为一个数字，结果也将是any。

```js
// @flow
function fn(obj: any) {
  let foo /* (:any) */ = obj.foo;
  let bar /* (:any) */ = foo * 2;
}
```
然后把any暴露出去
```js
// @flow
function fn(obj: any) /* (:any) */ {
  let foo /* (:any) */ = obj.foo;
  let bar /* (:any) */ = foo * 2;
  return bar;
}

let bar /* (:any) */ = fn({ foo: 2 });
let baz /* (:any) */ = "baz:" + bar;
```
为了防止any类型暴露出去，我们可以如下做法：
```js
// @flow
function fn(obj: any) {
  let foo: number = obj.foo;
}
```
这样子的话，代码就不会把any类型暴露了，因为已经有个number类型接收。
```js
// @flow
function fn(obj: any) /* (:number) */ {
  let foo: number = obj.foo;
  let bar /* (:number) */ = foo * 2;
  return bar;
}

let bar /* (:number) */ = fn({ foo: 2 });
let baz /* (:string) */ = "baz:" + bar;
```