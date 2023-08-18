var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

var flatArr = function (input) {
    var newArr = [];

    input.forEach(function (element) {
        if (Array.isArray(element)) {
            newArr = newArr.concat(flatArr(element));
        }
        else {
            newArr.push(element);
        }
    });
    return newArr;
}

var newArr = flatArr(arr);
console.log(newArr);