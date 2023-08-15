// Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”

function isPrime(n) {
    if (n < 2) {
        return false;
    }

    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

var arr = [];
var i = 0, total = 0, count = 0;
while (i <= 20) {
    if (i === 20) {
        arr[arr.length] = i;
        break;
    }
    arr[arr.length] = i + 1;
    i++;
}

for (var i = 0; i < arr.length; i++) {
    if (isPrime(arr[i]) === true) {
        total = total + arr[i];
        console.log(arr[i]);
        count++;
    }
}

if (total !== 0) {
    console.log(` Kết quả: ${total / count} `);
}
else {
    console.log('Không có số nguyên tố');
}