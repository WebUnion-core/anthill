function bubleSort(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1, len = arr.length; j < len; j++) {
      if (arr[i] > arr[j]) {
        [arr[j], arr[i]] = [arr[i], arr[j]]
      }
    }
  }
  return arr;
}

let arrrr = [4, 1, 51, 6, 1231, 51, 61, 124, 61, 61, 1416, 17];

console.log(bubleSort(arrrr));
