
# Android第一行代码读记——Activity(一) #

## 目录 ##

1. [基本用法](#href1)
    1. [创建Activity](#href1-1)
    2. [创建Layout](#href1-2)
    3. [在AndroidManifest中注册Activity](#href1-3)
2. [在Activity中使用Toast](#href2)
3. [在Activity中使用Menu](#href3)
    1. [菜单文件的编写](#href3-5)
    2. [Activity的编写](#href3-6)

## <a name="href1">基本用法</a> ##

### <a name="href1-1">创建Activity</a> ###

项目中的任何 Activity 的`onCreate()`都应该被重写，在`onCreate()`内部可以写入具体的业务逻辑，一个简单的被重写过的 Activity 是这样的:

```java
...
// 定义public类，继承Activity
public class MainActivity extends Activity {
	// 重写onCreate方法
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}
```

### <a name="href1-2">创建Layout</a> ###

Layout(布局) 用于显示界面内容，Android 中使用xml语法来编写布局文件，一个简单的 Layout 文件(main.xml)如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <Button
        android:id="@+id/button1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Button" />

</LinearLayout>
```

LineaerLayout 是布局根元素，Button 是自定义的按钮元素，其内部包含以下属性:  

1. `android:id`: 元素id，即给当前元素定义的唯一标识符，利用这个属性可以快速锁定到某个我们需要操作的页面元素，`@+id/button1`类似XML中引用资源的写法，其中"button1"即元素的 id 名;  

2. `android:layout_width`: 给元素设置宽度，这里的`wrap_content`表示将元素的宽度设置得和父元素一样;

3. `android:layout_height`: 给元素设置高度，这里的`wrap_content`表示只要元素的高度刚好足够包含里面的内容即可;

4. `android:text`: 给按钮元素设置的显示文本。

编写好布局文件后，需要在 Activity 中加载 Layout:

```java
...
public class MainActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }
}
```

`setContentView()`用于给当前活动加载一个布局，`R.layout.main`指向的就是前面创建的 main.xml 文件。

### <a name="href1-3">在AndroidManifest中注册Activity</a> ###

所有的  Activity 必须在 AndroidMainfest.xml 中注册才会生效:

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
            android:name=".MainActivity" >
            <intent-filter >
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

可以注意到 AndroidMainfest 中有一个 activity 节点，这个节点的`android:name`就是引入的 Activity 的名字(MainActivity)，`.MainActivity`中的"."是路径的缩写形式。

activity 节点内部还有一个 intent-filter 节点，这个节点(及其内部的 action 和 category 节点)指明了程序运行时应该先启动哪个 Activity。

activity 的父节点名为 application，其`android:icon`属性定义了 APP 的展示图标为"ic_launcher"，`adroid:label`属性则定义了标题栏名称及启动器(Launcher)中应用程序显示的名称。

如果 AndroidMainfest 中不包含任何主 Activity 会怎么样？其实没有主 Activity 的程序也是可以正常运行的，只不过无法在启动器中看到或打开这个程序，这种程序一般作为第三方服务供其他应用在内部调用，如支付宝快捷支付服务等。

销毁一个 Activity 除了可以通过按Back键实现，还可以使用`finish()`来实现手动销毁。

## <a name="href2">在Activity中使用Toast</a> ##

在程序中，Toast 是一种非常有用的提醒方式，通常用于将一些短小的信息通知给用户，这些信息会在一段时间后自动消失，在 Activity 中使用 Toast 的代码如下:

```java
...
public class MainActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        // 获取按钮实例
        Button btn = (Button) findViewById(R.id.button1);        

        // 绑定(监听)点击事件       
        btn.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				// 点击时执行的具体逻辑
				Toast.makeText(MainActivity.this, "Toast something...", Toast.LENGTH_SHORT)
                     .show();
			}
		});
    }
}
```

使用`findViewById()`可以根据指定的id获取到按钮元素，接着调用按钮元素的`setOnClickListener()`可以给按钮绑定点击事件的监听程序，具体逻辑代码在`onClick()`方法中编写，这里在点击事件触发时会弹出 Toast，Toast 的展示内容通过`makeText(CONTEXT, TEXT, LENGTH)`来设置，参数说明如下:

1. CONTEXT 即 Toast 要求的上下文，由于 Activity 本身是一个 Context 对象，所以这里直接将`MainActivity.this`引入;
2. TEXT 是 Toast 要显示的文本内容;
3. LENGTH 是 Toast 的显示时长，可以使用 Toast 内置的`Toast.LENGTH_SHORT`和`Toast.LENGTH_LONG`两个常量。

最终效果如下:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w66.png?v=1)

## <a name="href3">在Activity中使用Menu</a> ##

移动设备的屏幕一般较小，为了减少屏幕空间的占用，通常会使用Menu(菜单)来展示部分内容。

### <a name="href3-5">菜单文件的编写</a> ###

1. 在res目录下新建一个menu文件夹，然后在其中创建一个 menu.xml 菜单文件;

2. main.xml 的内容如下:

	```xml
	<menu xmlns:android="http://schemas.android.com/apk/res/android">
	    <item android:id="@+id/item1"
	        android:title="Item 1"></item>
	    <item android:id="@+id/item2"
	        android:title="Item 2"></item>
	</menu>
	```

### <a name="href3-6">Activity的编写</a> ###

首先在 Activity 中重写`onCreateOptionsMenu()`，代码如下:

```java
...
public class MainActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        ...
    }

    public boolean onCreateOptionsMenu(Menu menu) {
    	getMenuInflater().inflate(R.menu.main, menu);
    	return true;
    }
}
```

以上代码先通过`getMenuInflater()`获取 MenuInflater 对象，再调用其`inflate()`给当前活动创建菜单，传入的第一个参数是菜单文件——`R.menu.main`，即 main.xml，第二个参数用于指定菜单项将添加到哪一个Menu对象当中，这里直接使用`onCreateOptionsMenu()`传入的menu参数，最后给这个方法返回true，表示允许创建的菜单显示出来，若返回 false，创建的菜单将无法展示。

接着定义菜单响应事件，控制菜单的展示:

```java
public class MainActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        ...
    }

    // 控制菜单的展示
    public boolean onCreateOptionsMenu(Menu menu) {
        ...
    }

    // 点击菜单中的某个选项
    public boolean onOptionsItemSelected(MenuItem item) {
    	switch (item.getItemId()) {
    		case R.id.item1:
    			Toast.makeText(this, "Click item1", Toast.LENGTH_SHORT).show();
    			break;
    		case R.id.item2:
    			Toast.makeText(this, "Click item2", Toast.LENGTH_SHORT).show();
    		default:
    	}
    	return true;
    }
}
```

在`onOptionsItemSelected()`中，通过调用`item.getItemId()`来判断点击的是哪一个菜单项，接着编写选择菜单项时各自执行的程序。

在所有步骤完成后，执行效果如下:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w67.png)

---

```
ID         : 97
DATE       : 2018/08/11
AUTHER     : WJT20
TAG        : Android
```
