
# Java学习流程——数组篇 #

## 目录 ##

1. [参考链接](#href1)
2. [数组的声明与创建](#href2)
3. [foreach循环](#href3)
4. [函数中使用数组](#href4)
    1. [数组作为函数参数](#href4-1)
    2. [数组作为函数返回值](#href4-2)
5. [多维数组](#href5)
6. [Arrays类](#href6)

## <a name="href1">参考链接</a> ##

- [Java 数组](http://www.runoob.com/java/java-array.html)

## <a name="href2">数组的声明与创建</a> ##

Java 数组中的元素数据类型都是统一的，这和 JavaScript 等语言不通，声明一个数组变量的语法有两种:

1. `dataType[] ary`;
2. `dataType ary[]`。

比较推荐使用第一种方式，可能更为直观一些吧。

创建一个数组有两种方式:

1. `dataType[] ary = new dataType[size]`;
2. `dataType[] ary = { val1, val2, val3, ... }`。

示例代码:

```Java
public class AryClass {
    public static void main(String[] args) {
        char[] charAry = new char[2];
        int[] numAry = { 1, 2, 3 };

        charAry[0] = 'A';
        charAry[1] = 'B';

        // 输出: 'A' 'B'
        for (int i = 0; i < charAry.length; i++) {
            char charVal = charAry[i];
            System.out.println(charVal);
        }

        // 输出: 1 2 3
        for (int j = 0; j < numAry.length; j++) {
            int numVal = numAry[j];
            System.out.println(numVal);
        }
    }
}
```

## <a name="href3">foreach循环</a> ##

上一段实例代码用 for 循环遍历了整个数组，这种方法需要根据下标来获取数组元素，稍微有些麻烦，遍历一个数组，更常用的是使用 foreach 循环，示例代码如下:

```Java
public class AryClass {
    public static void main(String[] args) {
        int[] numAry = { 1, 2, 3 };

        // 输出: 1 2 3
        for (int numVal: numAry) {
            System.out.println(numVal);
        }
    }
}
```

## <a name="href4">函数中使用数组</a> ##

### <a name="href4-1">数组作为函数参数</a> ###

```Java
public class AryClass {
    // 接收一个数组参数，遍历整个数组输出
    public static void output(int[] ary) {
        for (int numVal: ary) {
            System.out.println(numVal);
        }
    }

    public static void main(String[] args) {
        output(new int[]{ 1, 2, 3 });
    }
}
```

### <a name="href4-2">数组作为函数返回值</a> ###

```Java
public class AryClass {
    // 传入多个参数，包装成数组返回
    public static int[] getAry(int num1, int num2) {
        int[] numAry = new int[2];
        numAry[0] = num1;
        numAry[1] = num2;
        return numAry;
    }

    public static void main(String[] args) {
        int[] data = getAry(1, 2);
        for (int num: data) {
            System.out.println(num);
        }
    }
}
```

## <a name="href5">多维数组</a> ##

多维数组可以看成是数组的数组，比如二维数组就是一个特殊的一维数组，其每一个元素都是一个一维数组。创建一个多维数组的语法为(以二维数组为例): `dataType ary[][] = new dataType[array1Length][array2Length]`。

示例代码如下(以二维数组为例):

```Java
public class AryClass {
    // 初始化二维数组
    private static int ary[][] = new int[2][2];

    public static void main(String[] args) {
        AryClass aryClass = new AryClass();

        // 赋值
        aryClass.ary[0][0] = 0;
        aryClass.ary[0][1] = 1;
        aryClass.ary[1][0] = 10;
        aryClass.ary[1][1] = 11;

        // 遍历第一层数组
        for (int i = 0; i < aryClass.ary.length; i++) {
            System.out.println("List " + (i + 1) + ": ");

            // 遍历第二层数组
            for (int item: aryClass.ary[i]) {
                System.out.println("Item: " + item);
            }
        }

    }
}
```

## <a name="href6">Arrays类</a> ##

java.util.Arrays 类封装有一些常用的方法和属性，主要有以下这些:

1. `Arrays.fill(dataType[] ary, dataType val)`: 用 val 的值填充 ary 数组;
2. `Arrays.sort(dataType[] ary)`: 对 ary 中的非数组元素按自然顺序排序;
3. `Arrays.equals(dataType1[] ary1, dataType2[] ary2)`: 判断作为参数的两个数组是否相等。

示例代码:

```Java
import java.util.Arrays; // 需要引入包

public class AryClass {
    public static void main(String[] args) {
        int[] ary1 = new int[3];
        int[] ary2 = { 0, 1, 2 };

        Arrays.fill(ary1, 1); // ary1变为[1, 1, 1]
        System.out.println(Arrays.equals(ary1, ary2)); // false

        // 执行后，ary1变为[2, 1, 0]
        for (int i = 0; i < ary1.length; i++) {
            ary1[i] = ary1.length - i - ary1[i];
        }

        Arrays.sort(ary1); // ary1变为[0, 1, 2]
        System.out.println(Arrays.equals(ary1, ary2)); // true
    }
}
```

---

```
ID         : 79
DATE       : 2018/06/15
AUTHER     : WJT20
TAG        : 
```
