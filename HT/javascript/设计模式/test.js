function ooo(name) {
    this.name = name;
    return name
}
console.dir(new ooo('222'))

function ooo2(name) {
    this.name = name;
    return [1,2,3,4]
}
console.dir(new ooo2('444'))