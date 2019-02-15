## 什么是对象

可以使用两种形式来创建对象: 声明形式和构建形式。

```js
// 声明形式
var  obj = {
  key: 1,
}

// 构建形式
var obj2 = new Object();
obj2.key = 1;
```

### js 数据类型

- string 
- number 
- boolean 
- null 
- undefined 
- object

### 内置对象

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

### 复制对象

**JSON对象的方法**

这里我教大家一个简单的办法，通过JSON对象中的方法来实现

```js

var obj1 = {
  a: {
    b: {
      c: {
        d: 1,
        e: 2
      }
    }
  },
  f: {
    g: 1
  },
  h: 2
}

var cacheObj = JSON.stringify(obj1)

var obj2 = JSON.parse(cacheObj);
```

**Object.assgin浅复制**

Object.assign(..) 方法的第一个参数是目标对象，之后还可以跟一个或多个源对象。它会遍历一个或多个源对象的所有可枚举

```js
var obj1 = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4
  }
}

var obj2 = Object.assign({}, obj1)

console.log(obj2 === obj1) // true

console.log(obj2.c === obj1.c) // false
```

### 属性描述符

属性描述符就是用来描述该属性的，value,writable,enumerable,configurable;

```js
var obj1 = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4
  }
}

var a = Object.getOwnPropertyDescriptor(obj1, 'a');

console.log(a) // { value: 1, writable: true, enumerable: true, configurable: true }
```

如你所见，我们用getOwnPropertyDescriptor所看到的属性描述，不仅仅能看到值是1，还能看到其他三个属性， writable （可写）、enumerable （可枚举）和 configurable （可配置）。

在创建普通属性时，属性描述符会使用默认值，我们可以用 **defineProperty(..)**来添加一个新的属性，或者当我们的configurable是可配置也就是ture的时候，可以对这个属性进行修改。

**默认值**

```js
// 默认值
Object.defineProperty(obj1, 'a', {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
})
```

**定义不可写**

```js

var obj1 = {}

// 定义不可写属性
Object.defineProperty(obj1, 'b', {
  value: 22,
  writable: false,
  configurable: true,
  enumerable: true
})

obj1.b = 123;

console.log(obj1.b) // 22 不可被修改
```

**定义不可配置**



```js
// 定义一个不可配置的属性

Object.defineProperty(obj1, 'c', {
  value: 3,
  writable: true,
  configurable: false,
  enumerable: true
})

Object.defineProperty(obj1, 'c', {
  value: 44444,
  writable: false,
  configurable: false,
  enumerable: false
})
// 走到这里时 并没有发现报什么错
// 但是 如果是这样

Object.defineProperty(obj1, 'c', {
  value: 3,
  writable: false,
  configurable: false,
  enumerable: false
})

// 报错
Object.defineProperty(obj1, 'c', {
  value: 3,
  writable: true,
  configurable: false,
  enumerable: true
})

// 除了无法修改， configurable:false 还会禁止删除这个属性

delete obj1.c;

console.log(obj1.c) // 3

```

> 需要注意，当configurable为false的时候，如果writable是ture或者enumerable是ture，之后是可以被修改成false的，但是不能由false修改成true.

**Enumerable**

```js
var obj1 = {
  a: 1,
  b:2,
}

// 定义一个不可配置的属性

Object.defineProperty(obj1, 'c', {
  value: 3,
  writable: true,
  configurable: true,
  enumerable: false
})


for(let i in obj1){
  console.log(obj1[i]);//1 , 2
}

console.log(obj1.hasOwnProperty('c')) // true


```

结果显示 3 并没有被打印出来。

## 不变性

**所有的方法创建的都是浅不变形，也就是说，它们只会影响目标对象和它的直接属性。如果目标对象引用了其他对象（数组、对象、函数，等），其他对象的内容不受影响，仍然是可变的**

### 对象常量

结合 writable:false 和 configurable:false 就可以创建一个真正的常量属性（不可修改、重定义或者删除）

### 禁止扩展

如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(..)

```js
var obj1 = {
  a: 1,
  b:2,
}

Object.preventExtensions(obj1)

obj1.c = 3

console.log(obj1.c) //undefined
```

### 密封

Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false 。

所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以修改属性的值）。

### 冻结

Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(..) 并把所有“数据访问”属性标记为 writable:false ，这样就无法修改它们的值。

你可以“深度冻结”一个对象，具体方法为，首先在这个对象上调用 Object.freeze(..) ，然后遍历它引用的所有对象并在这些对象上调用 Object.freeze(..) 。但是一定要小心，因为这样做有可能会在无意中冻结其他（共享）对象。

----

## [[get]]

当我们访问一个对象中的属性的时候，obj.a,其实不仅仅是在obj中查找是否有名为a的属性。

在语言规范中，其实obj实际上是实现了get操作，对象中默认内置的get方法首先在对象中查找是否有名称相同的属性，如果找到就会返回这个属性的值。如果没有找到就会寻找随着原型链向上查找。最终都没有找到的话就会返回undefined。

注意，这种方法和访问变量时是不一样的。如果你引用了一个当前词法作用域中不存在的变量，并不会像对象属性一样返回 undefined ，而是会抛出一个 ReferenceError 异常

## [[put]]

Put被触发时，实际的行为取决于许多因素，包括对象中是否已经存在这个属性（这是最重要的因素）。

如果已经存在这个属性， Put 算法大致会检查下面这些内容。

1. 属性是否是访问描述符？如果是并且存在 setter 就调用 setter。
2. 属性的数据描述符中 writable 是否是 false ？如果是，在非严格模式下静默失败，在严格模式下抛出 TypeError 异常。
3. 如果都不是，将该值设置为属性的值

如果对象中不存在这个属性， Put 操作会更加复杂。

## Getter和Setter

对象默认的 [[Put]] 和 [[Get]] 操作分别可以控制属性值的设置和获取

在 ES5 中可以使用 getter 和 setter 部分改写默认操作，但是只能应用在单个属性上，无法应用在整个对象上。getter 是一个隐藏函数，会在获取属性值时调用。setter 也是一个隐藏函数，会在设置属性值时调用

当你给一个属性定义 getter、setter 或者两者都有时，这个属性会被定义为“访问描述符”（和“数据描述符”相对）。对于访问描述符来说，JavaScript 会忽略它们的 value 和writable 特性，取而代之的是关心 set 和 get （还有 configurable 和 enumerable ）特性。

```js
var obj1 = {
  // 给 a 定义一个 gette
  get a() {
    return 2;
  }
}

Object.defineProperty(obj1, 'b', {
  get: function () {
    return this.a * 2;
  },
  enumerable: true
})

obj1.a = 123214;

console.log(obj1.a) //2

console.log(obj1.b) //4
```

由于我们只定义了 a 的 getter，所以对 a 的值进行设置时 set 操作会忽略赋值操作，不会抛出错误。而且即便有合法的 setter，由于我们自定义的 getter 只会返回 2，所以 set 操作是没有意义的。

不管是对象文字语法中的 get a() { .. } ，还是 defineProperty(..) 中的显式定义，二者都会在对象中创建一个不包含值的属性，对于这个属性的访问会自动调用一个隐藏函数，它的返回值会被当作属性访问的返回值

通常来说 getter 和 setter 是成对出现的:

```js
var obj1 = {
  // 给 a 定义一个 gette
  get a() {
    return this._a_;
  },
  set a(val) {
    this._a_ = val * 2;
  }
}

obj1.a = 2;

console.log(obj1.a) //4
```
代码中的_a_只是我们用来存储的一个空间，你也可以console.log(obj1._a__)来访问，没有实际意义

### 对象中的值是否存在

```js
var obj1 = {
  a: undefined
}

console.log(obj1.a)
```

当我们访问obj1.a得到undefined的时候，我们怎么判断他是存储中的undefined还是不存在时返回的undefined呢

我们可以在不访问值的情况下判断这个属性是否存在

```js
var obj1 = {
  a: undefined
}

console.log('a' in obj1) //true
console.log('b' in obj1) // false

console.log(obj1.hasOwnProperty('a')) // true
console.log(obj1.hasOwnProperty('b')) // false
```

in 操作符会检查属性是否在对象及其 [[Prototype]] 原型链中

hasOwnProperty(..) 只会检查属性是否在 myObject 对象中

propertyIsEnumerable(..) 会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足 enumerable:true 。

Object.keys(..) 会返回一个数组，包含所有可枚举属性， Object.getOwnPropertyNames(..)会返回一个数组，包含所有属性，无论它们是否可枚举。


## 遍历

- forEach : forEach(..) 会遍历数组中的所有值并忽略回调函数的返回值

- every : every(..) 会一直运行直到回调函数返回 false （或者“假”值）

- some :  some(..) 会一直运行直到回调函数返回 true （或者“真”值）。

- for...of

- for...in

- for循环

其中 forEach every some 属于数组

### iterator

for..of 循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的next() 方法来遍历所有返回值。

数组有内置的 @@iterator ，因此 for..of 可以直接应用在数组上。我们使用内置的 @@iterator 来手动遍历数组，看看它是怎么工作的：

```js
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();
it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }
```

和数组不同，普通的对象没有内置的 @@iterator ，所以无法自动完成 for..of 遍历。

## 给对象定义iterator

```js
var obj = {
  a: 1,
  b: 2
}

Object.defineProperty(obj, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function () {
    var o = this;
    var idx = 0;
    var ks = Object.keys(o);
    return {
      next: function () {
        return {
          value: o[ks[idx++]],
          done: (idx > ks.length)
        }
      }
    }
  }
})

var i = obj[Symbol.iterator]();

console.log(i.next()) // { value: 1, done: false }
console.log(i.next()) // { value: 2, done: false }
console.log(i.next()) // { value: undefined, done: true }

for(let v of obj) {
  console.log(v) // 1 , 2
}

```

## 小记
> JavaScript  有一处奇特的语法，即构造函数没有参数时可以不用带 () 。于是我们可能会碰到 var timestamp = +new Date; 