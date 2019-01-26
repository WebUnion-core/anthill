
# Dart语言学习笔记汇总(一) #

> 因为开发 Flutter 应用要用到 Dart 语言，所以有必要好好学习 Dart 语言的知识，这就是写作本系列的目的。

## 目录 ##

## 参考链接 ##

- [Dart语法学习](https://www.jianshu.com/p/9e5f4c81cc7d)

## 语言特性 ##

在正式学习 Dart 语法知识之前，先要了解 Dart 的语言特性。个人感觉 Dart 融合了 JavaScript、Java、C++ 等多种语言的特性，这使得它用起来更加灵活。

Dart 的语言特性主要有以下这些:

1. Dart 中的所有东西都是对象，所有的对象都继承自 Object 类;

2. Dart 是一种动态类型语言，但是可以在定义变量的时候给它定义一个类型，这样会更安全，没有定义类型的变量在 debug 模式下类型会是 dynamic(动态的);

3. Dart 没有`public`、`private`、`protected`这些关键字，变量名以"\_"开头即表示私有变量;

4. 没有初始化的变量都会默认赋值为 null(JavaScript 中则是默认赋值为 undefined);

5. Dart 和 Java 一样，都提供了`main()`顶级函数;

6. Dart 和其他语言一样，由语言规范、虚拟机、类库和工具等组成:

    1. SDK: SDK 包括 Dart VM、dart2js、Pub、库和工具;
    2. Dartium: 内嵌 Dart VM 的 Chromium，可以在浏览器中直接执行 Dart 代码;
    3. Dart2js: 将 Dart 代码编译成 JavaScript 的工具;
    4. Dart Editor: 基于 Eclipse 的全功能 IDE，并包含以上所有工具。支持代码补全、代码导航、快速修正、重构、调试等功能。

## 关键字 ##

Dart 语言包含56个关键字，分别为:

abstract、do、import、super、as、dynamic、in、switch、assert、else、interface、sync*、enum、implements、is、this、async*、export、library、throw、await、external、mixin、true、break、extends、new、try、case、factory、null、typedef、catch、false、operator、var、class、final、part、void、const、finally、rethrow、while、continue、for、return、with、covariant、get、set、yield*、default、if、static、deferred。

## 变量和常量 ##

### 变量的声明初始化 ###

变量会根据其所取的值来推断其类型，因此可以使用`Object`、`dynamic`、`var`等关键字来隐式声明变量(看到`var`自然就联想到 JavaScript)，不过更建议显式声明变量的类型，即使用具体的关键字来声明变量。

示例:

```dart
// 隐式声明
var name = 'WJT20';
Object age = 24;
dynamic id = '001';

// 显式声明
String country = 'China';
```

### 常量的声明 ###

声明常量，可以用`const`和`final`关键字，被这两个关键字修饰的变量可以隐藏数据类型，但还是建议指定数据类型。使用`const`和`final`还可以创建一个不可变的列表。

和某些编程语言不同的是，Dart 中的常量命名建议使用驼峰命名法。

示例:

```dart
const String todayTimeStamp = '2019-01-23 14:32'; // const定义常量
final String tomorrowTimeStamp = '2019-01-24 14:32'; // final定义常量

// 创建不可变列表
const futureTimeStamps = const[
    '2019-01-24 15:30',
    '2019-01-25 10:00',
    '2019-05-01 01:00'
];
```

## 数据类型 ##

### num类型 ###



---

```
ID         : 125
DATE       : 2019/01/22
AUTHER     : WJT20
TAG        : Dart
```
