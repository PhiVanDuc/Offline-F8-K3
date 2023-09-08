// Bài 1:

// var errors = {
//     name: {
//         required: "Vui lòng nhập họ tên",
//         min: "Họ tên phải từ 5 ký tự"
//     },
//     email: {
//         email: "Định dạng email không hợp lệ",
//         unique: "Email đã có người sử dụng",
//         required: "Vui lòng nhập địa chỉ email"
//     },
//     password: {
//         required: "Vui lòng nhập mật khẩu",
//         same: "Mật khẩu phải khớp với mật khẩu nhập lại"
//     }
// }

// function getError(field) {
//     var keyArr = Object.keys(errors);

//     for (let element of keyArr) {
//         if (field === element) {
//             return errors[element]["required"];
//         }
//     }
// }

// console.log(getError('name'));
// console.log(getError('email'));
// console.log(getError('password'));



// Bài 2:

// function Info(name, age, address) {
//     this.name = name;
//     this.age = age;
//     this.address = address;
// }

// const customers = [
//     { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
//     { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
//     { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
// ];

// function createCustomers(array) {
//     let result = array.map(function (element, index) {
//         let firstName = element['name'].slice(0, element['name'].indexOf(' '));
//         let lastName = element['name'].slice(element['name'].lastIndexOf(' '));
//         let customer = new Info(element["name"], element["age"], element["address"]);

//         customer.shortName = firstName + lastName;
//         return customer
//     });

//     result.sort(function (a, b) {
//         if (a['age'] < b['age']) {
//             return -1;
//         }
//     });
//     return result;
// }

// console.log(createCustomers(customers));