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