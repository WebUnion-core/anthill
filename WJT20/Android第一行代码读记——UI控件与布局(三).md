
# Android第一行代码读记——UI控件与布局(三) #

## 目录 ##

1. [控件和布局的继承结构](#href1)
2. [自定义布局](#href2)
3. [自定义控件](#href3)

## <a name="href1">控件和布局的继承结构</a> ##

Android 中的各种控件都是直接或间接继承自 View，所有的布局都是继承自 ViewGroup。

View 是 Android 中最基本的一种 UI 组件，它可以在屏幕上绘制一块矩形区域，并能响应这块区域的各种事件，所以，各种控件其实是在 View 的基础上添加各自的功能。

ViewGroup 是一种特殊的 View，它可以包含许多子 View 和子 ViewGroup，是一个用于放置控件和布局的容器。

控件和布局的继承结构图如下:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w89.png)

## <a name="href2">自定义布局</a> ##

为了演示自定义布局的使用，本篇以实现 IOS 上的顶部标题栏布局为例，首先新建一个 XML 布局文件，名为 title_bar.xml，内容如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="#3456c1" >

    <Button
        android:id="@+id/button_back"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="2"
        android:textSize="12dp"
        android:text="Back" />

    <TextView
        android:id="@+id/title"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="6"
        android:gravity="center"
        android:textSize="16dp"
        android:text="Title" />

    <Button
        android:id="@+id/button_menu"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="2"
        android:textSize="12dp"
        android:text="Menu" />

</LinearLayout>
```

接着要在主 Activity 对应的 Layout 中引入这个自定义的布局，修改下主 Activity 的 Layout 文件(main.xml)内容为:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

	<!-- 使用include引入自定义布局 -->
    <include layout="@layout/title_bar" />

</LinearLayout>
```

接着，还需要在主 Activity 中(MainActivity)将 Android 系统自带的标题栏隐藏掉，代码如下:

```java
// 其他代码省略
public class MainActivity extends BaseActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		ActionBar actionBar = getActionBar(); // AndroidStudio中使用getSupportActionBar
		if (actionBar != null) {
			actionBar.hide();
		}
	}
}
```

最后启动程序，效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w90.png)

## <a name="href3">自定义控件</a> ##

上一节将标题栏改造为自定义布局，最终成功在其他布局文件中导入，自定义控件的使用方法与自定义布局类似，这里以将上一节的标题栏改造为自定义控件为例，首先要创建一个 TitleBar 控件类，其内容如下:

```java
// 其他代码省略
public class TitleBar extends LinearLayout {
	public TitleBar (Context context, AttributeSet attrs) {
		super(context, attrs);
		LayoutInflater.from(context).inflate(R.layout.title_bar, this);
	}
}
```

接着在 main.xml 文件中添加此自定义控件:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

	<com.example.tester.TitleBar
	    android:layout_width="match_parent"
	    android:layout_height="wrap_content" />

</LinearLayout>
```

这里需要注意`com.example.tester`是项目包名。下一步，在 TitleBar.java 中给标题栏控件两个按钮注册点击事件:

```java
// 其他代码省略
public class TitleBar extends LinearLayout {
	public TitleBar (Context context, AttributeSet attrs) {
		super(context, attrs);
		LayoutInflater.from(context).inflate(R.layout.title_bar, this);

		Button backBtn = (Button) findViewById(R.id.button_back);
		backBtn.setOnClickListener(new View.OnClickListener() {			
			@Override
			public void onClick(View v) {
				Toast.makeText(getContext(), "Back", Toast.LENGTH_SHORT).show();
			}
		});

		Button menuBtn = (Button) findViewById(R.id.button_menu);
		menuBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				// TODO 自动生成的方法存根
				Toast.makeText(getContext(), "Menu", Toast.LENGTH_SHORT).show();
			}
		});
	}
}
```

最后，启动一下程序，可以看到如下效果:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w91.png)

---

```
ID         : 104
DATE       : 2018/09/10
AUTHER     : WJT20
TAG        : Android
```
