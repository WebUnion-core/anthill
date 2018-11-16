

## 使用

使用教程：https://github.com/Meituan-Dianping/mpvue

## 疑惑

**使用mpvue还能使用小程序里面的组件么**

当然是能的，接下来看代码

index.vue

```html
<template>
  <div class="container">
    <div>选择图片</div>
    <swiper :indicator-dots="indicatorDots"
      :autoplay="autoplay" :interval="interval" :duration="duration" class="swiper">
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image s-img"/>
        </swiper-item>
      </block>
    </swiper>
    <button  @click="getImg"> indicator-dots </button>
  </div>
</template>
```

```js
<script>
export default {
  data() {
    return {
      msg: "index",
      indicatorDots: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    };
  },
  methods: {
    getImg() {
      wx.chooseImage({
        count: 1,
        sizeType: "compressed ",
        success: res => {
          this.img = res.tempFilePaths[0];
          console.log(res.tempFilePaths);
        }
      });
    }
  },
  created() {}
};
</script>
```

```css
<style scoped>
.container {
}
.swiper {
  width: 100%;
}
.s-img {
  width: 100%;
}
</style>
```

**经过一系列的打包之后**

index.wxml

```html
<template name="066fdbad">
  <view class="_div data-v-117a46f2 container">
    <view class="_div data-v-117a46f2">选择图片</view>
    <swiper indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" class="_swiper data-v-117a46f2 swiper">
      <block wx:key="index" key="{{index}}" wx:for="{{imgUrls}}" wx:for-index="index" wx:for-item="item">
        <swiper-item class="_swiper-item data-v-117a46f2">
          <image src="{{item}}" class="_image data-v-117a46f2 slide-image s-img"></image>
        </swiper-item>
      </block>
    </swiper>
    <button bindtap="handleProxy" data-eventid="{{'0'}}" data-comkey="{{$k}}" class="_button data-v-117a46f2"> indicator-dots </button>
  </view>
</template>
```

### 使用中需要注意的地方：

组件的属性要用vue的语法绑定起来

```html
<swiper :indicator-dots="indicatorDots"
      :autoplay="autoplay" :interval="interval" :duration="duration" class="swiper">
```


----

在mpvue 中使用一些ui库