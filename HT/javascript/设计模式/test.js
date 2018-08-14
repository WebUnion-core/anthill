function cloneObject(obj) {
    const clone = {};

    Object.keys(obj).forEach(key => {
        clone[key] = obj[key];
    });

    return clone;
}

var a = {
    a: 'a',
    name: 1,
    obj: {
        a: '1',
        b: 12131
    }
}

var newA = cloneObject(a);

a.obj.a = 5555

console.log(newA.obj.a);