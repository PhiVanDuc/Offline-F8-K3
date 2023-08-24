var arr = [2, 4, 6, 8, 10, 12];
var arr2 = [];

Array.prototype.reduce2 = function (callback, initialValue) {
    let array = this;
    let index = 0;

    if (initialValue === undefined && array.length === 0) {
        return "Error";
    }
    else if (initialValue === undefined && array.length > 0) {
        index = 1;
        initialValue = array[0];
    }

    while (index < array.length) {
        initialValue = callback(initialValue, array[index], index, array);
        ++index;
    }

    return initialValue;
}


// Kiểm tra các trường hợp

arr.reduce2(function (pre, curr) {
    console.log(pre, curr);
    return curr;
});

var maxNumber2 = arr.reduce2(function (pre, curr) {
    return pre < curr ? curr : pre;
});

var total2 = arr.reduce2(function (pre, curr) {
    return pre + curr;
}, 0);

var total = arr2.reduce(function (pre, curr) {
    return pre + curr;
}, 0);

console.log(maxNumber2);
console.log(total2);
console.log(total);