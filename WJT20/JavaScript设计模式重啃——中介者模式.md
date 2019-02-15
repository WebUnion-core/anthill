
# JavaScript设计模式重啃——中介者模式 #

## 目录 ##

1. [介绍](#href1)
2. [初始代码](#href2)
3. [使用中介者模式改造代码](#href3)

## <a name="href1">介绍</a> ##

中介者模式的作用是解决对象与对象之间的紧耦合关系，增加一个中介者对象后，所有的相关对象都通过中介者对象来通信，而不是相互引用，所以当一个对象发生改变时，只需要通知中介者对象即可。

中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互，中介者模式使网状的多对多关系变成了相对简单的一对多关系。

## <a name="href2">初始代码</a> ##

没有使用中介者模式的代码:

```js
// 玩家列表
var players = [];

// 玩家类
function Player(name, teamColor) {
    this.partners = []; // 队友列表
    this.enemies = []; // 敌人列表
    this.name = name; // 角色名字
    this.state = 'live'; // 玩家状态
    this.teamColor = teamColor; // 队伍颜色
};

Player.prototype.win = function () {
    console.log('winner: ' + this.name);
};

Player.prototype.lose = function () {
    console.log('loser: ' + this.name);
};

Player.prototype.die = function () {
    var all_dead = true;
    this.state = 'dead'; // 玩家状态设为死亡

    // 遍历队友列表
    for (var i = 0, l = this.partners.length; i < l; i++) {
        // 如果还有一个队友没有死亡，则游戏还未结束
        if (this.partners[i].state !== 'dead') {
            all_dead = false;
            break;
        }
    }

    if (all_dead) {
        this.lose();

        // 通知所有队友游戏失败
        for (var i = 0, l = this.partners.length; i < l; i++) {
            this.partners[i].lose();
        }

        // 通知所有敌人游戏胜利
        for (var i = 0, l = this.ememies.length; i < l; i++){
            this.ememies[i].win();
        }
    }
};

// 定义一个工厂来创建玩家
var playerFactory = function (name, teamColor) {
    var newPlayer = new Player(name, teamColor); // 创建新玩家

    // 通知所有玩家，有新玩家加入游戏
    for (var i = 0, l = players.length; i < l; i++) {
        if (players[i].teamColor === newPlayer.teamColor) {
            // 相互添加到队友列表
            players[i].partners.push(newPlayer);
            newPlayer.partners.push(players[i]);
        } else {
            // 相互添加到敌人列表
            players[i].enemies.push(newPlayer);
            newPlayer.enemies.push(players[i]);
        }
    }

    players.push(newPlayer);
    return newPlayer;
}
```

从以上代码可以看出，玩家与队友，玩家与敌人存在耦合关系，每次增加一个新玩家，就要对所有玩家的队友列表或敌人列表进行更新，如果玩家数量越来越多，这种维护成本将会变的非常大。这个时候仔细分析一下，其实每个玩家都不需要牢牢记住自己的队友和敌人是哪些人，我们可以增加一个"系统"(中介者)来管理玩家之间的关系，当游戏结束时，也由这个"系统"对所有玩家发出通知，这样子就可以减少大量的遍历操作，玩家间的耦合关系也将变得松散。要达到这种目的，就要使用中介者模式来改造代码。

## <a name="href3">使用中介者模式改造代码</a> ##

首先简化玩家类:

```js
function Player(name, teamColor) {
    this.name = name; // 角色名字
    this.teamColor = teamColor; // 队伍颜色
    this.state = 'alive'; // 玩家生存状态
};

Player.prototype.win = function () {
    console.log('winner: ' + this.name);
};

Player.prototype.lose = function () {
    console.log('loser: ' + this.name);
};

Player.prototype.die = function () {
    this.state = 'dead';

    // 给中介者发送消息，玩家死亡
    playerDirector.ReceiveMessage('playerDead', this);
};

Player.prototype.remove = function () {
    // 给中介者发送消息，移除一个玩家
    playerDirector.ReceiveMessage('removePlayer', this);
};
```

接下来要考虑如何设计中介者对象 playerDirector，其实现有两种方法:

1. 利用发布-订阅模式。将 playerDirector 实现为订阅者，各 player 作为发布者，一旦 player 的状态发生变化，便推送消息给 playerDirector，playerDirector 处理消息后将反馈发送给其他 player;

2. 在 playerDirector 中开放一些接收消息的接口，各 player 可以直接调用该接口来给 playerDirector 发送消息，player 只需传递一个参数给 playerDirector，这个参数的目的是使 playerDirector 可以识别发送者。同样，playerDirector 接收到消息后会将处理结果反馈给其他 player。

以第二种方式创建中介者对象为例:

```js
// 创建中介者对象
var playerDirector = (function () {
    var players = {}; // 保存所有玩家
    var operations = {}; // 中介者可以执行的操作

    // 新增一个玩家
    operations.addPlayer = function (player) {
        var teamColor = player.teamColor;
        players[teamColor] = players[teamColor] || [];
        players[teamColor].push(player);
    };

    // 移除一个玩家
    operations.removePlayer = function (player) {
        var teamColor = player.teamColor;
        var teamPlayers = players[teamColor] || [];

        for (var i = teamPlayers.length - 1; i >= 0; i--) {
            if (teamPlayers[i] === player) {
                teamPlayers.splice(i, 1);
            }
        }
    };

    // 玩家角色死亡
    operations.playerDead = function (player) {
        var teamColor = player.teamColor;
        var teamPlayers = players[teamColor];
        var all_dead = true;

        // 遍历队友列表
        for (var i = 0, l = teamPlayers.length; i < l; i++) {
            // 如果还有一个队友没有死亡，则游戏还未结束
            if (teamPlayers[i].state !== 'dead') {
                all_dead = false;
                break;
            }
        }

        if (all_dead) {
            // 通知所有队友游戏失败
            for (var i = 0, l = teamPlayers.length; i < l; i++) {
                teamPlayers[i].lose();
            }

            for (var color in players) {
                // 通知所有敌人游戏胜利
                if (color !== teamColor) {
                    var teamPlayers = players[color];

                    for (var i = 0, l = teamPlayers.length; i < l; i++) {
                        teamPlayers[i].win();                        
                    }
                }
            }
        }
    };

    var ReceiveMessage = function () {
        // arguments的第一个参数为消息名称
        var message = Array.prototype.shift.call(arguments);
        operations[message].apply(this, arguments);
    };

    return {
        ReceiveMessage: ReceiveMessage
    }
})();
```

---

```
ID         : 60
DATE       : 2018/01/14
AUTHER     : WJT20
TAG        : JavaScript
```
