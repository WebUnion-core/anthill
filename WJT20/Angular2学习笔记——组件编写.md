
# Angular2学习笔记——组件编写 #

## 目录 ##

1. [参考链接](#href1)
2. [事件绑定](#href2)
3. [引用(reference)](#href3)
4. [服务(service)](#href4)
5. [双向数据绑定](#href5)
6. [表单验证](#href6)
7. [常用指令](#href7)
	1. [\*ngIf](#href7-1)
	2. [\*ngFor](#href7-2)

## <a name="href1">参考链接</a> ##

- [第二节：用Form表单做一个登录控件对于login组件的小改造](https://juejin.im/post/5860f08d1b69e6006ce1473a)

---

## <a name="href2">事件绑定</a> ##

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

## <a name="href3">引用(reference)</a> ##

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

## <a name="href4">服务(service)</a> ##

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

## <a name="href5">双向数据绑定</a> ##

Angular2 提供了一个双向数据绑定的机制，即在组件中提供成员数据变量，然后在模板中引用这个数据变量。以下是使用双向数据绑定的实例代码：

```
import { Component, OnInit, Inject } from '@angular/core';
import { FormService } from './../../core/form.service';

@Component({
    selector: 'app-form',
    template: `<form class="input">
                    <input
						[(ngModel)]="cont"
						type="text"
						placeholder="请输入内容" />
                    <p class="msg">Input content: {{this.cont}}</p>
                </form>`,
    styleUrls: ['./../../css/style.css'],
	providers: [FormService]
})

export class FormComponent implements OnInit {
	cont = "";//Domain Model

    constructor(private service: FormService) {};
    ngOnInit() {};
}
```

以上代码中，我们在 FormComponent 中定义了一个名为cont的 Domain Model，然后用`[(ngModel)]="cont"`将输入框与cont的值绑定在一起，ngModel 是一个指令，它会生成一个 FormControl 的实例，并将这个实例和输入框绑定起来，双向绑定完成后，p标签内使用`{{this.cont}}`可以输出 cont 的值，最后的效果是每次我们改变输入框中输入的值，p标签的内容也会跟着同步变化。

---

## <a name="href6">表单验证</a> ##

Angular2 对表单验证有非常完善的支持，我们可以非常方便地将一些校验规则绑定到表单控件上。直接上代码：

```
...
<form #formRef="ngForm">
	<input #contentRef="ngModel"
		   [(ngModel)]="content"
		   name="cont"
		   type="text"
		   placeholder="请输入内容"
		   minlength="3"
		   required />

	<p>{{formRef.value | json}}</p>
	<p class="msg">Input content: {{this.content}}</p>
	<p class="msg">If valid: {{contentRef.valid}}, &nbsp;&nbsp;Error object: {{contentRef.errors | json}}. </p>
</form>
...
```

以上代码涉及的内容很多。首先，我们定义了一个表单引用 formRef，等号后的 ngForm 是要在模板中使用的，接着，我们用同样的形式在表单中的输入框上加上了一个名为 contentRef 的引用，其等号后的 ngModel 同样用于模板中。

在输入框上，我们添加了两个规则：一个是`required`，表示必填；另一个是`minlength="3"`，表示最少输入3个字符。

最后，我们要将验证状态输出，输出的内容在模板中要用`{{}}`包括起来。以上代码中，第一段输出语句的是`formRef.value | json`，其意思是将 formRef 引用的表单内所有具有 name 属性的控件的值包装成数据对象再转为JSON字符串，最后输出，其中"|"名为管道操作符；第二个输出内容为`this.content`，即输入框双向绑定的 content 的值输出；第三个输出内容为`contentRef.valid`，它表示 contentRef 引用的输入框输入内容的有效性，它是一个布尔值；最后一个输出内容是`contentRef.errors | json`，每个绑定了校验规则的表单控件都有一个 errors 对象，如果没有发生什么校验错误，它的值就是 null，否则就是一个包含错误信息的对象，这个对象的内容我就不加赘述了，最后将 error 对象转为JSON后输出。

---

## <a name="href7">常用指令</a> ##

### <a name="href7-1">\*ngIf</a> ###

`*ngIf`是一个条件判断指令，现将所赋的值转为布尔值然后决定指定的标签是否显示，下面直接举个用例：

```
...
<p *ngIf="true">1</p>
<p *ngIf="false">2</p>
...
```

以上代码中，第一个p标签中`*ngIf`的值是true，这时这个标签将正常显示；而第二个p标签中`*ngIf`的值是false，这个标签则会隐藏起来。

### <a name="href7-2">\*ngFor</a> ###

`*ngFor`是一个遍历指令，它可以将一个数组中的每个元素绑定到指定的元素上，从而逐个渲染出来，示例代码如下：

```
...
<ul>
	<li *ngFor="let item of list">{{ item }}</li>
</ul>
...
```

以上代码中，list是一个数组(内容省略)，`*ngFor`用item指针逐个指向list的数组元素，每个数组元素与li标签绑定起来(li展示的内容就是对应的数组元素)，最后构成一个包含list所有数组元素内容的无序列表。

---

```
ID         : 46
DATE       : 2017/11/20
AUTHER     : WJT20
TAG        : Angular2
```
