class HashTable {
    constructor() {
        this.table = new Array(137);
    }

    betterHash(string) {
        const H = 37;
        var total = 0;
        for (var i = 0; i < string.length; ++i) {
            total += H * total + string.charCodeAt(i);
        }
        total = total % this.table.length;
        if (total < 0) {
            total += this.table.length - 1;
        }
        return parseInt(total);
    }
    put(data) {
        let pos = this.betterHash(data);
        let index = 0;
        if (this.table[pos] == undefined) {
            this.table[pos] = data;
        } else {
            while (this.table[++pos] != undefined) {}
            this.table[pos] = data;
        }
    }

    showDistro() {
        for (let i in this.table) {
            if (this.table[i] != undefined) {
                console.log(`${i} : ${this.table[i]}`);
            }
            // if (this.table[i][0] != undefined) {
            //     for (let j in this.table[i]) {
            //         console.log(i + ": " + j + " : " + this.table[i][j]);
            //     }
            // }
        }
    }

    get(key) {
        let hash = this.betterHash(key);
        for (let i = hash; this.table[hash] != undefined; i++) {
            if(this.table[hash] == key) {
                return this.table[hash];
            }
        }
        return undefined;
    }
}


var hTable = new HashTable();

var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];

for (var i = 0; i < someNames.length; ++i) {
    hTable.put(someNames[i]);
}

hTable.showDistro();

console.log(hTable.get("Jonathan"))