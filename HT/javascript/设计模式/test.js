class Set {
    constructor() {
        this.dataStore = [];
    }
    add(data) {
        if (this.dataStore.indexOf(data) < 0) {
            this.dataStore.push(data);
            return true;
        }
        return false;
    }
    remove(data) {
        let pos = this.dataStore.indexOf(data);
        if (pos < 0) {
            this.dataStore.splice(pos, 1);
            return true;
        }
        return false;
    }
    union(set) {
        let tempSet = new Set();
        for(let i in this.dataStore){
            tempSet.add(this.dataStore[i]);
        }
    }
    contains(data) {

    }
}