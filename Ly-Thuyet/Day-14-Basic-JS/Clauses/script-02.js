/*
    Câu lệnh switch case
*/

// var action = "add";

// switch (action) {
//     case "add":
//     case "create":
//     case "insert":
//         console.log("Thêm");
//         break;

//     case "edit":
//     case "update":
//         console.log("Sửa");
//         break;

//     case "delete":
//     case "destroy":
//     case "remove":
//         console.log("Xóa");
//         break;

//     default:
//         console.log("Danh sách");
//         break;
// }

// Chuyển đoạn code trên thành if else

// var action = "destroy";

// if (action === "add" || action === "create" || action === "insert") {
//     console.log("Thêm");
// }
// else if (action === "edit" || action === "update") {
//     console.log("Sửa");
// }
// else if (action === "delete" || action === "destroy" || action === "remove") {
//     console.log("Xóa");
// }
// else {
//     console.log("Danh sách");
// }

/*
    Hiển thị số ngày của một sáng

    var month = 11;

    => Tháng 11 có 30 ngày

    Quy ước:
    - 31 ngày: 1, 3, 5, 7, 8, 10, 12;
    - 30 ngày: 4, 6, 9, 11;
    - 29 ngày 2;

    yêu cầu ràng buộc:
    - Tháng phải là số nguyên
    - Tháng từ 1 đến 12
    - Không được sử dụng hàm để kiểm tra
*/

var month = 1;

if (month % 1 === 0) {
    var days = 0;
    switch (month) {
        case 4:
        case 6:
        case 9:
        case 11:
            days = 30;
            break;

        case 2:
            days = 29;
            break;

        default:
            days = 31;
            break;
    }

    console.log(`Có ${days} ngày`);
}
else {
    console.log("Hãy nhập số nguyên");
}