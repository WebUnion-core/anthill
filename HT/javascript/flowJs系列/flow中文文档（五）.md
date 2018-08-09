* [数组类型](#数组类型)
* [快速语法](#快速语法)
* [数组访问不安全](#数组访问不安全)
* [元组类型](#元组类型)
* [Class类型](#Class类型)
* [类泛型](#类泛型)

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

# 元组类型

元组是一种列表，但具有有限的项目集。在JavaScript中，使用数组创建元组。

在Flow中，您可以使用[type，type，type]语法创建元组。

```js
let tuple1: [number] = [1];
let tuple2: [number, boolean] = [1, true];
let tuple3: [number, boolean, string] = [1, true, "three"];
```

当您从特定索引处的元组获取值时，它将返回该索引处的类型。

```js
// @flow
let tuple: [number, boolean, string] = [1, true, "three"];

let num  : number  = tuple[0]; // Works!
let bool : boolean = tuple[1]; // Works!
let str  : string  = tuple[2]; // Works!
```

如果您尝试从不存在的索引获取它将返回一种void。

```js
// @flow
let tuple: [number, boolean, string] = [1, true, "three"];

let none: void = tuple[3];
```

如果Flow不知道您尝试访问哪个索引，它将返回所有可能的类型。

```js
// @flow
let tuple: [number, boolean, string] = [1, true, "three"];

function getItem(n: number) {
  let val: number | boolean | string = tuple[n];
  // ...
}
```

在元组内设置新值时，新值必须与该索引处的类型匹配。

```js
// @flow
let tuple: [number, boolean, string] = [1, true, "three"];

tuple[0] = 2;     // Works!
tuple[1] = false; // Works!
tuple[2] = "foo"; // Works!

// $ExpectError
tuple[0] = "bar"; // Error!
// $ExpectError
tuple[1] = 42;    // Error!
// $ExpectError
tuple[2] = false; // Error!
```

## 严格执行元组长度

元组的长度称为“arity”。在Flow中严格执行元组的长度。

**元组只匹配相同长度的元组**

他的意思是不能使用较短的元组代替较长的元组。

```js
// @flow
let tuple1: [number, boolean]       = [1, true];
// $ExpectError
let tuple2: [number, boolean, void] = tuple1; // Error!
```

此外，不能使用较长的元组来代替较短的元组。

```js
// @flow
let tuple1: [number, boolean, void] = [1, true];
// $ExpectError
let tuple2: [number, boolean]       = tuple1; // Error!
```

**元组与数组类型不匹配**

由于Flow不知道数组的长度，因此无法将Array <T>类型传递给元组。

```js
// @flow
let array: Array<number>    = [1, 2];
// $ExpectError
let tuple: [number, number] = array; // Error!
```

另外一个元组类型不能传递给Array <T>类型，因为那样你就可以以不安全的方式改变元组。

```js
// @flow
let tuple: [number, number] = [1, 2];
// $ExpectError
let array: Array<number>    = tuple; // Error!
```

**不能在元组上使用变异数组方法**

您不能使用改变元组的Array.prototype方法，只能使用不改变元组的方法。

```js
// @flow
let tuple: [number, number] = [1, 2];
tuple.join(', '); // Works!
// $ExpectError
tuple.push(3);    // Error!
```

# Class类型

Flow中的JavaScript类既可以作为值，也可以作为类型。

您可以像没有Flow一样编写类，但是您可以使用类的名称作为类型。

```js
class MyClass {
  // ...
}

let myInstance: MyClass = new MyClass();
```

Flow中的类与普通的JavaScript类相同，但添加了类型。

### Class 方法

就像在函数中一样，类方法可以有参数（输入）和返回（输出）的注释。

```js
class MyClass {
  method(value: string): number { /* ... */ }
}
```

### class 字段(属性)

每当要在Flow中使用类字段时，必须先给它一个注释。
```js
// @flow
class MyClass {
  method() {
    // $ExpectError
    this.prop = 42; // Error!
  }
}
```
上面的方式是错误的在flow中。字段在类的主体内注释，字段名称后跟冒号：和类型。
```js
// @flow
class MyClass {
  prop: number;
  method() {
    this.prop = 42;
  }
}
```

Flow还支持使用类属性语法

```js
class MyClass {
  prop = 42;
}
```

使用此语法时，不需要为其指定类型注释。但如果你需要，你还可以。

```js
class MyClass {
  prop: number = 42;
}
```

## 类泛型

classes 也可以有自己的泛型

```js
class MyClass<A, B, C> {
  property: A;
  method(val: B): C {
    // ...
  }
}
```

类泛型是参数化的。当您使用类作为类型时，您需要为每个泛型传递参数。

```js
// @flow
class MyClass<A, B, C> {
  constructor(arg1: A, arg2: B, arg3: C) {
    // ...
  }
}

var val: MyClass<number, boolean, string> = new MyClass(1, true, 'three');
```