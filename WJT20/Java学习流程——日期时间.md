
# Java学习流程——日期时间 #

## 目录 ##

1. [参考链接](#href1)
2. [实例化](#href2)
3. [日期获取与设置](#href3)
    1. [获取](#href3-1)
    2. [设置](#href3-2)
4. [日期比较](#href4)
5. [SimpleDateFormat类](#href5)
    1. [format方法](#href5-1)
    2. [parse方法](#href5-2)
6. [Calendar类](#href6)
    1. [时间常量](#href6-1)
    2. [获取时间](#href6-2)
    3. [设置时间](#href6-3)
    4. [时间运算](#href6-4)

## <a name="href1">参考链接</a> ##

- [Java 日期时间](http://www.runoob.com/java/java-date-time.html)

## <a name="href2">实例化</a> ##

java.util.Date 类封装了当前的日期和时间，实例化一个日期时间对象的语法如下:

`Date date = new Date([millisec])`

其中，可选参数 millisec 表示1970年1月1日起的毫秒数。

示例代码:

```Java
import java.util.*;

public class DateClass {
    public static void main(String[] args) {
        Date date = new Date();
        System.out.println(date.toString()); // "Sat Jun 16 12:27:53 CST 2018"
    }
}
```

## <a name="href3">日期获取与设置</a> ##

### <a name="href3-1">获取</a> ###

1. `date.getTime()`: 返回自 1970 年 1 月 1 日 00:00:00 GMT 以来此 Date 对象表示的毫秒数；
2. `date.toString()`: 将 Date 对象转换为类似"Sat Jun 16 12:27:53 CST 2018"的日期字符串。

示例代码:  

```Java
import java.util.*;

public class DateClass {
    public static void main(String[] args) {
        Date date = new Date();
        System.out.println(date.getTime()); // 1529123707579
        System.out.println(date.toString()); // "Sat Jun 16 12:35:07 CST 2018"
    }
}
```

### <a name="href3-2">设置</a> ###

自定义日期用到了`date.setTime(millisec)`，millisec 是一个毫秒数，date 转化为=毫秒值后再加上 millisec，就是要设置的日期了。

示例代码:

```Java
import java.util.*;

public class DateClass {
    public static void main(String[] args) {
        Date date = new Date();
        long millisec = date.getTime();

        System.out.println(date.toString()); // "Sat Jun 16 12:42:55 CST 2018"
        date.setTime(millisec + (7 * 24 * 60 * 60 * 1000)); // 当前日期加上7天时长
        System.out.println(date.toString()); // "Sat Jun 23 12:42:55 CST 2018"
    }
}
```

## <a name="href4">日期比较</a> ##

日期比较用到了以下4个方法:

1. `date1.before(date2)`: date1 在 date2 之前就返回 true，否则返回 false;
2. `date1.after(date2)`: date1 在 date2 之后就返回 true，否则返回 false;
3. `date1.equals(date2)`: date1 与 date2 相等就返回 true，否则返回 false;
4. `date1.compareTo(date2)`: 如果 date1 在 date2 之前，就返回负数，之后就返回正数，相等就返回0。

示例代码:

```Java
import java.util.*;

public class DateClass {
    public static void main(String[] args) {
        Date date1 = new Date();
        Date date2 = new Date(date1.getTime() + 1000);
        Date date3 = new Date(date1.getTime() - 1000);
        Date date4 = new Date();

        System.out.println(date1.before(date2)); // true
        System.out.println(date1.after(date3)); // true
        System.out.println(date1.equals(date4)); // true

        System.out.println(date1.compareTo(date2)); // -1
        System.out.println(date1.compareTo(date3)); // 1
        System.out.println(date1.compareTo(date4)); // 0
    }
}
```

## <a name="href5">SimpleDateFormat类</a> ##

SimpleDateFormat 是一个以语言环境敏感的方式来格式化和分析日期的类。SimpleDateFormat 允许你选择任何用户自定义日期时间格式来运行。

### <a name="href5-1">format方法</a> ###

format 方法用于格式化日期时间。

示例代码:

```Java
import java.util.*;
import java.text.*;

public class DateClass {
    public static void main(String[] args) {
        Date date = new Date();
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss a E");
        System.out.println(ft.format(date)); // "2018-06-16 14:03:54 下午 星期六"
    }
}
```

日期和时间的格式化编码如下表:

| 字母 | 描述
| :--: | :----------
| *    | 任意类型，即不限制
| G    | 纪元标记
| y    | 四位年份
| M    | 月份
| d    | 一个月的日期
| h    | A.M./P.M. (1~12)格式小时
| H    | 一天中的小时(0~23)
| m    | 分钟数
| s    | 秒数
| S    | 毫秒数
| E    | 星期几
| D    | 一年中的日子
| F    | 一个月中第几周的周几
| w    | 一年中第几周
| W    | 一个月中第几周
| a    | A.M./P.M. 标记
| k    | 一天中的小时(1~24)
| K    | A.M./P.M. (0~11)格式小时
| z    | 时区
| '    | 文字定界符
| "    | 单引号

注意，系统环境的不同，有些日期数据，比如星期(E)、上/下午标记(a)等的显示也会不同，中文系统中会显示成中文，linux 系统中则都是显示英文。

### <a name="href5-2">parse方法</a> ###

parse 方法会把给定的时间模式字符串转换成日期字符串，用法如下:

```Java
import java.util.*;
import java.text.*;

public class DateClass {
    public static void main(String[] args) {
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");

        try {
            System.out.println(ft.parse("2018-06-16")); // "Sat Jun 16 00:00:00 CST 2018"
        } catch (ParseException e) {
            // TODO
        }
    }
}
```

注意，parse 必须放在`try catch`，否则会报错。

## <a name="href6">Calendar类</a> ##

Calendar 类用于设置和获取日期数据的特定部分(年份、月份、小时等等)。创建一个 Calendar 实例的语法如下:

`Calendar cl = Calendar.getInstance(timeParams...)`

用这种方法产生的是一个 GregorianCalendar 对象，所以也可以写成以下形式:

`GregorianCalendar cl = new GregorianCalendar(timeParams...)`

其中，timeParams(可选) 是一个或多个参数，用于设置 GregorianCalendar 对象的初始时间，默认获取的是当前时间。

### <a name="href6-1">时间常量</a> ###

Calendar 类中的以下常量用于访问具体的时间值。

| 常量                  | 描述
| :-------------------: | :----------
| Calendar.YEAR         | 年份
| Calendar.MONTH        | 月份
| Calendar.DATE         | 日期
| Calendar.DAY_OF_MONTH | 日期，和上面的字段意义完全相同
| Calendar.HOUR         | 12小时制的小时
| Calendar.HOUR_OF_DAY  | 24小时制的小时
| Calendar.MINUTE       | 分钟
| Calendar.SECOND       | 秒
| Calendar.DAY_OF_WEEK  | 星期几

### <a name="href6-2">获取时间</a> ###

1. `cl.get(field)`: 获取指定字段(时间常量)的时间值;
2. `cl.getTime()`: 获取日历的当前时间。

示例代码:

```Java
import java.util.*;
import java.text.*;

public class DateClass {
    public static void main(String[] args) {
        GregorianCalendar cl = new GregorianCalendar();
        System.out.println(cl.get(Calendar.YEAR)); // 2018
        System.out.println(cl.getTime()); // "Sat Jun 16 15:51:20 CST 2018"
    }
}
```

### <a name="href6-3">设置时间</a> ###

1. `cl.set(field, val)`: 将 field 代表的时间值设置为 val 值;
2. `cl.setTime(date)`: 将一个 Date 对象设置为时间值。

示例代码如下:

```Java
import java.util.*;
import java.text.*;

public class DateClass {
    public static void main(String[] args) {
        Date date = new Date((new Date()).getTime() + (24 * 60 * 60 * 1000));
        GregorianCalendar cl = new GregorianCalendar();

        cl.set(Calendar.YEAR, 1995);
        System.out.println(cl.getTime()); // "Fri Jun 16 16:03:43 CST 1995"

        cl.setTime(date);
        System.out.println(cl.getTime()); // "Sun Jun 17 16:03:43 CST 2018"
    }
}
```

### <a name="href6-4">时间运算</a> ###

1. `cl.add(field, amount)`: 将 field 代表的时间值增加 amount 值;
2. `cl.roll(field, ifUp)`: 在给定的 field 上添加或减去（上/下）单个时间单元，不更改更大的字段，第二个参数 ifUp 设为 true 表示"加"，设为 false 表示"减"。

示例代码:

```Java
import java.util.*;
import java.text.*;

public class DateClass {
    public static void main(String[] args) {
        GregorianCalendar cl = new GregorianCalendar();
        System.out.println(cl.getTime()); // "Sat Jun 16 16:13:25 CST 2018"
        cl.add(Calendar.YEAR, 1);
        System.out.println(cl.getTime()); // "Sun Jun 16 16:13:25 CST 2019"
        cl.roll(Calendar.MONTH, false);
        System.out.println(cl.getTime()); // "Thu May 16 16:13:25 CST 2019"
    }
}
```

---

```
ID         : 81
DATE       : 2018/06/16
AUTHER     : WJT20
TAG        : Java
```
