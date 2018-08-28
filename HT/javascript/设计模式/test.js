class HashTable {
    constructor() {
        this.table = new Array(137);
    }

    simpleHash(data) {
        var total = 0;
        for (var i = 0; i < data.length; ++i) {
            total += data.charCodeAt(i);
        }
        console.log("Hash value: " + data + " -> " + total);
        return total % this.table.length;
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
        let pos = this.simpleHash(data);
        this.table[pos] = data;
    }

    showDistro() {
        for (let i in this.table) {
            if (this.table[i] != undefined) {
                console.log(`${i} : ${this.table[i]}`);
            }
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genStuData(arr) {
    for (var i = 0; i < arr.length; ++i) {
        var num = "";
        for (var j = 1; j <= 9; ++j) {
            num += Math.floor(Math.random() * 10);
        }
        num += getRandomInt(50, 100);
        arr[i] = num;
    }
}
var numStudents = 10;
var arrSize = 97;
var idLen = 9;
var students = new Array(numStudents);

genStuData(students);

console.log("Student data: \n");

for (var i = 0; i < students.length; ++i) {
    console.log(students[i].substring(0, 8) + " " +
        students[i].substring(9));
}


console.log("\n\nData distribution: \n");

var hTable = new HashTable();

for (var i = 0; i < students.length; ++i) {
    hTable.put(students[i]);
}