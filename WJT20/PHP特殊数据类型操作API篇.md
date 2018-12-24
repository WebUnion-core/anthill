
# PHP特殊数据类型操作API篇 #

## 目录 ##

1. [字符串常用API](#href1)
 [](#href2)   1. 并置运算符
 [](#href3)   2. strlen()
 [](#href4)   3. strpos()
2. [数组常用API](#href5)
 [](#href6)   1. count()
 [](#href7)   2. 遍历数组

## <a name="href1">字符串常用API</a> ##

### <a name="href1-1">并置运算符</a> ###

PHP 中的字符串运算符只有一个，那就是并置运算符(.)，它用于把两个字符串连接起来，例如：

```
<?php
    $str1 = 'Hello, ';
    $str2 = 'world! ';
    echo $str1 . $str2; // 输出: 'Hello, world! '
?>
```

### <a name="href1-2">strlen()</a> ###

strlen() 函数可以返回字符串的长度。

```
<?php
    $str = 'Hello, world! ';
    echo strlen($str); // 输出: 13
?>
```

### <a name="href1-3">strpos()</a> ###

strpos() 函数用于在字符串内查找一个字符或一段指定的文本，如果在字符串中找到匹配，该函数会返回第一个匹配到的字符位置，如果未找到匹配，则返回 false。

```
<?php
    $str1 = 'ABCDE';
    $str2 = 'CD';
    echo strpos($str1, $str2); // 输出: 2
?>
```

## <a name="href2">数组常用API</a> ##

### <a name="href2-4">count()</a> ###

count() 函数用于返回数组的长度。

```
<?php
    $arr = array('A', 'B', 'C');
    echo count($arr); // 输出: 3
?>
```

### <a name="href2-5">遍历数组</a> ###

1. 遍历数值数组:

    ```
    <?php
        $arr = array('A', 'B', 'C');
        for ($i = 0; $i < count($arr); $i++) {
            echo $arr[$i];
        }
    ?>
    ```

2. 遍历关联数组:

    ```
    <?php
        $arr = array(
            'key1' => 'A',
            'key2' => 'B',
            'key3' => 'C'
        );
        foreach ($arr as $key => $value) {
            echo $key . ': ' . $value;
        }
    ?>
    ```

---

```
ID         : 57
DATE       : 2018/01/01
AUTHER     : WJT20
TAG        : 
```
