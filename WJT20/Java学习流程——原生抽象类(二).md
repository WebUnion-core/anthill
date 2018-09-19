
# Java学习流程——原生抽象类(二) #

## 目录 ##

1. [参考链接](#href1)
2. [Character类](#href2)
    1. [内置方法](#href2-1)
3. [String类型](#href3)
    1. [获取字符长度](#href3-2)
    2. [创建格式化字符串](#href3-3)
    3. [大小写转换](#href3-4)
    4. [检索子串](#href3-5)
    5. [正则匹配](#href3-6)
    6. [连接字符串](#href3-7)
    7. [替换字符串](#href3-8)
    8. [拆解字符串](#href3-9)

## <a name="href1">参考链接</a> ##

- [Java Character 类](http://www.runoob.com/java/java-character.html)
- [Java String 类](http://www.runoob.com/java/java-string.html)

## <a name="href2">Character类</a> ##

Character 类用于对单个字符进行操作，其在对象中包装一个基本类型 char 的值。

### <a name="href2-1">内置方法</a> ###

1. `Character.isLetter(charVal)`: 是否是一个字母;  
2. `Character.isDigit(charVal)`: 是否是一个数字字符;  
3. `Character.isWhitespace(charVal)`: 是否是一个空格;  
4. `Character.isUpperCase(charVal)`: 是否是大写字母;  
5. `Character.isLowerCase(charVal)`: 是否是小写字母;  
6. `Character.toUpperCase(charVal)`: 指定字母的大写形式;  
7. `Character.toLowerCase(charVal)`: 指定字母的小写形式;  
8. `Character.toString(charVal)`: 返回字符的字符串形式，字符串的长度仅为1。

```Java
public class NativeClass {
    public static void main(String[] args) {
        Character charVal1 = 'A'; // char类型要用单引号括起
        Character charVal2 = 'a';
        Character charVal3 = ' ';
        Character charVal4 = '1';

        System.out.println(Character.isLetter(charVal1)); // true
        System.out.println(Character.isUpperCase(charVal1)); // true
        System.out.println(Character.isLowerCase(charVal2)); // true
        System.out.println(Character.isWhitespace(charVal3)); // true
        System.out.println(Character.isDigit(charVal4)); // true

        System.out.println(Character.toLowerCase(charVal1)); // 'a'
        System.out.println(Character.toUpperCase(charVal2)); // 'A'
        System.out.println(Character.toString(charVal1)); // "A"
    }
}
```

## <a name="href3">String类型</a> ##

字符串是一种极常用的数据类型，Java 提供了 String 类来创建和操作字符串。构造一个 String 类型对象的方式多种多样，这里不多描述，接下来直接说明 String 类型常用的一些方法和属性。

### <a name="href3-2">获取字符长度</a> ###

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str = "Hello, world!";
        System.out.println(str.length()); // 13
    }
}
```

### <a name="href3-3">创建格式化字符串</a> ###

String 类的静态方法`String.format()`能用来创建可复用的格式化字符串，而不仅仅是用于一次打印输出，用法如下:

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str;
        str = String.format("%d-%s-%s %s", 2018, "06", "14", "10:42"); // 生成一段时间戳
        System.out.println(str); // "2018-06-14 10:42"
    }
}
```

### <a name="href3-4">大小写转换</a> ###

1. `str.toUpperCase()`: 转换大写，然后返回一个字符串;
2. `str.toLowerCase()`: 转换小写，然后返回一个字符串。

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str1 = "wjt20";
        String str2 = "WJT20";
        System.out.println(str1.toUpperCase()); // "WJT20"
        System.out.println(str2.toLowerCase()); // "wjt20"
    }
}
```

### <a name="href3-5">检索子串</a> ###

1. `str1.indexOf(charVal|str2[, startIndex])`: 获取字符 charVal 或字符串 str2 第一次出现在 str1 的位置，如未出现返回-1，可以使用可选参数 startIndex，指定操作字符串中开始检索的位置;
2. `str1.lastIndexOf(charVal|str2[, startIndex])`: 用法与 indexOf 差不多，不同之处是 lastIndexOf 是从后往前检索;

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str = "20-20-20";
        System.out.println(str.indexOf("10")); // -1
        System.out.println(str.indexOf("20")); // 0
        System.out.println(str.lastIndexOf("20")); // 6
    }
}
```

### <a name="href3-6">正则匹配</a> ###

根据一个正则字符串判断字符串是否能够匹配，用到了`str.matches(regexp)`方法。

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str = "20-20-20";
        System.out.println(str.matches("[0-9]{2}-[0-9]{2}-[0-9]{2}")); // true
    }
}
```

### <a name="href3-7">连接字符串</a> ###

连接字符串有两种方式: 一种是直接使用"+"拼接，另一种是使用`str1.concat(str2)`方法。

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str1 = "Hello, ";
        String str2 = "world!";
        System.out.println(str1.concat(str2)); // "Hello, world!"
    }
}
```

### <a name="href3-8">替换字符串</a> ###

1. `str1.replace(str2, str3)`: 将 str1 中所有的子串 str2 替换为字符串 str3;
2. `str1.replaceAll(regexp, str2)`: 将 str1 中所有匹配正则表达式 regexp 的子串替换为字符串 str2。

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str = "20-30-40";
        System.out.println(str.replace("20", "**")); // "**-30-40"
        System.out.println(str.replaceAll("[0-9]{2}", "**")); // "**-**-**"
    }
}
```

### <a name="href3-9">拆解字符串</a> ###

1. `str.split(regexp)`: 将正则表达式 regexp 作为分隔符，把字符串 str 拆分为数组返回;
2. `str.substring(beginIndex, endIndex)`: 返回 str 中 beginIndex 位置开始(包括)到 endIndex 位置结束(不包括)之间的子串。

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str = "20-30-40";
        for (String retval: str.split("-")){
            System.out.println(retval); // "20" "30" "40"
        }
        System.out.println(str.substring(0, 5)); // "20-30"
    }
}
```

---

```
ARTICLE_ID : 108
POST_DATE : 2018/09/19
AUTHER : WJT20
```
