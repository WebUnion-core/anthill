## 列表的抽象数据类型定义

列表是一组有序的数据。每个列表中的数据项称为元素。在 JavaScript 中，列表中的元素可以是任意数据类型。列表中可以保存多少元素并没有事先限定，实际使用时元素的数量受到程序内存的限制。

不包含任何元素的列表称为空列表。列表中包含元素的个数称为列表的 length 。在内部实现上，用一个变量 listSize 保存列表中元素的个数。可以在列表末尾 append 一个元素，也可以在一个给定元素后或列表的起始位置 insert 一个元素。使用 remove 方法从列表中删除元素，使用 clear 方法清空列表中所有的元素。

还可以使用 show() 方法显示列表中所有的元素，使用 getElement() 方法显示当前元素。

列表拥有描述元素位置的属性。列表有前有后（分别对应 front 和 end）。使用 next() 方法可以从当前元素移动到下一个元素，使用 prev() 方法可以移动到当前元素的前一个元素。还可以使用 moveTo(n) 方法直接移动到指定位置，这里的 n 表示要移动到第 n 个位置。currPos 属性表示列表中的当前位置。

列表的抽象数据类型并未指明列表的存储结构，在本章的实现中，我们使用一个数组dataStore 来存储元素

下表：列表的抽象数据类型定义
| | |
|--|--|
listSize （属性）| 列表的元素个数
pos （属性）| 列表的当前位置
length （属性） |返回列表中元素的个数
clear （方法）| 清空列表中的所有元素
show （方法）| 返回列表的字符串形式
getElement （方法）| 返回当前位置的元素
insert （方法）| 在现有元素后插入新元素
append （方法）| 在列表的末尾添加新元素
remove （方法）| 从列表中删除元素
front （方法）| 将列表的当前位置设移动到第一个元素
end （方法） |将列表的当前位置移动到最后一个元素
prev （方法）| 将当前位置后移一位
next （方法）| 将当前位置前移一位
currPos （方法）| 返回列表的当前位置
moveTo （方法）| 将当前位置移动到指定位置

## 实现列表类

```js
let List = (() => {
    let listSize = 0,
        dataStore = [];
    pos = 0;
    return class List {
        constructor() {

        }
        clear() {
            dataStore = [];
            listSize = pos = 0;
        }
        find(el) {
            for (let i in dataStore) {
                if (el === dataStore[i]) return i;
            }
            return -1;
        }
        show() {
            return dataStore;
        }
        insert(el, after) {
            let insertPos = this.find(after);
            if (insertPos > -1) {
                listSize += 1;
                dataStore.splice(insertPos, 0, el);
                return true;
            }
            return false;
        }
        append(el) {
            dataStore[listSize++] = el;
        }
        remove(el) {
            let foundAt = this.find(el);
            if (foundAt > -1) {
                dataStore.splice(foundAt, 1);
                listSize -= 1;
                return true;
            }
            return false;
        }
        front() {
            pos = 0;
        }
        end() {
            pos = listSize - 1;
        }
        prev() {
            if (pos > 0) {
                --pos;
            }
        }
        next() {
            if (pos < listSize - 1) {
                ++pos
            }
        }
        length() {
            return listSize;
        }
        currPos() {
            return pos;
        }
        moveTo(p) {
            pos = p;
        }
        getElement() {
            return dataStore[pos];
        }
        contains(el) {
            for (let i in dataStore) {
                if (el === dataStore[i]) return true;
            }
            return false;
        }
    }
})()


let aList = new List();

aList.append('1')
aList.append('2')
aList.append('3')
aList.append('4')
aList.append('5')
aList.append('6')

aList.remove('3')

aList.insert('3', '4')

console.log(aList.contains('2')) // true

console.log(aList.show()) // [ '1', '2', '3', '4', '5', '6' ]

//移动到列表的第一个元素
aList.front();
console.log(aList.getElement()); //1
aList.next();// 第二个元素
aList.next();
aList.next();// 第四个元素
console.log(aList.getElement()); // 4
```

## 使用迭代器访问列表

使用迭代器的一些优点。
- 访问列表元素时不必关心底层的数据存储结构。 •
- 当为列表添加一个元素时，索引的值就不对了，此时只用更新列表，而不用更新迭代器。 •
- 可以用不同类型的数据存储方式实现 •  cList 类，迭代器为访问列表里的元素提供了一种统一的方式

```js
for(aList.front(); aList.currPos() < aList.length(); aList.next()) {
  console.log(aList.getElement());
}
```

迭代器只是用来在列表上随意移动，而不应该和任何为列表增加或删除元素的方法一起使用。