var MModule = (function () {
  var MapModul = {};

  function getModul(name: string) {
    return MapModul[name];
  }

  function defindModul(name: string, rely: Array<string>, fn: any) {
    for (let i in rely) {
      rely[i] = MapModul[rely[i]]
    }
    return (MapModul[name] = fn(...rely))
  }

  return {
    getModul,
    defindModul
  }
})();

var M1 = MModule.defindModul('module1', [], function () {
  function getName() {
    return 'module1';
  }
  return {
    getName
  }
})

var M2 = MModule.defindModul('module2', ['module1'], function (m1: any) {
  function getName() {
    return m1.getName() + "  module2";
  }
  return {
    getName
  }
})

console.log(M2.getName());