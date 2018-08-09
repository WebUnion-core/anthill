* [接口类型](#接口类型)
* [接口语法](#接口语法)

# 接口类型

Flow中的类名义上是键入的。这意味着当你有两个单独的类时，即使它们具有相同的属性和方法，也不能使用一个类代替另一个。

```js
// @flow
class Foo {
  serialize() { return '[Foo]'; }
}

class Bar {
  serialize() { return '[Bar]'; }
}

// $ExpectError
const foo: Foo = new Bar(); // Error!
```

相反，您可以使用接口来声明您期望的类的结构。

```js
// @flow
interface Serializable {
  serialize(): string;
}

class Foo {
  serialize() { return '[Foo]'; }
}

class Bar {
  serialize() { return '[Bar]'; }
}

const foo: Serializable = new Foo(); // Works!
const bar: Serializable = new Bar(); // Works!
```

您还可以使用implements来告诉Flow您希望该类与接口匹配。这可以防止您在编辑类时进行不兼容的更改。

```js
// @flow
interface Serializable {
  serialize(): string;
}

class Foo implements Serializable {
  serialize() { return '[Foo]'; } // Works!
}

class Bar implements Serializable {
  // $ExpectError
  serialize() { return 42; } // Error!
}
```

您还可以使用具有多个接口的工具。

```js
class Foo implements Bar, Baz {
  // ...
}
```

## 接口语法

接口是使用关键字interface，后跟其名称和包含类型定义主体的块创建的。

```js
interface MyInterface {
  // ...
}
```
块的语法与对象类型的语法匹配，并具有所有相同的功能

```js

```

### 接口方法

您可以按照与对象方法相同的语法向接口添加方法。

```js
interface MyInterface {
  method(value: string): number;
}
```

### 接口属性

您可以按照与对象属性相同的语法向接口添加属性。

```js
interface MyInterface {
  property: string;
}
```
接口属性也是可选的。

```js
interface MyInterface {
  property?: string;
}
```
