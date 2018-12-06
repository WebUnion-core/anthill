
# 关于Redux的那些乱七八糟的东西 #

## 目录 ##

## 参考链接 ##

- [Redux系列01：从一个简单例子了解action、store、reducer](https://www.cnblogs.com/chyingp/p/redux-01-introduction-actou-store-reducer-action.html)

- [Redux 概要教程](https://juejin.im/post/5b457ee05188251ac1098123)

- [Redux中的编程艺术](https://juejin.im/post/5b1fbd145188257d547217f4)

- [Flux 架构入门教程（阮一峰）](https://www.cnblogs.com/fliu/articles/5245923.html)

## 何为Redux ##

Redux 是一个面向 JavaScript 应用的状态管理工具，它是 Flux 的一种简化实现，Flux 又是什么？简单说，Flux 是一种架构思想，专门解决软件的结构问题，它跟MVC 架构是同一类东西，但是更加简单和清晰。Redux 采用单一数据源的方式，大大简化了 Flux 繁琐的 store，大大减小了状态管理的复杂度，但是对刚接触 Redux 的人来说，Redux 的代码结构依然很复杂，让人望而生畏。

说到 Redux，就离不开 Actions、Action Creators、Reducer 和 Store 等名词，接下来将会逐节讲解这些乱七八糟的东西。

## Actions ##

Actions 是应用程序将数据发送到 store 的载体，可以通过 store.dispatch 来将 action 发送到 store 中，示例代码如下:

```js
var ADD_STATUS_TAG = 'ADD_STATUS_TAG';
store.dispatch({
    type: ADD_STATUS_TAG,
    text: '代办'
});
```

实际上 Actions 就只是一个 JavaScript Object，它必须包含 type 属性，这个属性是作为识别行为的标识，类型为 String，当应用越来越庞大的时候，所有的 action 都可以用一个专门的模块管理起来，然后在页面代码中导入:

```js
import { ADD_STATUS_TAG } from '../actionTypes.js'; // actionTypes就是一个专门用于管理action的模块
...
```

## Action Creators ##

Action Creators 是用于创建 action 对象的函数:

```js
function addStatusTag() {
    return {
        type: ADD_STATUS_TAG,
        text: '代办'
    };
}
```

在 Action Creators 内部还可以转派其他的 action 或者 Action Creators:

```js

```

---

```
ARTICLE_ID : 120
POST_DATE : 2017/12/06
AUTHER : WJT20
```
