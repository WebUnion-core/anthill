
# Flutter跨平台开发——Stateless与Stateful #

## 目录 ##

1. [参考链接](#href1)
2. [StatelessWidget](#href2)
3. [StatefulWidget](#href3)

## <a name="href1">参考链接</a> ##

- [Flutter中Stateless和Stateful的区别](https://blog.csdn.net/kevinzhan0417/article/details/82458498)

## <a name="href2">StatelessWidget</a> ##

Flutter 中通过 state(状态) 动态改变整个页面的数据，页面数据一变化，整个页面显示的内容也将自动变化，如果页面数据不需要动态改变，则让页面主程序继承 StatelessWidget 即可，在上一篇记录的实例中，用的正是 StatelessWidget:

```dart
...
// 继承StatelessWidget
class MyApp extends StatelessWidget {
    @override
    Widget build (BuildContext context) {
        return new MaterialApp(
            ...
        );
    }
}
```

## <a name="href3">StatefulWidget</a> ##

StatelessWidget 是静态的，继承 StatelessWidget 的 widget 不需要控制 state，如果 Widget 需要控制 state，则应使用 StatefulWidget，以下是使用 StatefulWidget 的简单实例:

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

// 主程序
class MyApp extends StatefulWidget {
    @override
    _MyAppPageState createState() => new _MyAppPageState();
}

class _MyAppPageState extends State<MyApp> {
    String _type = 'WARNING';
    Color _color = Colors.redAccent;

    void _changeText () {
        setState(() {
            if (_type == 'WARNING') {
                _type = 'INFO';
                _color = Colors.black87;
            } else {
                _type = 'WARNING';
                _color = Colors.redAccent;
            }
        });
    }

    @override
    Widget build (BuildContext context) {
        return new MaterialApp(
            // 主题
            theme: new ThemeData(
                primaryColor: Colors.black
            ),

            home: new Scaffold(
                // 标题栏
                appBar: new AppBar(
                    title: new Text(
                        'Ecube',
                        style: new TextStyle(
                            color: Colors.yellowAccent
                        ),
                    )
                ),

                body: new Center(
                    child: new Text(
                        'TYPE : $_type',
                        style: new TextStyle(
                            color: _color
                        ),
                    )
                ),

                floatingActionButton: new FloatingActionButton(
                    onPressed: _changeText,
                    child: new Icon(Icons.details)
                ),
            ),
        );
    }
}
```

效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/public-cdn/master/wjt20-base/w95.jpg)

接下来解析创建一个 StatefulWidget 的整个过程:

1. 让主程序 MyApp 继承 StatefulWidget;

2. 创建一个名为 `_MyAppPageState` 的 Widget，这里之所以加个"\_"是为了将这个 Widget 私有化，当然也可以使用"private"关键字来将属性私有化，`_MyAppPageState` 继承`State<MyApp>`，从而与 MyApp 绑定起来，然后将 MyApp 的 build 部分代码迁移到 `_MyAppPageState` 内部，并且在 MyApp 内部写入`_MyAppPageState createState() => new _MyAppPageState();`来引用 `_MyAppPageState`;

3. `_MyAppPageState` 内部定义两个私有属性 `_type` 和 `_color`，这两个属性就是 state，分别控制文本内容、文本颜色状态，接着封装一个 `_changeText()` 私有方法来更新两个 state 的值，`_changeText()` 内部主要是调用 setState() 方法，其参数是一个回调，在其中对 state 重新赋值即可完成更新操作;

4. 接着就是 build 的部分，大部分内容是上一篇讲过的，故不赘述，重点关注两个部分。第一个部分是 Scaffold 的 body，里面只有一个 Text Widget，其内容是 `_type`，`'TYPE : $_type'`这种写法称为"模板字符串"，替代字符串拼接插入变量值的写法; 第二个是 Scaffold 的 floatingActionButton，设置这个属性会在页面右下角创建一个浮动按钮，点击之后执行 `_changeText()`更新 state。

---

```
ARTICLE_ID : 110
POST_DATE : 2018/10/11
AUTHER : WJT20
```
