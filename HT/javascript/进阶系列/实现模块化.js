const MModules = (() => {
  let modulesMap = {};
  function getName(name) {
    return modulesMap[name];
  }

  function defined(name, rely, fn) {
    for (let i in rely) {
      rely[i] = modulesMap[rely[i]];
    }
    return (modulesMap[name] = fn(...rely));
  }

  return {
    getName,
    defined
  }
})()



var moduels1 = MModules.defined("m1", [], function () {
  function getName() {
    return "m1"
  }

  return {
    getName
  }
})

var modules2 = MModules.defined("m2", ["m1"], function (m1) {
  function getName() {
    return "m2" + m1.getName();
  }

  return {
    getName
  }
})

console.log(modules2.getName())