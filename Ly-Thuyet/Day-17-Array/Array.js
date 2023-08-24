// Khai báo

// Cách 1:
var users = ["An", "Tam", "Dung", "Hung"];

// Cách 2:
// var users = new Array("An", "Tam", "Dung", "Hung");

// Mảng rỗng
// var users = [];
// console.log(Array.prototype);
// console.log([Array]);

// Những phương thức, thuộc tính build trực tiếp từ hàm tạo => Array.tenPhuongThuc();

// Kiểm tra một biến có phải là mảng hay không?
// if (Array.isArray(users)) {
//     console.log('Đây là mảng!');
// }
// else {
//     console.log('Đây không phải mảng!');
// }

// Lấy số lượng phần tử của mảng
// console.log(`Mảng có ${users.length} phần tử`);


// 1. Thêm phần tử mới vào cuối mảng
// users[users.length] = "Mai";
// users[users.length] = "Quý";

// 2. Truy cập vào một phần tử
// console.log(users[1]);

// 3. Sửa một phần tử
// users[1] = "Văn Quân";

// 4. Duyệt mảng
// for (var i = 0; i < users.length; i++) {
//     console.log(users[i]);
// }
// for (var index in users) {
//     console.log(users[index]);
//     // Duyệt có lấy index
// }
// for (var user of users) {
//     console.log(user);
//     // Duyệt lấy luôn giá trị của từng phần tử
// }

// 5. Xóa mảng
// var indexDel = 1;
// var results = [];
// for (var index in users) {
//     if (+indexDel === +index) {
//         continue;
//     }
//     results[results.length] = users[index];
// }

// console.log(users);
// console.log(results);

// Bài tập: Thêm một phần tử vào đầu mảng
// var value = "Quý";
// var newArr = [];
// newArrr[newArr.length] = value;
// for (var index in users) {
//     newArr[newArr.length] = users[index];
// }

// console.log(users);