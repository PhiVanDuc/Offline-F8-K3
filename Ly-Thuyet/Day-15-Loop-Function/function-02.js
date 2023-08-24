// function max(a, b) {
//     // Sử dụng từ khóa arguments sẽ lấy tất cả các đối số kể cả khi hàm không khai báo tham số
//     // Chỉ có hàm truyền thống mới có thể sử dụng được arguments
//     console.log(arguments);
//     console.log(a, b);
// }
// max(5, 10, 15, 20);

// Rest parameter
// Lưu ý trong một hàm chỉ có một tham số ...args và khi khai báo trong tham số thì hãy để ở dưới cùng
// function max(result, ...args) {
//     console.log(result);
//     // console.log(arguments);
//     console.log(args);
// }
// max("Max = ", 5, 6, 7, 8, 9, 10);

// Expression Function
// Sử dụng biến để định nghĩa một hàm (Có nghĩa là hàm không có tên nhưng sử dụng thông qua biến)
// Định nghĩa trước gọi sau
// var getMsg = function () {
//     console.log("Xin chào F8");
// }

// getMsg();
// // Kiểm tra một biến có phải là hàm hay không
// if (typeof getMsg === 'function') {
//     console.log('Đây là hàm');
// }

// // IIFE: Đặt hàm không cần gán biến, không cần gọi tên
// (
//     function (value) {
//         console.log("Hoàng An F8: " + value);
//     }
// )("Fullstack");


// ---------------------------------------------------------------------------------------------------------------
// CallBack
// ---------------------------------------------------------------------------------------------------------------


// Đây gọi là callback
// Giải quyết vấn đề bất đồng bộ trong js
// var getA = function (fn, ...args) {
//     console.log("getA");
//     if (typeof fn === 'function') {
//         fn(...args);
//     }
// }

// var getB = function (name, email) {
//     console.log("getB " + name, email);
// }

// var handle = function () {
//     getB("F8");
// }

// Ngoài việc truyền callback vào hàm A thì chúng ta có thể đưa luôn hàm ẩn danh vào trong hàm A. Nhưng chỉ có thể dùng được 1 lần
// Muốn gọi một hàm có tham số thì lại phải đưa hàm có tham số vào hàm không có tham số sau đó đưa hàm không có tham số đó vào hàm A - Đây là cách 1
//
// getA(getB, "F8", "phid808@gmail.com");

// // tenham => Lời gọi hàm chủ động

// setTimeout(function (name) {
//     console.log("Xin chào F8", name);
// }, 2000, "fullstack", "phid808@gmail.com");