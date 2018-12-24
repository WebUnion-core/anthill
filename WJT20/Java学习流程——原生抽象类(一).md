
# Java学习流程——原生抽象类(一) #

## 目录 ##

1. [参考链接](#href1)
2. [原生抽象类的种类](#href2)
3. [Number类](#href3)
    1. [字符串与数值转换](#href3-1)
    2. [精确判断数值相等](#href3-2)
4. [Math类](#href4)
    1. [PI属性与三角函数相关方法](#href4-3)
    2. [舍入运算](#href4-4)
    3. [最大和最小](#href4-5)
    4. [n次方和平方根](#href4-6)
    5. [其他](#href4-7)

## <a name="href1">参考链接</a> ##

- [Java Number & Math 类](http://www.runoob.com/java/java-number.html)

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

---

```
ID         : 78
DATE       : 2018/06/13
AUTHER     : WJT20
TAG        : 
```
