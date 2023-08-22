var arr = [2, 4, 6, 8, 10, 12];

// var maxNumber = arr.reduce(function (pre, curr) {
//     return pre < curr ? curr : pre;
// });

// var total = arr.reduce(function (pre, curr) {
//     return pre + curr;
// }, 0);

// console.log(maxNumber);
// console.log(total);

// Mảng có kích thước bằng 0 - không có giá trị khởi tạo
// Mảng có kích thước bằng 1 - Không có giá trị khởi tạo
// Có giá trị khởi tạo
// Giá trị khởi tạo bằng chính phần tử đầu tiên của mảng

Array.prototype.reduce2 = function (callback, initialValue) {
    let array = this;

    if (Array.isArray(array)) {
        let index = 0;
        let result;

        if (initialValue === undefined && array.length === 0) {
            return "Error";
        }
        else if (initialValue === undefined && array.length > 0) {
            index = 1;
            initialValue = array[0];
        }

        do {
            if (index === array.length - 1) {
                result = callback(initialValue, array[index], index, array);
            }
            else {
                initialValue = callback(initialValue, array[index], index, array);
                result = initialValue;
            }
            ++index;
        }
        while (index < array.length);

        return result;
    }
    else {
        return "Không hợp lệ";
    }
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

console.log(maxNumber2);
console.log(total2);