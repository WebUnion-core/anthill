
# Android第一行代码读记——数据存储(三) #

> 从本篇开始，开发用的 Android 项目正式更名为 rainfrog，并将源码上传至 github，地址为: https://github.com/WebUnion-core/rainfrog

## 目录 ##

1. [LitePal简介](#href1)
2. [配置LitePal](#href2)
3. [创建数据库](#href3)
4. [升级数据库](#href4)
5. [添加数据](#href5)
6. [更新数据](#href6)
7. [删除数据](#href7)
8. [查询数据](#href8)

## <a name="href1">LitePal简介</a> ##

LitePal 是一款开源的 Android 数据库框架，它采用了对象关系映射(ORM)的模式，并将我们平时开发最常用到的一些数据库功能进行了封装，使得不用编写 SQL 语句就可以完成各种建表和增删改查的操作。LitePal 的项目地址: https://github.com/LitePalFramework/LitePal。

## <a name="href2">配置LitePal</a> ##

LitePal 应该是做这个系列以来接触的第一个 Android 开源库了，正好可以学习一下 Android 中是如何引入第三方库的。首先，在 app/build.gradle 文件中声明该开源库的引用:

```gradle
...
dependencies {
    ...
    compile 'org.litepal.android:core:1.4.1'
}
```

compile 后面的`org.litepal.android:core`是引入指定库的意思，之后的1.4.1则是版本号，最新版本号可以在项目主页查看，这里需要注意，新版本 gradle 用 implementation 代替了 compile。

接下来需要配置 litepal.xml 文件，在 app/src/main 目录下新建一个 assets 目录，并在其路径下创建 litepal.xml 文件，内容如下:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<litepal>
    <dbname value="RainFrog"></dbname>
    <version value="1"></version>

    <list></list>
</litepal>
```

`<dbname>`标签用于指定数据库名，`<version>`标签用于指定数据库版本号，`<list>`标签用于指定所有的映射模型。

最后，修改一下 AndroidManifest.xml 的内容为:

```xml
...
<application
    android:name="org.litepal.LitePalApplication"
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:supportsRtl="true"
    android:theme="@style/AppTheme">
    <activity android:name=".MainActivity">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
</application>
```

主要是给 application 配置了一个 android:name 属性。至此，LitePal 的配置就完成了。

## <a name="href3">创建数据库</a> ##

LitePal 采取的是对象关系映射(ORM)的模式，什么是对象关系映射？简单点说，我们使用的编程语言是面向对象语言，而使用的数据库则是关系型数据库，那么将面向对象的语言和面向关系的数据库之间建立一种映射关系，这就是对象关系映射了。有了对象关系映射，我们就再也不用和 SQL 语句打交道了，接下来开始说明如何使用 LitePal 创建数据库。

创建数据库的第一步操作就是定义一个数据类:

```java
package com.webunion.rainfrog;

public class Author {
    private int id;
    private String name;
    private double score;

    public int getId () {
        return id;
    }

    public void setId (int id) {
        this.id = id;
    }

    public String getName () {
        return name;
    }

    public void setName (String name) {
        this.name = name;
    }

    public double getScore () {
        return score;
    }

    public void setScore (double score) {
        this.score = score;
    }
}
```

这是一个典型的 Java bean，在 Author 类中定义了 id、name、score 三个字段，并生成了相应的 getter 和 setter 方法。

下一步需要将 Author 类添加到映射模型列表当中，为此修改下 litepal.xml 文件:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<litepal>
    <dbname value="RainFrog"></dbname>
    <version value="1"></version>

    <list>
        <mapping class="com.webunion.rainfrog.Author" />
    </list>
</litepal>
```

这里使用`<mapping>`标签声明了要配置的映射模型类，注意，class 属性一定要设置完整的类名，如有多个模型类需要映射，配置方法同上。

最后，修改一下 MainActivity.java 的内容:

```java
package com.webunion.rainfrog;
import android.os.Bundle;
import org.litepal.LitePal;

public class MainActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LitePal.getDatabase();
    }
}
```

`LitePal.getDatabase()`执行后就会自动创建数据库，这样子创建数据库的操作就完成了。

## <a name="href4">升级数据库</a> ##

回顾一下使用 SQLiteOpenHelper 升级数据库的操作，那时候提到这种升级数据库的方式有一个很严重的问题，那就是升级数据库的时候需要将原表整个 drop 掉，然后再重新创建，这样做会把造成数据丢失的问题，每次升级数据库，之前表中的数据就丢失了。使用 LitePal 升级数据库完全不必考虑这个问题，而且用法非常简单。

首先修改一下 Author.java 内容，为 Author 类添加一个 age 字段，代码如下:

```java
package com.webunion.rainfrog;

public class Author {
    ...
    private int age;

    ...
    public int getAge () {
        return age;
    }

    public void setAge (int age) {
        this.age = age;
    }
}
```

更新了 Author 类(表)之后，只需要将 litepal.xml 中的版本号加1即可完成升级数据库的操作:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<litepal>
    <dbname value="RainFrog"></dbname>
    <version value="2"></version>
    ...
</litepal>
```

## <a name="href5">添加数据</a> ##

使用 LitePal 添加数据，只需要创建出模型类的实例，再将所有要存储的数据设置好，然后调用一下 save() 方法即可。

首先，Author 类要继承 DataSupport 类，之后才能进行 CRUD 操作:

```Java
package com.webunion.rainfrog;

import org.litepal.crud.DataSupport;

public class Author extends DataSupport {
    ...
}
```

然后在 MainActivity 中编写添加数据的代码:

```Java
package com.webunion.rainfrog;

import android.os.Bundle;
import org.litepal.LitePal;

public class MainActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LitePal.getDatabase();

        // 实例化模型类，调用getter存储数据，最后调用save()方法
        Author author = new Author();
        author.setName("WJT20");
        author.setScore(100.0);
        author.setAge(23);
        author.save();
    }
}
```

save() 方法是从 DataSupport 类继承而来的，在设置完数据后调用 save() 方法便完成了数据添加的操作了。

## <a name="href6">更新数据</a> ##

LitePal 更新数据用到的是 updateAll() 方法，这个方法的参数组合就是一条 SQL Where 语句，实例代码如下:

```Java
...
public class MainActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ...

        // 更新数据
        Author author = new Author();
        author.setScore(95.0);
        author.updateAll("name = ? and age = 23", "WJT20");
    }
}
```

首先使用调用 setScore() 方法将分数设置为95.0，然后调用 updateAll() 方法更新数据库中所有 name 值为"WJT20"且 age 值为23的记录。

如果想要将记录的某个值恢复默认(例如 int 类型的数据默认值为0)，可以使用 LitePal 提供的 setToDefault() 方法，例如把 score 的值恢复默认可以这样做:

```Java
...
Author author = new Author();
author.setToDefault("score");
```

## <a name="href7">删除数据</a> ##

删除数据的做法比较多，这里主要讲下 LitePal 提供的 deleteAll() 方法，例如我们要删除 Author 表中 score 小于60.0的数据:

```Java
...
public class MainActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ...

        DataSupport.deleteAll(Author.class, "score < ", "60.0");
    }
}
```

可以看到，这里是直接调用 DataSupport 类的 deleteAll() 方法，第一个参数"Author.class"指明了操作的表为 Author，之后的参数则是组合成一条 Where 语句。

## <a name="href8">查询数据</a> ##

最后一种操作就是"增删改查"中的"查"，LitePal 提供了许多数据查询的方法，这里主要将以下三个查询方法:

1. findAll(FORM_CLASS): 查询返回的所有数据，返回一个数据 List 集合，参数 FORM_CLASS 指代表名;

2. findFirst(FORM_CLASS): 查询返回的第一条数据，返回值和参数同 findAll();

3. findLast(FORM_CLASS): 查询返回的最后一条数据，返回值和参数同 findAll()。

如果要对返回数据进行筛选，可以再组合以下几个方法实现连缀查询:

1. select(FIELD, ...): 返回的数据只包含参数字段;

2. where(CONDITION): 筛选条件，即组合成 Where 语句;

3. order(ORDER_TYPE): 返回结果的排序方式，例如传参"age desc"表示按照 age 字段降序排序;

4. limit(AMOUNT): 限制返回数据条数;

5. offset(NUMBER): 设置查询结果偏移量。

最后实践以下，以查询 Author 表中年龄大于20的作者名称和年龄，并按年龄升序排序为例:

```Java
package com.webunion.rainfrog;

import android.os.Bundle;
import android.util.Log;
import org.litepal.LitePal;
import org.litepal.crud.DataSupport;
import java.util.List;

public class MainActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 添加三条不同的数据做实验
        Author author1 = new Author();
        author1.setName("WJT20");
        author1.setScore(100.0);
        author1.setAge(23);
        author1.save();

        Author author2 = new Author();
        author2.setName("WJT21");
        author2.setScore(59.0);
        author2.setAge(30);
        author2.save();

        Author author3 = new Author();
        author3.setName("WJT22");
        author3.setScore(70.0);
        author3.setAge(18);
        author3.save();

        // 查询数据
        List<Author> authors = DataSupport.select("name", "age")
                                          .where("age > ?", "20")
                                          .order("age asc")
                                          .find(Author.class);

        Log.i("RAIN_FROG", "Amount: " + authors.size());

        // 遍历打印数据
        for (Author authorItem: authors) {
            Log.d("RAIN_FROG", "Name: " + authorItem.getName() + ", Age: " + authorItem.getAge());
        }
    }
}
```

日志结果为:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w102.PNG)

---

```
ID         : 115
DATE       : 2018/11/17
AUTHER     : WJT20
TAG        : Android
```
