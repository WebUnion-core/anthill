class Set {
    constructor() {
        this.dataStore = [];
    }
    show() {
        return this.dataStore;
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
    contains(data) {
        if (this.dataStore.indexOf(data) > -1) {
            return true
        }
        return false
    }
    union(set) {
        let tempSet = new Set();
        for (let i in this.dataStore) {
            tempSet.add(this.dataStore[i]);
        }
        for (let i in set.dataStore) {
            if (!tempSet.contains(set.dataStore[i])) {
                tempSet.dataStore.push(set.dataStore[i]);
            }
        }
        return tempSet;
    }
    intersect(set) {
        let tempSet = new Set();
        for (let i in set.dataStore) {
            if (this.dataStore.indexOf(set.dataStore[i]) > -1) {
                tempSet.add(set.dataStore[i])
            }
        }
        return tempSet;
    }
    size() {
        return this.dataStore.length;
    }
    subset(set) {
        if (this.size() > set.size()) {
            return false;
        } else {
            for (let i in this.dataStore) {
                if (!set.contains(this.dataStore[i])) {
                    return false;
                }
            }
            return true;
        }
    }
    difference(set){
        let tempSet = new Set();
        for(let i in this.dataStore) {
            if(set.dataStore.indexOf(this.dataStore[i]) < 0) {
                tempSet.add(this.dataStore[i])
            }
        }
        return tempSet;
    }
}

var cis = new Set();
cis.add("Mike");
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Raymond");
var dmp = new Set();
dmp.add("Raymond");
dmp.add("Cynthia");
dmp.add("Jonathan");
// var it = cis.union(dmp); // [ 'Mike', 'Clayton', 'Jennifer', 'Raymond', 'Cynthia', 'Jonathan' ]
var it = cis.intersect(dmp); // [ 'Raymond' ]

var nas = new Set();
nas.add("Raymond");
nas.add("Raymondasa");

console.log(nas.difference(cis));