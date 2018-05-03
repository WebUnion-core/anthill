
# JavaScript实战技巧 #

## 目录 ##

1. 数组升序排序

---

## 数组升序排序 ##

```js
function lexSort(a, b) {
	return a === b ? 0 : a > b ? 1 : -1
}

var ary = [2, 5, 3, 1, 4];
console.log(ary.sort(lexSort)); // => [1,2,3,4,5]
```

---

```
ARTICLE_ID : 71
POST_DATE : 2018/05/03
AUTHER : WJT20
```
