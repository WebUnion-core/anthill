
# Android第一行代码读记——Activity(四) #

## 目录 ##

1. [Activity的启动模式](#href1)
2. [standard](#href2)
3. [singleTop](#href3)
4. [singleTask](#href4)
5. [singleInstance](#href5)

## <a name="href1">Activity的启动模式</a> ##

启动模式一共有4种: standard、singleTop、singleTask 和 singleInstance，可以在 AndroidManifest..xml 中通过给 activity 节点指定 android:launchMode 属性来选择启动模式。

## <a name="href2">standard</a> ##

standard 是 Activity 默认的启动模式，在不进行显式指定的情况下，所有活动都会自动使用这种启动模式，在 standard 模式下， 每当启动一个 Activity，它就会在返回栈中入栈，并处于栈顶的位置，对于使用 standard 模式的 Activity，系统不会在乎这个 Activity 是否在返回栈中存在，每次启动都会创建该 Activity 的一个新的实例。

举个例子:

```java
// 其他代码省略
public class MainActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.v("TEST", "onCreate");
		setContentView(R.layout.main);

		Button btn = (Button) findViewById(R.id.button);
		btn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent(MainActivity.this, MainActivity.class);
				startActivity(intent);
			}
		});
	}
}
```

这段代码有一个特殊的地方，那就是在点击按钮之后会启动一个新的 MainActivity 实例，弹出一个"onCreate"信息，印证了 standard 模式的特性。

## <a name="href3">singleTop</a> ##

当 Activity 的启动模式指定为 singleTop 时，在启动 Activity 时如果发现返回栈的栈顶已经是该活动，则认为可以直接使用它，不会再创建新的 Activity 实例。

要验证 singleTop 的这个特性，只要保持 MainActivity 的内容不变，修改 AndroidManifest.xml 的内容:

```xml
<!-- 其他代码省略 -->
<activity
	android:label="@string/app_name"
	android:name=".MainActivity"
	android:launchMode="singleTop" >
	<intent-filter >
		<action android:name="android.intent.action.MAIN" />
		<category android:name="android.intent.category.LAUNCHER" />
	</intent-filter>
</activity>
```

这里将"android:launchMode"属性定义为了"singleTop"，接着再次启动程序，然后点击一次按钮，你会发现不再启动新的 MainActivity，只要点击一次 Back 就销毁了 MainActivity。

## <a name="href4">singleTask</a> ##

singleTop 的处理对象是处于栈顶的 Activity，当返回栈顶部的 Activity 放置顺序为"A - B - A"时，第二个 A 仍然会是一个全新的 Activity 实例，如果想要每个 Activity 只创建一次，那么可以使用 singleTask 启动模式。singleTask 模式下，每次创建 Activity 时系统首先会在返回栈中检查是否存在该 Activity 的实例，如果已经存在则直接使用该实例(这里很像一种设计模式——单例模式的特点)，并把其上的其他 Activity 统统出栈，如果没有发现则创建一个新的 Activity 实例。

示例代码如下:

MainActivity 的内容:

```java
// 其他代码省略
public class MainActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		Button startSecBtn = (Button) findViewById(R.id.start_second_button);
		startSecBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent(MainActivity.this, SecondActivity.class);
				startActivity(intent);
			}
		});
	}
}
```

SecondActivity 的内容:

```java
// 其他代码省略
public class SecondActivity extends Activity {
	protected void onCreate(Bundle saveInstanceState) {
		super.onCreate(saveInstanceState);
		setContentView(R.layout.second_layout);

		Button startMainBtn = (Button) findViewById(R.id.start_main_button);
		startMainBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent(SecondActivity.this, MainActivity.class);
				startActivity(intent);
			}
		});
	}
}
```

MainActivity 和 SecondActivity 的内容很相似，唯一不同之处在于点击按钮时启动的是对方 Activity，在启动程序之前不要忘了设置 AndroidManifest.xml 中 MainActivity 的`android:launchMode`为"singleTask"。启动程序进行以下操作: 点击 MainActivity 中的按钮后会启动 SecondActivity ，之后点击 SecondActivity 内的按钮会切换回前一个 MainActivity 而不会创建新的 MainActivity 实例，最后点击一次 Back 即退出了程序。

## <a name="href5">singleInstance</a> ##

singleInstance 是4种启动模式中最复杂的一种，不同于其他3种启动模式，指定为 singleInstance 的模式的 Activity 会启动一个新的返回栈来管理这个 Activity(出现新的平行维度，必然复杂)。

使用这种启动模式，可以实现以下场景:  程序中的一个 Activity 允许被其他程序调用。这种场景是其他几种启动模式不能办到的。

暂时没想到好的示例，这里就不贴代码了。

---

```
ID         : 26
DATE       : 2018/08/25
AUTHER     : WJT20
TAG        : Android
```
