## url传值

使用 wx.navigateTo({}) 跳转
```js
wx.navigateTo({
    url: 'pages/page1?id=123'
})
```

然后在 page1里的onLoad生命周期中通过第一个参数去获取,具体如下
```js
Page({
    onLoad: function(option) {
        var id = option.id
        console.log(id); // 123
    }
})

```