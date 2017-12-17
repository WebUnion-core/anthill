
# JavaScript设计模式重啃——组合模式 #

## 目录 ##

## 实现功能强大的宏命令 ##

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


```

---

```
ARTICLE_ID : 52
POST_DATE : 2017/12/16
AUTHER : WJT20
```
