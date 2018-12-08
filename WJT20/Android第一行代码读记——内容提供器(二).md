
# Android第一行代码读记——内容提供器(二) #

## 目录 ##

## 访问其他程序中的数据 ##

内容提供器的用法一般有两种，一种是使用现有的内容提供器来读取和操作相应程序中的数据，另一种是创建自己的内容提供器给我们自己的数据提供外部访问接口。

如果一个应用程序通过内容提供器对其数据提供了外部访问接口，那么任何其他的应用程序就都可以对这部分数据进行访问。Android 系统中自带的电话簿、短信、媒体库等程序都提供了类似的访问接口，这就使得第三方应用程序可以充分地利用这部分数据来实现更好的功能。

### ContentResolver的基础用法 ###

一个应用程序想要访问内容提供器中共享的数据，就一定要借助 ContentResolver 类，可以通过 Context 中的`getContentResolver()`方法获取该类的实例。

ContentResolver 中提供了一系列的方法用于对数据进行CRUD操作，这和 SQLiteDatabase 很像，不同的是，ContentResolver 中的增删改查方法都是不接收表名参数的，而是使用一个Uri参数代替，这个参数被称为内容URI，内容URI给内容提供器中的数据建立唯一标识符，它主要由两部分组成: authority 和path。authority 是用于对不同于的应用程序做区分的，一般为了避免冲突，都会采用程序包名的方式进行命名。path则是用于对同一应用程序中不同的表作区分的，通常都会添加到 authority 的后面。一个标准的Uri的格式为"协议+authority+path"，如:

```
content://com.example.app.provider/table1
```

在得到Uri字符串之后，还需要调用`Uri.parse()`方法将它解析成Uri对象才可以作为参数传入:

```java
Uri uri = Uri.parse("content://com.example.app.provider/table1");
```

接着就可以使用这个Uri对象来查询 table1 表中的数据:

```java
Cursor cursor = getContentResolver().query(
    uri,
    projection,
    selection,
    selectionArgs,
    sortOrder
);
```

参数说明如下:

| query()方法参数 | 对应SQL部分 | 描述 |
| :------------: | :---------: | :--: |
| uri | from table_name | 指定查询某个应用程序下的某一张表 |
| projection | select column1, column2 | 指定查询的列名 |
| selection | where column = value | 指定where的约束条件 |
| selectionArgs | - | 为where中的占位符提供具体的值 |
| sortOrder | order by column1, column2 | 指定查询结果的排序方式 |

查询完成后返回的是一个 Cursor 对象，这时就可以将数据从 Cursor 对象中逐个读取出来了。读取的思路是通过移动游标来遍历 Cursor 的所有行，然后再取出每一行中相应列的数据:

```java
if (cursor != null) {
    while (cursor.moveToNext()) {
        String column1 = cursor.getString(cursor.getColumnIndex("column1"));
        int column2 = cursor.getInt(cursor.getColumnIndex("column2"));
    }
    cursor.close();
}
```

向 table1 表中添加一条数据:

```java
ContentValues values = new ContentValues();
values.put("column1", "text");
values.put("column2", 1);
getContentResolver().insert(uri, values);
```

更新 column1 的值:

```java
ContentValues values = new ContentValues();
values.put("column1", "");
getContentResolver().update(uri, values, "column1 = ? and column2 = ?", new String[]{"text", "1"});
```

删除 column1 的数据:

```java
getContentResolver().delete(uri, "column2 = ?", new String[]{"1"});
```

## 创建自己的内容提供器 ##

### 创建内容提供器的步骤 ###

如果想要实现跨程序共享数据的功能，推荐使用内容提供器，可以通过新建一个类去继承 ContentProvider 的方式来创建一个自己的内容提供器。ContentProvider 类有6个抽象方法，在创建子类时需要将这6个方法进行重写。

首先自定义一个 MyProvider 类继承 ContentProvider 类，其内容如下:

```java
package com.webunion.rainfrog;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;

public class MyProvider extends ContentProvider {
    @Override
    public boolean onCreate() {
        return false;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
        return null;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        return null;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {
        return 0;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        return 0;
    }

    @Override
    public String getType(Uri uri) {
        return null;
    }
}
```

关于这6个抽象方法的详细描述:

1. `onCreate()`: 初始化内容提供器时调用，通常在此完成对数据库的创建和升级等操作，返回 true 表示内容提供器初始化成功，返回 false 则表示失败;

2. `query()`: 从内容提供器中查询数据，查询到的结果存放到 Cursor 对象中;

3. `insert()`: 向内容提供器中添加一条数据，添加完成后返回一个用于表示这条新纪录的URI;

4. `update()`: 更新内容提供器中已有的数据，受影响的行数将作为返回值返回;

5. `delete()`: 从内容提供器中删除数据，被删除的行数将作为返回值返回;

6. `getType()`: 根据传入的内容URI来返回相应的MIME类型。

内容URI的格式主要有以路径结尾和以id结尾两种，以路径结尾就表示期望访问该表中所有的数据，以id结尾就表示期望访问该表中拥有相应id的数据，可以使用通配符的方式分别匹配这两种格式的内容URI，规则如下:

1. `*`: 表示匹配任意长度的任意字符;
2. `#`: 表示匹配任意长度的数字。

所以，一个能够匹配任意表的内容URI格式可写成:

```
content://com.example.app.provider/*
```

而一个能匹配 table 表中任意一行数据的内容URI格式可写成:

```
content://com.example.app.provider/table1/#
```

借助 UriMatcher 类可以轻松地实现匹配内容URI的功能。UriMatcher 中提供了一个`addURI()`方法，这个方法接收3个参数，可以分别把 authority、path 和一个自定义代码传进去，这样当调用 UriMatcher 的`match()`方法时，就可以将一个Uri对象传入，返回值是某个能够匹配这个Uri对象所对应的自定义代码，利用这个代码可以判断出调用方期望访问的是哪张表中的数据了，接下来修改下 MyProvider 的内容:

```java
...

public class MyProvider extends ContentProvider {
    public static final int TABLE1_DIR = 0;
    public static final int TABLE1_ITEM = 1;
    public static final int TABLE2_DIR = 2;
    public static final int TABLE2_ITEM = 3;
    private static UriMatcher uriMatcher;

    static {
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
        uriMatcher.addURI("com.webunion.rainfrog", "table1", TABLE1_DIR);
        uriMatcher.addURI("com.webunion.rainfrog", "table1/#", TABLE1_ITEM);
        uriMatcher.addURI("com.webunion.rainfrog", "table2", TABLE2_DIR);
        uriMatcher.addURI("com.webunion.rainfrog", "table2/#", TABLE2_ITEM);
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
        switch(uriMatcher.match(uri)) {
            case TABLE1_DIR:
                // 查询table1表中的数据
                break;
            case TABLE1_ITEM:
                // 查询table1表中的单条数据
                break;
            case TABLE2_DIR:
                // 查询table2表中的数据
                break;
            case TABLE2_ITEM:
                // 查询table2表中的单条数据
                break;
            default:
                break;
        }
        return null;
    }

    ...
}
```

---

```
ARTICLE_ID : 121
POST_DATE : 2018/12/08
AUTHER : WJT20
```
