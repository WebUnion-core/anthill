
# Android��һ�д�����ǡ������ݴ洢(��) #

## Ŀ¼ ##

> �ӱ�ƪ��ʼ�������õ� Android ��Ŀ��ʽ����Ϊ rainfrog������Դ���ϴ��� github����ַΪ: https://github.com/WebUnion-core/rainfrog

## LitePal��� ##

LitePal ��һ�Դ�� Android ���ݿ��ܣ��������˶����ϵӳ��(ORM)��ģʽ����������ƽʱ������õ���һЩ���ݿ⹦�ܽ����˷�װ��ʹ�ò��ñ�д SQL ���Ϳ�����ɸ��ֽ������ɾ�Ĳ�Ĳ�����LitePal ����Ŀ��ַ: https://github.com/LitePalFramework/LitePal��

## ����LitePal ##

LitePal Ӧ���������ϵ�������Ӵ��ĵ�һ�� Android ��Դ���ˣ�˳�����ѧϰһ�� Android ������������������ġ����ȣ��� app/build.gradle �ļ��������ÿ�Դ�������:

```gradle
...
dependencies {
    ...
    compile 'org.litepal.android:core:1.4.1'
}
```

compile �����`org.litepal.android:core`������ָ�������˼��֮���1.4.1���ǰ汾�ţ����°汾�ſ�������Ŀ��ҳ�鿴��������Ҫע�⣬�°汾 gradle �� implementation ������ compile��

��������Ҫ���� litepal.xml �ļ����� app/src/main Ŀ¼���½�һ�� assets Ŀ¼��������·���´��� litepal.xml �ļ�����������:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<litepal>
    <dbname value="RainFrog"></dbname>
    <version value="1"></version>

    <list></list>
</litepal>
```

`<dbname>`��ǩ����ָ�����ݿ�����`<version>`��ǩ����ָ�����ݿ�汾�ţ�`<list>`��ǩ����ָ�����е�ӳ��ģ�͡�

����޸�һ�� AndroidManifest.xml ������Ϊ:

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

��Ҫ�Ǹ� application ������һ�� android:name ���ԡ����ˣ�LitePal �����þ�����ˡ�

---

```
ARTICLE_ID : 115
POST_DATE : 2018/11/17
AUTHER : WJT20
```
