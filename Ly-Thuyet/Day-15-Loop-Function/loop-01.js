/*
    2 loại vòng lặp
        Loại 1: Vòng lặp với số lần lặp xác định trước for

        for (bienchay, dieukiendung, buocnhay) {
            // Đoạn code
        }

        Hạn chế vòng lặp lồng nhau
        Cùng lắm lồng 1 cấp

        Loại 2: Vòng lặp với số lần lặp không xác định trước while, do while
*/

// for (var i = 1; i <= 10; i++) {
//     console.log("Lần lặp thứ: " + i);
// }

// for (var i = 10; i >= 1; i--) {
//     console.log("Lần lặp thứ: " + i);
// }

// var n = 10;
// var total = 0;

// for (var i = 1; i <= n; i++) {
//     total += i;
// }
// console.log(total);

/*
    Bài 2: Tính giá trị biểu thức
    Total = 1 + 1*2 + 1*2*3 + ... + n;
*/

// var n = 5;
// var s = 1;
// var total = 0;

// for (var i = 1; i <= n; i++) {
//     s *= i;
//     total += s;
// }
// console.log(total);

/*
    Bài 3: Vẽ 1 tam giác *

    *
    * *
    * * *
    * * * *
    * * * * *
*/

// var n = 5;

// for (var i = 1; i <= n; i++) {
//     if (i > 1) {
//         document.write('<br>');
//     }
//     for (var j = 1; j <= i; j++) {
//         document.write('* ');
//     }
// }