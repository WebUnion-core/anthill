
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



---

```
ARTICLE_ID : 103
POST_DATE : 2018/09/03
AUTHER : WJT20
```
