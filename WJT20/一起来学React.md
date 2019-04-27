
# 一起来学React #

## 目录 ##

1. 最简单的组件
2. HTML属性
3. DOM操作
    1. 获取DOM节点
    2. 动态修改DOM
4. props
    1. 简单传输props
    2. 批量传输props
    3. 附属组件抽取
5. state
    1. setState()
    2. 子组件改变父组件的state

## 最简单的组件 ##

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

## HTML属性 ##

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

## DOM操作 ##

### 获取DOM节点 ###

JavaScript 中获取 DOM 节点有多种方式，在 react 中获取 DOM 节点，应使用 ref，用法与根据 id 获取 DOM 节点差不多:

```js
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

### 动态修改DOM ###

react 中不建议手动修改 DOM，像修改 innerHTML、appendChild 等等操作还是少用为好。原生 JavaScript 可以通过改变一个 DOM 节点的 innerHTML 属性的值来重置 DOM 节点的内容，react 不建议使用 innerHTML，但是可以使用替代方法——dangerouslySetInnerHTML，具体用法如下:

```js
render () {
    return <p dangerouslySetInnerHTML={{ __html: '<strong>text</strong>' }} />
}
```

## props ##

### 简单传输props ###

父子组件之间使用 props 来传输数据。

父组件(Container.jsx):

```js
import React from 'react';
import Title from './Title.jsx';
export default class Container extends React.Component {
    constructor (props) {
        super(props);
        this.title = 'TITLE';
    }

    render () {
        return (
            <main>
                <Title title={ this.title } />
            </main>
        )
    }
}
```

子组件(Title.jsx):

```js
import React from 'react';
export default class Title extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return <h1>{ this.props.title }</h1>
    }
}
```

### 批量传输props ###

一般来说，props 要尽可能的少，如果父组件传递给子组件的较多，可以用一个对象类型的变量保存 props，在传递给子组件时解构这个对象即可:

```js
...
render () {
    const titleProps = {
        title: 'Hello',
        theme: 'NATURE',
        user: 'WJT20'
    };
    return (
        <main>
            <Title { ...titleProps } />
        </main>
    )
}
```

### 附属组件抽取 ###

一些功能简单的组件，如果单独将其代码抽取到一个子组件文件是不太必要的，这时候可以将其抽取为当前组件的附属组件，这样说可能有些难以理解，直接上代码:

```js
import React from 'react';

// 二级附属组件
const Text = ({ text }) => <p>{ text }</p>

// 一级附属组件
const List = ({ title, { ...textProps } }) =>
    <div>
        <h1>{ title }</h1>
        <Text { ...textProps } />
    </div>

export default class Container extends React.Component {
    constructor (props) {
        super(props);
        this.title = 'TITLE';
    }

    render () {
        const listProps = {
            title: 'Hello',
            text: 'A question.'
        };
        return (
            <main>
                <List { ...listProps } />
            </main>
        )
    }
}
```

以上代码中，List 和 Text 都是 Container 的附属组件，这两个组件的定义形式与函数的定义形式差不多，传入的参数即 props。

## state ##

React 把用户界面当作简单状态机。把用户界面想像成拥有不同状态然后渲染这些状态，可以轻松让用户界面和数据保持一致。组件中经常变化的数据存储在 state 中，React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面(不要操作 DOM)。React 来决定如何最高效地更新 DOM。

### setState() ###

基本数据类型的 state 需要调用 setState() 方法来改变其值，引用数据类型的 state 值不用 setState() 也可以变化，例如数组类型的 state 可以使用 push、shift 等方法改变其子元素，所以，处理引用类型的 state 要非常小心，尽可能不要使用 setState() 以外的方法改变其内容。

简单的 state 实例如下:

```js
import React from 'react';
export default class Container extends React.Component {
    constructor (props) {
        super(props);

        // state初始化
        this.state = { title: 'Hello!' };
    }

    componentDidMount () {
        // 1s后改变title
        setTimeout(() => {
            this.setState({ title: 'What?' });
        }, 1000);
    }

    render () {
        return (
            <main>
                <h1>{ this.state.title }</h1>
            </main>
        )
    }
}
```

### 子组件改变父组件的state ###

子组件改变父组件的 state，实质是让子组件调用父组件的 setState() 方法，但是需要注意，调用 setState() 的 this 对象必须指向父组件，用箭头函数或 bind() 方法即可解决此问题。

父组件(Container.jsx):

```js
import React from 'react';
import Title from './Title.jsx';
export default class Container extends React.Component {
    constructor (props) {
        super(props);
        this.state = { title: 'Hello!' };
    }

    // 使用箭头函数让this指向当前组件
    changeTitle = (title) => {
        this.setState({ title });
    }

    render () {
        return (
            <main>
                <Title title={ this.state.title }
                    changeTitle={ this.changeTitle } />
            </main>
        )
    }
}
```

子组件(Title.jsx):

```js
import React from 'react';
export default class Title extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        // 子组件挂在完成后1s改变父组件的state
        setTimeout(() => {
            this.props.changeTitle('What?');
        }, 1000);
    }

    render () {
        return <h1>{ this.props.title }</h1>
    }
}
```

---

```
ID         : 69
DATE       : 2018/09/19
AUTHER     : WJT20
TAG        : React
```
