
# Android第一行代码读记——UI控件与布局(一) #

## 目录 ##

## TextView ##

TextView 是 Android 中最简单的一个控件，它主要用于展示文本信息。一个简单的 TextView 的 XML 内容如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >
    
    <TextView
        android:id="@+id/text_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Anything." />
    
</LinearLayout>
```

以上的 TextView 具有几个基本属性，说明如下:

1. `id`: 当前控件的唯一标识符，Activity 可以根据 id 获取到指定的控件，从而进行一连串操作;
2. `layout_width`: 设置控件的宽度;
3. `layout_height`: 设置控件的高度;
4. `text`: 控件显示的文本内容。

这里重点说明下 layout_width 和 layout_height 的取值，这两者的取值主要有以下几种:

1. `match_parent`: 让当前控件的大小和父布局的大小一样，这是官方推荐的选项;
2. `wrap_content`: 让当前控件的大小刚好能包含里面的内容;
3. `fill_parent`: 定义与 match_parent 相同;
4. 固定值: 可能会有适配问题。

除了以上几个基本属性，TextView 还可以使用更多功能丰富的属性:

1. `gravity`: 设置文字的对齐方式，可选值有 top(上)、bottom(下)、left(左)、center(完全居中)、center_vertical(竖直居中)、center_horizontal(水平居中) 等，如果要同时指定多个值，可以用"|"连接起来;
2. `textSize`: 设置文字大小，Android 中字体大小使用 sp 为单位;
3. `textColor`: 设置文字颜色。

现在对之前的 XML 进行修改，修改后的内容为:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >
    
    <TextView
        android:id="@+id/text_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:textSize="30sp"
        android:textColor="#3456c1"
        android:text="Anything." />
    
</LinearLayout>
```

效果如下图:


## Button ##

Button 是一个常用的交互性控件，其可配置的属性和 TextView 差不多，一个简单的 Button 的 XML 内容如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Click me" />
        
</LinearLayout>
```

部分系统会将 Button 的文本转换为大写形式，若不想将文本转为大写，可以添加 textAllCaps 属性，并将其值设为 false。

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
	
---

```
ARTICLE_ID : 102
POST_DATE : 2018/08/31
AUTHER : WJT20
```
