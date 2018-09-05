
# TypeScript学习笔记——基础(一) #

## 目录 ##

1. [介绍与环境配置](#href1)
2. [数据类型](#href2)
    1. [变量声明](#href2-1)
    2. [模板字符串](#href2-2)
    3. [类型推论](#href2-3)
    4. [联合类型](#href2-4)
3. [接口](#href3)

## <a name="href1">介绍与环境配置</a> ##

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。近几年，TypeScript 发展非常迅猛，Google 更是将其应用到 Angular2 的开发中。

要使用 TypeScript 语法，首先需要安装 typescript 模块，在全局环境下使用 npm 安装这个模块，语句如下为`npm install -g typescript`。

安装完模块后，我们就可以使用 TypeScript 语法编写自己的脚本文件了，编写完成后，要把文件后缀名设为".ts"，例如"index.ts"，然后在命令行下输入类似`tsc index.ts`的语句即可编译指定的".ts"文件为".js"文件，执行这个文件就能看到执行结果。

## <a name="href2">数据类型</a> ##

### <a name="href2-1">变量声明</a> ###

TypeScript 中，声明变量的同时经常会附加声明变量的类型，数据类型分为五种原始(基本)数据类型和对象类型，变量声明使用 let 关键字，基本类型的变量声明如下:

```ts
let numVal: number = 10; // 数值类型
let strVal: string = 'Hello'; // 字符串类型
let boolVal: boolean = true; // 布尔类型
let undefinedVal: undefined = undefined; // Undefined类型
let nullVal: null = null; // null类型
```

TypeScript 新增了一种新类型——任意类型 Any，这种数据类型代表其他所有的数据类型。声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

```ts
let anyVal: any = 'World';
console.log(anyVal, anyVal.toUpperCase());

anyVal = 100;
console.log(anyVal);
```

### <a name="href2-2">模板字符串</a> ###

TypeScript 可以使用模板字符串，用法与ES6基本一致，模板字符串形式为一对"\`"符号包含内容，内容中的"${xxx}"会被识别为代码，执行后再加载指定位置。

```ts
let numVal: number = 10; // 数值类型
let strVal: string = 'Hello'; // 字符串类型
let boolVal: boolean = true; // 布尔类型
let undefinedVal: undefined = undefined; // Undefined类型
let nullVal: null = null; // Null类型

let modleStr = `numVal: ${numVal},
strVal: ${strVal},
boolVal: ${boolVal},
undefinedVal: ${undefinedVal},
nullVal: ${nullVal}.`;

console.log(modleStr);
```

### <a name="href2-3">类型推论</a> ###

先声明变量，再给变量赋值，这种做法是允许的:

```ts
let noTypeVal;
noTypeVal = 'WORLD'; // 没有声明类型，类型推论为String类型
console.log(noTypeVal.toLowerCase());
```

以上代码中少了声明变量类型的操作，这种做法不会报错，这是因为 TypeScript 会在没有明确的指定类型的时候推测出一个类型，这个过程被称为类型推论。如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查。

### <a name="href2-4">联合类型</a> ###

联合类型表示取值可以为多种类型中的一种，联合类型使用"|"分隔每个类型。当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

```ts
let unionTypeVal: string | number;

unionTypeVal = '1';
console.log(unionTypeVal);

unionTypeVal = 1;
console.log(unionTypeVal);
```

## <a name="href3">接口</a> ##

接口是对行为的抽象，而具体如何行动需要由类去实现，接口一般首字母大写，赋值的时候，变量的形状必须和接口的形状保持一致。

```ts
interface Animal {
    type: string;
    readonly id: number;
    info?: string;
    [propName: string]: any;
};

let cat: Animal = {
    type: 'Cat',
    id: 1,
    info: 'Has different color'
};
let dog: Animal = {
    type: 'Dog',
    id: 2
};

console.log(cat, dog);
```

readonly 用于定义只读字段，只读属性指定字段只能在创建的时候被赋值，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候。

`?:`定义的是可选属性，可选属性的含义是该属性可以不存在。

`[propName: string]: any;`定义了任意属性取 string 类型的值，一旦定义了任意属性，则确定属性和可选属性都必须是它的子属性。

```
ARTICLE_ID : 41
POST_DATE : 2017/11/11
AUTHER : WJT20
```
