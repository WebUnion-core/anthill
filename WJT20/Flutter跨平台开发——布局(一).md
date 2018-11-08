
# Flutter跨平台开发——布局(一) #

## 目录 ##

1. [参考链接](#href1)
2. [居中布局](#href2)
3. [行布局](#href3)
4. [列布局](#href4)
5. [列表布局](#href5)

## <a name="href1">参考链接</a> ##

- [在Flutter中构建布局](https://flutterchina.club/tutorials/layout/)

## <a name="href2">居中布局</a> ##

上一篇其实已经接触过居中布局了，居中布局即 Center Widget，它能让子 Widget 相对 Center Widget 的父 Widget 完全居中。其配置属性如下:

1. child: <Widget>，子 Widget。

示例代码:

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

// 主程序
class MyApp extends StatefulWidget {
    @override
    _MyAppPageState createState() => new _MyAppPageState();
}

class _MyAppPageState extends State<MyApp> {
    @override
    Widget build (BuildContext context) {
        return new MaterialApp(
            theme: new ThemeData(
                primaryColor: Colors.black
            ),
            debugShowCheckedModeBanner: false,
            home: new Scaffold(
                appBar: new AppBar(
                    title: new Text(
                        'Ecube',
                        style: new TextStyle(
                            color: Colors.yellowAccent
                        )
                    )
                ),

                body: new Center(
                    child: new Text('I am Bruko........................')
                )
            )
        );
    }
}
```

效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w98.png)

## <a name="href3">行布局</a> ##

行布局 Row Widget 可以让多个子 Widget 在水平方向上进行排列，其配置属性如下:

1.  children: <Widget>[]，子 Widget 集合;

2. mainAxisAlignment：<MainAxisAlignment>，给每列子 Widget 分配空间的方式，可选值如下:
	1. MainAxisAlignment.spaceEvenly: 子 Widget 之间及边缘间隙都相等;
	2. MainAxisAlignment.spaceBetween: 子 Widget 之间的间隙相等，与左右边缘间隙为零;
	3. MainAxisAlignment.spaceAround: 子 Widget 之间的间隙是与左右边缘间隙的两倍;
	4. MainAxisAlignment.start: 子 Widget 之间间隙为零且左对齐;
	5. MainAxisAlignment.end: 子 Widget 之间间隙为零且右对齐;
	6. MainAxisAlignment.center: 子 Widget 之间间隙为零且全部居中对齐。
	
3. mainAxisSize: <MainAxisSize>，子 Widget 之间的间隙值，会使 mainAxisAlignment 的设置无效，可选值如下:
	1. MainAxisSize.max: 默认值，间隙最大化;
	2. MainAxisSize.min: 间隙最小化。

4. textDirection: <TextDirection>，子 Widget 排列方向，可选值如下:
	1. TextDirection.rtl: 由右往左排序;
	2. TextDirection.ltr: 由左往右排序。

示例代码如下:

```dart
...
body: new Center(
	child: new Row(
		mainAxisAlignment: MainAxisAlignment.center,
		textDirection: TextDirection.rtl,
		children: <Widget>[
			new Icon(
				Icons.star,
				color: Colors.red
			),
			new Icon(
				Icons.star,
				color: Colors.green
			),
			new Icon(
				Icons.star,
				color: Colors.blue
			)
		],
	)
)
```

效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w101.png)

## <a name="href4">列布局</a> ##

列布局 Column Widget 可以让多个子 Widget 在竖直方向上进行排列，其配置属性如下:

1. verticalDirection: <VerticalDirection>，竖直方向上的排列方式，可选值如下:
	1. VerticalDirection.up: 从上往下排序，最终所有子 Widget 往底部聚拢，且最前面的 Widget 居于底部;
	2. VerticalDirection.down: 默认值，从下往上排序，最终所有子 Widget 往顶部聚拢，且最前面的 Widget 居于顶部。
	
2. mainAxisAlignment：<MainAxisAlignment>，功能同行布局;

3. mainAxisSize: <MainAxisSize>，功能同行布局;

示例代码如下:

```dart
...
body: new Center(
	child: new Column(
		verticalDirection: VerticalDirection.up,
		mainAxisAlignment: MainAxisAlignment.spaceEvenly,
		children: <Widget>[
			new Icon(
				Icons.star,
				color: Colors.red
			),
			new Icon(
				Icons.star,
				color: Colors.green
			),
			new Icon(
				Icons.star,
				color: Colors.blue
			)
		]
	)
)
```

效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w99.png)

## <a name="href5">列表布局</a> ##

列表布局 ListView Widget 是一种非常实用的布局， 当用户滚动时，ListView 中显示的列表将无限增长，其配置属性如下:

1. scrollDirection: <Axis>，滚动方向，可选值如下:
	1. Axis.horizontal: 水平方向滚动;
	2. Axis.vertical: 默认值，竖直方向滚动。
	
2. reverse: <Boolean>，是否倒序，默认为 false。

```dart
...
Container buildOptionItem (String text, IconData icon) {
	return new Container(
		height: 100.0,
		padding: const EdgeInsets.all(10.0),
		child: Row(
			children: <Widget>[
				new Icon(
					icon,
					color: Colors.green,
				),
				new Text(text)
			],
		)
	);
}

@override
Widget build (BuildContext context) {
	return new MaterialApp(
		theme: new ThemeData(
			primaryColor: Colors.black
		),
		debugShowCheckedModeBanner: false,
		home: new Scaffold(
			appBar: new AppBar(
				title: new Text(
					'Ecube',
					style: new TextStyle(
						color: Colors.yellowAccent
					),
				)
			),

			body: new ListView(
				children: <Widget>[
					buildOptionItem(' Option0 ', Icons.check_box),
					buildOptionItem(' Option1 ', Icons.check_box_outline_blank),
					buildOptionItem(' Option2 ', Icons.check_box_outline_blank),
					buildOptionItem(' Option3 ', Icons.check_box_outline_blank),
					buildOptionItem(' Option4 ', Icons.check_box_outline_blank),
					buildOptionItem(' Option5 ', Icons.check_box_outline_blank),
					buildOptionItem(' Option6 ', Icons.check_box_outline_blank),
					buildOptionItem(' Option7 ', Icons.check_box_outline_blank),
					buildOptionItem(' Option8 ', Icons.check_box_outline_blank),
					buildOptionItem(' Option9 ', Icons.check_box_outline_blank)
				]
			)
		)
	);
}
```

效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/doc-repositort/master/WJT20/images/w100.png)

---

```
ARTICLE_ID : 112
POST_DATE : 2018/10/16
AUTHER : WJT20
```
