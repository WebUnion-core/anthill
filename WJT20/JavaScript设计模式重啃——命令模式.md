
# JavaScript设计模式重啃——命令模式 #

## 目录 ##

1. [介绍](#href1)
2. [示例——菜单程序](#href2)
3. [JavaScript中的命令](#href3)
4. [宏命令](#href4)
5. [智能命令与傻瓜命令](#href5)

## <a name="href1">介绍</a> ##

命令模式是最简单和优雅的模式之一，"命令"指的是一个执行某些特定事情的指令。命令模式最常见的应用场景：有时需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，此时需要用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。

---

## <a name="href2">示例——菜单程序</a> ##

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

## <a name="href3">JavaScript中的命令</a> ##

JavaScript 作为将函数作为一等对象的语言，跟策略模式一样，命令模式也早已融入了 JavaScript 语言之中，运算块可以封装到普通函数中，然后将函数作为载体四处传递运算块。如果需要请求"接收者"，则可以借助闭包来实现。

实现代码如下：

```
var setCommand = function(button, command) {
    button.onclick = function() {
        command.execute();
    }
};

var MenuBar = {
    refresh: function() {
        console.log('刷新菜单界面');
    }
};

var RefreshMenuBarCommand = function(receiver) {
    return {
        execute: function() {
            receiver.refresh();
        }
    }
};

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(btn1, refreshMenuBarCommand);
```

---

## <a name="href4">宏命令</a> ##

宏命令是一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令。宏命令是命令模式和组合模式的联用产物，在组合模式章节可能会再提起宏命令，以下是一个使用宏命令的 demo：

```
// 各种要执行的命令
var closeDoorCommand = {
    execute: function() {
        console.log('关门');
    }
};
var openPcCommand = {
    execute: function() {
        console.log('开电脑');
    }
};
var openQQCommand = {
    execute: function() {
        console.log('登录QQ');
    }
};

// 定义宏命令
var MacroCommand = function() {
    return {
        commandsList: [],// 命令队列
        add: function(command) {
            this.commandsList.push(command);
        },
        execute: function() {
            for (var i = 0, command; i < this.commandsList.length; i++) {
                command = this.commandsList[i];
                command.execute();
            }
        }
    }
};

var macroCommand = MacroCommand();

// 组合命令
macroCommand.add(closeDoorCommand);// 先关门
macroCommand.add(openPcCommand);// 再打开电脑
macroCommand.add(openQQCommand);// 最后打开QQ

macroCommand.execute();// 执行宏命令
```

---

## <a name="href5">智能命令与傻瓜命令</a> ##

傻瓜命令只会负责把客户的请求转交给接收者来执行，这种模式的好处是请求发起者和请求接收者之间尽可能地得到了解耦。

智能命令则可以直接实现请求，这样就不再需要接收者的存在，没有接收者的智能命令，退化到和策略模式非常相近，从代码结构上已经很难分辨它们，能分辨它们的只有它们的意图的不同。

---

```
ID         : 47
DATE       : 2017/12/09
AUTHER     : WJT20
TAG        : 
```
