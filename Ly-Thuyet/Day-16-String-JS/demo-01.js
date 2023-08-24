// var welcome = 'Hoang An F8'; // Bien toan cuc

// var getMessage = function (msg) {
//     console.log('getMessage');
//     var a = 10; // Bien toan cuc cua ham cha

//     // Dinh nghia ham con
//     var display = function (msg) {
//         console.log('Xin chao', msg);
//         console.log(`a = ${a}`);
//         console.log(`welcom = ${welcome}`);
//     }

//     // Goi ham con
//     display('Con');
// }
// getMessage('Cha');


// // Day la ham closure
// // Tim hieu them ve Thunk
// /*
//     Can thuc hien 3 phep tinh:
//         10 + 5
//         10 + 20
//         10 + 30
// */

// var sum = function (a) {
//     return function (b) {
//         return a + b;
//     }
// };

// var add = sum(10);
// // console.log(add);
// console.log(add(5));
// console.log(add(20));
// console.log(add(30));


// // setTimeout === Delay
// // setTimeout use rest parameter

// setTimeout(function (name, email) {
//     console.log('Xin chao F8', name, email);
// }, 2000, 'Phi Duc', 'phid808@gmail.com');


// // setInterval => Lap di lap lai sau mot khoang thoi gian

// var count = 0;
// var id = setInterval(function () {
//     console.log(++count);
//     if (count === 10) {
//         clearInterval(id);
//     }
// }, 1000);


// // De quy

// var getTotal = function (n) {
//     if (n === 1) {
//         return 1;
//     }
//     return n + getTotal(n - 1);
// }
// console.log(getTotal(10));

// var fibonaci = function (n) {
//     if (n === 1 || n === 2) {
//         return 1;
//     }

//     return fibonaci(n - 1) + fibonaci(n - 2);
// };
// console.log(fibonaci(6));

// /*
//     n = 5;
//     fibonaci(4) + fibonaci(3)
//     fibonaci(3) + fibonaci(2)
//     fibonaci(2) + fibonaci(1)
//     fibonaci(2) + fibonaci(1)
//     fibonaci(1)
//     1 + 1 + 1 + 1 + 1 = 5
// */