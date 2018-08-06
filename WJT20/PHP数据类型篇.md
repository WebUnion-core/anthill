
# PHP数据类型篇 #

## 目录 ##

1. [检测API](#href1)
2. [字符串](#href2)
3. [整型](#href3)
4. [浮点型](#href4)
5. [布尔](#href5)
6. [数组](#href6)
 [](#href7)   1. 数值数组
 [](#href8)   2. 关联数组
 [](#href9)   3. 多维数组
7. [对象](#href10)
8. [NULL](#href11)

## <a name="href1">检测API</a> ##

`var_dump()`可以返回变量的数据类型和值，使用这个方法可以避免数据类型相关错误的发生。

## <a name="href2">字符串</a> ##

字符串是放在一对单引号或双引号中的字符序列，定义字符串变量的代码如下：

```
<?php
    $s = 'Hello, world';
    echo var_dump($s); // 输出: string(12) "Hello, world"
?>
```

## <a name="href3">整型</a> ##

定义整型变量的代码如下：

```
<?php
    $n1 = 100; // 正数
    $n2 = -100; // 负数
    $n3 = 0x8C; // 十六进制数
    $n4 = 047; // 八进制数
    echo var_dump($n4); // 输出: int(100)
?>
```

## <a name="href4">浮点型</a> ##

定义浮点型变量的代码如下：

```
<?php
    $n1 = 3.1415;
    $n2 = 3.14e2; // 科学计数法，值为: 314
    echo var_dump($n1); // 输出: float(3.1415)
?>
```

## <a name="href5">布尔</a> ##

布尔型取值只有 true 和 false，通常布尔值用于条件判断，定义布尔值变量的代码如下：

```
<?php
    $t = true;
    $f = false;
    echo var_dump($t); // 输出: bool(true)
?>
```

## <a name="href6">数组</a> ##

数组可以在一个变量中存储多个值。PHP 中，数组有三种类型。

### <a name="href6-1">数值数组</a> ###

数值数组即带有数字 ID 键的数组。

```
<?php
    $arr = array('A', 'B', 'C');
    echo $arr[0] . $arr[1] . $arr[2]; // 输出: "ABC"
?>
```

### <a name="href6-2">关联数组</a> ###

关联数组即带有指定的键的数组，每个键关联一个值。

```
<?php
    $arr = array(
        'key1' => 'A',
        'key2' => 'B',
        'key3' => 'C'
    );
    echo $arr['key1'] . $arr['key2'] . $arr['key3']; // 输出: "ABC"
?>
```

### <a name="href6-3">多维数组</a> ###

多维数组即包含一个或多个数组的数组。多维数组中，主数组中的每一个元素也可以是一个数组，子数组中的每一个元素也可以是一个数组。

```
<?php
    $arr1 = array(
        'arr2' => array(
            'key21' => 'A',
            'key22' => 'B'
        ),
        'arr3' => array(
            'key31' => 'C',
            'arr4' => array(
                'key41' => 'D'
            )
        )
    );

    echo $arr1['arr2']['key21']; // 输出: "A"
    echo $arr1['arr3']['key31']; // 输出: "C"
    echo $arr1['arr3']['arr4']['key41']; // 输出: "D"
?>
```

## <a name="href7">对象</a> ##

对象数据类型和数组一样，都可以用来存储数据，声明对象必须使用 class 关键字，这种声明的对象称为"类"，"类"是可以包含属性和方法的结构，通常类对象的名字以大写字母开头。声明一个类对象的代码如下：

```
<?php
    class Car {
        var $color; // 定义属性，用到了var关键字

        function Car($color = 'red') {
            $this -> color = $color; // this指向当前对象实例
        }

        // 定义方法
        function get_color() {
            return $this -> color;
        }
    }

    $car1 = new Car(); // 创建使用默认颜色的汽车实例对象
    $car2 = new Car('black'); // 创建使用黑色的汽车实例对象，
    echo $car1 -> get_color(); // 输出: "red"
    echo $car2 -> get_color(); // 输出: "black"
?>
```

注意，PHP 中调用对象的属性和方法要用"->"，不要和 JavaScript 一样用"."哦。

## <a name="href8">NULL</a> ##

NULL 表示变量没有值，其取值只有一个，名为 null，将一个变量指定为 NULL 可以清空变量数据：

```
<?php
    $s = 'Hello, world!';
    echo var_dump($s); // 输出: string(13) "Hello, world!"
    $s = null;
    echo var_dump($s); // 输出: NULL
?>
```

---

```
ARTICLE_ID : 55
POST_DATE : 2017/12/31
AUTHER : WJT20
```
