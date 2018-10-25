var x = 1;

function* foo() {
    x++;
    yield 1;
    console.log(x);
}

function bar() {
    x++
}

var it = foo();

console.log(it.next())
bar();
it.next();