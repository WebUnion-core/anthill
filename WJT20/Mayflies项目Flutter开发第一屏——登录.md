
# Mayflies项目Flutter开发第一屏——登录 #

> Mayflies 是 WebUnion 开发的 Flutter+Laravel 项目，项目地址: https://github.com/WebUnion-core/mayflies。

## 目录 ##

## 功能演示 ##

1. 下载安装 mayflies app，点击桌面图标进入应用，可以看到 mayflies 启动页，如图:

![image]()

2. 待首屏加载完毕(这个过程很快，不必久等)，便进入了登录页，界面图如下:

![image]()

3. 默认情况下，登录(Sign in)按钮置灰，因为邮箱地址格式错误、密码为空，此时点击按钮不会有任何反应，待输入内容校验通过时，按钮处于激活转态:

![image]()

## 代码分解 ##

Flutter 主程序文件为`mayflies/flutter_app/lib/main.dart`，基本结构代码为:

```Dart
import 'package:flutter/material.dart';

void main() => runApp(LoginPage());

class LoginPage extends StatefulWidget {
    @override
    _LoginPageState createState() => new _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
    var email = '';
    var psw = '';

    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            debugShowCheckedModeBanner: false,
            home: new Scaffold(
                body: ...
            ),
        );
    }
}
```

可以看到登录界面使用的是有 state 的 Widget，即继承 StatefulWidget，共有 email 和 psw 两个 state，定义这两个 state 的时候用的是 var 关键字，之所以使用 var 是因为本人用惯了 JavaScript 语法，故在 Dart 中沿用 JavaScript 语法风格，习惯 Java 语法风格的朋友可以这样定义两个 state:

```Dart
String email = '';
String psw = '';
```

### 输入框组件 ###

```Dart
// 文本输入框
Column _buildTextField (placeholder, isPassword, controller, onChange) {
    return new Column(
        children: <Widget>[
            new Container( height: 15.0 ),
            new Container(
                width: 280.0,
                decoration: new BoxDecoration(
                    border: Border(
                        bottom: BorderSide(
                            color: const Color(0xffdcdcdc),
                            width: 1.0
                        )
                    )
                ),
                child: new TextField(
                    cursorColor: const Color(0xffdcdcdc),
                    obscureText: isPassword,
                    controller: controller,
                    style: new TextStyle(
                        color: const Color(0xffdcdcdc),
                        fontSize: 16.0
                    ),
                    onChanged: onChange,
                    decoration: new InputDecoration(
                        hintText: placeholder,
                        hintStyle: new TextStyle(
                            color: const Color(0xffdcdcdc)
                        ),
                        border: InputBorder.none
                    )
                )
            )
        ]
    );
}
```

_buildTextField 方法用于绘制输入框组件，传入的参数有:

1. placeholder: 输入框占位文本;

2. isPassword: 输入内容是否为密码;

3. controller: TextEditingController 对象，本界面统一传 null;

4. onChange: 输入内容发生变化时触发的回调。

涉及的 Widget 的知识点主要有:

1. Container:

---

```
ARTICLE_ID : 117
POST_DATE : 2018/11/22
AUTHER : WJT20
```
