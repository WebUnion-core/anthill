
# PHP基础篇 #

## 目录 ##

1. 编写
2. 变量
3. 作用域
    1. global作用域
    2. Static作用域

## 编写 ##

PHP 脚本以`.php`为文件扩展名，脚本内容包括在`<?php ... ?>`中，在 PHP 脚本中还可以使用 HTML 标签。

写法一(纯 PHP 脚本)：

```
<?php
    echo 'Hello, world!';
?>
```

写法二(嵌入 HTML 标签)：

```
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<?php
    echo '<p>Hello, world!</p>'; // 可以在echo中使用HTML标签
?>
</body>
</html>
```

## 变量 ##

PHP 是一门弱类型语言，所谓"弱类型"，就是指不必在定义变量时约束其数据类型，弱类型语言会根据变量的值，自动将变量转换为正确的数据类型。PHP 中，变量的定义有以下几个规则：

1. 变量以"$"符号开始，后面加上变量名称；
2. 变量名称首字符必须是字母或下划线；
3. 变量名称只能由字母、数字及下划线构成，其他字符构成非法；
4. 变量名称是区分大小写的。

定义和调用一个变量的例子：

```
<?php
    $str = 'Hello';
    $num = 100;
    echo $str; // 输出: "Hello"
    echo $num; // 输出: 100
?>
```

## 作用域 ##

### global作用域 ###

全局(global)作用域，指的就是 PHP 脚本中最外层的空间(或称为"域")，局部作用域则是函数内部的空间，在全局作用域中定义的变量称为全局变量，在局部作用域中定义的变量称为局部变量，局部变量只能在函数内部使用。如果要在局部作用域中引用全局变量的话，需要使用 global 关键字，否则会报错。

示例代码：

```
<?php
    $n = 100;

    function echoNum1() {
        global $n; // 将全局变量n导入
        echo ' 1. Inner echo: '.$n;
    }

    function echoNum2() {
        echo ' 2. Inner echo: '.$n;
    }

    echo ' Outter echo: '.$n;
    echoNum1(); // 输出: ' 1. Inner echo: 100'
    echoNum2(); // 报错，提示说echoNum函数内的变量n未定义
?>
```

PHP 将所有全局变量存储在一个名为 $GLOBALS[index] 的数组中，index 保存变量的名称，我们可以访问保存在这个数组中指定全局变量的值，也可以修改这个值。

示例代码：

```
<?php
    $n = 100;
    function ctrlNum() {
        echo $GLOBALS['n']; // 输出: 100
        $GLOBALS['n'] = 150;
        echo $GLOBALS['n']; // 输出: 150
    }
    ctrlNum();
?>
```

### Static作用域 ###

当一个函数完成时，它的所有变量通常都会被删除，如果需要其中某个变量不被删除，则可以使用 static 关键字。

示例代码：

```
function echoCounter() {
    static $n = 0;
    echo $n;
    $n++;
}
echoCounter(); // 输出: 0
echoCounter(); // 输出: 1
echoCounter(); // 输出: 2
```

---

```
ARTICLE_ID : 54
POST_DATE : 2017/12/31
AUTHER : WJT20
```
