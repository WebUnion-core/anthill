
# React架构实践记——react组件编写 #

## 目录 ##

1. [路由](#href1)
2. [组件基本结构](#href2)
    1. [页面组件](#href2-1)
    2. [子组件](#href2-2)
3. [redux状态管理](#href3)
    1. [action](#href3-3)
    2. [reducer](#href3-4)

## <a name="href1">路由</a> ##

路由使用的是 react-router-dom 模块的 HashRouter 类型，HashRouter 的特点是每个 URL 可以访问，另一种常用的路由类型是 BrowserRouter，关于两者的区别，可以参考以下文章:

[[译]简明React Router v4教程](https://github.com/fi3ework/blog/issues/10)

路由数据提取到一个独立的文件: src/mw/data.json，内容如下:

```json
{
    "menus": [
        {
            "name": "Home",
            "route": "/"
        },
        {
            "name": "Account",
            "route": "/account/"
        },
        {
            "name": "UserInfo",
            "path": "/userInfo/"
        }
    ]
}
```

路由数据的处理是在 src/mw/router/App.jsx 中，处理分为以下几个步骤:

1. 整合菜单:

    ```js
    // 整合菜单
    const menuModules = [];
    config.menus.forEach((item) => {
        menuModules.push(require('./' + item.name + '/index.jsx').default);
    });
    ```

    这里使用 require 动态引入每个页面的页面组件，注意 require 的模块路径必须完整，由于每个出口模块用的是 ES6 语法，导出模块用的是`export default ...`的写法，react 组件模块实际上存在于模块的 default 对象中。最终得到的 menuModules 就是一个存放所有 react 组件的数组。

2. 调用 token 检查接口实现自动登录:

    ```js
    componentWillMount () {
        // 请求数据
        request({
            method: 'POST',
            url: `${getRequestPath()}/user/check_token`,
            data: {
                'user_agent': window.Waydua.userAgent,
                'login_token': cookieUtil.get('login_token')
            },
            success: (data) => {
                if (data['result'] !== 1) {
                    this.setState({
                        routerType: 'ONLY_LOGIN'
                    });
                } else {
                    this.setState({
                        routerType: 'NORMAL'
                    });
                }
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }
    ```

    getRequestPath() 是自封装的一个获取接口域名的函数，token 检查接口为"/user/check_token"，传参为 user_agent 和 login_token，分别表示用户设备信息和保存在 cookie 中的登录 token(使用 cookieUtil api 获取)，当 token 检查返回成功状态值，则表示可自动登录，state 值 routerType 置为"NORMAL"，否则置为"ONLY_LOGIN"。

3. 根据 state 值 routerType 的不同，配置不同的路由:

    ```js
    // 配置路由
    renderRouter () {
        switch (this.state.routerType) {
            case 'ONLY_LOGIN':
                return <Route path="/" component={ Account } />
            case 'NORMAL':
                return (
                    <Switch>
                        {
                            config.menus.map((item, index) =>
                                <Route key={ index }
                                    path={ item.route }
                                    component={ menuModules[index] }
                                    exact />
                            )
                        }
                    </Switch>
                );
            default:
                return '';
        }
    }
    ```

    "ONLY_LOGIN"只有一个路由，实现强制登录效果，"NORMAL"则是将整个 menuModules 加载进去。

## <a name="href2">组件基本结构</a> ##

### <a name="href2-1">页面组件</a> ###

以 Clock 菜单为例，页面组件文件为 src/mw/router/Clock/index.jsx，其内容分为两部分，一部分是编写的组件内容，另一部分则是接入 redux 的代码。组件内容与具体业务相关，redux 接入的相关代码基本都差不多，如下:

```js
// 将state对应值绑定到props上
function mapStateToProps(state) {
    return {
        [prefix]: state[prefix]
    }
}

// 将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
```

以上代码唯二变化的是 prefix 和 Container，prefix 是一个页面唯一标识符常量，例如 Clock 组件中 prefix 值就是"Clock"，Container 则是页面组件的固定名称。

### <a name="href2-2">子组件</a> ###

子组件放置在每个页面模块的 components 目录下，子组件的编写更为自由，其基本结构为(以 Clock 模块的 HeadTabs 组件为例):

```js
import React from 'react';

export default class HeadTabs extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <header className="head-tabs-container">
                {/* 组件内容 */}
            </header>
        )
    }
}
```

## <a name="href3">redux状态管理</a> ##

redux 主要分为两部分: action 和 reducer，关于 redux 的更多知识，可以参考: [Redux系列01：从一个简单例子了解action、store、reducer](https://www.cnblogs.com/chyingp/p/redux-01-introduction-actou-store-reducer-action.html)

### <a name="href3-3">action</a> ###

actions 目录管理所有的 action，所有 action 的统一管理文件为 index.js，其内容为:

```js
import Public from './Public.js';

const config = require('./../data.json');
const actions = {
    ...Public
};

config.menus.forEach((item) => {
    Object.assign(actions, {
        ...(require('./' + item.name + '.js').default)
    });
});

export default actions;
```

Public 是公用的 action，其他的 action 则是通过遍历 data.json 文件动态引入的，每个 action 文件内容格式基本固定，如下:

```js
const setHomeData = (newData = {}, props) => {
    const { homeData } = props;
    Object.assign(homeData, newData);

    return {
        type: 'SET_HOME_DATA',
        homeData
    }
};

export default {
    setHomeData
};
```

setHomeData 和 homeData 都是在组件中使用，分别用于设置和引用 store 中的值，"SET_HOME_DATA"应与 reducer 对应，将其看作是一个联系 action 和 reducer 的唯一标识符。

### <a name="href3-4">reducer</a> ###

reducers 目录管理所有的 reducer，同样的，统一管理文件为 index.js，其内容如下:

```js
import { combineReducers } from 'redux';
import Public from './Public.js';

const config = require('./../data.json');
const reducer = {
    Public
}

config.menus.forEach((item) => {
    const { name } = item;
    reducer[name] = require('./' + name + '.js').default;
});

// 使用redux的combineReducers方法将所有reducer打包起来
export default combineReducers(reducer);
```

可以看到，代码中引入了一个名为 Public 公用 reducer，其他的 reducer 也是通过遍历读取 data.json 文件动态引入的，每个 reducer 的结构都是一致的，如下:

```js
// reducer其实也是个方法而已，参数是state和action，返回值是新的state，注意一定要返回一个state值
export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_HOME_DATA':
            state = {
                homeData: { ...action.homeData }
            };
            return state;
        default:
            state = {
                homeData: {
                    // 默认值
                    ...
                }
            };
            return state;
    }
}
```

---

```
ID         : 68
DATE       : 2018/09/17
AUTHER     : WJT20
TAG        : React
```
