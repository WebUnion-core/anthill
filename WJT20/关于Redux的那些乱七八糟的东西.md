
# 关于Redux的那些乱七八糟的东西 #

## 目录 ##

1. [参考链接](#href1)
2. [何为Redux](#href2)
3. [Actions](#href3)
4. [Action Creators](#href4)
5. [Reducers](#href5)
6. [Store](#href6)
7. [异步数据流](#href7)

## <a name="href1">参考链接</a> ##

- [Redux系列01：从一个简单例子了解action、store、reducer](https://www.cnblogs.com/chyingp/p/redux-01-introduction-actou-store-reducer-action.html)

- [Redux 概要教程](https://juejin.im/post/5b457ee05188251ac1098123)

- [Flux 架构入门教程（阮一峰）](https://www.cnblogs.com/fliu/articles/5245923.html)

- [Redux 中文文档](http://cn.redux.js.org/)

## <a name="href2">何为Redux</a> ##

Redux 是一个面向 JavaScript 应用的状态管理工具，它是 Flux 的一种简化实现，Flux 又是什么？简单说，Flux 是一种架构思想，专门解决软件的结构问题，它跟MVC 架构是同一类东西，但是更加简单和清晰。Redux 采用单一数据源的方式，大大简化了 Flux 繁琐的 store，大大减小了状态管理的复杂度，但是对刚接触 Redux 的人来说，Redux 的代码结构依然很复杂，让人望而生畏。

说到 Redux，就离不开 Actions、Action Creators、Reducers 和 Store 等名词，接下来将会逐节讲解这些乱七八糟的东西。

## <a name="href3">Actions</a> ##

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
import { ADD_STATUS_TAG } from '../actionTypes'; // actionTypes就是一个专门用于管理action的模块
...
```

## <a name="href4">Action Creators</a> ##

Action Creators 是用于创建 action 对象的函数:

```js
function addStatusTag(text) {
    return {
        type: ADD_STATUS_TAG,
        text: text
    };
}
```

在 Action Creators 内部还可以转派其他的 action 或者 Action Creators:

```js
// 转派action
function addStatusTagWithDispatch(text) {
    dispatch({
        type: ADD_STATUS_TAG,
        text: text
    });
}

// 转派Action Creators
dispatch(addStatusTag('代办'));
```

## <a name="href5">Reducers</a> ##

Reducers 用于根据接收的 action 对象，对 store 内的数据进行相应的处理，其本质是一个纯函数，它的参数是之前的状态和接收的 action，然后返回一个新的状态对象，在 Reducers 内部不要做以下这些事情:

1. 改变参数;
2. 执行API请求，或者路由切换;
3. 调用非纯函数，如`Date.now()`。

以下是一个简单的 reducer 实例:

```js
const SET_TITLE = 'SET_TITLE';
const SET_SUBTITLE = 'SET_SUBTITLE';

// 默认的state
const initialState = {
    title: 'Hello',
    subtitle: 'My name is ABC',
    ...
};

// myAppReducer
function myAppReducer(state = initialState, action) {
    // 返回的要么是一个新的state
    switch (action.type) {
        case SET_TITLE:
            return Object.assign({}, state, {
                title: action.title
            });
        case SET_SUBTITLE:
            return Object.assign({}, state, {
                subtitle: action.subtitle
            });
        default:
            return state;
    }
}
```

如果 reducer 变得越来越庞大复杂，则需要做一些适当的拆分:

```js
import {
    SET_TITLE,
    SET_SUBTITLE,
    INITIAL_TITLE,
    INITIAL_SUBTITLE
} from './actions';

// title state
function title(state = INITIAL_TITLE, action) {
    switch (action.type) {
        case SET_TITLE:
            return Object.assign({}, state, {
                title: action.title
            });
        default:
            return state;
    }
}

// subtitle state
function subtitle(state = INITIAL_SUBTITLE, action) {
    switch (action.type) {
        case SET_SUBTITLE:
            return Object.assign({}, state, {
                subtitle: action.subtitle
            });
        default:
            return state;
    }
}

// myAppReducer
function myAppReducer(state = {}, action) {
    return {
        title: title(state.title, action),
        subtitle: subtitle(state.subtitle, action)
    };
}

...
```

看起来代码量反而变多了，是的，但是这样做代码就变得更易维护，每一个 reducer 都只管理属于自己那部分状态。而每一个 reducer 返回的状态都会成为 store 的一部分。

最后，还需要通过`combineReducers()`来将这些 reducer 组合到一起:

```js
import { combineReducers } from 'redux';

...

const rootReducer = combineReducers({
    myAppReducer,
    ...
});
​
export default rootReducer;
```

## <a name="href6">Store</a> ##

这里又引入一个鬼名词——Store，它是一堆对象的集合，相当于一个"数据仓库"，包含以下功能:

1. 保持应用中的状态;
2. 允许通过 getState 访问状态;
3. 允许通过 dispatch 更新状态;
4. 注册订阅者;
5. 取消注册的订阅者。

创建 Store 用到的是`createStore()`方法，它接收两个参数，第一个参数是导入的 Reducer; 第二个参数可选，用于初始化 Store 状态，对于一些服务器渲染的页面来说，可以将后端预处理过的数据传给`createStore()`从而提升首屏加载速度。

```js
import { createStore } from 'redux';
import rootReducer from './reducers';
const store = createStore(rootReducer);
```

通过 dispatch 派发 Action 对象来改变 Store 内部存储的状态:

```js
store.dispatch(addStatusTag('代办'));
```

## <a name="href7">异步数据流</a> ##

Redux 仅支持同步的数据流，如果要实现异步数据流，则应在中间件中处理异步。Redux-Thunk 是一个非常好的异步 Action 处理中间件，可以帮我们处理异步 Action 更加方便和清晰。用法如下:

```js
import thunkMiddleware from 'redux-thunk';
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

function fetchPosts() {
    // 内部借助Promise或者async/await Generator来控制异步流
    ...
}

store
    .dispatch(fetchPosts('代办'))
    .then(() => console.log(store.getState()));
```

---

```
ID         : 120
DATE       : 2017/12/06
AUTHER     : WJT20
TAG        : React
```
