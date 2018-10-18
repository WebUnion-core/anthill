
# Android第一行代码读记——数据存储(二)  #

## 目录 ##

## SQLite简介 ##

本篇主要记录 Android 内置的数据库——SQLite 的用法，SQLite 是一款轻量级的关系型数据库，它的运算速度非常快，占用资源很少，通常需要几百 KB 的内存就足够了，因而很适合在移动设备上使用。SQLite 不仅支持标准的 SQL 语法，还遵循了数据库的 ACID 事务。上篇讲到的文件存储和 SharedPreferences 存储只适用于保存一些简单的数据和键值对，当需要存储大量复杂的关系型数据的时候，SQLite 无疑是最佳选择。

## 创建数据库 ##

Android 专门提供了一个 SQLiteOpenHelper 帮助类，借助这个类可以非常简单地对数据库进行创建和升级，SQLiteOpenHelper 是一个抽象类，所以在使用它之前需要创建一个自己的帮助类去继承它，SQLiteOpenHelper 中有两个抽象方法: onCreate() 和 onUpgrade()，通常在帮助类中重写这两个方法，然后分别在这两个方法中去实现创建、升级数据库的逻辑。

SQLiteOpenHelper 中的 getReadableDatabase() 和 getWritableDatabase() 方法都可以创建或打开一个现有的数据库(如果已存在则直接打开，否则直接创建)，并返回一个可对数据库进行读写操作的对象。不同的是，当数据库不可写入的时候(如磁盘空间已满)，getReadableDatabase() 方法返回的对象将以只读的方式打开数据库，而 getWritableDatabase() 则会出现异常。

以下是一个创建名为 Author.db 的数据库实例，首先是建表语句:

```SQL
create table Author (
	id integer primary key autoincrement,
	name text,
	score real,
	age integer,
	info text
)
```

SQLite 不同于其他数据库，其数据类型仅有以下几种:

1. integer: 整形;
2. real: 浮点型;
3. text: 文本类型;
4. blob: 二进制类型。

此外，还可以发现代码中用 primary key 将 id 设为了主键，并用 autoincrement 关键字将 id 设为自增长。

创建表的代码如下(MyDatabaseHelper.java):

```java
package com.example.wjt20.tester;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.widget.Toast;

public class MyDatabaseHelper extends SQLiteOpenHelper {
    public static final String CREATE_AUTHOR = "create table Author("
            + "id integer primary key autoincrement,"
            + "name text"
            + "score real"
            + "age integer"
            + "info text)";

    private Context mContext;

    public MyDatabaseHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
        mContext = context;
    }

    @Override
    public void onCreate (SQLiteDatabase db) {
        db.execSQL(CREATE_AUTHOR);
        Toast.makeText(mContext, "Create succeeded", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onUpgrade (SQLiteDatabase db, int oldVersion, int newVersion) {}
}
```

---

```
ARTICLE_ID : 113
POST_DATE : 2018/10/18
AUTHER : WJT20
```
