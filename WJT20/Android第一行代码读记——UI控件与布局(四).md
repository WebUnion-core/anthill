
# Android第一行代码读记——UI控件与布局(四) #

## 目录 ##

1. [ListView介绍](#href1)
2. [基本用法](#href2)
3. [定制ListView界面](#href3)
4. [提升ListView运行效率](#href4)
5. [列表项点击事件](#href5)

## <a name="href1">ListView介绍</a> ##

ListView 是 Android 中最常用的控件，ListView 允许用户通过手指上下滑动的方式将屏幕外的数据滚动到屏幕内，同时屏幕上原有的数据则会滚动出屏幕。ListView 虽然实用，但用法也相对复杂的多。

## <a name="href2">基本用法</a> ##

首先修改主 Layout(main.xml) 的内容:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <ListView
        android:id="@+id/list_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

接着在 Activity 中给 ListView 提供数据:

```java
// 其他代码省略
public class MainActivity extends BaseActivity {
	public String[] data = {
		"Item 1",
		"Item 2",
		"Item 3"
	};

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		ArrayAdapter<String> adapter = new ArrayAdapter<String> (
			MainActivity.this, android.R.layout.simple_list_item_1, data
		);
		ListView listView = (ListView) findViewById(R.id.list_view);
		listView.setAdapter(adapter);
	}
}
```

ArrayAdapter 是一种适配器实现类，它可以通过泛型来指定要适配的数据类型，然后在构造函数中把要适配的数据传入，ArrayAdapter 有多个够咱函数的重载，可以根据实际情况选择最合适的一种，以上代码提供的数据都是字符串，因此将 ArrayAdapter 的泛型指定为 String，然后在 ArrayAdapter 的构造函数中依次传入当前上下文、ListView 子项布局的 id，以及要适配的数据。注意，以上代码使用了 android.R.layout.simple_list_item_1 作为 ListView 子项布局的 id，这是一个 Android 内置的布局文件，里面只有一个 TextView，可用于简单地显示一段文本。最后，调用 ListView 的 setAdapter() 方法，传入构建好的适配器对象，从而实现 ListView 和数据之间的关联。

效果如图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w92.png)

## <a name="href3">定制ListView界面</a> ##

上一节知识在每个列表项中插入了一个 TextView，这样未免过于单调，其实可以通过定制 ListView 界面从而展示更加丰富的内容。以下是定制带图片 icon 的 ListView 界面实例。

1. 定义一个 ListView 适配器实体类(ImageItem.java):

	```java
	package com.example.tester;

	public class ImageItem {
		private String name; // 图片列表项名称
		private int imageId; // 图片ID

		public ImageItem(String name, int imageId) {
			this.name = name;
			this.imageId = imageId;
		}

		public String getName() {
			return name;
		}

		public int getImageId() {
			return imageId;
		}
	}
	```

2. 定义一个列表项 Layout(image_item.xml):

	```xml
	<?xml version="1.0" encoding="utf-8"?>
	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
		android:layout_width="match_parent"
		android:layout_height="wrap_content" >

		<ImageView android:id="@+id/item_image"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content" />

		<TextView android:id="@+id/item_text"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_gravity="center_vertical"
			android:layout_marginLeft="10dp" />

	</LinearLayout>
	```

3. 自定义一个适配器类，继承自 ArrayAdapter，并将泛型指定为 ImageItem 类:

	```java
	// 其余代码省略
	public class ImageAdapter extends ArrayAdapter<ImageItem> {
		private int resourceId;

		// 将上下文、列表项的ID和数据都传进来
		public ImageAdapter(Context context, int textViewResourceId, List<ImageItem> objects) {
			super(context, textViewResourceId, objects);
			resourceId = textViewResourceId;
		}

		@SuppressLint("ViewHolder")

		// getView在每个子项被滚动到屏幕内时会被调用
		public View getView(int position, View convertView, ViewGroup parent) {
			ImageItem imageItem = getItem(position); // 获取当前列表项实例

			// 为列表项加载传入的布局，传入的参数依次为: 列表项ID、列表组和是否只让父布局中声明的layout属性生效
			View view = LayoutInflater.from(getContext()).inflate(resourceId, parent, false);

			ImageView image = (ImageView) view.findViewById(R.id.item_image);
			TextView text = (TextView) view.findViewById(R.id.item_text);

			image.setImageResource(imageItem.getImageId());
			text.setText(imageItem.getName());
			return view; // 返回布局
		}
	}
	```

4. 修改主 Activity 的内容(MainActivity.java):

	```java
	// 其余代码省略
	public class MainActivity extends BaseActivity {
		private List<ImageItem> imageList = new ArrayList<ImageItem>();

		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			setContentView(R.layout.main);

			initImageList(); // 数据初始化

			// 实例化适配器对象和ListView对象，并将适配器实例传给ListView实例
			ImageAdapter adapter = new ImageAdapter(MainActivity.this, R.layout.image_item, imageList);
			ListView listView = (ListView) findViewById(R.id.list_view);
			listView.setAdapter(adapter);
		}

		private void initImageList() {
			// 循环5遍，批量生产列表项
			for (int i = 0; i < 5; i++) {
				ImageItem imageItem1 = new ImageItem("Item1", R.drawable.ic_launcher);
				imageList.add(imageItem1);
				ImageItem imageItem2 = new ImageItem("Item2", R.drawable.ic_launcher);
				imageList.add(imageItem2);
				ImageItem imageItem3 = new ImageItem("Item3", R.drawable.ic_launcher);
				imageList.add(imageItem3);
			}
		}
	}
	```

最终效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w93.png)

## <a name="href4">提升ListView运行效率</a> ##

ListView 之所以难用，就是因为它有很多可优化的细节，其中运行效率就是很重要的一点，前面编写的 ListView 的运行效率是很低的，因为在 ImageAdapter 的 getView() 方法中，每次都会将布局重新加载一遍，当 ListView 快速滚动时，问题会更突出。

以下是优化方案:

```java
// 其余代码省略
public View getView(int position, View convertView, ViewGroup parent) {
	ImageItem imageItem = getItem(position);

	View view;
	if (convertView == null) {
		view = LayoutInflater.from(getContext()).inflate(resourceId, parent, false);
	} else {
		view = convertView;
	}

	ImageView image = (ImageView) view.findViewById(R.id.item_image);
	TextView text = (TextView) view.findViewById(R.id.item_text);		
	image.setImageResource(imageItem.getImageId());
	text.setText(imageItem.getName());
	return view;
}
```

以上优化方案的原理是对 convertView 参数进行检测，如果其值为 null，则表示布局未加载，进行布局加载操作后会将布局缓存下来，之后每次调用 getView() 只要使用缓存下来的 convertView 即可。

解决了布局重载的问题还不够，可以发现每次调用 getView() 方法都会通过 findViewById() 方法获取一次控件实例，其实这部分代码也是可以优化的，优化方案如下:

```java
// 其余代码省略
public View getView(int position, View convertView, ViewGroup parent) {
	ImageItem imageItem = getItem(position);

	View view;
	ViewHolder viewHolder;
	if (convertView == null) {
		view = LayoutInflater.from(getContext()).inflate(resourceId, parent, false);
		viewHolder = new ViewHolder();
		viewHolder.image = (ImageView) view.findViewById(R.id.item_image);
		viewHolder.text = (TextView) view.findViewById(R.id.item_text);
		view.setTag(viewHolder);
	} else {
		view = convertView;
		viewHolder = (ViewHolder) view.getTag();
	}

	viewHolder.image.setImageResource(imageItem.getImageId());
	viewHolder.text.setText(imageItem.getName());
	return view;
}

class ViewHolder {
	ImageView image;
	TextView text;
}
```

以上代码新增了一个内部类 ViewHolder，用于对控件的实例进行缓存，当 convertView 为 null 的时候，创建一个 ViewHolder 实例并将控件实例存放其中，然后调用 setTag() 方法，把 ViewHolder 对象存储在 View 中，下次调用 getView() 方法时，直接调用 View 的 getTag() 方法取出控件实例即可。

## <a name="href5">列表项点击事件</a> ##

前面只是实现了一个展示内容的 ListView，但是一个仅能展示内容的 ListView 没有什么实际用途，如果能给 ListView 绑定上各种事件侦听功能，那其实用性将提升一个档次，为每个列表项绑定事件并不难，代码如下:

MainActivity.java:

```java
// 其他代码省略
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.main);

	initImageList();
	ImageAdapter adapter = new ImageAdapter(MainActivity.this, R.layout.image_item, imageList);
	ListView listView = (ListView) findViewById(R.id.list_view);
	listView.setAdapter(adapter);

	listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
		@Override
		public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
			ImageItem imageItem = imageList.get(position);
			Toast.makeText(MainActivity.this, imageItem.getName(), Toast.LENGTH_SHORT).show();
		}
	});
}
```

可以发现，给 ListView 对象绑定事件侦听器用的是 setOnItemClickListener() 而不是 onClickListener()，这个方法是给每个列表项绑定事件侦听器，当点击事件被触发时，根据点击的列表项位置(position)实例化对应的 ImageItem 对象，然后调用 getName() 方法获取标题，并借助 Toast 展示出来。

---

```
ID         : 3
DATE       : 2018/09/14
AUTHER     : WJT20
TAG        : Android
```
