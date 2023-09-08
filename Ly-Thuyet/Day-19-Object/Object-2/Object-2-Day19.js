// var user = {
//     name: "Hoàng An",
//     email: "hoangan.web@gmail.com",
//     getName: function () {
//         return this.name;
//     }
// }

// var customer = {
//     name: "Nguyễn Dương",
//     email: "nguyenduong@gmail.com",
//     getName: function () {
//         return this.name;
//     }
// }

// console.log(user);
// console.log(customer);



// Tạo ra một bản thiết kế cho object
// Trong JS Có một khái niệm gọi là Function Constructor (Hàm Tạo)
// Tên hàm tạo viết theo cú pháp PascalCase (Viết hoa kí tự đầu tiên của mỗi từ)
// Muốn thay đổi dữ liệu trong hàm tạo thì phải có tham số

var Person = function (name, email) {
    this.name = name;
    this.email = email;
    this.getName = function () {
        return this.name;
    };
};

// Tạo đối tượng từ hàm tạo
var person = new Person("Phí Văn Đức", "phivanduc325@gmail.com");
console.log(person);

// Chỉ có đối tượng nào được tạo bởi Hàm tạo Person thì mới sử dụng được thuộc tính message sau đây
// Áp dụng tương tự với cả tạo phương thức và sử dụng phương thức
// Person.prototype.message = "F8 - Fullstack";
// console.log(Person.prototype);

// var guess = new Person("Nguyễn Dương", "nguyenduong@gmail.com");
// console.log(guess);

// console.log(person.message);
// console.log(guess.message);
// console.log(person.name);
// console.log(person.email);
// console.log(person.getName());



// Kiểm tra object thuộc hàm tạo nào?
var a = 12;
// console.log(a.constructor.name);

// var b = null;
// console.log(b.constructor.name);
if (a === 0 || (a && a.constructor.name === "Number")) {
    console.log("Number");
}


// Xây dựng một hàm nội bộ từ hàm tạo
// var getMsg = function () {
//     console.log("Xin chào F8");
// }
// getMsg();

Person.isPerson = function (variable) {
    return variable && variable.constructor.name === 'Person';
}
if (Person.isPerson(person)) {
    console.log("Đây là person");
}
else {
    console.log("Đây không phải là person");
}