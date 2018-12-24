
# TypeScript学习笔记——基础(二) #

## 目录 ##

1. [参考链接](#href1)
2. [数组](#href2)
    1. [定义](#href2-1)
    2. [遍历与枚举](#href2-2)
3. [函数](#href3)
4. [类型断言](#href4)
5. [内置对象](#href5)
6. [引入第三方库](#href6)

## <a name="href1">参考链接</a> ##

- [TypeScript Handbook（中文版）](http://wiki.jikexueyuan.com/project/typescript/Basic-Types.html)

## <a name="href2">数组</a> ##

### <a name="href2-1">定义</a> ###

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

### <a name="href2-2">遍历与枚举</a> ###

遍历数组使用 forEach、map 等方法，用法与 ES6 的一样，如:

```ts
let strAry: string[] = ['A', 'B', 'C'];
str.forEach(function(item, index) {
    console.log(`${index} : ${item}`);
});
```

enum 类型用于枚举数组，可以为一组数组赋予友好的名字:

```ts
enum Color { Red = 1, Green, Blue };
let colorName: string = Color[2];
let colorIndex: Color = Color.Green;

console.log(colorIndex, colorName); // 2 "Green"
```

## <a name="href3">函数</a> ##

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出(如果没有输出结果则应定义为 void 类型)都考虑到。输入多余的（或者少于要求的）参数，是不被允许的。传入的参数可以设置为可选、默认等形式。

函数声明的形式比较简单:

```ts
function add(num1: number, num2?: number): number {
    return num1 + (num2 || 0);
}

function sub(num1: number, num2: number = 0): void {
   console.log(num1 - num2);
}

console.log(add(1, 2), add(2)); // 5
sub(5, 3); // 2
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

像上面这种写法就是单纯的炫技了，一个加法计算器没必要做得那么复杂，代码可读性很差，小朋友不要模仿哦。

使用"...items"可以获取剩余参数:

```ts
function log(...items: any[]): void {
    items.forEach(e, i) {
        console.log(i + ': ' + e);
    }
}
log('1', 2, true);
```

## <a name="href4">类型断言</a> ##

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。TypeScript会假设你，已经进行了必须的检查。

```ts
function getLength(something: string | number): number {
    // 断言something是string类型
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
console.log(getLength(123));
```

断言的有两种写法，一种是使用`<类型>`的形式(如上段代码)，另一种是使用`as`，使用`as`对以上代码进行改写，结果如下:

```ts
function getLength(something: string | number): number {
    // 断言something是string类型
    if ((something as string).length) {
        return (something as string).length;
    } else {
        return something.toString().length;
    }
}
console.log(getLength(123));
```

## <a name="href5">内置对象</a> ##

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。常用的内置对象有 Boolean、Error、Date、RegExp 等。

```ts
let boolObj: Boolean = new Boolean(1);
let errorObj: Error = new Error('Error occurred');
let dateObj: Date = new Date();
let regexpObj: RegExp = /[a-z]/;
```

## <a name="href6">引入第三方库</a> ##

可以在[http://microsoft.github.io/TypeSearch/](http://microsoft.github.io/TypeSearch/)上查找想要安装的 TypeScript 版本的模块，以引入 jQuery 为例，首先使用npm安装模块，语句如: `npm install --save-dev @types/jquery`。接着就可以在 TypeScript 中使用 jQuery 了。

---

```
ID         : 42
DATE       : 2017/11/12
AUTHER     : WJT20
TAG        : TypeScript
```
