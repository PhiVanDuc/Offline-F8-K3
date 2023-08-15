// Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý

var arr = ['a', 'b', 'c', 'a', 'b', 'c'];
var finalArr = [];

for (var i = 0; i < arr.length; i++) {
    if (finalArr.indexOf(arr[i]) === -1) {
        finalArr[finalArr.length] = arr[i];
    }
}
arr = finalArr;
console.log(arr);