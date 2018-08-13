* [联合类型](#联合类型)
* [不相交联合](#不相交联合)
* [精确的不相交联合](#精确的不相交联合)


# 联合类型

有时，创建一个其他类型之一的类型很有用。例如，您可能希望编写一个接受一组原始值类型的函数。对于此Flow支持联合类型。

```js
// @flow
function toStringPrimitives(value: number | boolean | string) {
  return String(value);
}

toStringPrimitives(1);       // Works!
toStringPrimitives(true);    // Works!
toStringPrimitives('three'); // Works!

// $ExpectError
toStringPrimitives({ prop: 'val' }); // Error!
// $ExpectError
toStringPrimitives([1, 2, 3, 4, 5]); // Error!
```

## 语法

联合类型是任意数量的类型，由 | 连接。

```js
Type1 | Type2 | ... | TypeN
```

您还可以添加一个引导竖线，这在将联合类型拆分到多行时非常有用。

```js
type Foo =
  | Type1
  | Type2
  | ...
  | TypeN
```

联合类型的每个成员可以是任何类型，甚至可以是另一个联合类型。

```js
type Numbers = 1 | 2;
type Colors = 'red' | 'blue'

type Fish = Numbers | Colors;
```

### 联合类型需要一个输入，但全部输出

在调用接受联合类型的函数时，必须传入其中一种类型。但是在函数内部，我们需要处理所有可能的类型。

让我们重写函数，分别处理每种类型

```js
// @flow
// $ExpectError
function toStringPrimitives(value: number | boolean | string): string { // Error!
  if (typeof value === 'number') {
    return String(value);
  } else if (typeof value === 'boolean') {
    return String(value);
  }
}
```

您会注意到，如果我们不处理值的每种可能类型，Flow将给我们一个错误。

# 联合 & 细化

当您有一个联合类型的值时，将其分开并分别处理每个单独的类型通常是很有用的。使用流中的联合类型，您可以将值“细化”为单个类型。

```js
// @flow
function toStringPrimitives(value: number | boolean | string) {
  if (typeof value === 'number') {
    return value.toLocaleString([], { maximumSignificantDigits: 3 }); // Works!
  }
  // ...
}
```

通过检查值的类型并测试它是否是一个数字，Flow知道在该块内部它只是一个数字。然后，我们可以编写代码，将我们的值视为该块内的一个数字。

## 不相交联合

在flow中有一种特殊类型的联合，称为“不相交联合”，可用于改进。这些不相交的联合由任意数量的对象类型组成，每个对象类型都由一个属性标记。

例如，假设我们有一个函数，用于在发送请求后处理来自服务器的响应。当请求成功时，我们将返回一个具有成功属性的对象，该属性是true和我们已经更新的值。

```js
{ success: true, value: false };
```

当请求失败时，我们将获得一个成功设置为false的对象和一个描述错误的Error属性。

```js
{ success: false, error: 'Bad request' };
```

我们可以尝试用一个对象类型来表示这两个对象。但是，我们很快就会遇到这样的问题：我们根据Success属性知道一个属性存在，但Flow不知道。

```js
// @flow
type Response = {
  success: boolean,
  value?: boolean,
  error?: string
};

function handleResponse(response: Response) {
  if (response.success) {
    // $ExpectError
    var value: boolean = response.value; // Error!
  } else {
    // $ExpectError
    var error: string = response.error; // Error!
  }
}
```

试图把这两种不同的类型合并成一种，只会给我们带来麻烦。

相反，如果我们创建这两种对象类型的联合类型，Flow将能够根据Success属性知道我们使用的是哪个对象。

```js
// @flow
type Success = { success: true, value: boolean };
type Failed  = { success: false, error: string };

type Response = Success | Failed;

function handleResponse(response: Response) {
  if (response.success) {
    var value: boolean = response.value; // Works!
  } else {
    var error: string = response.error; // Works!
  }
}
```

## 精确的不相交联合

不相交的联合要求您使用单个属性来区分每种对象类型。不能通过不同的属性区分两个不同的对象。

```js
// @flow
type Success = { success: true, value: boolean };
type Failed  = { error: true, message: string };

function handleResponse(response:  Success | Failed) {
  if (response.success) {
    // $ExpectError
    var value: boolean = response.value; // Error!
  }
}
```

这是因为在Flow中传递一个属性比对象类型期望的属性多的对象值是可以的(因为宽度子类型)。

```js
// @flow
type Success = { success: true, value: boolean };
type Failed  = { error: true, message: string };

function handleResponse(response:  Success | Failed) {
  // ...
}

handleResponse({
  success: true,
  error: true,
  value: true,
  message: 'hi'
});
```

除非这些物体在某种程度上相互冲突，否则就没有办法区分它们。

但是，要解决这个问题，您可以使用精确的对象类型。

```js
// @flow
type Success = {| success: true, value: boolean |};
type Failed  = {| error: true, message: string |};

type Response = Success | Failed;

function handleResponse(response: Response) {
  if (response.success) {
    var value: boolean = response.value;
  } else {
    var message: string = response.message;
  }
}
```

有了精确的对象类型，我们就不可能有额外的属性，所以对象之间会发生冲突，我们就能区分出哪个是哪个。