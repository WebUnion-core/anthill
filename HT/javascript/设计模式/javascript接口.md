## 接口

JavaScript中没有内置的创建或实现接口的方法。它也没有内置的方法用于判断该一个对象是否实现了与另一个对象相同的一套方法。这使对象很难互换使用。但是JavaScript很灵活，我们可以通过别的方式去实现。

## 什么是接口

接口其实就是定义了对象内应该有哪些方法。他不用去考虑这些方法是怎么去实现的，而是定义该对象有这些方法。

### 接口的好处

接口其实就是告诉我们一个类实现了哪些方法。从而帮助其使用这个类。接口可以让我们的代码变得更稳定，如果我们给接口添加了一个方法。而某个实现它的类没有相应的添加这个方法，那肯定会抛出一个错误。

## javascript模仿接口

JavaScript模仿接口有三种方法: 
**注释法**、
**属性检查法**和
**鸭式变型法**

### 用注释描述接口

用注释描述接口是最简单的方法，但是效果是最差的。

```js

/*
interface Composite {
    function add(child);
    function remove(child);
    function getChild(index);
}

interface FormItem {
    function save();
}
*/

class CompositeForm {
    add(child) {
        //...
    }
    remove(child) {

    }
    getChild(index) {
        //...
    }
    save() {
        //...
    }
}
```

这种模仿方法不是很好，它没有检查CompositeForm是否正确的实现了方法，完全是通过程序员们自觉去实现注释中的接口。不过这种实现方式非常的简单，但是它对测试和调试没有任何帮助。

### 属性检查法模仿接口

这个方法会更谨慎一点，但是接口也是注释的形式写出来，只是可以通过检查一个属性得知某个类自称实现了什么接口。

```js

class CompositeForm {
    constructor() {
        this.implementsInterface = ['Composite', 'FormItem'];
    }
}

function addForm(formInstance) {
    if (!implements(formInstance, 'Composite', 'FormItem')) {
        throw new Error('对象没有实现接口方法');
    }
}

function implements(obj) { // 这个方法查询接口
    for (let i = 1; i < arguments.length; i++) {
        let interfaceName = arguments[i];
        let interfaceFound = false;
        for (let j = 1; j < obj.implementsInterface.length; j++) {
            if (obj.implementsInterface[j] == interfaceName) {
                interfaceFound = true;
                break;
            }
        }
        if (!interfaceFound) {
            return false;
        }
        return true;
    }
}

addForm(new CompositeForm());
```

这种方法的优点是他对类所实现的接口提供了文档说明，如果需要的接口不在我这个类宣称支持的接口之列(也就是说不在我的this.implementsInterface里)，你就会看到错误信息。

缺点也显而易见，如果我的this.implementsInterface里宣称的和我注释里所定义的接口不一样但检查还是能通过的，就是调用addForm方法是不会爆破错的

### 用鸭式变型法模拟接口

其实，类是否声明自己支持哪些接口并不重要，只要具有这些接口中的方法就行。鸭式变型法把对象的方法集作为判断它是不是某个实例的唯一标准。实现原理也非常的简单：如果对象具有与接口定义的方法同名的方法，那么就可以认为他实现了这个接口。

```js

// interface
class Interface {
    constructor(name, method) {
        if (arguments.length != 2) {
            throw new Error('两个参数：name method');
        }
        this.name = name;
        this.method = [];
        for (let i in method) {
            if (typeof method[i] != 'string') {
                throw new Error('method 必须是字符串');
            }
            this.method.push(method[i]);
        }
    }
    //检查接口方法
    static ensureImplements(obj) {
        if (arguments.length < 2) {
            throw new Error('参数小于两个');
        }

        for (let i = 1; i < arguments.length; i++) {
            var instanceInterface = arguments[i];
            if (instanceInterface.constructor !== Interface) {
                throw new Error('你要检查的参数不属于Interface接口')
            }

            for (let j in instanceInterface.method) {
                let methodName = instanceInterface.method[j];
                if (!obj[methodName] || typeof obj[methodName] !== 'function') {
                    throw new Error(`请实现接口的${methodName}方法`)
                }
            }
        }
    }
}

// 实例化接口对象
var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);

// CompositeForm  类
class CompositeForm {
    //...
    add() {}
    remove() {}
    getChild() {}
}

let c1 = new CompositeForm();
Interface.ensureImplements(c1, Composite, FormItem);

function addForm(formInterface) {
    ensureImplements(formInterface, Composite, FormItem);
}
```

上面代码中的CompositeForm类中我没有实现save方法。运行这段代码就会报错。

但是鸭式变型法也是有缺点的，各个检查方面都是强制实施的。

### 本菜鸟实现方法

我用了类的继承来模拟接口，具体实现请看代码。

首先我们定义一个用作接口的类,属性method代表接口的方法集

```js

class Interface {
    constructor() {
        this.mehods = ['add', 'save', 'remove', 'save'];
    }
    static ensureImplements(obj) {
        //...
    }
}
```

定义一个CompositeForm类继承这个接口,并且在该类里面调用父类的ensureImplements方法检测接口

```js

class CompositeForm {
    constructor() {
        super().ensureImplements(this);
    }
}
```

完善ensureImplements方法

```js

class Interface {
    constructor() {
        this.mehods = ['add', 'save', 'remove', 'save'];
    }
    static ensureImplements(obj) {
        for (let i in this.mehods) {
            let methodName = this.mehods[i]
            if (!obj[methodName] || typeof obj[methodName] !== 'function') {
                let err = '请实现接口' + methodName + '的方法';
                throw new Error(err);
            }
        }
    }
}
```

> 当然，本人实现的肯定是问题重重。主要看是看上面的三种方法

## 依赖于接口的设计模式

- 工厂模式
- 组合模式
- 装饰者模式
- 命令模式