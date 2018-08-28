## 栈

栈（stack）又名堆栈，它是一种运算受限的线性表。其限制是仅允许在表的一端进行插入和删除运算。这一端被称为栈顶，相对地，把另一端称为栈底。向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。

![](https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=b4cf8cd69925bc313f5009ca3fb6e6d4/8b82b9014a90f603eab7c55f3912b31bb051eda7.jpg)

## 对栈的操作

对栈的两种主要操作是将一个元素压入栈和将一个元素弹出栈。入栈使用 push() 方法，出栈使用 pop() 方法。

另一个常用的操作是预览栈顶的元素。 pop() 方法虽然可以访问栈顶的元素，但是调用该方法后，栈顶元素也从栈中被永久性地删除了。 peek() 方法则只返回栈顶元素，而不删除它。

为了记录栈顶元素的位置，同时也为了标记哪里可以加入新元素，我们使用变量 top ，当向栈内压入元素时，该变量增大；从栈内弹出元素时，该变量减小。

push() 、 pop() 和 peek() 是栈的 3 个主要方法，但是栈还有其他方法和属性。 clear() 方法清除栈内所有元素， length 属性记录栈内元素的个数。我们还定义了一个 empty 属性，用以表示栈内是否含有元素，不过使用 length 属性也可以达到同样的目的。

## 栈的实现

```js
let Stack = (() => {
    let dataStore = [],
        top = 0;
    return class Stack {
        push(el) {
            dataStore[top++] = el;
        }
        pop() { // 它返回栈顶元素，同时将变量 top 的值减 1
            if (top <= 0) {
                return '出栈失败,空栈顶'
            }
            return dataStore[--top];
        }
        peek() { // 返回数组的第 top-1 个位置的元素，即栈顶元素
            return dataStore[top - 1];
        }
        length() {
            return top;
        }
        clear() {
            top = 0;
        }
    }
})()

let aStack = new Stack();

aStack.push('栈1');
aStack.push('栈2');
aStack.push('栈3');
aStack.push('栈4');

console.log(aStack.peek())
aStack.pop();
aStack.pop();
aStack.pop();
console.log(aStack.peek())
```

## 使用栈

将数字转换为二进制和八进制

```js
function mulBase(num, base) {
    let s = new Stack();
    do {
        s.push(num % base);
        num = Math.floor(num / base);
    } while (num > 0);

    let converted = "";

    while(s.length() > 0){
        converted += s.pop();
    }
    return converted;
}

console.log(mulBase(21, 2)); // 10101
```

回文

```js
function isPalindrome(word) {
    let s = new Stack();
    for (let i in word) {
        s.push(word[i]);
    }

    var result = "";

    while(s.length() > 0) {
        result += s.pop()
    }
    return result === word;
}

console.log(isPalindrome("ht"))
```