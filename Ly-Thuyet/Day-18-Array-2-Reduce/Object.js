/*
    Object
        Object Literal (Đối tượng nguyên bản)
        Function Constructor (Hàm tạo)
    
    Thành phần của đối tượng
        Thuộc tính: Đặc điểm, tính chất (BIến)
        Phương thức: Hành động (Hàm)
*/

// Object Literal
// Cách 1
var user1 = {
    // key: value
    name: "Hoàng An",
    email: "hoangan.web@gmail.com",
    age: 31,
    getName: function () {
        return "Hoàng An F8";
    }
};
// Thêm key mới cho object
user1.country = "Việt Nam";
user1["address"] = "Cầu Giấy - Hà Nội";

// Sửa giá trị của key trong object
user1.email = 'hoangan@fullstack.edu.vn';

// Xóa key trong object
delete user1.age;

// Truy cập key trong object
// console.log(user1.name);
// console.log(user1["address"]);

// Lấy danh sách key trong object
// for (var key in user1) {
//     console.log(user1[key]);
// }
// Object.keys(user1).forEach(function (key, index) {
//     console.log(index, key);
// });

// console.log(user1);

// Cách 2
// var user2 = new Object();
// console.log(user2);

// Kiểm tra 1 biến có phải là Object hay không?
// var a = {};
// if (typeof a === 'object' && !Array.isArray(a) && a !== null) {
//     console.log('true');
// }

// var customer = {
//     name: 'Hoàng An',
//     email: 'hoangan.web@gmail.com',
//     getName: function () {
//         return this.name;
//     },
//     getEmail: function () {
//         return this.email;
//     },
//     getInfo: function () {
//         return `
//         - Name: ${this.getName()}
//         - Email: ${this.getEmail()}
//         `;
//     }
// };
// console.log(customer.getInfo());

var user = {
    name: "Hoàng An",
    email: "hoangan.web@gmail.com",
    jobs: {
        name: "Giảng viên",
        salary: 5000000,
        currency: "vnđ",
        per: "Tháng",
        students: [
            {
                id: 1,
                name: "Học viên 1",
            },
            {
                id: 2,
                name: "Học viên 2",
            },
            {
                id: 3,
                name: "Học viên 3",
            }
        ],
    }
};

console.log(user.jobs.students[0].name);

var users = {
    name: "Hoàng An",
    email: "hoangan@fullstack.com",
    getInfo: function () {
        var current = this;
        return {
            getName: function () {
                return current.name;
            }
        }
    }
}

console.log(users.getInfo().getName());