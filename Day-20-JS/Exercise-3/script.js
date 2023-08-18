function flatArr(input) {
    if (Array.isArray(input)) {
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
    else {
        return "Không phải mảng!";
    }
}


function groupDataType(input) {
    if (Array.isArray(input)) {
        input = flatArr(input);

        var result = input.reduce(function (pre, curr) {
            var type = typeof curr;
            if (!pre[type]) {
                // Kiểm tra Object pre có thuộc tính có tên là: Kiểu dữ liệu của curr
                // Là falsy (Có nghĩa không tồn tại)
                // Thì sẽ tạo ra thuộc tính với tên là: Kiểu dữ liệu của curr và có giá trị là một Array rỗng 
                pre[type] = [];
            }
            pre[type].push(curr);
            return pre;
        }, {});

        return result;
    }
    else
        return "Không phải mảng!";
}


var arr = [["a", 1, true], ["b", 2, false], [null, undefined, "c", function () { }], [function () { }, {}]];
arr = groupDataType(arr);
console.log(arr);

// Chuyển Object sang Array
var finalArr = [];
for (var key in arr) {
    if (arr.hasOwnProperty(key)) {
        finalArr.push(arr[key]);
    }
}
console.log(finalArr);