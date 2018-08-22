<a href="#1">什么是flow</a><br/>
<a href="#2">类型注释</a><br/>
<a href="#3">原始类型</a><br/>


<h3 id="1"></h3>

## 1.什么是flow

Flow是javascript代码的静态类型接触的一个工具。它可以使你的代码更有效率、更可控、更大规模的开发。

Flow通过静态类型检查到吗是否存在类型错误，比如: test

```js
// @flow
function square(n:unmber): number { //1
    return n * n;
}

square("2")// Error!
```

flow 非常的只能，如果您的代码不需要类型，他也会自动帮你判断。

```js
// @flow
function square(n) {
  return n * n; // Error!  cannot perform aritmetic operation because string [1] is not a number
}

square("2");
```

<h3 id="2"></h3>

## 2.类型注释

添加类型注释是flow交互中的一个重要的部分。FLow具有很强的类型判断能力。但是有些时候也需要添加类型注释。类型注释是什么呢，继续往下看。

如下是一个是一个相加的函数：
```js
function concat(a, b) {
    return a + b;
}

```

我们既可以传字符串的参数进入：
```js
concat("a", "b");
```
也可以传数字进去相加：
```js
concat(1, 2);
```

但是如果你想制定一个特定的类型的话，你就需要添加类型注释。如下：
```js
function concat(a: string, b: string) {
    return a + b;
}

concat("a", "b");

concat(1, 2); // Error! cannot call 'cancat' with '2' bound to 'b' beacuse number is incompatible with string
// 意思是不能用数字绑定参数a或者b，就是说不能传除了字符串之外的参数。
```

<h3 id="3"></h3>

## 3.原始类型

JavaScript有很多不同的原始类型

- Booleans
- Strings
- Numbers
- null
- undefined (void in Flow types)
- Symbols (new in ECMAScript 2015, not yet supported in Flow)

> 需要注意的是，我们再flow中的类型注释需要是小写的。

### Booleans

true/false 在javascript中是Booleans 的值，flow中也一样。
```js
// @flow
function acceptsBoolean(value: boolean) {
  // ...
}
acceptsBoolean(true);  // Works!
acceptsBoolean(false); // Works!
acceptsBoolean("foo"); // Error!
```

js 中还可以隐式的将其他值转为booleans值
```js
if (42) {} // 42 => true
if ("") {} // "" => false
```

下面代码中的函数中，在flow中是不支持隐式转换的，必须将其转换为Boolean值传入
```js
// @flow
function acceptsBoolean(value: boolean) {
  // ...
}

acceptsBoolean(0);          // Error!
acceptsBoolean(Boolean(0)); // Works!
acceptsBoolean(!!0);        // Works!
```

> Boolean 和 boolean值 是不同的类型

> boolean值是一个与true或false类型的字面量，或者是一个表达式的结果如 a=b

> Boolean是一个构造函数

### Numbers

js的数字只有一种类型Number，不像其他语言一样有int float double型等。
```js
// @flow
function acceptsNumber(value: number) {
  // ...
}

acceptsNumber(42);       // Works!
acceptsNumber(3.14);     // Works!
acceptsNumber(NaN);      // Works!
acceptsNumber(Infinity); // Works!
acceptsNumber("foo");    // Error!
```

> 需要注意的就是 number 和 Number 也不一样

### Strings 

需要注意的就是隐式转换：
```js
"foo" + 42; // "foo42"
"foo" + {}; // "foo[object Object]"
```
flow 只接受字符串和数字连接的字符串。
```js
// @flow
"foo" + "foo"; // Works!
"foo" + 42;    // Works!
"foo" + {};    // Error!
"foo" + [];    // Error!
```
如果想传入字符串和对象连接的字符串，必须是显式的转换才行，如下：
```js
// @flow
"foo" + String({});     // Works!
"foo" + [].toString();  // Works!
"" + JSON.stringify({}) // Works!
```

### null and void

js中具有null和undefined, flow中对他们两个进行了单独处理
```js
// @flow
function acceptsNull(value: null) {
  /* ... */
}

function acceptsUndefined(value: void) {
  /* ... */
}

acceptsNull(null);      // Works!
acceptsNull(undefined); // Error!
acceptsUndefined(null);      // Error!
acceptsUndefined(undefined); // Works!
```

### Maybe types（判断类型）

在前面加一个问号创建类型。 ?string   ?number

除了判断的类型之外，也可以是null 或者 void
```js
// @flow
function acceptsMaybeString(value: ?string) {
  // ...
}

acceptsMaybeString("bar");     // Works!
acceptsMaybeString(undefined); // Works!
acceptsMaybeString(null);      // Works!
acceptsMaybeString();          // Works!
```

### 可选对象属性

直接上例子了，看完例子相信大家都明白了
```js
// @flow
function acceptsObject(value: { foo?: string }) {
  // ...
}

acceptsObject({ foo: "bar" });     // Works!
acceptsObject({ foo: undefined }); // Works!
acceptsObject({ foo: null });      // Error!
acceptsObject({});                 // Works!
```

### 可选函数参数

```js
// @flow
function acceptsOptionalString(value?: string) {
  // ...
}

acceptsOptionalString("bar");     // Works!
acceptsOptionalString(undefined); // Works!
acceptsOptionalString(null);      // Error!
acceptsOptionalString();          // Works!
```

### 具有默认值的函数参数

```js
// @flow
function acceptsOptionalString(value: string = "foo") {
  // ...
}

acceptsOptionalString("bar");     // Works!
acceptsOptionalString(undefined); // Works!
acceptsOptionalString(null);      // Error!
acceptsOptionalString();          // Works!
```