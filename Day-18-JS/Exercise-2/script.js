var arr = ['a', 'b', 'c', 'a', 'b', 'c'];
var subArr = [];

for (var i = 0; i < arr.length; i++) {
    var check = false;

    for (var j = 0; j < subArr.length; j++) {
        if (arr[i] === subArr[j]) {
            check = true;
            break;
        }
    }

    if (check === false) {
        subArr[subArr.length] = arr[i];
    }
}

console.log(subArr);