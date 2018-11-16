## 跳转问题  wx.navigateTo

wx.navigateTo

url的地址是添的相对路径

```js

wx.navigateTo({
        url: url
    })
```

使用,如果带参数的话，则直接在后面加上相应参数就行

```js

wx.navigateTo({
       url: './../slefcaoutrecord/main?id=123&uid=224141'
    })
```

## vuex 使用问题

在目录里创建一个stores目录 src/stores/index.js

> 在main.js 中需要将stores赋值给vue的原型对象  Vue.prototype.$store = store

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: 'hongtaotest'
  },
  mutations: {
  },
  actions: {
  }
})

export default store
```

在一个mpvue项目的vue文件中：
```html
<template>
    <div> {{name}} </div>
</template>
```

```js
// 你的stores目录
import store from "./../../stores";
import { mapState, mapMutations } from "vuex";

export default {
  store,
  computed: {
    //全局的信道变量
    ...mapState(["name"])
  },
};
```

## 分享功能的实现

点击右上角上的转发,在主vue文件中调用wx.showShareMenu即可显示右上角的分享:

```js

export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')

    wx.showShareMenu({
      withShareTicket: true
    });
  }
}
```

页面内点击分享的实现

mpvue兼容了一些小程序的生命周期：onShareAppMessage

使用onShareAppMessage 需要注意。在每个.vue文件内如果有分享的按钮，都需要写一个onShareAppMessage,本来我以为只要在入口app中写就行了，可事实证明那是不起作用的：

```js

export default {
  created () {
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '来蒙多这儿',
      path: '/pages/index/main',
      imageUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1221561016,2332708087&fm=27&gp=0.jpg'
    }
  }
}
```
## 使用第三方ui组件的问题

以vant-weapp 为例子

直接通过 git 下载 Vant Weapp 源代码

git clone https://github.com/youzan/vant-weapp.git

下载完了之后将dist 目录给复制出来，

进入你的mpvue项目目录，执行npm run dev 或者 npm run build, 之后目录下会多出一个dist文件夹，将刚刚下载的vant-weapp目录中的dist目录改下名字改成你自己喜欢的名字。比如我直接改成vant-weapp，然后将vant-weapp文件夹复制到mpvue项目目录下的 dist 目录里面。

然后比如我们的index页面中想使用vant-wapp 中的某个组件:

我们找到我们定义的页面 /pages/index/main.json文件

添加

```js
"usingComponents": {
    "van-button": "./../../vant-weapp/button/index",
    "van-dialog": "./../../vant-weapp/dialog/index",
    "van-notice-bar": "./../../vant-weapp/notice-bar/index",
    "van-action-sheet": "./../../vant-weapp/action-sheet/index",
    "van-search": "./../../vant-weapp/search/index"
  }
```

如

```js
{
  "backgroundTextStyle": "dark",
  "navigationBarTitleText": "页面标题",
  "usingComponents": {
    "van-button": "./../../vant-weapp/button/index",
    "van-dialog": "./../../vant-weapp/dialog/index",
    "van-notice-bar": "./../../vant-weapp/notice-bar/index",
    "van-action-sheet": "./../../vant-weapp/action-sheet/index",
    "van-search": "./../../vant-weapp/search/index"
  }
}

```

> 需要注意的是 ./../../vant-weapp/button/index  这个路径是mpvue项目下的dist中的相对路径。

如有不明白的地方可联系 qq:836717428