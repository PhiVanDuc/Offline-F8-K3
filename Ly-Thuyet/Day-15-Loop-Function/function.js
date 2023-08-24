/*
    Hàm - function
        Thể hiện một chức năng (đặt tên động từ)
    
    1. Hàm không có tham số
    function tenHam() {
        Nội dung hàm
    }

    2. Hàm có tham số
    function tenHam (thamso1, thamso2) {
        Nội dung hàm
    }

    Tên hàm:
        - Động từ: get, set, make, build, ...
        - Dùng camelCase
    
    3. Hàm có giá trị trả về và không có giá trị trả về
        - Hàm có giá trị trả về: Có từ khóa return
        => Gọi là hàm return

        - Hàm không có từ khóa trả về: Không có từ khóa return
        => Gọi là hàm void
*/

// Định nghĩa hàm
function getMessage(msg, type = "success") {
    console.log("Hoàng An", msg, type);
}
getMessage("F8", "Fullstack");

function sum(a, b) {
    total = a + b;
    return total;
    // Lưu ý: Khi return được gọi thì tất cả các đoạn code bên dưới return sẽ không hoạt động
}
// console.log(sum(1, 2));

// var result = sum(10, 20) + 20;
// console.log(result);

function division(a, b) {
    if (b !== 0) {
        // Lúc này biến result là biến cục bộ (Local Variable)
        var result = a / b;
        return result;
    }
    return 'Không tính được';
}
console.log(division(10, 0));

function getMessage() {
    return msg;
}

function setMessage(value) {
    msg = value;
}

// Biến toàn cục (Global Variable)
var msg = "Hoàng An F8";

setMessage("Fullstack");
console.log(getMessage());