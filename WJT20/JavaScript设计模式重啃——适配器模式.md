
# JavaScript设计模式重啃——适配器模式 #

## 目录 ##

1. [介绍](#href1)
2. [实例:适配不同地图源](#href2)

## <a name="href1">介绍</a> ##

适配器模式的作用是解决两个软件实体间的接口不兼容的问题，使用适配器模式之后，原本因为接口不兼容而不能工作的两个软件实体可以一起工作。

## <a name="href2">实例:适配不同地图源</a> ##

假如我们之前编写了一个旧的广东省地图的页面，根据第三方资源获取到大部分城市以及这些城市对应的 ID，并成功地渲染到页面上。一段时间过去后，第三方的数据更新了，补充了一些城市数据，然而提供的新数据被另外一个接口统一管理，这个问题倒是好解决，最让人头痛的问题是，这个接口下发的数据结构与之前完全不同，这个时候呢，就轮到适配器模式出场了，我们只要增加一个数据格式转换适配器即可解决这些麻烦的问题，代码实现如下:

```
var getGuangdongCity = function() {
    var guangdongCity = [
        {
            name: 'shenzhen',
            id: 11
        },
        {
            name: 'guangzhou',
            id: 12
        }
    ];

    return guangdongCity;
};

var render = function(fn) {
    console.log('开始渲染广东省地图');
    document.write(JSON.stringify(fn()));
};

var addressAdapter = function(oldAddressFn) {
    var address = {},
        oldAddress = oldAddress();

    for (var i = 0; i < oldAddress.length; i++) {
        address[oldAddress[i].name] = oldAddress[i].id;
    }

    return function() {
        return address;
    }
};

render(addressAdapter(getGuangdongCity));
```

最后，将原代码中调用 getGuangdongCity 的地方，用经过 addressAdapter 适配器转换之后的新函数来代替。

---

```
ID         : 64
DATE       : 2018/01/21
AUTHER     : WJT20
TAG        : JavaScript
```
