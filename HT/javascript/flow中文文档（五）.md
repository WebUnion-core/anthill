* [数组类型](#数组类型)
* [快速语法](#快速语法)
* [数组访问不安全](#数组访问不安全)
* [未密封对象](#未密封对象)
* [精确对象类型](#精确对象类型)
* [ObjectsAsMaps](#ObjectsAsMaps)

# 数组类型

要创建数组类型，可以使用Array <Type> type，其中Type是数组中元素的类型。例如，要为数组数组创建类型，请使用Array <number>。

```js
let arr: Array<number> = [1, 2, 3];
```

You can put any type within Array<Type>.

```js
let arr1: Array<boolean> = [true, false, true];
let arr2: Array<string> = ["A", "B", "C"];
let arr3: Array<mixed> = [1, true, "three"]
```

## 快速语法

```js
let arr: number[] = [0, 1, 2, 3];
```

请注意，？Type []相当于？Array <T>而不是Array <？T>。

```js
// @flow
let arr1: ?number[] = null;   // Works!
let arr2: ?number[] = [1, 2]; // Works!
let arr3: ?number[] = [null]; // Error!
```

如果你想使它成为Array <？T>你可以使用括号，如：（？Type）[]

```js
// @flow
let arr1: (?number)[] = null;   // Error!
let arr2: (?number)[] = [1, 2]; // Works!
let arr3: (?number)[] = [null]; // Works!
```

## 数组访问不安全

从数组中检索元素时，始终存在未定义的元素。您可以访问一个超出数组边界的索引，或者该元素不能存在，因为它是一个“稀疏数组”。

例如，您可能正在访问超出数组范围的元素

```js
// @flow
let array: Array<number> = [0, 1, 2];
let value: number = array[3]; // Works.
                       // ^ undefined
```

或者你可以访问一个不存在的元素，如果它是一个“稀疏数组”。

```js
// @flow
let array: Array<number> = [];

array[0] = 0;
array[2] = 2;

let value: number = array[1]; // Works.
                       // ^ undefined
```

为了使这个安全，Flow必须将每个单独的数组访问标记为“可能未定义”。

Flow不会这样做，因为它使用起来非常不方便。您将被迫优化访问数组时获得的每个值的类型。


```js
let array: Array<number> = [0, 1, 2];
let value: number | void = array[1];

if (value !== undefined) {
  // number
}
```

由于Flow变得更加智能，将来有可能解决这个问题，但是现在你应该意识到这一点。