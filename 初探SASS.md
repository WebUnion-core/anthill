
# 初探SASS #

## 目录 ##

1. 参考链接
2. SASS简介
3. 变量
4. 计算
5. 嵌套
6. 继承
7. Mixin
8. 文件引入
9. 高级功能
    1. 条件语句
    2. 循环语句
    3. 自定义函数

---

## 参考链接 ##

- [SASS用法指南](http://www.tuicool.com/articles/B3euQb)

---

## SASS简介 ##

SASS是CSS预处理器中的一种，SASS文件以 .scss 后缀结尾，它提供给了开发者许多便利的写法，使得 CSS 开发变得简单和可维护。

这里我用 webpack 包装了一个装载了SASS编译器的项目，项目地址：[https://github.com/WeiJietao/sass-template](https://github.com/WeiJietao/sass-template)

---

## 变量 ##

SASS提供了定义变量的语法，所有变量以$符号开头。

示例代码：
```
//定义变量
$green: #41c134;

.figure-outer{
    background-color: $green;//访问变量
}
```

---

## 计算 ##

SASS还提供了运算语法，由此我们可以自由使用加减乘除运算。

示例代码：
```
$width: 100px;//长度变量

.figure-outer{
    width: ($width * 2) + 50px;//计算数值
    height: ($width * 2) + 50px;
}
```

---

## 嵌套 ##

选择器嵌套也是SASS的一大特色，使用选择器嵌套写法可以清晰地分清元素之间的包含关系。

示例代码：
```
.figure-outer{
    ...

    .figure-inner{
        //.figure-inner对应的元素是.figure-outer对应的元素的子元素
        ...
    }
}
```

---

## 继承 ##

SASS允许一个选择器，继承另一个选择器，这就用到了`@extend`这个东东。

```
$red: #e43660;

//被继承的添加边框类
.solid-border{
    border: 2px solid $red;
}

.figure-outer{
    @extend .solid-border;//继承
    ...
}
```

---

## Mixin ##

Mixin 指的是可以重用的代码，使用`@mixin`可以定义一个代码块，使用`@include`命令则可调用这个代码块。我们可以往定义的代码块名后添加一对括号往其中传入参数(可以给参数设置默认值)，这是一个非常强大的功能。

示例代码：
```
$gray: #dcdcdc;

//添加边框的代码块，参数为指定边框类型，默认为solid
@mixin addBorder($borderType: solid) {
    border: 5px $borderType $gray;
}

.figure-outer{
    @include addBorder(double);//调用代码块，传入double将边框类型设为双边框
    ...
}
```

---

## 文件引入 ##

引入文件的写法与CSS引入文件的写法差不多，如果引入的是.css文件，那么就和CSS引入文件的写法相同。

示例代码：
```
//引入.scss文件
@import ("./reset.scss");

//引入.css文件
@import "./reset.css";
```

---

## 高级功能 ##

剩下的都是些高级功能了，诸如编程语言的if-else、for和自定义函数功能，这里我就直接搬用借鉴的文章内容了。

### 条件语句 ###

`@if`可以用来判断：

```
p {
    @if 1 + 1 == 2 { border: 1px solid; }
    @if 5 < 3 { border: 2px dotted; }
}
```

配套的还有`@else`命令：

```
@if lightness ($color) > 30% {
    background-color: #000;
} @else {
    background-color: #fff;
}
```

### 循环语句 ###

SASS支持for循环：

```
@for $i from 1 to 10 {
    .border-#{$i} {
        border: #{$i}px solid blue;
    }
}
```

也支持 while 循环：

```
$i: 6;
@while $i > 0 {
    .item-#{$i} { width: 2em * $i; }
    $i: $i - 2;
}
```

each命令，作用与for类似：

```
@each $member in a, b, c, d {
    .#{$member} {
        background-image: url ("/image/#{$member}.jpg");
    }
}
```

### 自定义函数 ###

SASS允许用户编写自己的函数。

```
@function double ($n) {
    @return $n * 2;
}

#sidebar {
    width: double (5px);
}
```

最后最后，我想说一句，SASS虽然很强大，但它毕竟只是一个工具，它的内容核心围绕的还是CSS，所以我们在使用强大的CSS预处理器工具的同时，也别忘了回归最本质的CSS。

---

```
ARTICLE_ID : 25
POST_DATE : 2017/08/27
AUTHER : WJT20
```
