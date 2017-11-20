
# Angular2学习笔记——组件编写 #

## 目录 ##

1. 参考链接
2. 事件绑定
3. 引用(reference)
4. 服务(service)

---

## 参考链接 ##

- [第二节：用Form表单做一个登录控件对于login组件的小改造](https://juejin.im/post/5860f08d1b69e6006ce1473a)

- [第三节：建立一个待办事项应用](https://juejin.im/post/5860f1ce61ff4b0068a64480)

---

## 事件绑定 ##

Angular2 中事件绑定比较简单，如下例：

```
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-cont',
    template: `<button (click)="alertMsg()">按钮</button>`
	styleUrls: ['./../../css/style.css'],
})

export class ContComponent implements OnInit {
	constructor() {};
	ngOnInit() {};

	alertMsg() {
        alert("Hello!");
	};
}
```

以上代码中，我们给一个按钮绑定了一个名为 alertMsg 的点击事件处理程序，在该按钮元素上，绑定点击事件的写法是一对圆括号中加事件名，这样会将等号右边的双引号中的内容识别为表达式而不是字符串。

---

## 引用(reference) ##

引用(reference)类似于HTML中的ID，一个引用，绑定的是一个唯一的元素，其形式如`#userRef`，我们可以在其他地方使用 userRef 来访问这个元素，以下是应用实例代码：

```
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-form',
    template: `<form class="input">
                    <input #contentRef type="text" placeholder="请输入内容" />
                    <input (click)="outputCont(contentRef.value)" type="button" value="click" />
                </form>`
	styleUrls: ['./../../css/style.css'],
})

export class FormComponent implements OnInit {
	constructor() {};
	ngOnInit() {};

	outputCont(value) {
        alert(value);
	};
}
```

以上代码中，我们定义了一个表单，表单内有一个文本框和一个按钮，我们先给文本框绑定了一个名为 contentRef 的引用，然后给按钮绑定了一个名为 outputCont 的点击事件，并将文本框的值传递过去，最终，outputCont 把文本框的值输出。

---

## 服务(service) ##

服务(service)用于存放组件的业务逻辑，之前我们把点击事件都写在组件中，当以后业务逻辑越来越复杂时，这样的做法会导致组件变得特别的难维护，服务正是用来解决这个问题，现在我们将之前写的代码改写为以下内容：

`src\app\core\form.service.ts`文件：

```
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
    constructor() {}

    //检查接收到的值
    checkValue(value1, value2):boolean {
        return value1 === value2;
	};
}
```

我们先创建了一个core目录用于存放服务，接着又创建了一个 form.service.ts 服务文件，专门用于存放的 FormComponent 组件的业务逻辑，在这个服务文件中，我们先导入了注入服务的模块方法 Injectable，导出一个名为 FormService 的服务类，这个类很简单，只有一个 checkValue 方法，它传入两个参数，判断两个参数值是否相等，并返回一个布尔值，这里需要特别注意的是，checkValue 的形参集合后需要声明返回值的数据类型，布尔值对应的是`:boolean`，如果没有返回值，则使用`:void`或`:any`。

`src\app\components\form.component.ts`文件：

```
import { Component, OnInit, Inject } from '@angular/core';
import { FormService } from './../../core/form.service';

@Component({
    selector: 'app-form',
    template: `<form class="input">
                    <input #contentRef type="text" placeholder="请输入内容" />
                    <input (click)="outputCont(contentRef.value)" type="button" value="click" />
                </form>`,
    styleUrls: ['./../../css/style.css'],
	providers: [FormService]
})

export class FormComponent implements OnInit {
    constructor(private service: FormService) {};
    ngOnInit() {};

    outputCont(val) {
        alert(this.service.checkValue(val, "Hello"));
    };
}
```

编写完服务文件后，我们需要将服务导入到组件中，主要有三个步骤：第一步，使用 import 关键字将 FormService 服务类引入；第二步，在 @Component 中，加入 providers 选项，其中包含了组件所要引入的服务类；第三步，在导出的组件类中的 constructor 中，使用`private service: FormService`将服务与组件绑定起来。

至此，我们将服务与组件联系起来了，在组件类中使用 this.service 即可访问服务，例如以上代码中，this.service.checkValue 即是调用了 FormService 上的 checkValue 方法。

---

```
ARTICLE_ID : 46
POST_DATE : 2017/11/20
AUTHER : WJT20
```
