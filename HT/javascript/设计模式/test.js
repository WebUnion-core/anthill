class Node {
    constructor(data, left, right) {
        this.data = data;
        this.right = right;
        this.left = left;
    }
    show() {
        return this.data;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    insert(data) {
        let n = new Node(data, null, null);
        if (this.root == null) {
            this.root = n;
        } else {
            let current = this.root;
            while (true) {
                if (data < current.data) {
                    if (current.left == null) {
                        current.left = n;
                        break;
                    }
                    current = current.left
                } else {
                    if (current.right == null) {
                        current.right = n;
                        break;
                    }
                    current = current.right
                }
            }
        }
    }
    getMin() {
        let current = this.root;
        while (true) {
            if (current.left !== null) {
                current = current.left
            } else {
                break;
            }
        }
        return current.data;
    }
    getMax() {
        let current = this.root;
        while (true) {
            if (current.right !== null) {
                current = current.right
            } else {
                break;
            }
        }
        return current.data;
    }
    find(data) {
        let current = this.root;
        let parrent;
        if (this.root == null) {
            return false;
        }
        while (true) {
            if (data != current.data) {
                parrent = current;
                if (data < current.data) {
                    if (current.left == null) return false;
                    current = current.left;
                } else {
                    if (current.right == null) return false;
                    current = current.right;
                }
            } else {
                return {
                    cur: current,
                    pre: parrent
                };
            }
        }
    }
    remove(data) {
        let findData = this.find(data),
            current = findData.cur,
            prevent = findData.pre;

        if (current.left == null && current.right == null) {
            if (current.data < prevent.data) {
                prevent.left = null;
            } else {
                prevent.right = null;
            }
        } else {
            if (current.data < prevent.data) {
                prevent.left = current.left;
            } else {
                prevent.right = current.left;
            }
        }
    }
}


let bst = new BST();


bst.insert(5);
bst.insert(1);
bst.insert(2);
bst.insert(7);
bst.insert(3);
bst.insert(4);
bst.insert(6);
bst.insert(7);
bst.insert(8);

bst.remove(5)

console.log(bst.find(4))