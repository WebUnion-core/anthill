
# JavaScript设计模式重啃——命令模式 #

## 目录 ##

1. 介绍
2. 示例——菜单程序

---

## 介绍 ##

命令模式是最简单和优雅的模式之一，"命令"指的是一个执行某些特定事情的指令。命令模式最常见的应用场景：有时需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，此时需要用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。

---

## 示例——菜单程序 ##

假设某复杂的用户界面需要提供大量的交互按钮，现安排部分程序员负责绘制按钮，另一部分程序员负责编写按钮的具体行为，这些行为要封装在对象里面。对于绘制按钮的程序员来说，他们并不需要知道按钮将用来做什么。

绘制按钮：

```
...
<body>
    <button id="btn1">按钮A</button>
    <button id="btn2">按钮B</button>
</body>
<script>
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
</script>
...
```

绑定命令函数：

```
function setCommand(btn, command) {
    btn.onclick = function() {
        command.execute();
    }
}
```

编写按钮行为：

```
var MenuBar = {
    refresh: function() {
        console.log('刷新菜单目录');
    }
};

var SubMenu = {
    add: function() {
        console.log('增加子菜单');
    }
}
```

封装命令类：

```
var RefreshMenuBarCommand = function(receiver) {
    this.receiver = receiver;
};
RefreshMenuBarCommand.prototype.execute = function() {
    this.receiver.refresh();
};
var AddSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
};
```

最后一步，将命令接收者传入到 command 对象中，并且把 command 对象安装到 button 上面：

```
var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
setCommand(btn1, refreshMenuBarCommand);
setCommand(btn2, addSubMenuCommand);
```

---

```
ARTICLE_ID : 47
POST_DATE : 2017/12/09
AUTHER : WJT20
```
