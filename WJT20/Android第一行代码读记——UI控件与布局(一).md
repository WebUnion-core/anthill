
# Android第一行代码读记——UI控件与布局(一) #

## 目录 ##

1. [TextView](#href1)
2. [Button](#href2)
3. [EditText](#href3)
4. [ImageView](#href4)
5. [ProgressBar](#href5)
6. [AlertDialog](#href6)

## <a name="href1">TextView</a> ##

TextView 是 Android 中最简单的一个控件，它主要用于展示文本信息。一个简单的 TextView 的 XML 内容如下:

```xml
<!-- 其他代码省略 -->
<TextView
	android:id="@+id/text_view"
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:text="Anything." />
```

以上的 TextView 具有几个基本属性，说明如下:

1. `android:id`: 当前控件的唯一标识符，Activity 可以根据 id 获取到指定的控件，从而进行一连串操作;
2. `android:layout_width`: 设置控件的宽度;
3. `android:layout_height`: 设置控件的高度;
4. `android:text`: 控件显示的文本内容。

这里重点说明下`android:layout_width`和`android:layout_height`的取值，这两者的取值主要有以下几种:

1. `match_parent`: 让当前控件的大小和父布局的大小一样，这是官方推荐的选项;
2. `wrap_content`: 让当前控件的大小刚好能包含里面的内容;
3. `fill_parent`: 定义与 match_parent 相同;
4. 固定值: 可能会有适配问题。

除了以上几个基本属性，TextView 还可以使用更多功能丰富的属性:

1. `android:gravity`: 设置文字的对齐方式，可选值有 top(上)、bottom(下)、left(左)、center(完全居中)、center_vertical(竖直居中)、center_horizontal(水平居中) 等，如果要同时指定多个值，可以用"|"连接起来;
2. `android:textSize`: 设置文字大小，Android 中字体大小使用 sp 为单位;
3. `android:textColor`: 设置文字颜色。

现在对之前的 XML 进行修改，修改后的内容为:

```xml
<!-- 其他代码省略 -->
<TextView
	android:id="@+id/text_view"
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:gravity="center"
	android:textSize="30sp"
	android:textColor="#3456c1"
	android:text="Anything." />
```

效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w81.png)

## <a name="href2">Button</a> ##

Button 是一个常用的交互性控件，其可配置的属性和 TextView 差不多，一个简单的 Button 的 XML 内容如下:

```xml
<!-- 其他代码省略 -->
<Button
	android:id="@+id/button"
	android:layout_width="wrap_content"
	android:layout_height="wrap_content"
	android:text="Click me" />
```

部分系统会将 Button 的文本转换为大写形式，若不想将文本转为大写，可以添加`android:textAllCaps`属性，并将其值设为 false。

既然讲到了 Button，就不得不提起 Button 的点击事件监听程序了，监听 Button 的点击事件主要有两种方式:

1. 匿名类写法注册监听器，即在 Activity 章节常用的写法，代码如下:

	```java
	// 其他代码省略
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		Button btn = (Button) findViewById(R.id.button);
		btn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				// 具体逻辑省略
			}
		});
	}
	```

2. 接口写法注册监听器，代码如下:

	```java
	// 其他代码省略
	public class MainActivity extends BaseActivity implements View.OnClickListener {
		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			setContentView(R.layout.main);

			Button btn = (Button) findViewById(R.id.button);
			btn.setOnClickListener(this);
		}

		@Override
		public void onClick(View v) {
			switch (v.getId()) {
				case R.id.button:
					// 具体逻辑省略
					break;
				default:
					break;
			}
		}
	}
	```

## <a name="href3">EditText</a> ##

EditText 即输入框控件，一个简单的 EditText 的 XML 内容如下:

```xml
<!-- 其他代码省略 -->
<EditText
	android:id="@+id/edit_text"
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:inputType="text"
	android:hint="Default text"
	android:maxLines="2" />
```

这里说明下几个 EditText 特有的属性:

1. `android:inputType`: 输入内容的类型，可选值为 number、phone、text 等等;
2. `android:hint`: 默认显示的文本;
3. `android:maxLines`: 允许扩展的最大行数，当输入内容超过2行时，文本会自动向上滚动，而不会拉伸。

在 Activity 中要如何获取 EditText 的输入内容呢？举个实例:

Activity 内容:

```java
// 其他代码省略
public class MainActivity extends BaseActivity {
	private EditText editText;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		Button btn = (Button) findViewById(R.id.button);
		editText = (EditText) findViewById(R.id.edit_text);

		btn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				String text = editText.getText().toString();
				Toast.makeText(MainActivity.this, text, Toast.LENGTH_SHORT).show();
			}
		});
	}
}
```

Layout 内容:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <EditText
        android:id="@+id/edit_text"
        android:layout_width="match_parent"
        android:inputType="text"
        android:hint="Default text"
        android:layout_height="wrap_content" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Get text" />

</LinearLayout>
```

最终效果:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w82.png)

## <a name="href4">ImageView</a> ##

ImageView 用于在界面上展示图片，通常将图片资源放置在以"drawable"开头的目录下，一个简单的 ImageView 的 XML 内容如下:

```xml
<!-- 其他代码省略 -->
<ImageView
	android:id="@+id/image_view"
	android:layout_width="wrap_content"
	android:layout_height="wrap_content"
	android:src="@drawable/ic_launcher" />
```

以上引用的图片是默认的 Android 启动图标。属性说明:

1. `android:src`: 图片资源路径。

在 Activity 中还可以实现动态更改 ImageView 中的图片，具体操作如下:

```java
// 其他代码省略
public class MainActivity extends BaseActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		ImageView imageView = (ImageView) findViewById(R.id.image_view);
		imageView.setImageResource(R.drawable.w2);
	}
}
```

启动程序可以看到图片变为了自定义的图片:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w83.png)

## <a name="href5">ProgressBar</a> ##

ProgressBar 用于在界面上显示一个进度条，一个简单的 ProgressBar 的 XML 内容如下:

```xml
<!-- 其他代码省略 -->
<ProgressBar
	android:id="@+id/progress_bar"
	android:layout_width="match_parent"
	android:layout_height="wrap_content" />
```

如果要控制控件的可见性，就需要用到`android:visibility`属性，其可选值有: visible(默认值，可见)、invisible(不可见)、gone(不可见且不占据任何空间); 在 Activity 中，可以使用 setVisibility 方法设置控件的可见性，其传参有三种: View.VISIBLE、View.INVISIBLE 和 View.GONE，对应 XML 中`android:visibility`的三种值。

```java
// 其他代码省略
public class MainActivity extends BaseActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		ProgressBar progressBar = (ProgressBar) findViewById(R.id.progress_bar);
		if (progressBar.getVisibility() == View.GONE) {
			// 显示
			progressBar.setVisibility(View.VISIBLE);
		} else {
			// 隐藏
			progressBar.setVisibility(View.GONE);
		}
	}
}
```

此外，可以给设置 style 属性来为 ProgressBar 指定不同风格，例如将 style 设为"?android:attr/progressBarStyleHorizontal"即可将 ProgressBar 指定为水平进度条风格，然后再添加一个`android:max`属性来约束进度条的最大长度:

```xml
<!-- 其他代码省略 -->
<ProgressBar
	android:id="@+id/progress_bar"
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	style="?android:attr/progressBarStyleHorizontal"
	android:max="100" />
```

设置为水平进度条风格后，可以在 Activity 中动态调整进度:

```java
// 其他代码省略
ProgressBar progressBar = (ProgressBar) findViewById(R.id.progress_bar);
int progress = progressBar.getProgress();
progress = progress + 10; // 在当前的进度上加10
progressBar.setProgress(progress);
```

## <a name="href6">AlertDialog</a> ##

AlertDialog 可以在当前的界面上弹出一个对话框，此对话框位于所有界面元素之上，能够屏蔽掉其他控件的交互能力，因此 AlertDialog 一般用于提示一些非常重要的内容或警告信息，AlertDialog 和前面介绍的控件不同，它不需要事先在 XML 文件中进行设置，而是在 Activity 中手动调起，Activity 中对 AlertDialog 的所有操作如下:

```java
// 其他代码省略
public class MainActivity extends BaseActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		AlertDialog.Builder dialog = new AlertDialog.Builder(MainActivity.this);
		dialog.setTitle("Warning!!"); // 设置标题
		dialog.setMessage("You can see me."); // 设置内容
		dialog.setCancelable(false); // 禁用Back键关闭对话框

		// 点击确定按钮
		dialog.setPositiveButton("OK", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				Toast.makeText(MainActivity.this, "Click -> OK", Toast.LENGTH_SHORT).show();
			}
		});

		// 点击取消按钮
		dialog.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				Toast.makeText(MainActivity.this, "Click -> Cancel", Toast.LENGTH_SHORT).show();
			}
		});

		dialog.show(); // 显示对话框
	}
}
```

效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w84.png)

---

```
ARTICLE_ID : 102
POST_DATE : 2018/08/31
AUTHER : WJT20
```
