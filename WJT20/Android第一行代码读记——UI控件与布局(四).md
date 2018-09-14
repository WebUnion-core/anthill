
# Android第一行代码读记——UI控件与布局(四) #

## ListView介绍 ##

ListView 是 Android 中最常用的控件，ListView 允许用户通过手指上下滑动的方式将屏幕外的数据滚动到屏幕内，同时屏幕上原有的数据则会滚动出屏幕。ListView 虽然实用，但用法也相对复杂的多。

## 用法 ##

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

---

```
ARTICLE_ID : 3
POST_DATE : 2018/09/14
AUTHER : WJT20
```
