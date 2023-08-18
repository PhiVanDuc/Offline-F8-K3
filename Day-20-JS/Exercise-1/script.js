var firstArr = [1, 4, 3, 2];
var secondArr = [5, 2, 6, 7, 1];

var newArr = secondArr.reduce(function (pre, curr) {
    if (firstArr.includes(curr)) {
        pre.push(curr);
    }
    return pre;
}, []);
console.log(newArr);