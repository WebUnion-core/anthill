
# JavaScript设计模式重啃——职责链模式 #

## 目录 ##

1. [介绍](#href1)
2. [订单实例](#href2)
3. [实现灵活可拆分的职责节点](#href3)
4. [异步职责链](#href4)
5. [职责链模式的优缺点](#href5)
 [](#href6)   1. 优点
 [](#href7)   2. 缺点

## <a name="href1">介绍</a> ##

职责链的定义: 使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象(这些对象称为链的"节点")连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

## <a name="href2">订单实例</a> ##

假如我们接收了这么一个需求: 前后端合作实现一个售卖手机的电商网站，后台下发以下字段值:

1. orderType: 表示订单类型。取值1表示500元定金用户，取值2表示200元定金用户，取值3表示普通购买用户;
2. pay: 表示用户是否已经支付定金。取值 true 或 false;
3. stock: 普通购买的手机库存数量，已支付500元和200元的用户不受限制。

代码实现:

```
// 500元订单
var order500 = funcrion(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100优惠券');
    } else {
        order200(orderType, pay, stock); // 将请求传递给200元订单
    }
};

// 200元订单
var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50优惠券');
    } else {
        orderNormal(orderType, pay, stock); // 将请求传递给普通订单
    }
};

// 普通购买订单
var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
}

order500(1, true, 500); // 输出: 500元定金预购，得到100优惠券
order500(1, false, 500); // 输出: 普通购买，无优惠券
order500(2, true, 500); // 输出: 200元定金预购，得到50元优惠券
order500(3, false, 500); // 输出: 普通购买，无优惠券
order500(3, false, 0); // 输出: 手机库存不足
```

以上代码简单运用了职责链模式，然而代码仍有不足，这段代码违反了开放-封闭原则，如果我们要修改某些业务逻辑，那么肯定要动到函数内部代码，这显然不合理，所以我们必须进一步优化代码。

## <a name="href3">实现灵活可拆分的职责节点</a> ##

如果要把之前的职责链模式实例代码进一步优化，我们可以从实现灵活拆分和重组的链节点这个目标出发。

最终实现的代码如下:

```
// 500元订单
var order500 = funcrion(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100优惠券');
    } else {
        return 'nextSuccessor'; // 无需知道传递给什么节点，只需向后传递请求即可
    }
};

// 200元订单
var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50优惠券');
    } else {
        return 'nextSuccessor'; // 同样只需向后传递请求即可
    }
};

// 普通购买订单(此部分代码不变)
var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
}

// Chain构造函数接收一个需要包装的函数作为参数
var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
};

// setNextSuccessor函数用于指定在链中的下一个节点
Chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor;
};

// passRequest函数用于传递请求给某个节点
Chain.prototype.passRequest = function() {
    var ret = this.fn.apply(this, arguments);

    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }

    return ret;
};

// 构造实例
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

// 指定节点在职责链中的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

// 把请求传递给第一个节点
chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(1, false, 0);
```

如此一来，我们就只是增加一个节点，然后重新设置链中相关节点的顺序。

## <a name="href4">异步职责链</a> ##

在现实开发中，我们经常会遇到一些异步的问题，比如我们要在节点函数中发起一个 ajax 异步请求，异步请求返回的结果才能决定是否继续在职责链中 passRequest。这时候让节点函数同步返回"nextSuccessor"已经没有意义了，所以要给 Chain 类再增加一个原型方法 Chain.prototype.next，表示手动传递请求给职责链中的下一个节点。

实现的代码如下:

```
// ... 内容省略

// 手动传递节点的函数
Chain.prototype.next = function() {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};

var fn1 = new Chain(function() {
    console.log(1);
    return 'nextSuccessor';
});

var fn2 = new Chain(function() {
    console.log(2);
    var self = this;
    setTimeout(function() {
        self.next();
    }, 1000);
});

var fn3 = new Chain(function() {
    console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
```

## <a name="href5">职责链模式的优缺点</a> ##

### <a name="href5-1">优点</a> ###

职责链模式最大的优点就是解耦了请求发送者和N个接收者之间的复杂关系，由于不知道链中的哪个节点可以处理你发出的请求，所以你只需把请求传递给第一个节点即可。

职责链模式的另一个优点就是，可以手动指定起始节点，请求并不是非得从链中的第一个节点开始传递。

### <a name="href5-2">缺点</a> ###

职责链模式也存在着一些缺点，首先，我们不能保证某个请求一定会被链中的节点处理。另外，职责链模式使得程序中多了一些节点对象，可能在某一次的请求传递过程中，大部分节点并没有起到实质性的作用，它们的作用仅仅是让请求传递下去，从性能方面考虑，我们要避免过长的职责链带来的性能损耗。

---

```
ID         : 58
DATE       : 2018/01/07
AUTHER     : WJT20
TAG        : JavaScript
```
