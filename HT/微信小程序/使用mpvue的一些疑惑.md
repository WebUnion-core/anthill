## 跳转问题  wx.navigateTo

wx.navigateTo

url的地址是添的相对路径

```js

wx.navigateTo({
        url: url
    })
```

使用

```js

wx.navigateTo({
       url: './../slefcaoutrecord/main'
    })
```

## vuex 使用问题

在目录里创建一个stores目录 src/stores/index.js

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
----
未完，持续更新。。。