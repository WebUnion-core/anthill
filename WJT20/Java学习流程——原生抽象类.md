
# Java学习流程——原生抽象类 #

## 目录 ##

1. [参考链接](#href1)
2. [原生抽象类的种类](#href2)
3. [Number类](#href3)
 [](#href4)   1. 字符串与数值转换
 [](#href5)   2. 精确判断数值相等
4. [Math类](#href6)
 [](#href7)   1. PI属性与三角函数相关方法
 [](#href8)   2. 舍入运算
 [](#href9)   3. 最大和最小
 [](#href10)   4. n次方和平方根
 [](#href11)   5. 其他
5. [Character类](#href12)
 [](#href13)   1. 内置方法
6. [String类型](#href14)
 [](#href15)   1. 获取字符长度
 [](#href16)   2. 创建格式化字符串
 [](#href17)   3. 大小写转换
 [](#href18)   4. 检索子串
 [](#href19)   5. 正则匹配
 [](#href20)   6. 连接字符串
 [](#href21)   7. 替换字符串
 [](#href22)   8. 拆解字符串

## <a name="href1">参考链接</a> ##

- [Java Number & Math 类](http://www.runoob.com/java/java-number.html)
- [Java Character 类](http://www.runoob.com/java/java-character.html)
- [Java String 类](http://www.runoob.com/java/java-string.html)

## <a name="href2">原生抽象类的种类</a> ##

"原生抽象类"是本人自己定义的一个虚构名词，指的是以下几种原生的 Java 抽象类:

1. Number;
2. Math;
3. Character;
4. String。

## <a name="href3">Number类</a> ##

数据类型篇介绍了几种数字类型，其中常用的有`int`、`long`、`double`和`byte`，这些内置的数据类型有各自对应的"包装类"——Integer、Long、Double 和 Byte 等等，而这些包装类都属于抽象类 Number 的子类(Number 类属于 java.lang 包)。

以下是一个使用包装类定义变量的实例:

```Java
public class NativeClass {
    public static void main(String[] args) {
        Integer num = 10; // 看起来和"int num = 10"没有半点区别，实际上是两码事
        num += 10;
        System.out.println(num);
    }
}
```

### <a name="href3-1">字符串与数值转换</a> ###

1. `toString()`: 数值转换为字符串然后返回;
2. `parseInt()`: 字符串转换为 int 类型数值然后返回。

```Java
public class NativeClass {
    public static void main(String[] args) {
        Integer num = 5;
        String str = "5";
        System.out.println(num.toString(num) + 1); // "51"
        System.out.println(num.parseInt(str) + 1); // 6
    }
}
```

### <a name="href3-2">精确判断数值相等</a> ###

`equals`与`==`的区别: `equals`比较的是对象的"内容"，`==`比较的是对象的"地址"，需要举个例子。

```Java
public class NativeClass {
    public static void main(String[] args) {
        Integer num = 5;
        System.out.println(num.equals(5)); // true
    }
}
```

## <a name="href4">Math类</a> ##

一些基本的数学运算方法和属性都封装在 Math 类中，Math 的方法都被定义为`static`形式，通过 Math 类可以在主函数中直接调用。

### <a name="href4-3">PI属性与三角函数相关方法</a> ###

`Math.PI`即 π 的值，是一个常用的数学常量，说到 π，就联系起几个常用的三角函数运算方法: `Math.sin(num)`、`Math.cos(num)`、`Math.tan(num)`等。

```Java
public class NativeClass {
    public static void main(String[] args) {
        System.out.println(Math.PI); // 3.141592653589793
        System.out.println(Math.sin(Math.PI / 2)); // 1.0
        System.out.println(Math.cos(Math.PI)); // -1.0
        System.out.println(Math.tan(Math.PI)); // 0.9999999999999999
    }
}
```

### <a name="href4-4">舍入运算</a> ###

1. `Math.ceil(num)`: 向上舍入，返回结果为 double 类型;
2. `Math.floor(num)`: 向下舍入，返回结果为 double 类型;
3. `Math.round(num)`: 四舍五入，返回结果为 int 类型。

```Java
public class NativeClass {
    public static void main(String[] args) {
        System.out.println(Math.ceil(1.5)); // 2.0
        System.out.println(Math.floor(1.5)); // 1.0
        System.out.println(Math.round(1.5)); // 2
    }
}
```

### <a name="href4-5">最大和最小</a> ###

1. `Math.max(num1, num2)`: 返回 num1 和 num2 中的最大值;
2. `Math.min(num1, num2)`: 返回 num1 和 num2 中的最小值。

```Java
public class NativeClass {
    public static void main(String[] args) {
        System.out.println(Math.max(1, 2)); // 2
        System.out.println(Math.min(1, 2)); // 1
    }
}
```

### <a name="href4-6">n次方和平方根</a> ###

1. `Math.pow(num1, num2)`: num1 的 num2 次方，返回值为 double 类型;
2. `Math.sqrt(num)`: 返回 num 的算术平方根，返回值为 double 类型。

```Java
public class NativeClass {
    public static void main(String[] args) {
        System.out.println(Math.pow(2, 2)); // 4.0
        System.out.println(Math.sqrt(4)); // 2.0
    }
}
```

### <a name="href4-7">其他</a> ###

1. `Math.abs(num)`: 返回绝对值;
2. `Math.random()`: 生成一个随机的大于0小于1的 double 类型数值。

```Java
public class NativeClass {
    public static void main(String[] args) {
        System.out.println(Math.abs(-1)); // 1
        System.out.println(Math.random());
    }
}
```

## <a name="href5">Character类</a> ##

Character 类用于对单个字符进行操作，其在对象中包装一个基本类型 char 的值。

### <a name="href5-8">内置方法</a> ###

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

## <a name="href6">String类型</a> ##

字符串是一种极常用的数据类型，Java 提供了 String 类来创建和操作字符串。构造一个 String 类型对象的方式多种多样，这里不多描述，接下来直接说明 String 类型常用的一些方法和属性。

### <a name="href6-9">获取字符长度</a> ###

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str = "Hello, world!";
        System.out.println(str.length()); // 13
    }
}
```

### <a name="href6-10">创建格式化字符串</a> ###

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

### <a name="href6-11">大小写转换</a> ###

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

### <a name="href6-12">检索子串</a> ###

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

### <a name="href6-13">正则匹配</a> ###

根据一个正则字符串判断字符串是否能够匹配，用到了`str.matches(regexp)`方法。

```Java
public class NativeClass {
    public static void main(String[] args) {
        String str = "20-20-20";
        System.out.println(str.matches("[0-9]{2}-[0-9]{2}-[0-9]{2}")); // true
    }
}
```

### <a name="href6-14">连接字符串</a> ###

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

### <a name="href6-15">替换字符串</a> ###

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

### <a name="href6-16">拆解字符串</a> ###

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
ARTICLE_ID : 78
POST_DATE : 2018/06/13
AUTHER : WJT20
```
