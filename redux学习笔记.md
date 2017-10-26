
# redux学习笔记 #

> 应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。惟一改变 state 的办法是触发 action，一个描述发生什么的对象。为了描述 action 如何改变 state 树，你需要编写 reducers。

## counter ##

入口：

```
...
import { createStore } from 'redux';  <- 引入redux的createStore
import counter from './reducers';  <- 引入reducer，它的作用到底是什么？
const store = createStore(counter);  <- createStore获取store，需要传入reducer

ReactDOM.render(
  <Counter
    value={store.getState()}  <- getState？看名字应该是获取state
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}  <- store的dispatch？dispatch是“发送”的意思
  />,
  rootEl
)
```

组件：

```
...
class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onIncrement } = this.props  <- 在render中将prop中的value和onIncrement保存为常量，这种做法需要调查下会不会有什么坏处
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
      </p>
    )
  }
}
```

reducers：

```
export default (state = 0, action) => {  <- reducer的写法必须是这样吗？
  switch (action.type) {
    case 'INCREMENT':
      return state + 1  <- state的操作应该就在这里
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
```

---

```
ARTICLE_ID : 39
POST_DATE : 2017/10/25
AUTHER : WJT20
```
