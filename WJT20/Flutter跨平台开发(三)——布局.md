
# Flutter跨平台开发(三)——布局 #

## 参考链接 ##

- [在Flutter中构建布局](https://flutterchina.club/tutorials/layout/)

## 居中布局 ##

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



---

```
ARTICLE_ID : 112
POST_DATE : 2018/10/16
AUTHER : WJT20
```
