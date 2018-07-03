
# JavaScript设计模式重啃——状态模式 #

## 目录 ##

1. 介绍
2. 实例:电灯程序
    1. 定义状态类
    2. 编写Light类
    3. 测试
    4. 总结
3. 状态模式的优缺点
    1. 优点
    2. 缺点

## 介绍 ##

状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。通常来说，"封装"指的是先封装对象的行为，而不是对象的状态，但状态模式正好相反，状态模式的关键就是将事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部。

## 实例:电灯程序 ##

### 定义状态类 ###

代码:

```
// OffLightState:
var OffLightState = function(light) {
    this.light = light;
};

OffLightState.prototype.buttonWasPressed = function() {
    console.log('弱光'); // 行为
    this.light.setState(this.light.weakLightState); // 切换状态为weakLightState
};

// WeakLightState:
var WeakLightState = function(light) {
    this.light = light;
};

WeakLightState.prototype.buttonWasPressed = function() {
    console.log('强光'); // 行为
    this.light.setState(this.light.strongLightState); // 切换状态为strongLightState
};

// StrongLightState:
var StrongLightState = function(light) {
    this.light = light;
};

StrongLightState.prototype.buttonWasPressed = function() {
    console.log('关灯'); // 行为
    this.light.setState(this.light.offLightState); // 切换状态为offLightState
}
```

### 编写Light类 ###

代码:

```
var Light = function() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
};

// 初始化
Light.prototype.init = function() {
    var button = document.createElement('button'),
        self = this;

    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';

    this.currState = this.offLightState; // 设置当前状态

    this.button.onclick = function() {
        self.currState.buttonWasPressed();
    }
};

// 设置状态
Light.prototype.setState = function(newState) {
    this.currState = newState;
};
```

### 测试 ###

代码:

```
var light = new Light();
light.init();
```

### 总结 ###

使用状态模式的优点很明显，当我们需要为 light 对象增加一种新的状态时，只需要增加一个新的状态类，再稍微改变一下现有的代码即可。

在电灯实例中，我们先编写了一个名为 Light 的构造函数，这个类被称为上下文(Context)，随后在这个构造函数中，我们又创建了需要的所有状态类的实例对象，Context 将持有这些状态类的引用，以便把请求委托给状态对象。用户的请求，即点击按钮的动作也是实现于 Context 中。

## 状态模式的优缺点 ##

### 优点 ###

1. 定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态类，很容易增加新的状态和转换;
2. 避免 Context 无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了 Context 中原本过多的条件分支;
3. 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然;
4. Context 中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响。

### 缺点 ###

状态模式的缺点是会在系统中定义许多状态类，这个过程是非常枯燥无聊的，而且系统中会因此而增加不少对象。另外，逻辑分散在状态类中，虽然避免了编写恶心的条件分支语句，但是也造成了逻辑分散的问题，无法在一个地方就看出整个状态机的逻辑。

---

```
ARTICLE_ID : 63
POST_DATE : 2018/01/21
AUTHER : WJT20
```
