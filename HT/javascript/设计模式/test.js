class Node {
    constructor(el) {
        this.element = el;
        this.next = null;
    }
}

let LinkedList = (() => {

    let head = new Node("head");
    return class LinkedList {
        find(item) {
            let currNode = head;
            while (currNode.element != item) {
                currNode = currNode.next;
            }
            return currNode;
        }
        findPrevious(item) {
            let currNode = head;
            while ((currNode.next != null) && (currNode.next.element != item)) {
                currNode = currNode.next;
            }
            return currNode;
        }
        insert(el, item) {
            let newNode = new Node(el);
            let currNode = this.find(item);
            newNode.next = currNode.next;
            currNode.next = newNode;
        }
        remove(item) {
            let currNode = this.findPrevious(item);
            let preNode = this.find(item);
            currNode.next = preNode.next;
        }
        display() {
            let node = head;
            while (node.next != null) {
                console.log(node.next.element);
                node = node.next;
            }
        }
    }
})()

let aList =  new LinkedList();

aList.insert("1", "head")
aList.insert("2", "1")
aList.insert("3", "2")

aList.display(); // 1 2 3

aList.remove('3')

aList.display();// 1 2