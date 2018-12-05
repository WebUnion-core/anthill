offsetTop left 兼容

```js
var getOffset = {
  left: function(obj) {
    return obj.offsetLeft + (obj.offsetParent ? this.left(obj.offsetParent) : 0)
  },
  top: function() {
    return obj.offsetTop + (obj.offsetParent ? this.top(obj.offsetParent) : 0)
  }
}
```
