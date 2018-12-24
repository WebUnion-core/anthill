
# React语法学习总结——基础篇 #

## 目录 ##

1. [最简单的组件](#href1)
2. [HTML属性](#href2)
3. [DOM操作](#href3)
    1. [获取DOM节点](#href3-1)
    2. [动态修改DOM](#href3-2)

## <a name="href1">最简单的组件</a> ##

React 认为组件才是王道，而组件是和模板紧密关联的，为了把组件和模板关联起来，便引入了 JSX 语法，React 组件以".jsx"为扩展名，实际上每个组件都是一个独立的类，从 React.Component 继承属性和方法。

一个最简单的 React 组件类如下:

```js
import React from 'react';

export default class Header extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return <h1>Header</h1>
    }
}
```

以上代码中，定义了一个 Header 类，这个类继承了 React.Component 的属性和方法，便成为了一个 React 组件。每个 React 组件都需要重写 render 方法，这个方法的作用是渲染组件内容，这里要注意，render 中返回的内容要使用 JSX 编写。constructor 并非必需，只有涉及到 props 的时候才需要加上。

## <a name="href2">HTML属性</a> ##

除了 for(被 htmlFor 代替) 和 class(被 className 代替) 等特殊属性，绝大部分 HTML 属性都可以在 JSX 中使用，使用方法如下:

```js
import React from 'react';

export default class Header extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <form className="form">
                <label htmlFor="name">姓名：</label>
                <input id="name" type="text" placeholder="默认" />
            </form>
        )
    }
}
```

可以看到 id、type、placeholder 等属性与 HTML 中的用法无异。另一个比较特殊的属性是 style 属性，这个属性用于给 HTML 标签动态添加 CSS 样式，这个属性的用法与 HTML 大不相同，例如:

```js
...
render () {
    return (
        <form className="form" style={{ fontSize: '18px' }}>
            <label htmlFor="name">姓名：</label>
            <input id="name" type="text" placeholder="默认" />
        </form>
    )
}
```

style 之后有两对大括号，第一对大括号表示在 JSX 语法中嵌入 JS 代码，所以第二对大括号其实是一个 JS 对象，fontSize 实际上就是 font-size，只不过 JS 对象中的键名不允许使用"-"，所以需要用驼峰命名法表示。

## <a name="href3">DOM操作</a> ##

### <a name="href3-1">获取DOM节点</a> ###

JavaScript 中获取 DOM 节点有多种方式，在 react 中获取 DOM 节点，应使用 ref，用法与根据 id 获取 DOM 节点差不多:

```js
...
componentDidMount () {
    console.log(this.refs.titleEl.innerText);
}

render () {
    return (
        <main>
            <h1 ref="titleEl">HEAD TITLE</h1>
        </main>
    )
}
```

### <a name="href3-2">动态修改DOM</a> ###

react 中不建议手动修改 DOM，像修改 innerHTML、appendChild 等等操作还是少用为好。原生 JavaScript 可以通过改变一个 DOM 节点的 innerHTML 属性的值来重置 DOM 节点的内容，react 不建议使用 innerHTML，但是可以使用替代方法——dangerouslySetInnerHTML，具体用法如下:

```js
...
render () {
    return <p dangerouslySetInnerHTML={{ __html: '<strong>text</strong>' }} />
}
```

---

```
ID         : 69
DATE       : 2018/09/14
AUTHER     : WJT20
TAG        : 
```
