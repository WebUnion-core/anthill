
# Android第一行代码读记——广播 #

## 目录 ##

1. [广播机制简介](#href1)
2. [接收系统广播](#href2)
	1. [动态注册监听网络变化](#href2-1)
	2. [静态注册广播的步骤](#href2-2)
3. [发送自定义广播](#href3)
	1. [发送标准广播](#href3-3)
	2. [发送有序广播](#href3-4)
4. [本地广播](#href4)

## <a name="href1">广播机制简介</a> ##

Android 广播机制用于进行系统级别的消息通知，Android 中的每个应用程序都可以自行注册广播。发送广播，可以借助 Intent，而接收广播则是利用广播接收器(Broadcast Receiver)。Android 中的广播主要分为两类:

1. 标准广播: 一种完全异步执行的广播，广播放出后，所有广播接收器几乎都同时接收到这条广播消息，这种广播的效率比较高，但需要注意，标准广播是无法被截断的;

2. 有序广播: 有序广播是同步执行的，广播放出后，同一时刻只有一个广播接收器接收到消息，只有这个广播接收器中的逻辑执行完毕后，广播才会继续传递，广播接收器有优先级之分，优先级高的广播接收器可以先接收到广播消息。

## <a name="href2">接收系统广播</a> ##

Android 内置了很多系统级别的广播，比如手机开机完成、电池电量发生变化都会发出一条广播，如果要接收这些广播，就要使用广播接收器。广播接收器可以对自己感兴趣的广播进行注册，当有相应的广播发出时，广播接收器就会接收到该广播，随即执行接收器内部的具体逻辑。常用的注册广播的方式有两种:

1. 动态注册，即在代码中注册;
2. 静态注册，即在 AndroidManifest.xml 中注册。

### <a name="href2-1">动态注册监听网络变化</a> ###

要实现动态注册，首先要创建一个广播接收器(本质是创建一个继承自 BroadcastReceiver 的类)，然后重写父类的`onReceive()`方法即可，`onReceive()`方法会在接收到广播时调用，可以在其中编写具体逻辑。

一个简单的广播接收器(以接收系统发送的网络状况变化广播为例)如下:

```java
/* MainActivity.java */
package com.example.tester;

import com.example.tester.R;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.widget.Toast;

public class MainActivity extends BaseActivity {
	private IntentFilter intentFilter;
	private NetworkChangeReceiver networkChangeReceiver;

	@Override
	protected void onCreate (Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		/* 注册广播接收器的过程 */
		intentFilter = new IntentFilter();
		intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE"); // 添加action，接收系统发送的网络状况变化广播
		networkChangeReceiver = new NetworkChangeReceiver();
		registerReceiver(networkChangeReceiver, intentFilter); // 注册
	}

	protected void onDestroy () {
		super.onDestroy();
		unregisterReceiver(networkChangeReceiver);
	}

	// 继承自BroadcastReceiver的内部类
	class NetworkChangeReceiver extends BroadcastReceiver {

		// 重写onReceive方法，每当网络状况改变即调用
		@Override
		public void onReceive (Context context, Intent intent) {
			Toast.makeText(context, "network change", Toast.LENGTH_SHORT).show();
		}
	}
}
```

### <a name="href2-2">静态注册广播的步骤</a> ###

由于 Eclipse 上找不到好的静态注册广播的实例，后文的发送自定义广播小节再举出具体的静态注册广播实例。先来说明下静态注册广播的步骤:

1. 创建一个继承自 BroadcastReceiver 类的广播接收器类;
2. 在广播接收器类中复写 BroadcastReceiver 类的`onReceive()`方法;
3. AndroidManifest.xml 中添加静态注册广播的配置。

后文将会具体讲述静态注册广播的全过程。

## <a name="href3">发送自定义广播</a> ##

之前说过广播主要分为标准广播和有序广播两种，接下来记录下两种广播具体的区别和发送方式。

### <a name="href3-3">发送标准广播</a> ###

在实现发送广播功能之前，首先静态注册一个广播接收器:

```java
/* StandardBroadcastReceiver.java */
package com.example.tester;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class StandardBroadcastReceiver extends BroadcastReceiver {
	@Override
	public void onReceive (Context context, Intent intent) {
		Toast.makeText(context, "一条自定义广播~~", Toast.LENGTH_SHORT).show();
	}
}
```

这个广播接收器很简单，只是在接收到广播时用 Toast 弹出一条信息，接着，修改 AndroidManifest.xml，修改内容如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.tester"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk android:minSdkVersion="14" />

    <application
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name" >

        <activity
            android:label="@string/app_name"
            android:name=".MainActivity"
            android:launchMode="singleTask" >
            <intent-filter >
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <receiver
            android:name=".StandardBroadcastReceiver"
            android:enabled="true"
            android:exported="true">
	        <intent-filter>
	            <action android:name="com.example.tester.broadcasttest.STANDARD_BROADCAST" />
	        </intent-filter>
	    </receiver>
    </application>

</manifest>
```

application 节点内部有一个 receiver 节点，这就是广播接收器的设置节点，`android:name`指向之前创建的广播接收器类，`android:enabled`和`android:exported`分别表示是否启动广播接收器和是否允许广播接收器接收本程序以外的广播。receiver 内部还有一个 intent-filter 节点，它内部添加了相应的 action，表明广播接收器接收的是一条值为 com.example.tester.broadcasttest.STANDARD_BROADCAST 的广播。

以上是静态注册广播接收器的全过程，接下来先在主 Activity 的 Layout 文件(main.xml)中添加一个按钮:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >


    <Button android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Click me" />

</LinearLayout>
```

然后在主 Activity 中给这个按钮绑定发送广播的程序:

```java
/* MainActivity.java */
package com.example.tester;

import com.example.tester.R;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends BaseActivity {
	@Override
	protected void onCreate (Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		Button btn = (Button) findViewById(R.id.button);
		btn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent("com.example.tester.broadcasttest.STANDARD_BROADCAST");
				sendBroadcast(intent);
			}
		});
	}
}
```

之前说过，发送广播利用的是 Intent 对象，看下 MainActivity.java 可以发现，与发送广播直接相关的仅有两句代码！最后启动程序然后点击按钮，可以看到弹出了一条广播消息:

### <a name="href3-4">发送有序广播</a> ###

发送有序广播很简单，只需要将`sendBroadcast()`方法改为`sendOrderedBroadcast()`方法即可，`sendOrderedBroadcast()`方法接收两个参数，第一个参数是 Intent 实例对象，第二个参数则是表征权限的字符串(通常传入 null 即可):

```java
// 其他代码省略
public class MainActivity extends BaseActivity {
	@Override
	protected void onCreate (Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		Button btn = (Button) findViewById(R.id.button);
		btn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent("com.example.tester.broadcasttest.STANDARD_BROADCAST");
				sendOrderedBroadcast(intent, null);
			}
		});
	}
}
```

广播接收器接收有序广播是有先后顺序的，如何证明这一点？首先，新增一个广播接收器(AnotherBroadcastReceiver.java):

```java
/* AnotherBroadcastReceiver.java */
package com.example.tester;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class AnotherBroadcastReceiver extends BroadcastReceiver {
	@Override
	public void onReceive (Context context, Intent intent) {
		Toast.makeText(context, "另一条自定义广播~~", Toast.LENGTH_SHORT).show();
	}
}
```

这个广播接收器类与之前创建的 StandardBroadcastReceiver 几乎一模一样，唯二不同是名字和 Toast 的信息不同，接着在 AndroidManifest.xml 中设置这个广播接收器:

```xml
<application
	android:icon="@drawable/ic_launcher"
	android:label="@string/app_name" >

	<!-- 其他代码省略 -->

	<receiver
		android:name=".StandardBroadcastReceiver"
		android:enabled="true"
		android:exported="true">
		<intent-filter>
			<action android:name="com.example.tester.broadcasttest.STANDARD_BROADCAST" />
		</intent-filter>
	</receiver>

	<receiver
		android:name=".AnotherBroadcastReceiver"
		android:enabled="true"
		android:exported="true">
		<intent-filter>
			<action android:name="com.example.tester.broadcasttest.STANDARD_BROADCAST" />
		</intent-filter>
	</receiver>
</application>
```

可以发现，配置和 StandardBroadcastReceiver 几乎一模一样，接着启动程序，点击按钮会发现先后有两条 Toast 信息弹出，第一条是 StandardBroadcastReceiver 接收器发出的，第二条是 AnotherBroadcastReceiver 接收器发出的。

之前说过，有序广播的接收是有先后关系的，那么要如何证明有序广播的顺序性呢？证明方法就是设置两个广播接收器的优先级，优先级高的广播接收器会先接收到有序广播，然后让优先级高的广播接收器拦截广播的传递，如果优先级低的广播接收器收不到广播，即证明了有序广播传输的顺序性。

```xml
<!-- 其他代码省略 -->

<receiver
	android:name=".StandardBroadcastReceiver"
	android:enabled="true"
	android:exported="true">
	<intent-filter android:priority="100">
		<action android:name="com.example.tester.broadcasttest.STANDARD_BROADCAST" />
	</intent-filter>
</receiver>
```

以上代码只是给 AndroidManifest.xml 中 StandardBroadcastReceiver 配置内容中的 intent-filter 节点加上了一个`android:priority`属性，这个属性用于设置广播接收器的优先级，设置成100后就保证 StandardBroadcastReceiver 能在 AnotherBroadcastReceiver 之前接收到有序广播。

接着修改 StandardBroadcastReceiver.java 的代码，让其拦截广播的传递:

```java
public class StandardBroadcastReceiver extends BroadcastReceiver {
	@Override
	public void onReceive (Context context, Intent intent) {
		Toast.makeText(context, "一条自定义广播~~", Toast.LENGTH_SHORT).show();
		abortBroadcast();
	}
}
```

拦截广播的传输，只需要调用`abortBroadcast()`方法即可。最后，启动程序后点击按钮，可以发现只弹出了 StandardBroadcastReceiver 发出的 Toast 消息。

## <a name="href4">本地广播</a> ##

从本小节开始，Android 开发 IDE 由 Eclipse 改为了 Android Studio，但主要代码逻辑没有变化。

标准广播和有序广播属于系统全局广播，其特点是发出的广播可以被其他任何应用接收到，这往往会导致不少安全问题，为了解决广播的安全性问题，Android 引入了一套本地广播机制，本地广播只能在当前应用程序内部传递，从而保证了广播的安全性。本地广播的用法并不复杂，主要是利用 LocalBroadcastManager 类，本地广播的实例代码如下:

```java
/* MainActivity.java */
package com.example.wjt20.tester;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends BaseActivity {
    private IntentFilter intentFilter;
    private LocalReceiver localReceiver;
    private LocalBroadcastManager localBroadcastManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        localBroadcastManager = LocalBroadcastManager.getInstance(this); // 创建LocalBroadcastManager实例
        Button btn = (Button) findViewById(R.id.button);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent("com.example.wjt20.tester.LOCAL_BROADCAST");
                localBroadcastManager.sendBroadcast(intent); // 发送广播
            }
        });

        intentFilter = new IntentFilter();
        intentFilter.addAction("com.example.wjt20.tester.LOCAL_BROADCAST");

        localReceiver = new LocalReceiver();
        localBroadcastManager.registerReceiver(localReceiver, intentFilter); // 注册广播接收器
    }

    @Override
    protected void onDestroy () {
        super.onDestroy();
        localBroadcastManager.unregisterReceiver(localReceiver); // 注销广播接收器
    }

	// LocalReceiver内部处理接收到广播的具体逻辑
    class LocalReceiver extends BroadcastReceiver {
        @Override
        public void onReceive (Context context, Intent intent) {
            Toast.makeText(context, "Received local broadcast", Toast.LENGTH_SHORT).show();
        }
    }
}
```

---

```
ID         : 107
DATE       : 2018/09/18
AUTHER     : WJT20
TAG        : Android
```
