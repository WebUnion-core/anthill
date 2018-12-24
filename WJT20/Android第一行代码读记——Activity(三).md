
# Android第一行代码读记——Activity(三) #

## 目录 ##

1. [返回栈](#href1)
2. [活动状态](#href2)
3. [活动生存期](#href3)
	1. [状态回调](#href3-1)
	2. [生存期](#href3-2)
4. [代码实验](#href4)
	1. [Activity部分](#href4-3)
	2. [Layout部分](#href4-4)
	3. [操作步骤](#href4-5)
5. [数据恢复操作](#href5)
	1. [保存临时数据](#href5-6)
	2. [恢复临时数据](#href5-7)

## <a name="href1">返回栈</a> ##

Android 使用 Task(任务) 对 Activity 进行管理，一个 Task 就是一组存放在栈内的 Activity 的集合，这个栈被称为"返回栈"。每次启动一个新的 Activity，这个 Activity 就会推入返回栈并处于栈顶位置; 而当按下 Back 键或执行 finish 方法时，处于栈顶的 Activity 就会销毁，下一层的 Activity 重新回到栈顶位置。

## <a name="href2">活动状态</a> ##

每个 Activity 在其生命周期中最多可能会有以下4中活动状态:

1.  运行状态: 当一个 Activity 位于返回栈栈顶时，这个 Activity 就处于运行状态，运行状态下的 Activity 是系统最不愿意回收的，因为会带来非常差的用户体验;

2. 暂停状态: 当一个 Activity 离开栈顶但仍可见时，这个 Activity 就处于暂停状态，这种 Activity 其实并不少见，例如对话框式的 Activity 只会占据屏幕的部分区域，这种 Activity 也是系统不愿意回收的，同样会对用户体验带来不利影响;

3. 停止状态: 当一个 Activity 离开栈顶并且完全不可见时，这个 Activity 就处于停止状态，系统仍然会为这种 Activity 保存相应的状态和变量(但并不可靠)，当其他地方需要内存时，处于停止状态的 Activity 有可能会被系统回收;

4. 销毁状态: 当一个 Activity 从返回栈中移除后就处于销毁状态，系统最倾向于回收这种状态下的 Activity，从而保证手机的内存足够充足。

## <a name="href3">活动生存期</a> ##

### <a name="href3-1">状态回调</a> ###

Activity 类中定义了7个回调方法，从而覆盖了 Activity 的生命周期的每一个环节，这7个方法的说明如下:

1. onCreate: 当 Activity 第一次被创建的时候会被调用，可用于 Activity 的初始化操作，比如加载布局、绑定事件等等;

2. onStart: 当 Activity 由不可见变为可见的时候会被调用;

3. onResume: 当 Activity 准备好和用户进行交互的时候会被调用;

4. onPause: 当 Activity 在系统准备去启动或者恢复另一个 Activity 的时候会被调用，通常在这个方法内将一些消耗 CPU 的资源消耗掉，以及保存一些关键数据，但这个方法的执行速度一定要快，不然会影响到新的栈顶 Activity 的使用;

5. onStop: 当 Activity 完全不可见的时候会被调用，与 onPause 不同的是，假如启动的 Activity 是对话框式，即不会占据整个屏幕，则会触发 onPause 而不会触发 onStop;

6. onDestrory: 当 Activity 在被销毁之前会被调用;

7. onRestart: 当 Activity 由停止状态变为运行状态之前会被调用，即 Activity 重新启动了。

### <a name="href3-2">生存期</a> ###

除 onRestart 以外的6个回调方法两两组合，可构成3种生存期:

1. 完整生存期: onCreate 和 onDestrory 之间经历的，就是"完整生存期"，前期进行初始化操作，后期进行释放内存操作;

2. 可见生存期: onStart 和 onStop 方法之间经历的，就是"可见生存期"，此期间内的 Activity 都是对用户可见的，但有可能不能进行交互;

3. 前台生存期: onResume 和 onPause 方法之间经历的，就是"前台生存期"，此期间内的 Activity 都是处于运行状态的，Activity 可以与用户交互，这个生存期内的 Activity 是平时看到和接触最多的。

## <a name="href4">代码实验</a> ##

### <a name="href4-3">Activity部分</a> ###

涉及到的 Activity 主要有三个，分别是: MainActivity(主 Activity)、NormalActivity(普通全屏)和 DialogActivity(对话框非全屏)，三个 Activity 的代码分别为:

1. MainActivity:

	```java
	package com.example.tester;

	import com.example.tester.R;
	import android.app.Activity;
	import android.content.Intent;
	import android.os.Bundle;
	import android.util.Log;
	import android.view.View;
	import android.widget.Button;

	public class MainActivity extends Activity {
		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			setContentView(R.layout.main);

			// onCreate打印信息
			Log.i("TEST", "onCreate");

			// 定义按钮
			Button startNormalBtn = (Button) findViewById(R.id.start_normal_activity);
			Button startDialogBtn = (Button) findViewById(R.id.start_dialog_activity);

			// 绑定事件
			startNormalBtn.setOnClickListener(new View.OnClickListener() {			
				@Override
				public void onClick(View v) {
					Intent intent = new Intent(MainActivity.this, NormalActivity.class);
					startActivity(intent);
				}
			});
			startDialogBtn.setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View v) {
					Intent intent = new Intent(MainActivity.this, DialogActivity.class);
					startActivity(intent);
				}
			});
		}

		protected void onDestroy () {
			super.onDestroy();

			// onDestroy打印信息
			Log.i("TEST", "onDestroy");
		}

		protected void onStart () {
			super.onStart();

			// onStart打印信息
			Log.i("TEST", "onStart");
		}

		protected void onStop () {
			super.onStop();

			// onStop打印信息
			Log.i("TEST", "onStop");
		}

		protected void onResume () {
			super.onResume();

			// onResume打印信息
			Log.i("TEST", "onResume");
		}

		protected void onPause () {
			super.onPause();

			// onPause打印信息
			Log.i("TEST", "onPause");
		}

		protected void onRestart () {
			super.onRestart();

			// onRestart打印信息
			Log.i("TEST", "onRestart");
		}
	}
	```

2. NormalActivity:

	```java
	package com.example.tester;

	import android.app.Activity;
	import android.os.Bundle;

	public class NormalActivity extends Activity {
		protected void onCreate(Bundle saveInstanceState) {
			super.onCreate(saveInstanceState);
			setContentView(R.layout.normal_layout);
		}
	}
	```

3. DialogActivity:

	```java
	package com.example.tester;

	import android.app.Activity;
	import android.os.Bundle;

	public class DialogActivity extends Activity {
		protected void onCreate(Bundle saveInstanceState) {
			super.onCreate(saveInstanceState);
			setContentView(R.layout.dialog_layout);
		}
	}
	```

还需要将三个 Activity 添加到 AndroidManifest.xml 文件中:

```xml
<!-- 其他代码省略 -->
<application
	android:icon="@drawable/ic_launcher"
	android:label="@string/app_name" >

	<activity
		android:label="@string/app_name"
		android:name=".MainActivity" >
		<intent-filter >
			<action android:name="android.intent.action.MAIN" />
			<category android:name="android.intent.category.LAUNCHER" />
		</intent-filter>
	</activity>

	<activity android:name=".NormalActivity"></activity>

	<activity android:name=".DialogActivity"
		android:theme="@android:style/Theme.Dialog"></activity>

</application>
```

这里给 DialogActivity 设置了 Dialog 主题，`@android:style/Theme.Dialog`是 Eclipse 的写法，AndroidStudio 的写法为`@style/Theme.AppCompat.Dialog`。

### <a name="href4-4">Layout部分</a> ###

MainActivity 对应的 Layout 为 main.xml，NormalActivity 对应 normal_layout.xml，DialogActivity 对应 dialog_layout，三者的内容比较简单:

1. main.xml:

	```xml
	<?xml version="1.0" encoding="utf-8"?>
	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
		android:layout_width="fill_parent"
		android:layout_height="fill_parent"
		android:orientation="vertical" >

		<Button
			android:id="@+id/start_normal_activity"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:text="Start normal activity" />

		<Button
			android:id="@+id/start_dialog_activity"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:text="Start dialog activity" />

	</LinearLayout>
	```

	效果如图:

	![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w70.png)

2. normal_layout.xml:

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
			android:text="Normal" />

	</LinearLayout>
	```

	效果如图:

	![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w71.png)

3. dialog_layout.xml:

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
			android:text="Dialog" />

	</LinearLayout>
	```

	效果如图:

	![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w72.png)

### <a name="href4-5">操作步骤</a> ###

1. 初次启动程序，主程序的 onCreate、onStart 和 onResume 都会被调用，可以在控制台看到以下日志:

	![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w73.PNG)

2. 接着点击"Start normal activity"按钮启动 NormalActivity，MainActivity 离开栈顶且完全不可见，onPause 和 onStop 都会被调用:

	![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w74.PNG)

3. 点击 Back 键，返回 MainActivity，此时 onRestart 会被调用，紧随其后是 onStart 和 onResume 的调用:

	![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w75.PNG)

4. 下一步点击"Start dialog activity"按钮启动 DialogActivity，注意此时 MainActivity 仍是可见的，所以调用的只有 onPause:

	![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w76.PNG)

5. 再次点击 Back 键，同理调用的只有 onResume:

	![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w77.PNG)

6. 最后一步是退出整个程序，此时会发现除 onPause 和 onStop 以外，还调用了 onDestrory:

	![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w78.PNG)

## <a name="href5">数据恢复操作</a> ##

假如 MainActivity 中已保存一些数据，紧接着启动 NormalActivity，这个时候 MainActivity 由于系统内存不足而被销毁掉，然后过了一会，用户再点击 Back 键返回 MainActivity，此时 MainActivity 又被重新构建了，假如之前保存在 MainActivity 的那些数据用于页面展示，那么你将看到原本应该由数据填充的部分变为空白，这种情况是很糟糕的。

要解决以上这种场景，可以使用 Activity 中提供的一个名为 onSaveInstanceState 的回调方法，这个方法可以保证在 Activity 被回收之前一定会被调用，因此可以通过这个方法来解决活动被回收时临时数据得不到保存的问题。

### <a name="href5-6">保存临时数据</a> ###

保存临时数据操作如下:

```java
// 其余代码省略
protected void onSaveInstanceState(Bundle outState) {
	super.onSaveInstanceState(outState);
	String tempData = "Data";
	outState.putString("key", tempData);
}
```

onSaveInstanceState 会携带一个 Bundle 类型的参数，Bundle 提供了一系列的方法用于保存数据，比如 putString 方法用于保存字符串数据、putInt 方法用于保存 int 类型数据等等，这些方法的第一个参数都是表示保存数据的"键"，第二个参数则是保存数据的"值"。

### <a name="href5-7">恢复临时数据</a> ###

要达到恢复临时数据的目的，需要对 MainActivity 的 onCreate 方法做一些改造，结果如下:

```java
// 其余代码省略
protected void onCreate(Bundle saveInstanceState) {
	super.onCreate(saveInstanceState);
	setContentView(R.layout.main);

	if (saveInstanceState != null) {
		String tempData = saveInstanceState.getString("key");
		Log.i("TEST", tempData);
	}
}
```

---

```
ID         : 99
DATE       : 2018/08/19
AUTHER     : WJT20
TAG        : Android
```
