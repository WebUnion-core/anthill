
# Android第一行代码读记——数据存储(三) #

## 目录 ##

> 从本篇开始，开发用的 Android 项目正式更名为 rainfrog，并将源码上传至 github，地址为: https://github.com/WebUnion-core/rainfrog

## LitePal简介 ##

LitePal 是一款开源的 Android 数据库框架，它采用了对象关系映射(ORM)的模式，并将我们平时开发最常用到的一些数据库功能进行了封装，使得不用编写 SQL 语句就可以完成各种建表和增删改查的操作。LitePal 的项目地址: https://github.com/LitePalFramework/LitePal。

## 配置LitePal ##

LitePal 应该是做这个系列以来接触的第一个 Android 开源库了，顺便可以学习一下 Android 中是如何引入第三方库的。首先，在 app/build.gradle 文件中声明该开源库的引用:

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

---

```
ARTICLE_ID : 115
POST_DATE : 2018/11/17
AUTHER : WJT20
```
