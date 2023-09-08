// Number là kiểu dữ liệu nguyên thủy
console.log([Number]);



// Kiểm tra một biến có phải là số hay không
// var a = 10;
// console.log(a, typeof a);
// if (typeof a === 'number') {
//     console.log("Đây là số");
// }
// else {
//     console.log("Đây không phải là số");
// }



// Kiểm tra số nguyên
// if (typeof a === 'number') {
//     if (Number.isInteger(a)) {
//         console.log("Đây là số nguyên");
//     }
//     else {
//         console.log("Đây không phải là số nguyên");
//     }
// }
// else {
//     console.log("Đây không phải là số");
// }



// Số NaN (Not a Number)
// var a = NaN;
// console.log(a, typeof a);



/*
    Các tình huống khi xuất hiện NaN
    - Ép kiểu thất bại
    - Tính toán các biểu thức số học mà có 1 toán hạng mang giá trị NaN hoặc do quá trình tự động ép kiểu khi thực hiện phép toán
*/
// var a = "F8";
// var b = 10;
// var c = a - b; // Áp dụng phép  -, *, /, %, ++, --
// a = +a;

// if (!Number.isNaN(c)) {
//     console.log(c);
// }
// else {
//     console.log("Không tính toán được");
// }
// console.log(a);



// Số Infinity: Xảy ra khi vượt quá MIN_SAFE_INTEGER và MAX_SAFE_INTEGER
// var a = 1000 ** 1000;
// var b = 10 / 0;
// console.log(a);
// console.log(b);



// Kiểm tra số Infinity
// if (a === Infinity) {
//     console.log("Đây là số Infinity");
// }



// => Tổng kết về kiểm tra một số :
// var a = 10;
// if (typeof a === 'number' && !Number.isNaN(a) && a !== Infinity) {
//     console.log("Đây là số");
// }



// Ép kiểu về số.
// Ép về kiểu số nguyên
// var a = "10.5";
// a = Number.parseInt(a);
// console.log(a);

// Ép sang kiểu số thực
// a = Number.parseFloat(a);

// Ép kiểu số (Số nguyên, Số thực)
// Gặp phải một kí tự không chuyển được sẽ trả về NaN
// Viết tắt Number() thì viết là dấu +
// a = Number(a);
// console.log(a);



// Bài 1: Tính tổng các số chẵn của mảng sau:
// var number = [5, "2", 1, 9, 8, 4, -Infinity, undefined];
// var total = 0;

// for (var i = 0; i < number.length; i++) {
//     number[i] = Number(number[i]);
//     if (!Number.isNaN(number[i]) && number[i] % 2 === 0) {
//         total += number[i];
//     }
// }
// console.log(total);



// 1. .toFixed() : Lấy số chữ số phần thập phân
// => Trả về 1 chuỗi
// var a = 10.566;
// a = a.toFixed(2);
// console.log(a);



// 2. .toString() : Chuyển số thành chuỗi
// var a = 123;
// a = a.toString();
// console.log(a);



// Định dạng số tiền tệ
// var price = 1299000;
// price = price.toLocaleString("vi", {
//     style: "currency",
//     currency: "VND",
// });
// console.log(price);



// Math
console.log(Math);