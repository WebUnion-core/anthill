
# React语法学习总结——state与props #

## 目录 ##

1. [props](#href1)
    1. [简单传输props](#href1-1)
    2. [批量传输props](#href1-2)
    3. [附属组件抽取](#href1-3)
2. [state](#href2)
    1. [setState()](#href2-4)
    2. [子组件改变父组件的state](#href2-5)

## <a name="href1">props</a> ##

### <a name="href1-1">简单传输props</a> ###

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

### <a name="href1-2">批量传输props</a> ###

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

### <a name="href1-3">附属组件抽取</a> ###

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

## <a name="href2">state</a> ##

React 把用户界面当作简单状态机。把用户界面想像成拥有不同状态然后渲染这些状态，可以轻松让用户界面和数据保持一致。组件中经常变化的数据存储在 state 中，React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面(不要操作 DOM)。React 来决定如何最高效地更新 DOM。

### <a name="href2-4">setState()</a> ###

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

### <a name="href2-5">子组件改变父组件的state</a> ###

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
ID         : 109
DATE       : 2018/09/19
AUTHER     : WJT20
TAG        : 
```
