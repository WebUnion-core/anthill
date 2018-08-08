* [类型别名](#类型别名)
* [类型别名语法](#类型别名语法)
* [类型别名泛型](#类型别名泛型)
* [不透明类型别名](#不透明类型别名)



# 类型别名

当您有要在多个位置重用的复杂类型时，可以使用 类型别名 在Flow中对它们进行别名

```js
// @flow
type MyObject = {
  foo: number,
  bar: boolean,
  baz: string,
};
```

这些类型的别名可以在任何可以使用类型的地方使用。

```js
// @flow
type MyObject = {
  // ...
};

var val: MyObject = { /* ... */ };
function method(val: MyObject) { /* ... */ }
class Foo { constructor(val: MyObject) { /* ... */ } }
```

## 类型别名语法

使用关键字type后跟其名称，等号=和类型定义来创建类型别名。

```js
type Alias = Type;
```

任何类型都可以出现在类型别名中

```js
type NumberAlias = number;
type ObjectAlias = {
  property: string,
  method(): number,
};
type UnionAlias = 1 | 2 | 3;
type AliasAlias = ObjectAlias;
```

## 类型别名泛型

类型别名也可以有自己的泛型。

```js
type MyObject<A, B, C> = {
  property: A,
  method(val: B): C,
};
```

类型别名泛型已参数化。当您使用类型别名时，您需要为每个泛型传递参数。

```js
// @flow
type MyObject<A, B, C> = {
  foo: A,
  bar: B,
  baz: C,
};

var val: MyObject<number, boolean, string> = {
  foo: 1,
  bar: true,
  baz: 'three',
};
```

# 不透明类型别名

不透明类型别名是类型别名，不允许在定义它们的文件之外访问其基础类型。

```js
opaque type ID = string;
```

与常规类型别名一样，可以在任何可以使用类型的地方使用

```js
// @flow
opaque type ID = string;

function identity(x: ID): ID {
  return x;
}
export type {ID};
```

### 不透明类型语法

您可以选择通过添加冒号来添加子类型约束到opaque类型别名：和名称后面的类型。

```js
opaque type Alias: SuperType = Type;
```

任何类型都可以显示为不透明类型别名的超类型或类型。

```js
opaque type StringAlias = string;
opaque type ObjectAlias = {
  property: string,
  method(): number,
};
opaque type UnionAlias = 1 | 2 | 3;
opaque type AliasAlias: ObjectAlias = ObjectAlias;
opaque type VeryOpaque: AliasAlias = ObjectAlias;
```

当在同一文件中定义别名时，opaque类型别名的行为与常规类型别名的行为完全相同。

```js
//@flow
opaque type NumberAlias = number;

(0: NumberAlias);

function add(x: NumberAlias, y: NumberAlias): NumberAlias {
    return x + y;
}
function toNumberAlias(x: number): NumberAlias { return x; }
function toNumber(x: NumberAlias): number { return x; }
```