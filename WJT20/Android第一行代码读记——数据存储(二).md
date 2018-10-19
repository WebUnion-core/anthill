
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
            + "name text,"
            + "score real,"
            + "age integer,"
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

SQLiteOpenHelper 构造函数有两种写法，其中一种比较常用的写法接收四个参数:

1. Context: 上下文对象，对数据库操作起到关键的作用;
2. 数据库名;
3. 允许在查询数据的时候返回一个自定义的 Cursor，一般都是传 null;
4. 数据库版本号，用于数据库的升级。

onCreate() 中还调用了 execSQL() 方法去执行检表语句，之后弹出一个 Toast 信息。

接着在 MainActivity 中引用 MyDatabaseHelper:

```java
package com.example.wjt20.tester;

import android.os.Bundle;

public class MainActivity extends BaseActivity {
    private MyDatabaseHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        dbHelper = new MyDatabaseHelper(this, "Author.db", null, 1);
        dbHelper.getWritableDatabase();
    }
}
``` 

生成 dbHelper 实例对象后，调用 getWritableDatabase() 方法，第一次进入页面时先检查 Author.db 数据库是否已创建，如未创建，则会自动创建数据库并调用 MyDatabaseHelper 中的 onCreate() 方法，可以看到 Toast 消息; 下次进入页面时数据库已创建，此时不再弹出 Toast。

## 升级数据库 ##

MyDatabaseHelper 中有一个 onUpgrade() 方法，这个方法用于对数据库进行升级，这个方法在整个数据库的管理工作中起到非常重要的作用。

升级数据库的操作是怎样的呢？为什么要用到 onUpgrade() 这个家伙呢？莫急，举个例子，假如现在要在 Author.db 数据库中一个作品表 Works，建表语句如下:

```SQL
create table Works (
	id integer primary key autoincrement,
	name text,
	date text
)
```

然后在 MyDatabaseHelper 中加入建表语句:

```java
...
public class MyDatabaseHelper extends SQLiteOpenHelper {
    public static final String CREATE_AUTHOR = "create table Author("
            + "id integer primary key autoincrement,"
            + "name text,"
            + "score real,"
            + "age integer,"
            + "info text)";

    public static final String CREATE_WORKS = "create table Works("
            + "id integer primary key autoincrement,"
            + "name text,"
            + "date text)";

    private Context mContext;

    public MyDatabaseHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
        mContext = context;
    }

    @Override
    public void onCreate (SQLiteDatabase db) {
        db.execSQL(CREATE_AUTHOR);
        db.execSQL(CREATE_WORKS);
        Toast.makeText(mContext, "Create succeeded", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onUpgrade (SQLiteDatabase db, int oldVersion, int newVersion) {}
}
```

运行程序，发现并没有弹出 Toast，仔细想想，onCreate() 只会在创建数据库时才会调用，之前已经创建过了数据库，所以不会再调用 onCreate()，当然也不会弹出 Toast，那么怎么样才能解决这个问题呢？

解决这个问题的方法有两种，一种是卸载 APP，数据库也会跟着消失，然后重新安装一遍即可，但是，这种做法很极端，为了创建一张表，却要把 APP 卸了重装一遍，好麻烦哟; 另一种方法就是升级数据库，也就是本节的主题，首先要在 onUpgrade() 中添加内容:

```java
...
@Override
public void onUpgrade (SQLiteDatabase db, int oldVersion, int newVersion) {
	db.execSQL("drop table if exists Author");
	db.execSQL("drop table if exists Works");
	onCreate(db);
}
```

onUpgrade() 中的两句 Drop 语句会在 Author 和 Works 表存在的情况下将其删除，防止重新创建表时检测到表已存在而直接报错，接着手动调用 onCreate() 方法，完成建表操作。这么做还不够，在 MainActivity 中初始化 dbHelper 时要将最后一个表征版本的参数更新一下，只要比原本的值大一些即可:

```java
...
@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	dbHelper = new MyDatabaseHelper(this, "Author.db", null, 2);
	dbHelper.getWritableDatabase();
}
```

重启程序，可以看到 Toast 又弹了出来，证明数据库更新成功了。

## 添加数据(增) ##

最基本的数据库操作就是 CRUD，即"增删改查"，操作 SQLite 也是围绕这四种基本操作展开，首先从添加数据开始吧，代码如下:

```java
...
@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
	dbHelper = new MyDatabaseHelper(this, "Author.db", null, 2);
	SQLiteDatabase db = dbHelper.getWritableDatabase();
	ContentValues values = new ContentValues();

	// 组装数据
	values.put("name", "WJT20");
	values.put("score", 99.9);
	values.put("age", 23);
	values.put("info", "From China.");
	db.insert("Author", null, values);
	values.clear();
}
```

---

```
ARTICLE_ID : 113
POST_DATE : 2018/10/18
AUTHER : WJT20
```
