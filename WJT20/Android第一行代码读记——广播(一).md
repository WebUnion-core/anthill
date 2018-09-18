
# Android第一行代码读记——广播(一) #

## 广播机制简介 ##

Android 广播机制用于进行系统级别的消息通知，Android 中的每个应用程序都可以自行注册广播。发送广播，可以借助 Intent，而接收广播则是利用广播接收器(Broadcast Receiver)。Android 中的广播主要分为两类:

1. 标准广播: 一种完全异步执行的广播，广播放出后，所有广播接收器几乎都同时接收到这条广播消息，这种广播的效率比较高，但需要注意，标准广播是无法被截断的;

2. 有序广播: 有序广播是同步执行的，广播放出后，同一时刻只有一个广播接收器接收到消息，只有这个广播接收器中的逻辑执行完毕后，广播才会继续传递，广播接收器有优先级之分，优先级高的广播接收器可以先接收到广播消息。

## 接收系统广播 ##

Android 内置了很多系统级别的广播，比如手机开机完成、电池电量发生变化都会发出一条广播，如果要接收这些广播，就要使用广播接收器。广播接收器可以对自己感兴趣的广播进行注册，当有相应的广播发出时，广播接收器就会接收到该广播，随即执行接收器内部的具体逻辑。常用的注册广播的方式有两种:

1. 动态注册，即在代码中注册;

2. 静态注册，即在 AndroidManifest.xml 中注册。

### 动态注册监听网络变化 ###

要实现动态注册，首先要创建一个广播接收器(本质是创建一个继承自 BroadcastReceiver 的类)，然后重写父类的 onReceive() 方法即可，onReceive() 方法会在接收到广播时调用，可以在其中编写具体逻辑。

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

---

```
ARTICLE_ID : 107
POST_DATE : 2018/09/18
AUTHER : WJT20
```
