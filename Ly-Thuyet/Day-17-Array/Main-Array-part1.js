console.log(Array.prototype);
var users = ["An", "Tam", "Dung", "Hung", "Tam"];

// 1. at() => Truy cập 1 phần tử theo index
// console.log(users.at(1));

// 2. concat(arr1, arr2, arr3, ...) : Dùng để nối nhiều mảng với nhau hoặc dùng để thêm một phần tử mới vào cuối mảng
// console.log(users.concat([1, 2, 3], [4, 5, 6]));
// console.log(users.concat("Dương"));

// 3. indexOf(value) => Tìm vị trí xuất hiện đầu tiên của phần tử trong mảng
// console.log(users.indexOf("Tam"));

// 4. lastIndexOf(value) => Tìm vị trí xuất hiện cuối cùng của phần tử trong mảng
// console.log(users.lastIndexOf("Tam"));

// 5. includes(value) => Tìm phần tử trong mảng và trả về true false
// console.log(users.includes("Tam"));

// 6. slice(start, end) => Cắt mảng từ vị trí start đến end và trả về một mảng
// console.log(users.slice(1, 3));
// console.log(users.slice(1));
// console.log(users.slice(-2));

// 7. join() => Nối các phần tử trong một mảng thành chuỗi
// console.log(users.join("\n"));

// Các method sẽ thay đổi hàm ban đầu

// 8. push() => Thêm phần tử mới vào cuối mảng, thay đổi mảng ban đầu và trả về số lượng phần tử sau khi thêm
// users.push("Duong");

// 9. unshift() => Thêm phần tử vào đầu mảng, thay đổi mảng ban đầu và trả về số lượng phần tử sau khi thêm
// users.unshift("Duong");

// 10. pop() => Xóa phần tử cuối mảng và trả về giá trị phần tử vừa xóa
// var value = users.pop();
// console.log(users);
// console.log(value);

// 11. shift() => Xóa phần tử đầu mảng và trả về giá trị vừa xóa
// var value = users.shift();
// console.log(users);
// console.log(value);

// 12. splice(index, count) => Xóa count phần tử tử index
// users.splice(1, 2, 'A', 'b', 'c');
// console.log(users);

// 13. reverse() => Đảo ngược mảng
// users.reverse();

// 14. sort() => Sắp xếp mảng theo thứ tự tăng dần và nó không áp dụng với số
// users.sort();
// Muốn sắp xếp với số thì làm như sau
/*
    numbers.sort(function (a, b) {
        // Đây là so sánh tăng dần
        return a - b;
        // Đây là so sánh giảm dần
        return b - a;
    });
*/
// Muốn giảm dần chỉ việc reverse lại
// console.log(users);

// Bài 1. Lấy tên của Họ và Tên
// var fullname = 'Tạ Hoàng An';
// firstname = fullname.split(" ").slice(-1).join();
// // console.log(fullname[fullname.length - 1]);
// console.log(firstname);

// Bài 2. Sắp xếp danh sách khách hàng tăng dần theo tên
// function getFirstName(str) {
//     var firstname = str.split(" ").slice(-1)[0];
//     return firstname;
// }

// var customers = ["Nguyễn Dương", "Trần Xuân Bách", "Dương Đức Hiệp", "Mạc Văn Khoa"];

// customers.sort(function (a, b) {
//     if (getFirstName(a) < getFirstName(b)) {
//         return -1;
//     }
// });

// console.log(customers);