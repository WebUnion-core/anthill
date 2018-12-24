
# Android第一行代码读记——Activity(二) #

## 目录 ##

1. [配置多个Activity](#href1)
2. [Intent](#href2)
    1. [显式Intent](#href2-1)
    2. [隐式Intent](#href2-2)
    3. [更多隐式Intent的用法](#href2-3)
3. [向下一Activity传递数据](#href3)
4. [返回数据给上一Activity](#href4)

## <a name="href1">配置多个Activity</a> ##

首先在主 Activity(我的主 Activity 名为 BlackSandActivity，不要吐槽名字\-\_\-) 的同级目录下创建另一个 Activity 文件，名为 SecondActivity.java，并且 SecondActivity 需要继承主 Activity，其内容如下:

```java
package com.wjt20.black_sand;

import android.os.Bundle;

public class SecondActivity extends BlackSandActivity {
	protected void onCreate(Bundle saveInstanceState) {
		super.onCreate(saveInstanceState);
		setContentView(R.layout.second_layout);
	}
}
```

其中 second_layout 是引入的第二个布局，放置在"res/layout"下，与 main.xml 文件同级，其内容如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello." />

</LinearLayout>
```

接着还要将新建的 Activity 注册到 AndroidManifest.xml 之中，内容如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.wjt20.black_sand"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk android:minSdkVersion="14" />

    <application
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name" >
        <activity
            android:label="@string/app_name"
            android:name=".BlackSandActivity" >
            <intent-filter >
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android:name=".SecondActivity"></activity>
    </application>

</manifest>
```

SecondActivity 不是主 Activity，所以不需要配置 intent-filter 节点内容，至此，第二个 Activity 就配置完成了。

## <a name="href2">Intent</a> ##

前一章节说明了第二个 Activity 的配置，但是，光配置完 Activity 还不行，接下来还要启动这个 Activity，这就要用到 Intent 了。

Intent 是 Android 程序中各组件之间进行交互的一种重要方式，它不仅可以指明当前组件想要执行的动作，还可以在不同组件之间传递数据。Intent 一般可被用于启动 Activity 以及发送广播等场景。Intent 大致可以分为两种: 显式 Intent 和隐式 Intent。

### <a name="href2-1">显式Intent</a> ###

Intent 有多个构造函数的重载，其中一个是`Intent(Context packageContext, Class<?> cls)`(我不知道这是个什么)。这个构造函数接收两个参数，第一个参数 Context 要求提供一个启动 Activity 的上下文，第二个参数 Class 则是指定想要启动的目标活动。这种创建 Intent 的方式可以明显、直接地表达我们的"意图"，称为"显式 Intent"。

要使用 Intent，就要用到 Activity 类中提供的 startActivity 方法，这个方法是专门用于启动 Activity 的，它接收一个 Intent 参数，只要将创建的 Intent 传入 startActivity 方法就可以启动目标活动了。

```java
package com.wjt20.black_sand;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class BlackSandActivity extends Activity {
    @Override
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        Button btn1 = (Button) findViewById(R.id.button1);

        btn1.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				Intent intent = new Intent(BlackSandActivity.this, SecondActivity.class);
				startActivity(intent);
			}
		});
    }
}
```

以上代码在主 Activity 中给按钮绑定了一个启动 SecondActivity 的点击事件侦听器，在点击事件侦听器的内部，首先创建了 Intent 实例，第一个参数是上下文，这里传的是主 Activity，第二个参数作为目标活动，表达的含义是在 BlackSandActivity 的基础上打开 SecondActivity，接着调用 startActivity 方法执行传入的 Intent 实例。最终的效果是: 在点击按钮后将立刻弹出 SecondActivity，可以看到"Hello."的字样。

### <a name="href2-2">隐式Intent</a> ###

隐式 Intent 则是指定一系列更为抽象的 action 和 category 等信息，然后交由系统去分析这个 Intent，并帮我们找出合适的活动去启动。首先要修改下 ActivityManifest.xml，如下:

```xml
<!-- 其他代码省略 -->
<activity android:name=".SecondActivity">
    <intent-filter>
        <action android:name="com.wjt20.black_sand.ACTION_START" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

action 节点中指明了当前活动可以响应`com.wjt20.black_sand.ACTION_START`这个 action，category 节点中则包含了一些附加的信息，更精确地指明了当前活动能够响应的 Intent 中还可能带有的 category。只有 action 和 category 中的内容同时能够匹配上 Intent 中指定的 action 和 category 时，这个活动才能响应该 Intent。

接着重写主 Activity 中的按钮点击事件侦听器:

```java
// 其他代码省略
Button btn1 = (Button) findViewById(R.id.button1);

btn1.setOnClickListener(new View.OnClickListener() {
	public void onClick(View v) {
		Intent intent = new Intent("com.wjt20.black_sand.ACTION_START");
		startActivity(intent);
	}
});
```

action 和 category 同时匹配才能响应，这里设置了"com.wjt20.black_sand.ACTION_START"和"android.intent.category.DEFAULT"，只不过后者是一种默认的 category，在调用 startActivity 方法时会自动添加到 Intent 中。最终点击按钮的效果与显式 Indent 一样。

每个 Intent 中只能指定一个 action，但却能指定多个 category ，增加多个 category 只要这样做:

```java
// 其他代码省略
Intent intent = new Intent("com.wjt20.black_sand.ACTION_START");
intent.addCategory("com.wjt20.black_sand.SELF_CATEGORY");
startActivity(intent);
```

以上代码使用 addCategory 方法添加了一个自定义的 category。但是实际执行时发现程序崩溃了，原因是还没有将新增加的 category 注册到 AndroidManifest.xml 文件中，注册 category 的代码如下:

```xml
<!-- 其他代码省略 -->
<activity android:name=".SecondActivity">
    <intent-filter>
        <action android:name="com.wjt20.black_sand.ACTION_START" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="com.wjt20.black_sand.SELF_CATEGORY" />
    </intent-filter>
</activity>
```

### <a name="href2-3">更多隐式Intent的用法</a> ###

隐式 Intent 不仅可以启动其内的 Activity，还可以启动其他程序的 Activity，这就使得 Android 多个应用程序之间的功能共享成为了可能。

以调用系统浏览器打开网页这个功能为例:

```java
// 其他代码省略
btn1.setOnClickListener(new View.OnClickListener() {
	public void onClick(View v) {
		Intent intent = new Intent(Intent.ACTION_VIEW);
		intent.setData(Uri.parse("http://www.baidu.com"));
		startActivity(intent);
	}
});
```

`Intent.Action_VIEW`是 Android 系统内置的动作，其常量值为`android.intent.action.VIEW`，接着使用`Uri.parse()`方法将一个网址字符串解析成一个 Uri 对象，再调用 Intent 的 setData 方法将这个 Uri 对象传递进去。最终的效果就是点击按钮后自动调起系统浏览器加载百度首页。

此外，还可以在 intent-filter 节点中再配置一个 data 节点，用于更精确地指定当前 Activity 能够响应什么类型的数据。data 节点中可以配置的内容如下:

1. `android:scheme`: 用于指定数据的协议部分，包括 http、https(两者都是网络协议)、geo(地理位置)和 tel(拨打电话)等;
2. `android:host`: 用于指定数据的域名;
3. `android:port`: 用于指定数据的端口部分;
4. `android:path`: 用于指定域名与端口之后的部分;
5. `android:mimeType`: 用于指定可以处理的数据类型，允许使用通配符。

只有 data 节点中指定的内容和 Intent 中携带的数据完全一致时，当前 Activity 才会响应该 Intent，不过一般不需要在 data 节点中配置过多的内容，比如说，配置`android:scheme`为 http 就可以响应所有 http 协议的 Intent。

## <a name="href3">向下一Activity传递数据</a> ##

Intent 不仅可以启动 Activity，还可以在启动活动时传递数据。原理是先借助 putExtra 方法将要传递的数据暂存在 Intent 中，之后当启动另一个 Activity 之后，再从 intent 中取出数据，示例如下:

主 Activity:

```java
// 其他代码省略
btn1.setOnClickListener(new View.OnClickListener() {
	public void onClick(View v) {
        String data = "2018-08-13 21:52";
		Intent intent = new Intent(BlackSandActivity.this, SecondActivity.class);
		intent.putExtra("date_time", data);
		startActivity(intent);
	}
});
```

SecondActivity:

```java
// 其他代码省略
Intent intent = getIntent();
String data = intent.getStringExtra("date_time");
Toast.makeText(SecondActivity.this, data, Toast.LENGTH_SHORT).show();
```

以上代码，首先在主 Activity(BlackSandActivity) 中将一个取值"2018-08-13 21:52"，键为 date_time 的键值对数据通过 putExtra 方法存入到 intent 中，接着通过 intent 打开 SecondActivity，SecondActivity 通过 getStringExtra 方法取出 intent 存储的 date_time 数据，用 Toast 展示出来，效果如图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w68.png)

## <a name="href4">返回数据给上一Activity</a> ##

intent 不仅可以将数据从上一个 Activity 传递给下一个 Activity，还可以反向将数据传给上一个 Activity，需要注意的是，通过 Back 键或者 finish 并不会启动 Activity 的 Intent 来传递数据。要达到向上一 Activity 传递数据这个目的，需要借助 startActivityForResult 方法，这个方法会在当前 Activity 销毁时返回结果给上一个 Activity，具体代码如下:

主 Activity:

```java
// 其他代码省略
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    Button btn1 = (Button) findViewById(R.id.button1);

    btn1.setOnClickListener(new View.OnClickListener() {
		public void onClick(View v) {
			Intent intent = new Intent(BlackSandActivity.this, SecondActivity.class);
			startActivityForResult(intent, 1);
		}
	});
}

// 重写onActivityResult回调方法   
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	switch (requestCode) {
		case 1:
			if (resultCode == RESULT_OK) {
				String returnedData = data.getStringExtra("max");
				Toast.makeText(BlackSandActivity.this, returnedData, Toast.LENGTH_SHORT).show();
			}
		default:
	}
}
```

SecondActivity:

```java
// 其他代码省略
protected void onCreate(Bundle saveInstanceState) {
	super.onCreate(saveInstanceState);
	setContentView(R.layout.second_layout);

	Button btn2 = (Button) findViewById(R.id.button2);
	btn2.setOnClickListener(new View.OnClickListener() {
		public void onClick(View v) {
			Intent intent = new Intent();
			intent.putExtra("max", "999");
			setResult(RESULT_OK, intent);
			finish();
		}
	});
}
```

在主 Activity 中，点击按钮时先生成 Intent 实例，然后调用 startActivityForResult 方法启动 SecondActivity，此时可以注意到 startActivityForResult 传入的第一个参数是 intent 对象，第二个参数是请求码，只要是一个唯一值即可。

在 onCreate 方法之后，重写了一个名为 onActivityResult 的方法，这个方法会在下一个 Activity 销毁时调用，其带有三个参数分别是: 启动 Activity 时传入的请求码，返回数据时传入的处理结果和返回数据的 Intent。当请求码为"1"时，判断 resultCode 是否为 RESULT_OK(一个常量，表示处理成功)，如果处理成功，则用 getStringExtra 方法获取 Intent 传递来的 max 键对应的值，之后通过 Toast 弹出。

SecondActivity 就是由主 Activity 启动的、所谓的"下一个 Activity"。当点击其中的按钮时，先通过 putExtra 方法将 max 键对应的数据存储到 Intent 中，然后调用 setResult 设置返回结果，这个方法接受两个参数，第一个参数是状态常量(一般使用 RESULT_OK 或 RESULT_CANCLED)，第二个参数则是存储了数据的 Intent 实例，最后通过一个 finish 方法销毁当前 Activity。

假如用户返回上一 Activity 的方式不是调用 finish 手动销毁 Activity，而是通过点击 Back 键返回，这时应该怎么做呢？做法也不复杂，只要重写 SecondActivity 的 onBackPressed 方法即可:

```java
public void onBackPressed() {
	// 内部操作同点击按钮
}
```

最终效果如下:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w69.png)

---

```
ID         : 98
POST       : 2018/08/13
AUTHER     : WJT20
TAG        : Android
```
