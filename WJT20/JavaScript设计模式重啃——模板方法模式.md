
# JavaScript设计模式重啃——模板方法模式 #

## 目录 ##

1. [介绍](#href1)
2. [例子:咖啡与茶](#href2)
 [](#href3)   1. 构建父类("饮料"类)
 [](#href4)   2. 构建子类("咖啡"类和"茶"类)
3. [钩子方法](#href5)
4. [好莱坞原则](#href6)
 [](#href7)   1. 概念与应用
 [](#href8)   2. 改写继承部分代码

## <a name="href1">介绍</a> ##

模板方法模式是一种只需使用继承就可以实现的非常简单的模式，它由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中继承了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

加入各个平行子类之间既存在一些相同的行为，又存在一些不同的行为，所有的行为都混在子类的实现中，就出现了相同行为在各个子类中重复调用的情况，模板方法模式就是为了解决这个问题而生的，使用模板方法模式，我们可以把相同的行为转移到一个统一继承的地方，这个地方就是父类。

## <a name="href2">例子:咖啡与茶</a> ##

### <a name="href2-1">构建父类("饮料"类)</a> ###

泡咖啡和泡茶的不同点有：

1. 原料不同：即咖啡与茶叶，将其抽象为"饮料"；
2. 泡的方式不同：咖啡是冲泡，茶叶是浸泡，将其抽象为"泡"；
3. 加入的调料不同：一个是糖和牛奶，一个是柠檬，将其抽象为"调料"。

两者的步骤都是分为以下四步：

1. 把水煮沸；
2. 用沸水冲泡饮料；
3. 把饮料倒进被子；
4. 加调料。

根据以上这些，我们可以抽象出一个父类(称为"饮料类")：

```
var Beverage = function() {};

Beverage.prototype.boilWater = function() {
    console.log('把水煮沸');
};

// 以下三个方法交给子类重写，如果子类未实现某个方法，那么该方法将会抛出错误
Beverage.prototype.brew = function() {
    throw new Error('子类必须重写brew方法');
};
Beverage.prototype.pourInCup = function() {
    throw new Error('子类必须重写pourInCup方法');
};
Beverage.prototype.addCondiments = function() {
    throw new Error('子类必须重写addCondiments方法');
};

// 所谓模板方法，指的就是以下的init方法
Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
};    
```

Beverage.prototype.init 被称为模板方法，其内部封装了子类的算法框架，它作为一个算法模板，指导子类以何种顺序去执行哪些方法，在 Beverage.prototype.init 中，算法内的每一个步骤都清楚地展示出来。

### <a name="href2-2">构建子类("咖啡"类和"茶"类)</a> ###

父类创建完成后就可以创建"咖啡"和"茶"两个子类了：

1. 泡一杯咖啡：

    ```
    var Coffee = function() {};
    Coffee.prototype = new Beverage();

    // 重写方法
    Coffee.prototype.brew = function() {
        console.log('用沸水冲泡咖啡');
    };
    Coffee.prototype.pourInCup = function() {
        console.log('把咖啡倒进杯子');
    };
    Coffee.prototype.addCondiments = function() {
        console.log('加糖和牛奶');
    };

    var coffee = new Coffee();
    coffee.init();
    ```

2. 泡一杯茶：

    ```
    var Tea = function() {};
    Tea.prototype = new Beverage();

    // 重写方法
    Tea.prototype.brew = function() {
        console.log('用沸水冲泡茶叶');
    };
    Tea.prototype.pourInCup = function() {
        console.log('把茶倒进杯子');
    };
    Tea.prototype.addCondiments = function() {
        console.log('加柠檬');
    };

    var tea = new Tea();
    tea.init();
    ```

## <a name="href3">钩子方法</a> ##

钩子方法是隔离变化的一种常见手段，我们在父类中容易变化的地方放置钩子，钩子可以有一个默认的实现，究竟要不要"挂钩"，这由子类决定。钩子方法的返回结果决定了模板方法后面部分的执行步骤，也就是程序接下来的走向，这样一来，程序就拥有了变化的可能。

还是以咖啡和茶为例，假设有些顾客不喜欢在饮料中加调料，那么，我们可以在 Beverage 类中加入一个挂钩：

```
// ...饮料类部分代码省略...
Beverage.prototype.customerWantsCondiments = function() {
    return true; // 默认需要调料
};

Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) { // 如果挂钩返回true，则需要调料
        this.addCondiments();
    }
}

var CoffeeWithHook = function() {};
CoffeeWithHook.prototype = new Beverage();
// ...咖啡类部分代码省略...
CoffeeWithHook.prototype.customerWantsCondiments = function() {
    return window.confirm('请问需要调料吗？');
};

var coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();
```

## <a name="href4">好莱坞原则</a> ##

### <a name="href4-3">概念与应用</a> ###

"好莱坞原则"是一个著名的设计原则，根据这一原则，我们可以将底层组件挂载到高层组件中，由高层组件决定什么时候、以何种方式去使用底层组件，这就像演艺公司对待新人演员一样，都是"别调用我们，我们会调用你"，这也就是这个原则的名字由来。

模板方法模式是好莱坞原则的一个典型使用场景，当我们用模板方法模式编写一个程序时，就意味着子类放弃了对自己的控制权，而是改变父类通知子类，哪些方法应该在什么时候被调用，作为子类，只负责提供一些设计上的细节。

好莱坞原则的其他应用场景，最常见的有以下两个：

1. 发布-订阅模式

    发布者将消息推送给订阅者，取代了原先不断去 fetch 消息的形式。

2. 回调函数

    在 ajax 异步请求中，由于不知道请求返回的具体时间，而通过轮询去判断是否返回数据，这显然是不理智的行为，所以我们通常会把接下来的操作放在回调函数中，传入发起 ajax 异步请求的函数，当数据返回之后，这个回调函数才被执行，这也是好莱坞原则的一种体现。

### <a name="href4-4">改写继承部分代码</a> ###

根据好莱坞原则，我们大可改写父类和子类间"继承"部分的代码，还是以咖啡与茶为例，改写后的代码如下：

```
var Beverage = function(param) {

    var boilWater = function() {
        console.log('把水煮沸');
    };

    var brew = param.brew || function() {
        throw new Error('必须传递brew方法');
    };

    var pourInCup = param.pourInCup || function() {
        throw new Error('必须传递pourInCup方法');
    };

    var addCondiments = param.addCondiments || function() {
        throw new Error('必须传递addCondiments方法');
    };

    var F = function() {};
    F.prototype.init = function() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };

    return F;
};

var Coffee = Beverage({
    brew: function() {
        console.log('用沸水冲泡咖啡');
    },
    pourInCup: function() {
        console.log('把咖啡倒进杯子');
    },
    addCondiments: function() {
        console.log('加糖和牛奶');
    }
});

var Tea = Beverage({
    brew: function() {
        console.log('用沸水冲泡茶叶');
    },
    pourInCup: function() {
        console.log('把茶倒进杯子');
    },
    addCondiments: function() {
        console.log('加柠檬');
    }
});

var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();
```

---

```
ID         : 53
DATE       : 2017/12/24
AUTHER     : WJT20
TAG        : 
```
