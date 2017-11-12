
# TypeScript学习笔记——基础(二) #

## 目录 ##

1. 数组的类型
2. 函数
3. 类型断言
4. 内置对象

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
function add1(num1: number, num2: number = 0, num3?: number): number {
    return num1 + num2 + (num3 ? num3 : 0);
}
console.log(add1(1), add1(1, 2), add1(1, 2, 3));
```

函数表达式要复杂的多，"=>"表示函数的定义，左边是输入类型，右边是输出类型：

```
let add2: (num1: number, num2: number) => number = function(num1: number, num2: number): number {
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

## 类型断言 ##

类型断言可以用来手动指定一个值的类型。要使用类型断言只要在需要断言的变量前加上<Type>即可。以下是其中一种常用场景：

```
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
console.log(getLength(123));
```

---

## 内置对象 ##

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。常用的内置对象有 Boolean、Error、Date、RegExp 等。

```
let boolObj: Boolean = new Boolean(1);
let errorObj: Error = new Error('Error occurred');
let dateObj: Date = new Date();
let regexpObj: RegExp = /[a-z]/;
```

---

```
ARTICLE_ID : 42
POST_DATE : 2017/11/12
AUTHER : WJT20
```
