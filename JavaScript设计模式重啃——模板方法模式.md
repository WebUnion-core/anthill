
# JavaScript设计模式重啃——模板方法模式 #

## 目录 ##

1. 介绍
2. 例子:咖啡与茶
    1. 构建父类("饮料"类)
    2. 构建子类("咖啡"类和"茶"类)

## 介绍 ##

模板方法模式是一种只需使用继承就可以实现的非常简单的模式，它由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中继承了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

加入各个平行子类之间既存在一些相同的行为，又存在一些不同的行为，所有的行为都混在子类的实现中，就出现了相同行为在各个子类中重复调用的情况，模板方法模式就是为了解决这个问题而生的，使用模板方法模式，我们可以把相同的行为转移到一个统一继承的地方，这个地方就是父类。

## 例子:咖啡与茶 ##

### 构建父类("饮料"类) ###

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

### 构建子类("咖啡"类和"茶"类) ###

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

---

```
ARTICLE_ID : 53
POST_DATE : 2017/12/24
AUTHER : WJT20
```
