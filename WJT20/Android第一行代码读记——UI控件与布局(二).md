
# Android第一行代码读记——UI控件与布局(二) #

## LinearLayout ##

LinearLayout 即线性布局，是一种非常常用的布局，它会将它所包含的控件在线性方向上依次排列。LinearLayout 的`android:orientation`属性指定了排列方向是 vertical(竖直) 还是 horizontal(水平) 的，一个简单的 LinearLayout 布局代码如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <TextView
        android:id="@+id/text_view1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Text view 1." />

    <TextView
        android:id="@+id/text_view2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Text view 2." />

    <TextView
        android:id="@+id/text_view3"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Text view 3." />

</LinearLayout>
```

效果如图:



注意，如果将`android:orientation`的值设为"horizontal"，此时就不能将宽度设为"match_parent"了，否则会导致第一个控件占据整个水平空间，其他空间会被挤出去。

控件有一个`android:gravity`属性，用于控制内容的对齐方式，而布局也有一个类似的属性——`android:layout_gravity`，其用于控制布局内的控件的对齐方式，其可选值与`android:gravity`一样(top、bottom、left、right、center 等)。

需要注意的是，如果 LinearLayout 的排列方式为 horizontal，则只有竖直方向上的对齐方式有效，同理，如果排列方式为 vertical，则只有水平方向上的对齐方式有效。

LinearLayout 还有一个重要的属性——`android:layout_weight`，这个属性允许开发者使用比例的方式来指定控件的大小，这个属性在适配手机屏幕上起到非常重要的作用，用法如下例:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="horizontal" >

    <Button
        android:id="@+id/button1"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="4"
        android:background="#3456c1"
        android:text="" />

    <Button
        android:id="@+id/button2"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:background="#41c134"
        android:text="" />

</LinearLayout>
```

效果如图:


第一个按钮宽度占据水平全宽的4/5，第二个按钮宽度占据水平全宽的1/5，为了避免其他因素的影响，这里将按钮中的文本设为空，宽度设为0dp。

假如水平方向上有一个控件的`android:layout_width`设置为 wrap_content 且`android:layout_weight`不设置，而另一个控件则设置了`android:layout_weight`，这时设置了`android:layout_weight`的控件会自动占据水平方向上的剩余空间。

## RelativeLayout ##

RelativeLayout 即相对布局，它允许控件出现在布局内的任何位置，正因为 RelativeLayout 的高自由度，其属性也非常的多，一个简单的 RelativeLayout 布局如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent" >
    
    <Button
        android:id="@+id/button1"
        android:layout_width="wrap_content" 
        android:layout_height="wrap_content"
        android:background="#3456c1"
        android:layout_alignParentLeft="true"
        android:layout_alignParentTop="true" />

    <Button
        android:id="@+id/button2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#41c134"
        android:layout_alignParentRight="true"
        android:layout_alignParentBottom="true" />

    <Button
        android:id="@+id/button3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#892323"
        android:layout_centerInParent="true" />
		
</RelativeLayout>
```

以上用到了五个属性，说明如下:

1. `android:layout_alignParentTop`: 是否将控件定位到布局的顶部，可选值 true 或 false;
2. `android:layout_alignParentBottom`: 是否将控件定位到布局的底部;
3. `android:layout_alignParentLeft`: 是否将控件定位到布局的左侧;
4. `android:layout_alignParentRight`: 是否将控件定位到布局的右侧;
5. `android:layout_centerInParent`: 是否将控件定位到布局的正中央。

效果如下图: 


以上的几个属性是根据父布局来定位控件的，如果要让控件相对其他的控件进行定位，可以使用以下几个属性:

1. `android:layout_above`: 定位到指定 ID 的控件顶部;
2. `android:layout_below`:  定位到指定 ID 的控件底部;
3. `android:layout_toRightOf`: 定位到指定 ID 的控件右侧;
4. `android:layout_toLeftOf`: 定位到指定 ID 的控件的左侧。

如下代码:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent" >
    
    <Button
        android:id="@+id/button1"
        android:layout_width="wrap_content" 
        android:layout_height="wrap_content"
        android:background="#3456c1"
        android:layout_above="@+id/button3"
        android:layout_toLeftOf="@+id/button3" />

    <Button
        android:id="@+id/button2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#41c134"
        android:layout_below="@+id/button3"
        android:layout_toRightOf="@+id/button3" />
    
    <Button
        android:id="@+id/button3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#892323"
        android:layout_centerInParent="true" />
    
</RelativeLayout>
```

效果如下图:


## FrameLayout ##

FrameLayout 即帧布局，相比前两种布局，帧布局应用的场景比较少，帧布局会把所有控件摆放到布局的左上角，由于应用场景较少，所以此篇不加详述了。

## 百分比布局 ##

百分比布局允许直接指定控件在布局中所占的百分比，从而轻松地实现平分布局甚至是任意比例分割布局的效果。百分比布局实际上是 FrameLayout 和 RelativeLayout 的功能扩展(LinearLayout 已经具备按比例指定控件大小的能力)，其分为两种: PercentFrameLayout 和 PercentRelativeLayout。

由于百分比布局不属于新增的布局，所以用法与前几种布局不同，百分比布局定义在 support 库中，在使用它之前，需要在项目的 build.gradle 中添加百分比布局库的依赖，添加完成后就能保证百分比布局在 Android 所有系统版本上的兼容性:

因为涉及到 gradle，所以后续内容先暂停。

---

```
ARTICLE_ID : 103
POST_DATE : 2018/09/03
AUTHER : WJT20
```
