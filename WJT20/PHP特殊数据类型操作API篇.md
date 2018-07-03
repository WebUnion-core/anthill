
# PHP特殊数据类型操作API篇 #

## 目录 ##

1. 字符串常用API
    1. 并置运算符
    2. strlen()
    3. strpos()
2. 数组常用API
    1. count()
    2. 遍历数组

## 字符串常用API ##

### 并置运算符 ###

PHP 中的字符串运算符只有一个，那就是并置运算符(.)，它用于把两个字符串连接起来，例如：

```
<?php
    $str1 = 'Hello, ';
    $str2 = 'world! ';
    echo $str1 . $str2; // 输出: 'Hello, world! '
?>
```

### strlen() ###

strlen() 函数可以返回字符串的长度。

```
<?php
    $str = 'Hello, world! ';
    echo strlen($str); // 输出: 13
?>
```

### strpos() ###

strpos() 函数用于在字符串内查找一个字符或一段指定的文本，如果在字符串中找到匹配，该函数会返回第一个匹配到的字符位置，如果未找到匹配，则返回 false。

```
<?php
    $str1 = 'ABCDE';
    $str2 = 'CD';
    echo strpos($str1, $str2); // 输出: 2
?>
```

## 数组常用API ##

### count() ###

count() 函数用于返回数组的长度。

```
<?php
    $arr = array('A', 'B', 'C');
    echo count($arr); // 输出: 3
?>
```

### 遍历数组 ###

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
ARTICLE_ID : 57
POST_DATE : 2018/01/01
AUTHER : WJT20
```
