
# PHP基础篇 #

## 目录 ##

1. [编写](#href1)
2. [变量](#href2)
3. [常量](#href3)
4. [作用域](#href4)
 [](#href5)   1. global作用域
 [](#href6)   2. Static作用域

## <a name="href1">编写</a> ##

PHP 脚本以`.php`为文件扩展名，脚本内容包括在`<?php ... ?>`中，在 PHP 脚本中还可以使用 HTML 标签。

写法一(纯 PHP 脚本):

```
<?php
    echo 'Hello, world!';
?>
```

写法二(嵌入 HTML 标签):

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

## <a name="href2">变量</a> ##

PHP 是一门弱类型语言，所谓"弱类型"，就是指不必在定义变量时约束其数据类型，弱类型语言会根据变量的值，自动将变量转换为正确的数据类型。PHP 中，变量的定义有以下几个规则：

1. 变量以"$"符号开始，后面加上变量名称;
2. 变量名称首字符必须是字母或下划线;
3. 变量名称只能由字母、数字及下划线构成，其他字符构成非法;
4. 变量名称是区分大小写的。

定义和调用一个变量的例子:

```
<?php
    $str = 'Hello';
    $num = 100;
    echo $str; // 输出: "Hello"
    echo $num; // 输出: 100
?>
```

## <a name="href3">常量</a> ##

设置常量，使用 define() 函数，其函数语法为：`define(name, value[, case_insensitive])`。

1. name: 必需，常量名称，即标识符;
2. value: 必需，常量的值;
3. case_insensitive: 可选，设为 true 表示常量大小写不敏感，默认为 false。

```
<?php
    define('PAI', 3.1415926);
    echo PAI; // 输出: 3.1415926
?>
```

## <a name="href4">作用域</a> ##

### <a name="href4-1">global作用域</a> ###

全局(global)作用域，指的就是 PHP 脚本中最外层的空间(或称为"域")，局部作用域则是函数内部的空间，在全局作用域中定义的变量称为全局变量，在局部作用域中定义的变量称为局部变量，局部变量只能在函数内部使用。如果要在局部作用域中引用全局变量的话，需要使用 global 关键字，否则会报错。

示例代码:

```
<?php
    $n = 100;

    function echo_number1() {
        global $n; // 将全局变量n导入
        echo ' 1. Inner echo: '.$n;
    }

    function echo_number2() {
        echo ' 2. Inner echo: '.$n;
    }

    echo ' Outter echo: '.$n;
    echo_number1(); // 输出: ' 1. Inner echo: 100'
    echo_number2(); // 报错，提示说echo_number2函数内的变量n未定义
?>
```

PHP 将所有全局变量存储在一个名为 $GLOBALS[index] 的数组中，index 保存变量的名称，我们可以访问保存在这个数组中指定全局变量的值，也可以修改这个值。

示例代码:

```
<?php
    $n = 100;
    function ctrl_number() {
        echo $GLOBALS['n']; // 输出: 100
        $GLOBALS['n'] = 150;
        echo $GLOBALS['n']; // 输出: 150
    }
    ctrl_number();
?>
```

### <a name="href4-2">Static作用域</a> ###

当一个函数完成时，它的所有变量通常都会被删除，如果需要其中某个变量不被删除，则可以使用 static 关键字。

示例代码:

```
function echo_counter() {
    static $n = 0;
    echo $n;
    $n++;
}
echo_counter(); // 输出: 0
echo_counter(); // 输出: 1
echo_counter(); // 输出: 2
```

---

```
ID         : 54
DATE       : 2017/12/31
AUTHER     : WJT20
TAG        : PHP
```
