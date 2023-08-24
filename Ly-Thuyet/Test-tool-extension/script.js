function sumAll(arr) {
    var firstElement;
    var lastElement;
    var total = 0;

    arr.sort(function (a, b) {
        return a - b;
    });

    if (arr[0] < arr[arr.length - 1]) {
        firstElement = arr[0];
        lastElement = arr[arr.length - 1];
    }
    else if (arr[0] > arr[arr.length - 1]) {
        firstElement = arr[arr.length - 1];
        lastElement = arr[0];
    }

    if (arr[0] === arr[arr.length - 1]) {
        return arr[0];
    }
    else {
        var increase = firstElement;
        while (increase < lastElement) {
            increase++;
            if (increase === lastElement) {
                break;
            }
            arr.push(increase);
        }

        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i]);
            }
        }

        arr = newArr;
        for (var i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        return total;
    }
}

var arr = [1, 12, 10];
console.log(sumAll(arr));