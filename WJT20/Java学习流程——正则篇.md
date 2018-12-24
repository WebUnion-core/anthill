
# Java学习流程——正则篇 #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [捕获组](#href3)
4. [正则表达式语法](#href4)
5. [Matcher类常用方法](#href5)
    1. [索引](#href5-1)
    2. [返回结果](#href5-2)
    3. [替换](#href5-3)

## <a name="href1">参考链接</a> ##

- [Java 正则表达式](http://www.runoob.com/java/java-regular-expressions.html)

## <a name="href2">介绍</a> ##

- 正则表达式定义了字符串的模式;
- 正则表达式可以用来搜索、编辑或处理文本;
- 正则表达式并不仅限于某一种语言，但是在每种语言中有细微的差别。

其他的请自己百度，Java 中与正则直接关联的有三个包装类(其他的一些类也有使用到正则表达式，例如 String 类等等，[我是传送门](./Java学习流程——原生抽象类.md))，这三个类都位于 java.util.regex 包下，说明如下:

1. Pattern 类: pattern 对象是一个正则表达式的编译表示。Pattern 类没有公共构造方法。要创建一个 Pattern 对象，你必须首先调用其公共静态编译方法，它返回一个 Pattern 对象。该方法接受一个正则表达式作为它的第一个参数;

2. Matcher 类: Matcher 对象是对输入字符串进行解释和匹配操作的引擎。与Pattern 类一样，Matcher 也没有公共构造方法。你需要调用 Pattern 对象的 matcher 方法来获得一个 Matcher 对象;

3. PatternSyntaxException: PatternSyntaxException 是一个非强制异常类，它表示一个正则表达式模式中的语法错误(这个用的较少，本篇就不分析了)。

示例代码:

```Java
import java.util.regex.*;

public class RegExpClass {
    public static void main(String[] args) {
        String str = "100-99-98";
        Boolean ifMatch = Pattern.matches("[0-9]*-[0-9]*-[0-9]*", str); // 第一个参数是正则表达式，第二个参数是检查匹配的目标
        System.out.println(ifMatch);
    }
}
```

## <a name="href3">捕获组</a> ##

捕获组是把多个字符当一个单独单元进行处理的方法，它通过对括号内的字符分组来创建。先看以下代码:

```Java
import java.util.regex.*;

public class RegExpClass {
    public static void main(String[] args) {
        String str = "<p id=\"text\">ABC</p>";
        Pattern ptn = Pattern.compile("(<p.*?>)(.*?)(</p>)"); // 算上整个匹配字符串，共4个组，".*?"是非贪婪模式，获得最短匹配
        Matcher mtr = ptn.matcher(str); // 创建Matcher对象

        if (mtr.find()) {
            System.out.println(mtr.group(0)); // "<p id="text">ABC</p>"
            System.out.println(mtr.group(1)); // "<p id="text">"
            System.out.println(mtr.group(2)); // "ABC"
            System.out.println(mtr.group(3)); // "</p>"
        } else {
            System.out.println("None");
        }
    }
}
```

以上代码先创建了两个实例对象，首先根据正则表达式创建 Pattern 对象(使用 compile 方法)，然后又根据 Pattern 对象和检查匹配的目标字符串创建 Matcher 对象(使用 matcher 方法)，将正则表达式和字符串联系在一起，之后用 Matcher 对象的 find 方法检查正则匹配是否通过，如果不通过则输出"None"，否则就输出各捕获组的匹配结果(一共4个捕获组，使用 group 方法访问)。

捕获组怎么看？上例中的正则表达式为`(<p.*?>)(.*?)(</p>)`，每个括号为依次匹配，每次匹配后剩余的字符串作为下一次匹配的目标，也就是说，第一次匹配`<p.*?>`之后，捕获到的结果为`<p id="text">`，剩余的字符串为`ABC</p>`，对其进行第二次匹配，正则表达式为`.*?`，捕获到的结果为`ABC`，剩余的字符串为`</p>`，最后由正则表达式`</p>`捕获。

注意:

1. `group(0)`是一个特殊的捕获组，捕获的是整个匹配字符串。
2. Java 中有特殊符号的转义要加两个反斜杠，例如 `\d`要写成`\\d`。

## <a name="href4">正则表达式语法</a> ##

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w59.png)

## <a name="href5">Matcher类常用方法</a> ##

### <a name="href5-1">索引</a> ###

1. `mtr.start()`: 返回匹配结果的第一个字符索引位置;
2. `mtr.end()`: 返回匹配结果的最后终止位置，即最后一个字符索引位置加一。

示例代码:

```Java
import java.util.regex.*;

public class RegExpClass {
    public static void main(String[] args) {
        String str = "2018-06-17 14:47 PM";
        String regExp = "\\d*:\\d*";

        Pattern ptr = Pattern.compile(regExp);
        Matcher mtr = ptr.matcher(str);

        if (mtr.find()) {
            System.out.println(mtr.start()); // 11
            System.out.println(mtr.end()); // 16
        } else {
            System.out.println("None");
        }
    }
}
```

### <a name="href5-2">返回结果</a> ###

1. `mtr.find()`: 目标字符串是由有正则匹配到的结果，常用于判断;
2. `mtr.lookingAt()`和`mtr.matches()`: 正则表达式是否匹配整串目标字符串。

示例代码:

```Java
import java.util.regex.*;

public class RegExpClass {
    public static void main(String[] args) {
        String str = "2018-06-17 14:47 PM";
        String regExp = "\\d*:\\d*";

        Pattern ptr = Pattern.compile(regExp);
        Matcher mtr = ptr.matcher(str);

        System.out.println(mtr.find()); // true
        System.out.println(mtr.matches()); // false
        System.out.println(mtr.lookingAt()); // false
    }
}
```

### <a name="href5-3">替换</a> ###

1. `mtr.replaceFirst(rpcVal)`: 将匹配到的第一个字符串替换为 rpcVal;
2. `mtr.replaceAll(rpcVal)`: 将所有匹配到的字符串替换为 rpcVal;

示例代码:

```Java
import java.util.regex.*;

public class RegExpClass {
    public static void main(String[] args) {
        String str1 = "2018-06-17 14:47 PM";
        String str2 = str1;
        String regExp = "\\d*-";

        Pattern ptr = Pattern.compile(regExp);
        Matcher mtr1 = ptr.matcher(str1);
        Matcher mtr2 = ptr.matcher(str2);

        if (mtr1.find() && mtr2.find()) {
            str1 = mtr1.replaceFirst("*-");
            str2 = mtr2.replaceAll("*-");
            System.out.println(str1); // "*-06-17 14:47 PM"
            System.out.println(str2); // "*-*-17 14:47 PM"
        } else {
            System.out.println("None");
        }
    }
}
```

---

```
ID         : 82
DATE       : 2018/06/17
AUTHER     : WJT20
TAG        : 
```
