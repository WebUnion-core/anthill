
# Android第一行代码读记——内容提供器 #

## 目录 ##

1. [什么是内容提供器](#href1)
2. [什么是运行时权限](#href2)
3. [运行时申请权限实践](#href3)
4. [访问其他程序中的数据](#href4)
5. [创建内容提供器的步骤](#href5)

## <a name="href1">什么是内容提供器</a> ##

内容提供器(Content Provider)主要用于在不同的应用程序之间实现数据共享的功能，它提供了一套完整的机制，允许一个程序访问另一个程序中的数据，同时还能保证被访数据的安全性。

不同于文件存储和 SharedPreferences 存储中的两种全局可读写操作模式，内容提供器可以选择只对哪一部分数据进行共享，从而保证我们程序中的隐私数据不会有泄露风险。

## <a name="href2">什么是运行时权限</a> ##

Android 的权限机制从第一个版本开始就已经存在，但其实之前 Android 的权限机制在保护用户安全和隐私等方面起到的作用比较有限，直到 Android 6.0 系统中引入运行时权限这个功能，用户的安全与隐私才得到更好的保护。

回顾之前的学习内容，我们第一次接触到 Android 权限是在"广播"那一系列的记录，那时为了访问系统的网络状态以及监听开机广播，于是在 AndroidManifest 文件中添加了两句权限说明:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.webunion.rainfrog">

    <!-- 权限声明 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    ...
</manifest>
```

两句权限声明的作用分别是开启系统网络状态和监听开机广播的权限，如果不声明这两个权限，程序将会失灵。添加这两个权限后，Android 6.0以下版本的系统安装我们的程序时会给出"查看网络连接"和"开机启动"这两个权限提醒，用户选择安装应用的同时，也就是同意了为应用提供所声明的权限。

然而拒绝开放某个权限就等于拒绝安装这个应用，这样就导致应用开发方"店大欺客"的现象，"你不给我提供这个权限，我就不让你使用我们的产品"，所幸 Android 6.0 系统加入了运行时权限功能，也就是说，用户不需要在安装软件的时候一次性授权所有申请的权限，而是可以在软件的使用过程中再对某项权限申请进行授权，这时如果拒绝某项授权，仍然可以使用这个应用的其他功能。

但是这样又出现一个问题，在使用应用的过程中，用户可能要不停地授权，这样就显得有些烦琐。Android 是如何解决这个问题的呢？首先，将权限归为两类: 普通权限和危险权限(其实还有第三类权限，但用得较少，这里不加详述)，普通权限指的是那些不会直接威胁到用户的安全和隐私的权限，系统会自动对这部分权限申请进行授权，无需用户手动操作。危险权限则是指那些可能会触及用户隐私或者对设备安全性造成影响的权限，对于这部分权限申请，必须要由用户手动点击授权才可以，否则程序就无法使用相应的功能。

危险权限仅有以下几种(剩余的即为普通权限):

| 权限组名 | 权限名 |
| :-----: | :-----: |
| CALENDAR | READ_CALENDAR,<br/>WRITE_CALENDAR |
| CAMERA | CAMERA |
| CONTACTS | READ_CONTACTS,<br/>WRITE_CONTACTS,<br/>GET_ACCOUNTS |
| LOCATION | ACCESS_FINE_LOCATION,<br/>ACCESS_COARSE_LOCATION |
| MICROPHONE | RECORD_AUDIO |
| PHONE | READ_PHONE_STATE,<br/>CALL_PHONE,<br/>READ_CALL_LOG,<br/>WRITE_CALL_LOG,<br/>ADD_VOICEMAIL,<br/>USE_SIP,<br/>PROCESS_OUTGOING_CALLS |
| SENSORS | BODY_SENSORS |
| SMS | SEND_SMS,<br/>RECEIVE_SMS,<br/>READ_SMS,<br/>RECEIVE_WAP_PUSH,<br/>RECEIVE_MMS |
| STORAGE | READ_EXTERNAL_STORAGE,<br/>WRITE_EXTERNAL_STORAGE |

需要注意一下，每个危险权限都有一个权限组，进行运行时权限处理时使用的是权限名，用户一旦同意授权，那么该权限所对应的权限组中所有的其他权限也会同时被授权。

## <a name="href3">运行时申请权限实践</a> ##

首先，在我们的 Rainfrog 应用中申请危险权限，这里就以申请 CALL_PHONE 权限为例，CALL_PHONE 权限是编写拨打电话功能的时候需要声明的，因为拨打电话会涉及用户手机的资费问题，因而被列为了危险权限。

首先在 layout 中添加一个按钮:

```xml
...
<Button
    android:id="@+id/call_button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Call"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
...
```

在 Activity 中给按钮添加点击事件，当点击按钮时去触发拨打电话的逻辑:

```java
...
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    Button callBtn = (Button) findViewById(R.id.call_button);
    callBtn.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            try {
                Intent intent = new Intent(Intent.ACTION_CALL);
                intent.setData(Uri.parse("tel:1008611"));
                startActivity(intent);
            } catch (SecurityException e) {
                e.printStackTrace();
            }
        }
    });
}
```

首先在按钮的点击事件内部定义了一个隐式 Intent，Intent 的 action 指定为 Intent.ACTION_CALL，这是一个系统内置的打电话的动作，然后 setData() 内部指定协议为"tel"，号码为"1008611"，Intent.ACTION_CALL 必须声明权限才能拨打电话，所以此时点击按钮是不会有任何反应的。

接下来还要在 AndroidManifest.xml 文件中声明权限:

```xml
...
<uses-permission android:name="android.permission.CALL_PHONE" />
```

再次启动程序，点击按钮，可以发现还是不能自动拨打电话，仔细看监控台可以发现报出"Permission Denial"错误，意为权限被禁止，这是因为6.0以上系统在使用危险权限时都必须进行运行时权限处理，这时候需要修改下 Activity 的内容为:

```java
public class MainActivity extends BaseActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button callBtn = (Button) findViewById(R.id.call_button);
        callBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
                    // 如果未授权，则弹出授权弹窗
                    ActivityCompat.requestPermissions(
                        MainActivity.this,
                        new String[]{ Manifest.permission.CALL_PHONE },
                        1
                    );
                } else {
                    // 如果已授权，直接拨号
                    call();
                }
            }
        });
    }

    // 拨打电话的方法
    private void call () {
        try {
            Intent intent = new Intent(Intent.ACTION_CALL);
            intent.setData(Uri.parse("tel:1008611"));
            startActivity(intent);
        } catch (SecurityException e) {
            e.printStackTrace();
        }
    }

    // 监听授权操作结果
    @Override
    public void onRequestPermissionsResult (int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case 1:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // 选择接受授权，之后自动拨号
                    call();
                } else {
                    // 选择拒绝授权
                    Toast.makeText(this, "已禁止授权", Toast.LENGTH_SHORT).show();
                }
                break;
            default:
        }
    }
}
```

检查授权情况使用的是`ContextCompat.checkSelfPermission()`方法，接收两个参数，第一个参数是 Content，第二个参数是具体的权限名。申请权限使用的是`ActivityCompat.requestPermissions()`方法，接收三个参数，第一个参数是 Activity 实例，第二个参数是一个保存申请权限名的 String 数组，第三个参数是请求码，只要是一个唯一值即可。调用申请权限的方法后会自动弹出一个对话框(如下图)，不管选择拒绝还是同意授权，最终都会回调到`onRequestPermissionsResult()`方法中，授权结果封装到 grantResults 参数当中，之后根据授权结果进行对应的操作。

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w103.png)

## <a name="href4">访问其他程序中的数据</a> ##

内容提供器的用法一般有两种，一种是使用现有的内容提供器来读取和操作相应程序中的数据，另一种是创建自己的内容提供器给我们自己的数据提供外部访问接口。

如果一个应用程序通过内容提供器对其数据提供了外部访问接口，那么任何其他的应用程序就都可以对这部分数据进行访问。Android 系统中自带的电话簿、短信、媒体库等程序都提供了类似的访问接口，这就使得第三方应用程序可以充分地利用这部分数据来实现更好的功能。

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

## <a name="href5">创建内容提供器的步骤</a> ##

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
    public static final int TABLE1_DIR = 0; // 表示访问table1表中的所有数据
    public static final int TABLE1_ITEM = 1; // 表示访问table1表中的单条数据
    public static final int TABLE2_DIR = 2; // 表示访问table2表中的所有数据
    public static final int TABLE2_ITEM = 3; // 表示访问table2表中的单条数据
    private static UriMatcher uriMatcher;

    static {
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH); // 创建UriMatcher实例

        // 调用addURI()方法将期望匹配的内容URI格式传递进去
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

`insert()`、`update()`、`delete()`等方法和`query()`一样都会携带Uri参数，都可以利用 UriMatcher 的`match()`方法判断出调用方法期望访问的是哪张表，再对该表中的数据进行相应的操作。

所有内容提供器都必须提供一个名为`getType()`方法，它用于获取Uri对象所对应的MIME类型。一个内容URI所对应的MIME字符串主要由3部分组成，Android 对这3个部分做了如下格式规定:

1. 必须以vnd开头;
2. 如果内容URI以路径结尾，则后接`android.cursor.dir/`，如果内容URI以id结尾，则后接`android.cursor.item/`;
3. 最后接上`vnd.<authority>.<path>`。

`content://com.webunion.rainfrog.provider/table1`这个URI对应的MIME类型为: `vnd.android.cursor.dir/vnd.com.webunion.rainfrog.provider.table1`。

`content://com.webunion.rainfrog.provider/table1/1`这个URI对应的MIME类型为: `vnd.android.cursor.item/vnd.com.webunion.rainfrog.provider.table1`。

继续修改 MyProvider 的内容以实现`getType()`方法中的逻辑:

```java
...
public class MyProvider extends ContentProvider {
    ...
    @Override
    public String getType(Uri uri) {
        switch (uriMatcher.match(uri)) {
            case TABLE1_DIR:
                return "vnd.android.cursor.dir/vnd.com.webunion.rainfrog.provider.table1";
            case TABLE1_ITEM:
                return "vnd.android.cursor.item/vnd.com.webunion.rainfrog.provider.table1";
            case TABLE2_DIR:
                return "vnd.android.cursor.dir/vnd.com.webunion.rainfrog.provider.table2";
            case TABLE2_ITEM:
                return "vnd.android.cursor.item/vnd.com.webunion.rainfrog.provider.table2";
            default:
                return null;
        }
    }
}
```

至此，一个完整的内容提供器就创建完成了。

---

```
ARTICLE_ID : 119
POST_DATE : 2018/11/28
AUTHER : WJT20
```
