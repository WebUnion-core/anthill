
# Flutter跨平台开发——Widget #

## 目录 ##

1. [参考链接](#href1)
2. [介绍](#href2)
3. [什么是Widget](#href3)
4. [主程序](#href4)
    1. [基本结构](#href4-1)
    2. [主程序中的Widget](#href4-2)
5. [依赖引入](#href5)

## <a name="href1">参考链接</a> ##

- [极速构建漂亮的原生应用](https://flutterchina.club/)

- [编写您的第一个Flutter App](https://flutterchina.club/get-started/codelab/)

## <a name="href2">介绍</a> ##

Flutter 是一款由谷歌开发的跨平台开发UI框架，可以快速构建 Android 和 iOS 原生应用。Flutter 使用 Dart 语言开发，这一点也经常被人诟病，相比使用 JavaScript 作为开发语言的另两款同类型框架 React Native 和 Weex，使用 Dart 无疑提高了 Flutter 的学习成本(尽管 Dart 和 JavaScript 有不少共同之处)。在不远的未来，跨平台开发一定是一种大趋势，目前国内最热门的跨平台开发框架是 FaceBook 开发的 React Native，但 Flutter 应用的性能及开发效率丝毫不逊色于 React Native。

简单说下目前 Flutter 的处境，由于太过年轻，国内使用 Flutter 开发产品的企业少之又少(目前最出名的使用 Flutter 开发产品的企业应该就只有闲鱼了)，国内缺少实例教程，上手难度大(亲有体会)，所以在国内不是那么受欢迎，可以说现在的 Flutter 和当年 React Native 刚兴起时一样，处于一个不断填坑、不断改进的阶段，待发展成熟之后才可能逆转目前的窘境。

Flutter 的环境略复杂，本系列不介绍 Flutter 的环境配置，跟着官方文档一步一步去做即可，提示一下: 坑很多！做好心理准备！文档资料如下:

1. [安装](https://flutterchina.club/get-started/install/);
2. [配置编辑器](https://flutterchina.club/get-started/editor/);

## <a name="href3">什么是Widget</a> ##

Flutter 应用离不开 Widget，那么什么是 Widget? 熟悉 React 开发的人都知道，React 的主旨是"一切皆组件"，Flutter 中的 Widget 就相当于 React 中"组件"的概念(甚至更广)。Flutter Widget 包含一系列的UI组件、布局等，通过组合使用多种内置 Widget 可以实现丰富的界面效果。

## <a name="href4">主程序</a> ##

### <a name="href4-1">基本结构</a> ###

一切程序的入口为项目根目录下的 lib 目录中的 main.dart 文件，先见识一下一个最基本的 main.dart 代码结构:

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

// 主程序
class MyApp extends StatelessWidget {
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

                body: new Text('I am Ecube.')
            )
        );
    }
}
```

效果如下图:

![image](https://raw.githubusercontent.com/WebUnion-core/anthill/master/WJT20/images/w94.png)

MyApp 类是主程序，继承 StatelessWidget 后成为一个 Widget，这里先中断回忆下 React 组件的写法:

```js
...
export default class MyApp extends React.component {
    ...
    render() {
        return <h1>I am Ecube.</h1>
    }
}
```

你会发现两者有许多相似的地方，StatelessWidget 相当于 React.Component，主程序继承后都能使用框架的api，build 则相当于 render，都是 return 出一个UI单元来渲染界面。

补充: 启动程序后可以看到页面右上角有一个"DEBUG"的标签，如果想要将其隐藏，只要在 MaterialApp 内部添加`debugShowCheckedModeBanner: false`这一句即可。

### <a name="href4-2">主程序中的Widget</a> ###

需要注意，主程序 build 中返回的必须是一个 MaterialApp 实例对象，这个实例对象的 home 属性设置内容是必需的，而且好像还得是一个 Scaffold Widget 实例，以上代码中，Scaffold 实例内部定义了 appBar 和 body 两个属性:

1. appBar 不是必需的，它用于设置应用顶部的标题栏，其值是一个 AppBar Widget 实例，AppBar Widget 的 title 项即标题栏显示元素，这里用一个 Text 实例作为显示元素(以后会详解 Text Widget 的配置内容，现在只要知道它的文本内容是"Ecube"，颜色是黄色的即可);

2. body 是界面标题栏以下的显示区域，它的取值也是 Widget，以上代码中将其值设为了一个 Text Widget 实例，文本内容为"I am Ecube. "

讲解完 home 的内容后，补充一下 MaterialApp 中的另一个配置属性，那就是 theme，顾名思义，这个属性用于设置整个应用的主题，取值为 ThemeData Widget 实例，以上代码中只是简单地设置主题颜色(primaryColor)为黑色，当然其配置属性不止这么点，以后会详细说明 ThemeData Widget 的更多用法。

如果只看 MyApp 自身，会发现它只是一个普通的类，算不上是主程序，让它成为主程序其实是以下这句:

```dart
void main() => runApp(new MyApp());
```

就像 Java、C 等语言中将主程序都定义为 main 一样，Flutter 应用的主程序也是名为 main，其一般用箭头函数(ES+中有箭头函数语法糖，从这里可以看出 Dart 借鉴了不少编程语言的语法特点)指向由 runApp() 方法接收的 Widget，由此便将 MyApp 变为了真正意义上的主程序。

## <a name="href5">依赖引入</a> ##

Flutter 使用 import 关键字引入依赖，之后便可在 main.dart 中的任何地方使用依赖的api，依赖的引入需要事先在 pubspec.yaml 文件中声明，以前面的`import 'package:flutter/material.dart';`为例，引入此依赖后才可以使用 MaterialApp Widget，flutter 依赖已经在 pubspec.yaml 中声明好了，如下:

```yaml
name: ecube
description: E-cube

dependencies:
  flutter:
    sdk: flutter

  # The following adds the Cupertino Icons font to your application.
  # Use with the CupertinoIcons class for iOS style icons.
  cupertino_icons: ^0.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter

```

pubspec.yaml 的作用其实与 Npm 中 package.json 差不多，dependencies 和 dev_dependencies 都是用于声明依赖，可以看到声明了 flutter 依赖，pubspec.yaml 的用处不仅仅是声明依赖，但是这里不便扩展更多。

---

```
ID         : 109
DATE       : 2018/10/06
AUTHER     : WJT20
TAG        : Flutter
```
