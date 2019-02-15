
## Android第一行代码读记——Activity(五) ##

## 目录 ##

1. [获取Activity的名字](#href1)
2. [随时随地退出Activity](#href2)
3. [启动Activity的最佳写法](#href3)

## <a name="href1">获取Activity的名字</a> ##

首先创建一个 BaseActivity，不需要将其注册到 AndroidManifest.xml 中，其内容如下:

```java
package com.example.tester;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

public class BaseActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.i("SHOW_ACTIVITY_NAME", getClass().getSimpleName()); // getClass().getSimpleName()用于获取Activity名称
	}
}
```

注意，Eclipse 中继承的是 Activity，而 AndroidStudio 中继承的是 AppCompatActivity，接着让所有的 Activity 继承 BaseActivity，如:

```java
package com.example.tester;

import com.example.tester.R;
import android.os.Bundle;

public class MainActivity extends BaseActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
	}
}
```

最后启动一下程序，可以看到 LogCat 中打印了每个 Activity 的名字，如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w80.PNG)

## <a name="href2">随时随地退出Activity</a> ##

如果返回栈中存在多个堆叠的 Activity，要从栈顶 Activity 回到最前面的 Activity，需要点击多次的 Back 键。接下来来做一个快速注销程序的实例。

假如 MainActivity 中有一个按钮，点击后可以启动 SecondActivity，SecondActivity 中有一个"clear"按钮，点击之后直接退出程序并彻底杀死进程。要实现这个功能，首先要创建一个专门的集合类对所有的 Activity 进行管理，代码如下:

```java
package com.example.tester;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;

public class ActivityCollector {
	public static List<Activity> activities = new ArrayList<Activity>();

	public static void addActivity(Activity activity) {
		activities.add(activity);
	}

	public static void removeActivity(Activity activity) {
		activities.remove(activity);
	}

	public static void finishAll() {
		for (Activity activity : activities) {
			if (!activity.isFinishing()) {
				activity.finish();
			}
		}
		activities.clear();
		android.os.Process.killProcess(android.os.Process.myPid()); // 杀死当前程序的进程
	}
}
```

ActivityCollector 是集合类的名称，下文称其为活动管理器，在其内部，创建了一个 List 来暂存 Activity，然后提供了 addActivity、removeActivity 和 finishAll 三个方法，分别用于对 List 进行添加单个 Activity、删除单个 Activity 和移除所有 Activity 操作。

在 finishAll 方法内部，`activities.clear()`清除了所有 Activity，之后先执行`android.os.Process.myPid()`方法获取当前进程 id，然后将进程 id 传给`android.os.Process.killProcess()`方法来杀死该进程。

接下来需要改造下上一章节编写的 BaseActivity:

```java
// 其他代码省略
public class BaseActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.i("SHOW_ACTIVITY_NAME", getClass().getSimpleName());
		ActivityCollector.addActivity(this);
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		ActivityCollector.removeActivity(this); // 从活动管理器里移除当前Activity
	}
}
```

这里需要在 onCreate 和 onDestroy 中分别调用 addActivity 和 removeActivity 方法来让 ActivityCollector 实时更新。

MainActivity 启动 SecondActivity 的代码这里就不贴出了，接下来编写 SecondActivity 的内容:

```java
package com.example.tester;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class SecondActivity extends BaseActivity {
	protected void onCreate(Bundle saveInstanceState) {
		super.onCreate(saveInstanceState);
		setContentView(R.layout.second_layout);

		Button clearAllBtn = (Button) findViewById(R.id.clear_all_button);
		clearAllBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				ActivityCollector.finishAll();
			}
		});
	}
}
```

首先，SecondActivity 需要继承 BaseActivity，之后才能使用 ActivityCollector 封装的方法，之后在 clearAllBtn 点击事件侦听程序中执行 finishAll 方法。

最后启动下程序，在点击"clear"按钮后，整个程序自动销毁，进程也会被杀死。

## <a name="href3">启动Activity的最佳写法</a> ##

最简单的启动 Activity 写法如下:

```java
// 其他代码省略
Intent intent = new Intent(MainActivity.this, SecondActivity.class);

// 两个传参
intent.putExtra("name", "wjt20");
intent.putExtra("id", "020");

startActivity(intent);
```

如果是单人开发，这种写法完全没有问题，但假如说 SecondActivity 之前不是你开发的(由你接手后续开发工作)，你自然不知道启动这个 Activity 时需要传什么参数过去，这个时候应该怎么办呢？其实解决方法很简单，只需要对 SecondActivity 做一点改造:

```java
public class SecondActivity extends BaseActivity {
	protected void onCreate(Bundle saveInstanceState) {
		super.onCreate(saveInstanceState);
		setContentView(R.layout.second_layout);
	}

	// 其他代码省略

	public static void actionStart(Context context, String name, String id) {
		Intent intent = new Intent(context, SecondActivity.class);
		intent.putExtra("name", name);
		intent.putExtra("id", id);
		context.startActivity(intent);
	}
}
```

以上代码在 SecondActivity 内部定义了一个 actionStart 方法，其内部完成了 Intent 的构建和传参的设置。这样写的好处是: 所需的数据可以很清晰地体现出来、启动 Activity 的代码变得简明清晰。启动 Activity 只要这么做:

```java
// 其他代码省略
public class MainActivity extends BaseActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		Button startSecBtn = (Button) findViewById(R.id.start_second_button);
		startSecBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				SecondActivity.actionStart(MainActivity.this, "wjt20", "020");
			}
		});
	}
}
```

仅需一句代码即可完成启动 Activity 的操作。

---

```
ID         : 30
DATE       : 2018/08/25
AUTHER     : WJT20
TAG        : Android
```
