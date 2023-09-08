var a = {
    name: "Đào tạo lập trình",
    email: "hoangan@gmail.com",
}

var b = {
    teacher: "Hoàng An",
    salary: 5000000,
}



// Bài 1
// Nối object b vào object a
// Yêu cầu: Không dùng hàm có sẵn, es6 trở lên
// for (var key in b) {
//     a[key] = b[key];
// }
// console.log(a);



// Bài 2:
// var query = {
//     name: "Hoàng An",
//     keyword: "Fullstack",
//     category: 1,
// }

// Chuyển đổi Object trên thành dạng query string
// name=Hoàng+An&keyword=Fullstack&category=1

// var arr = Object.entries(query);
// var test = arr.map(function (element) {
//     return element.join('=');
// });
// console.log(test);

// console.log(test.join('&').replaceAll(' ', '+'));



// // Object.assign(target, source)
// var a = {
//     name: "Đào tạo lập trình",
//     email: "hoangan@gmail.com",
// }

// var b = {
//     teacher: "Hoàng An",
//     salary: 5000000,
// }

// 1. Object.assign(a, b) dùng để nối hai Object lại với nhau.
// var result = Object.assign(a, b);
// console.log(a);
// console.log(result);

// 2. Object.create(null) => Tạo Object không có prototype.
// var a = Object.create(null);
// console.log(a);




// Muốn b sao chép a nhưng khi thay đổi a không được ảnh hưởng đến b
var a = {
    name: "Hoàng An",
    email: "hoangan.web@gmail.com",
};
var b = JSON.parse(JSON.stringify(a));
console.log(a);
console.log(b);



// Muốn b sao chép a nhưng khi thay đổi a không được ảnh hưởng đến b (Mảng)
// var a = ["Hoàng An", ["hoangan@gmail.com", 5000000]];
// var b = a;
// var b = a.map(function (element) {
//     return element;
// });
// var b = [...a];
// var b = JSON.parse(JSON.stringify(a)); // Đây là cách đúng
// console.log(b);



// Hia mảng không thể so sánh được với nhau, Luôn trả về false vì nó nằm ở địa chỉ khác nhau. Mà địa chỉ khác nhau thì ko bao h so sánh được
// Chính vì vậy phải chuyển sang kiêu dữ liệu nguyên thủy
// console.log([] === []);
// console.log([].toString() === [].toString());



// Optional Chaining (?.)

// 1. Optional Chaining với thuộc tính
// var a = null;
// console.log(a?.name.job.salary);

// var fullname = 'An';
// if (fullname?.length) {
//     console.log('OK');
// }

// 2. Optional Chaining với phương thức
// Thêm dấu ?. ở trước dấu ()
// var a = {};
// console.log(a.getName?.());

// var fullname = 'An';
// if (fullname?.length) {
//     fullname.forEach?.(function (item) {
//         console.log(item);
//     });
// }



// Yêu cầu: Viết phương thức map2 có tác dụng giống map
// var users = ['item 1', 'item 2', 'item 3', 'item 4',];

// var result = users.map(function (user) {
//     return `<h3>${user}</h3>`;
// });
// console.log(result);


// Array.prototype.map2 = function (callback) {
//     var array = this;
//     var newArr = [];

//     if (array.length) {
//         for (var i = 0; i < array.length; i++) {
//             var result = callback(array[i], i);
//             newArr[newArr.length] = result;
//         }
//     }
//     return newArr;
// }

// var result2 = users.map2(function (user) {
//     return `<h3>${user}</h3>`;
// });
// console.log(result2);