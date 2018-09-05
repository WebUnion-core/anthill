
# TypeScript学习笔记——基础(二) #

## 目录 ##

1. [数组](#href1)
    1. [定义](#href1-1)
    2. [遍历与枚举](#href1-2)
2. [函数](#href2)
3. [类型断言](#href3)
4. [内置对象](#href4)
5. [引入第三方库](#href5)

## <a name="href1">数组</a> ##

### <a name="href1-1">定义</a> ###

在 TypeScript 中，数组类型有多种定义方式。

1. 方括号表示法:

    ```ts
    let numArr: number[] = [1, 2, 3];
    let strArr: string[] = ['1', '2', '3'];
    let nsArr: (number | string)[] = [1, '2', 3]; // 结合联合类型的数组表示法
    let anyArr: any[] = [1, '2', true]; // 更常见的是结合any

    console.log(numArr, strArr, nsArr, anyArr);
    ```

2. 数组泛型表示法(在泛型章会详细讲解):

    ```ts
    let numGenericArr: Array<number> = [2, 3, 4];
    console.log(numGenericArr);
    ```

3. 接口表示法:

    ```ts
    interface NumberArr {
        [index: number]: number;
    }
    let numInterfaceArr: NumberArr = [3, 4, 5];
    console.log(numInterfaceArr);
    ```

### <a name="href1-2">遍历与枚举</a> ###

遍历数组使用 forEach、map 等方法，用法与 ES6 的一样，如:

```ts
let strAry: string[] = ['A', 'B', 'C'];
str.forEach(function(item, index) {
    console.log(`${index} : ${item}`);
});
```

enum 类型用于枚举数组，可以为一组数组赋予友好的名字:

```ts
enum Color { Red = 1, Green, Blue }
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```

## <a name="href2">函数</a> ##

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出(如果没有输出结果则应定义为 void 类型)都考虑到。输入多余的（或者少于要求的）参数，是不被允许的。传入的参数可以设置为可选、默认等形式。

函数声明的形式比较简单:

```ts
function add1(
    num1: number,
    num2: number = 0,
    num3?: number
): number {
    return num1 + num2 + (num3 ? num3 : 0);
}
console.log(add1(1), add1(1, 2), add1(1, 2, 3));
```

函数表达式要复杂的多，"=>"表示函数的定义，左边是输入类型，右边是输出类型:

```ts
let add2: (
    num1: number,
    num2: number
) => number = function (
    num1: number,
    num2: number
): number {
    return num1 + num2;
};

console.log(add2(1, 2));
```

使用"...items"可以获取剩余参数:

```ts
function log(...items: any[]): void {
    items.forEach(e, i) {
        console.log(i + ': ' + e);
    }
}
log('1', 2, true);
```

## <a name="href3">类型断言</a> ##

类型断言可以用来手动指定一个值的类型。要使用类型断言只要在需要断言的变量前加上<Type>即可。以下是其中一种常用场景:

```ts
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
console.log(getLength(123));
```

## <a name="href4">内置对象</a> ##

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。常用的内置对象有 Boolean、Error、Date、RegExp 等。

```ts
let boolObj: Boolean = new Boolean(1);
let errorObj: Error = new Error('Error occurred');
let dateObj: Date = new Date();
let regexpObj: RegExp = /[a-z]/;
```

## <a name="href5">引入第三方库</a> ##

可以在[http://microsoft.github.io/TypeSearch/](http://microsoft.github.io/TypeSearch/)上查找想要安装的 TypeScript 版本的模块，以引入 jQuery 为例，首先使用npm安装模块，语句如: `npm install --save-dev @types/jquery`。接着就可以在 TypeScript 中使用 jQuery 了。

---

```
ARTICLE_ID : 42
POST_DATE : 2017/11/12
AUTHER : WJT20
```
