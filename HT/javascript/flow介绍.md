<a href="#1">什么是flow</a><br/>
<a href="#2">类型注释</a><br/>


<h3 id="1"></h3>

## 1.什么是flow

Flow是javascript代码的静态类型接触的一个工具。它可以使你的代码更有效率、更可控、更大规模的开发。

Flow通过静态类型检查到吗是否存在类型错误，比如:

```js
// @flow
function square(n:unmber): number {
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

#### Booleans

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