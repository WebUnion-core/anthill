
# JavaScript设计模式重啃——组合模式 #

## 目录 ##

1. [实现功能强大的宏命令](#href1)
2. [透明性带来的安全问题](#href2)
3. [组合模式注意点](#href3)
4. [何时使用组合模式](#href4)

## <a name="href1">实现功能强大的宏命令</a> ##

代码如下：

```
var MacroCommand = function() {
    return {
        commandList: [],
        add: function(command) {
            this.commandList.push(command);
        },
        execute: function() {
            for (var i = 0; i < this.commandList.length; i++) {
                var command = this.commandList[i];
                command.execute();
            }
        }
    }
};

// 打开空调的命令
var openAcCommand = {
    execute: function() {
        console.log('打开空调');
    }
};

// 打开电视和打开音响组合成一个宏命令
var openTvCommand = {
    execute: function() {
        console.log('打开电视');
    }
};

var openSoundCommand = {
    execute: function() {
        console.log('打开音响');
    }
};

var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

// 把所有命令组合成超级命令
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);

// 最后将超级命令绑定到按钮上
var btn = document.getElementById('btn');
btn.onclick = function() {
    macroCommand.execute();
}
```

基本对象可以被组合成更复杂的组合对象，组合对象又可以被组合，这样不断递归下去，这棵树的结构可以支持任意多的复杂度。在树最终被构造完成之后，让整棵树最终运转起来只需要调用最上层对象的 execute 方法。

## <a name="href2">透明性带来的安全问题</a> ##

组合模式的透明度使得发起请求的客户不用去顾忌树中组合对象和叶对象的区别，但它们在本质上是有区别的。组合对象可以有子节点，而叶对象下面是没有子节点的。解决方法是给叶对象增加一个 add 方法，并在调用这个方法时抛出一个异常来及时提醒客户，代码如下：

```
var MacroCommand = function() {
    return {
        commandList: [],
        add: function(command) {
            this.commandList.push(command);
        },
        execute: function() {
            for (var i = 0; i < this.commandList.length; i++) {
                var command = this.commandList[i];
                command.execute();
            }
        }
    }
};

var openTvCommand = {
    execute: function() {
        console.log('打开电视');
    },
    add: function() {
        throw new Error('叶对象不能添加子节点'); //抛出错误提示
    }
}

var macroCommand = MacroCommand();
macroCommand.add(openTvCommand);
openTvCommand.add(macroCommand);//报错："叶对象不能添加子节点"
```

## <a name="href3">组合模式注意点</a> ##

使用组合模式有以下几个需要注意的地方：

1. 组合模式不是父子关系。

    组合模式是一种 HAS-A(聚合) 的关系，而不是 IS-A。组合对象包含一组叶对象，但 Leaf 并不是 Composite 的子类，组合对象把请求委托给它所包含的所有叶对象，它们能够合作的关键是拥有相同的接口。

2. 对叶对象操作的一致性。

    组合模式除了要求组合对象和叶对象拥有相同的接口外，还有一个必要条件，就是对叶对象的操作必须具有一致性。只有用一致的方式对待列表中的每个叶对象的时候，才适合使用组合模式。

3. 双向映射关系。

    如果对象之间的关系并不是严格意义上的层次结构，在这种情况下，是不适合使用组合模式的。

4. 用职责链模式提高组合模式性能。

    在组合模式中，如果树的结构比较复杂，节点数量很多，在遍历树的过程中，性能方面也许表现得不够理想，此时可以借助职责链模式避免在实际操作中遍历整棵树。

## <a name="href4">何时使用组合模式</a> ##

组合模式使用于以下两种情况：

1. 表示对象的部分-整体层次结构。组合模式可以方便地构造一棵树来表示对象的部分-整体结构。特别是我们在开发期间不确定这棵树到底存在多少层次的时候。在树的构造最终完成之后，只需要通过请求树的最顶层对象，便能对整棵树做统一的操作。在组合模式中增加和删除树的节点非常方便，并且符合开放-封闭原则。

2. 客户希望统一对待树中的所有对象。组合模式使客户可以忽略组合对象和叶对象的区别，客户在面对这棵树的时候，不用关心当前正在处理的对象是组合对象还是叶对象，也就不用写一堆 if、else 语句来分别处理它们。组合对象和叶对象会各自做自己正确的事情，这是组合模式最重要的能力。

---

```
ARTICLE_ID : 52
POST_DATE : 2017/12/16
AUTHER : WJT20
```
