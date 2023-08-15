// Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí

var arr = [3, 6, 1, 30, 24, 54, 12];
var max = arr[0], min = arr[0];
var maxPosition, minPosition;

for (var i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
        max = arr[i];
        maxPosition = i;
    }

    if (min > arr[i]) {
        min = arr[i];
        minPosition = i;
    }
}

console.log(arr);
console.log(`Số lớn nhất trong mảng: ${max}`);
console.log(`Vị trí số lớn nhất trong mảng: ${maxPosition}`);
console.log(`Số bé nhất trong mảng: ${min}`);
console.log(`Vị trí số bé nhất trong mảng: ${minPosition}`);