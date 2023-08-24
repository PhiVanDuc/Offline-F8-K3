// console.log(Array.prototype);
// var users = ["An", "Tam", "Dung", "Hung", "Tam"];

// 1. fill() : Cập nhật tất cả các phần tử của mảng thành 1 giá trị
// Thường được sử dụng để reset dữ liệu trong mảng
// users.fill("F8");


// 2. forEach(callback) : Duyệt qua từng phần tử và trả về element, index trong callback
// users.forEach(function (user, index) {
//     console.log(user, index)
// });


// 3. map(callback)
/*
    Duyệt qua từng phần tử trong mảng, trả về element, index trong callback
    Trả về một mảng mới, chính là return của callback
    Số lượng phẩn tử của mảng mới bằng với số lượng phần tử của mảng ban đầu
    Chuyên dùng giải quyết các bài toán render ra giao diện
*/
// var newArr = users.map(function (user, index) {
//     console.log(user, index);
//     // Return cái gì thì mảng mới trả về cái đó
//     return `<h3>${index} - ${user}</h3>`;
// });
// console.log(newArr);


// 4. some(callBack)
/*
    Giá trị của hàm some là true, false
    Nó sẽ trả về true nếu có ít nhất một lần lặp return true
    Nó sẽ trả về false nếu tất cả các lần lặp không phải return true
    Vòng lặp sẽ chạy tới khi nào có return true thì sẽ dừng

    => Chỉ cần một lần true thì nó sẽ trả về true
       Còn không có lần nào true thì sẽ trả về false
*/
// var numbers = [1, 2, 3, 4, 5];
// var check = numbers.some(function (number) {
//     if (number % 2 === 0) {
//         return true;
//     }
// });
// console.log(check);


// 5. every(callBack)
/*
    Trả về true, false
    Nó sẽ trả về true khi tất cả các lần lặp return true
    Trả về false nếu có ít nhất 1 lần lặp không return true
    Gặp false sẽ dừng lại vòng lặp luôn

    => Chỉ cần 1 lần false thì nó sẽ trả về false
       Còn không có lần nào false thì nó sẽ trả về true
*/
// var numbers = [2, 4, 6, 7, 10];
// var check = numbers.every(function (number) {
//     console.log(number);
//     if (number % 2 === 0) {
//         return true;
//     }
// });
// console.log(check);


// 6. filter(callBack)
/*
    Trả về một mảng mới
    Mảng mới chính là phần tử của mảng cũ mà được return true
    Nếu return không phải là true, false => Áp dụng truthy và falsy (Ít sử dụng)

    => phần tử nào được return true thì nó sẽ add chính phần tử đó vào mảng mới
*/
// var newArr = users.filter(function (user) {
//     if (user === 'An' || user === 'Hung') {
//         return true;
//     }
// });
// console.log(newArr);
// console.log(users);


// Bài tập:
// Tìm trong mảng có tên khách hàng nào chứa từ khóa thì sẽ trả về một mảng
// var customers = ["Nguyễn Dương", "Trần Xuân Bách", "Nguyễn Hoàng An", "Nguyễn Hoàng Anh", "Dương Đức Hiệp", "Mạc Văn Khoa"];
// var keyword = 'an';
// var check = customers.filter(function (customer) {
//     return customer.toLowerCase().includes(keyword.toLowerCase());
// });
// console.log(check);


// 7. find(callBack)
/*
    Cách hoạt động giống filter
    Tuy nhiên chỉ trả về một phần tử đầu tiên
    Không trả về mảng mà chỉ trả về một phần tử của mảng
*/
// var customers = ["Nguyễn Dương", "Trần Xuân Bách", "Nguyễn Hoàng An", "Nguyễn Hoàng Anh", "Dương Đức Hiệp", "Mạc Văn Khoa"];
// var keyword = 'an';
// var check = customers.find(function (customer) {
//     return customer.toLowerCase().includes(keyword.toLowerCase());
// });
// console.log(check);


// 8. findLast(callBack)
/*
    Cách hoạt động giống filter
    Tuy nhiên chỉ trả về phần tử cuối cùng
*/


// 9. findIndex(callBack)
/*
    Trả về index đầu tiên
    Và có thể viết logic phức tạp không như indexOf(value)
*/


// 10. findLastIndex(callBack)
/*
    Trả về index cuối cùng
    Và có thể viết logic phức tạp không như lastIndexOf(value)
*/


var users = [
    [
        'Hoàng An',
        'hoangan.web@gmail.com',
        31
    ],

    [
        'Nguyễn Dương',
        'duong@gmail.com',
        19
    ],

    [
        'Trần Xuân Bách',
        'bach@gmail.com',
        25
    ],
];

// Yêu cầu: Tăng thêm 2 tuổi cho user có email là duong@gmail.com
var newArr = users.map(function (user) {
    if (user[1] === keyword)
        user[2] += 2;
    return user;
});
console.log(newArr);