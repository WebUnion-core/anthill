function foo() {
  return () => {
    console.log(this.a);
  }
}

var obj = {
  a: 2,
  foo: foo
}

var obj2 = {
  a: 4
}

var bar = foo.call(obj2)

bar.call(obj); // 4