
# Angular2学习笔记——基本内容 #

## 目录 ##

1. 参考链接
2. 什么是Angular2？
3. 环境配置
	1. 初始化工程
	2. 启动服务器
4. 最简单的组件
	1. 构成
	2. 引入
5. 引导过程

---

## 参考链接 ##

- [认识Angular 2.0](https://juejin.im/post/5860eebe1b69e6006ce1395c)

---

## 什么是Angular2？ ##

Angular2 是 Google 推出的一个跨平台全终端的框架，其优点有：

1. 包装有非常完整的的类库；
2. 使用 TypeScript 作为首选开发编程语言；
3. 支持服务器端渲染。

总体来讲，Angular2 更适合从原生App开发或后端Java/.Net等转型过来开发前端的程序员，因为它的开发模型更接近于传统强类型语言的模式，加上官方内建的组件和类库比较完整。

需要注意的一点是，Angular1.x 和 Angular2.x 是有很大的区别的，想从 Angular1.x 直接过渡到 Angular2.x 是不可能的。

---

## 环境配置 ##

Angular2 依附于 Node.js 和 npm，需要事先安装并配置好 Node.js 和 npm，确保功能的正常使用。

### 初始化工程 ###

首先使用`npm install -g @angular/cli`命令在全局环境下安装好 Angular CLI 工具，安装需要花费较长时间，待安装完成后就可以使用 ng 命令了，在本地选择我们工程要放置的位置，然后使用`ng new hello-angular`即可快速创建出一个官方提供的工程模板，接着使用`npm install`命令安装所需的依赖，后续的操作实际上就是对这个模板的改造。

### 启动服务器 ###

官方的 Angular2 工程模板已将 Webpack 做了一次进一步的封装，具有热更新的功能，大大提高了开发和调试效率。使用`npm run start`命令可以启动服务器，默认端口为4200，在浏览器上输入`http://127.0.0.1:4200/`即可访问模板主页。

---

## 最简单的组件 ##

### 构成 ###

Angular2 规定，组件文件名以`.component.ts`为后缀，组件放置在`\src\app`目录下，为了方便集中管理组件，我在`\src\app`目录下创建了一个 components 目录来集中管理所有的组件，现在我们可以创建了一个最基本的组件了，位置为`\src\app\components\cont`，内容大致如下：

```
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-cont', //组件的引用名
    template: `<div class="container"></div>`, //template为ts模板字符串生成的组件内容，可以templateUrl指定对应位置的html文件为组件模板
    styleUrls: ['./../../css/style.css'] //styleUrls可以给组件指定样式表，一般来说，一个页面的所有组件共用一个样式文件就够了，这样利于集中管理样式
})

export class ContComponent implements OnInit {
    constructor() {};
    ngOnInit() {};
}
```

### 引入 ###

以上创建的组件引用名为"app-cont"，要引用这个组件，只需要在`\src\app\app.component.html`文件中加入这句代码：`<app-cont></app-cont>`。

到这里，我们创建的组件还不能载入到页面中，我们还需要将组件类加入到根模块中，应用根模块为`\src\app\app.module.ts`，内容修改为：

```
//Angular2原生模块
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//导入组件类
import { AppComponent } from './app.component';
import { ContComponent } from './components/cont/cont.component';

@NgModule({
	declarations: [
		AppComponent, //引导性组件
		ContComponent //加入我们编写的组件
	],
	imports: [
		BrowserModule, //提供了运行在浏览器中的应用所需要的关键服务和指令，这个模块所有需要在浏览器中跑的应用都必须引用
		FormsModule, //提供了表单处理和双向绑定等服务和指令
		HttpModule //提供http请求和响应的服务
	],
	providers: [], //声明注入依赖
	bootstrap: [AppComponent] //指明哪个组件为引导性组件
})
export class AppModule {}
```

---

## 引导过程 ## 

Angular2通过在main.ts中引导AppModule来启动应用。针对不同的平台，Angular提供了很多引导选项。引导的方式有即时编译器动态引导(JiT)和使用预编译器进行静态引导(AoT - Ahead-Of-Time)两种方式，其中静态方案可以生成更小、启动更快的应用，所以建议优先使用它，特别是在移动设备或高延迟网络下，其配置内容如下：

```
// 不把编译器发布到浏览器
import { platformBrowser } from '@angular/platform-browser';

// 静态编译器会生成一个AppModule的工厂AppModuleNgFactory
import { AppModuleNgFactory } from './app.module.ngfactory';

// 引导AppModuleNgFactory
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
```

---

```
ARTICLE_ID : 45
POST_DATE : 2017/11/19
AUTHER : WJT20
```
