
# TypeScript学习笔记——基础(一) #

## 目录 ##

1. 介绍与环境配置
2. 数据类型
    1. 变量声明
    2. 模板字符串
    3. 类型推论
    4. 联合类型
3. 接口
4. 数组的类型
5. 函数

---

## 介绍与环境配置 ##

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。近几年，TypeScript 发展非常迅猛，Google 更是将其应用到 Angular2 的开发中。

要使用 TypeScript 语法，首先需要安装 typescript 模块，在全局环境下使用 npm 安装这个模块，语句如下为`npm install -g typescript`。

安装完模块后，我们就可以使用 TypeScript 语法编写自己的脚本文件了，编写完成后，要把文件后缀名定位".ts"，例如"index.ts"，然后在命令行下输入类似`tsc index.ts`的语句即可编译指定的".ts"文件为".js"文件，执行这个文件就能看到执行结果。

---

## 数据类型 ##

### 变量声明 ###

TypeScript 中，声明变量的同时经常会附加声明变量的类型，数据类型分为五种原始(基本)数据类型和对象类型，变量声明使用let关键字，基本类型的变量声明如下：

```
let numVal: number = 10, //数值类型
    strVal: string = "Hello", //字符串类型
    boolVal: boolean = true, //布尔类型
    undefinedVal: undefined = undefined, //Undefined类型
    nullVal: null = null; //null类型
```

TypeScript 新增了一种新类型——任意类型Any，这种数据类型代表其他所有的数据类型。声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

```
let anyVal: any = "World";
console.log(anyVal, anyVal.toUpperCase());
anyVal = 100;
console.log(anyVal);
```

### 模板字符串 ###

TypeScript 可以使用模板字符串，用法与ES6基本一致，模板字符串形式为一对"\`"符号包含内容，内容中的"${xxx}"会被识别为代码，执行后再加载指定位置。

```
let numVal: number = 10, //数值类型
    strVal: string = "Hello", //字符串类型
    boolVal: boolean = true, //布尔类型
    undefinedVal: undefined = undefined, //Undefined类型
    nullVal: null = null; //null类型

let modleStr = `numVal: ${numVal},
strVal: ${strVal},
boolVal: ${boolVal},
undefinedVal: ${undefinedVal},
nullVal: ${nullVal}.`;
console.log(modleStr);
```

### 类型推论 ###

先声明变量，再给变量赋值，这种做法是允许的：

```
let noTypeVal;
noTypeVal = "WORLD";//没有声明类型，类型推论为String类型
console.log(noTypeVal.toLowerCase());
```

以上代码中少了声明变量类型的操作，这种做法不会报错，这是因为 TypeScript 会在没有明确的指定类型的时候推测出一个类型，这个过程被称为类型推论。如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查。

### 联合类型 ###

联合类型表示取值可以为多种类型中的一种，联合类型使用"|"分隔每个类型。当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

```
let unionTypeVal: string | number;
unionTypeVal = "1";
console.log(unionTypeVal);
unionTypeVal = 1;
console.log(unionTypeVal);
```

---

## 接口 ##

接口是对行为的抽象，而具体如何行动需要由类去实现，接口一般首字母大写，赋值的时候，变量的形状必须和接口的形状保持一致。

```
interface Animal {
    type: string;
    readonly id: number;//tip: 只读属性指定字段只能在创建的时候被赋值，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
    info?: string;//tip: 可选属性的含义是该属性可以不存在
    [propName: string]: any;//tip: 定义了任意属性取 string 类型的值，一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性
};
let cat: Animal = {
    type: "Cat",
    id: 1,
    info: "Has different color"
};
let dog: Animal = {
    type: "Dog",
    id: 2
};
console.log(cat, dog);
```

---

## 数组的类型 ##

在 TypeScript 中，数组类型有多种定义方式。

1. 方括号表示法：

    ```
    let numArr: number[] = [1, 2, 3],
        strArr: string[] = ["1", "2", "3"],
        nsArr: (number | string)[] = [1, "2", 3],//结合联合类型的数组表示法
        anyArr: any[] = [1, "2", true];//更常见的是结合any
    console.log(numArr, strArr, nsArr, anyArr);
    ```

2. 数组泛型表示法(在泛型章会详细讲解)：

    ```
    let numGenericArr: Array<number> = [2, 3, 4];
    console.log(numGenericArr);
    ```

3. 接口表示法：

    ```
    interface NumberArr {
        [index: number]: number;
    }
    let numInterfaceArr: NumberArr = [3, 4, 5];
    console.log(numInterfaceArr);
    ```

---

## 函数 ##

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到。输入多余的（或者少于要求的）参数，是不被允许的。传入的参数可以设置为可选、默认等形式。

函数声明的形式比较简单：

```
function add1(num1: number, num2: number, num3?: number = 0): number {
    return num1 + num2 + num3;
}
console.log(add1(1, 2), add1(1, 2, 3));
```

函数表达式要复杂的多，"=>"表示函数的定义，左边是输入类型，右边是输出类型：

```
let add2(num1: number, num2: number) => number = function(num1: number, num2: number): number {
    return num1 + num2;
}
console.log(add2(1, 2));
```

使用"...items"可以获取剩余参数：

```
function log(...items: any[]) {
    items.forEach(e, i) {
        console.log(i + ": " + e);
    }
}
log("1", 2, true);
```

---

```
ARTICLE_ID : 41
POST_DATE : 2017/11/11
AUTHER : WJT20
```
