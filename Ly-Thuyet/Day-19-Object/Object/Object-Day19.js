// Thêm phương thức vào prototype
Object.prototype.combine = function (...args) {
    var current = this;
    if (args.length) {
        return args.map(function (key) {
            return current[key];
        });
    }
};

// Thêm thuộc tính vào prototype
Object.prototype.message = "F8";

// var user = {
//     name: "Hoàng An",
//     email: "hoangan.web@gmail.com",
// }

// var customer = {
//     name: "Nguyễn Dương",
//     age: 19,
// }

// var result = user.combine("name", "email");
// console.log(result);

// var result2 = customer.combine("name", "age");
// console.log(result2);

// console.log(user);

// Mong muốn: Bất kỳ Object nào cũng sủ dụng được phương thức combine
// => Kế thừa phương thức, thuộc tính
// => Định nghĩa thuộc tính, phương thức vào prototype
// Trừ null và undefined. Tất cả các kiểu dữ liệu đều được build bằng Object
// => Tất cả các hàm tạo khác đều là con của hàm tạo Object

console.log(String.prototype);
console.log(Array.prototype);
console.log(Number.prototype);
console.log(Date.prototype);
var a = 10;
console.log(a.message);