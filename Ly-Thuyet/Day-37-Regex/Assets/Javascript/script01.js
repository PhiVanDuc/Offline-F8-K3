/*
    Regex - Biểu thức chính quy
    - Là các quy tắc dùng để xử lý chuỗi nâng cao
    - Tạo bởi các ký hiệu đại diện cho các ký tự
*/


/*
    Tác dụng của Regex:
    - So khớp: Kiểm tra chuỗi thỏa mãn điều kiện (hàm test())
    - Cắt chuỗi: Sử dụng để cắt chuỗi (hàm match())
    - Thay thế (hàm replace())
*/


/*
    Khái niệm Pattern
    - Là một mẫu có sẵn
    - Cấu trúc: /regex/modifier
*/


/*
    Các ký hiệu cơ bản
    - string: Khớp một chuỗi có định
    - ^ : Khớp đầu chuỗi
    - $ : Khớp cuối chuỗi
    - [a-z] : Chữ thường
    - [A-Z] : Viết hóa
    - [0-9] : Số
    - [charList] : Các ký tự

    => Lưu ý: Các ký hiệu trong cặp ngoặc [] sẽ kết hoặc với nhau theo điều kiện ||
    => Lưu ý: Mặc định mỗi biểu thức sẽ có độ dài là 1 ký tự
*/


/*
    Các ký hiệu độ dài:
    - {min, max} : Độ dài từ min đến max
    - {value} : Độ dài cố định
    - {min,} : Độ dài từ min đến vô cùng

    Các ký tự đặc biệt của biểu thức chính quy:
    - / [ ] . + * ? = 

    => Nếu gặp các ký tự đặc biệt thuộc biểu thức chính quy, chúng ta sẽ cần thêm ký tự escape: \ phái trước
*/


/*
    Các ký hiệu viết tắt của độ dài
    {0,} : *
    {1,} : +
    {0, 1} : ?
*/


/*
    Các ký hiệu viết tắt khác
    - \d : [0-9]
    - \D : Ngược lại \d
    - \s : khoảng trắng
    - \S : Ngược lại của \s
    - \w : Đại diện cho chữ thường, chữ hoa, số, dấu gạch dưới
    - \W : Ngược lại của \w
*/


/*
    - Ký hiệu phủ định : ^
    - Ký hiệu hoặc : | (Nên bọc điều kiện hoặc trong dấu ngoặc tròn)
    - Ký hiệu đại diện cho tất cả các ký tự: .
*/


// Ví dụ về cái trúc của pattern
// const pattern = /phiduc/;
// const str = "phiduc123"
// const check = pattern.test(str);
// console.log(check);


// Thực hành: Kiểm tra một username hợp lệ
// 1. Bắt đầu bằng một chữ thường
// 2. Có thể chứa chữ thường, dấu _, dấu -, số
// 3. Độ dài từ 6 kí tự trở lên
// 4. Tất cả các trường hợp còn lại đều lỗi
// const pattern = /^[a-z][a-z0-9_-]{4,}[a-z0-9]$/;
// const str = "p123hivanduc";
// const check = pattern.test(str);
// console.log(check);


// Thực hành: Kiểm tra đường dẫn URL
// const pattern = /^(https|http):\/\/[a-z0-9-_\.]+\.[a-z]{2,}([a-z0-9_\-\.\/])*$/;
// const str = "http://fullstack.edu.vn/khoa-hoc/khoa-hoc-offline";
// const check = pattern.test(str);
// console.log(check);


// Thực hành: Kiểm tra số điện thoại việt nam
// 1. Không được có chữ hoặc các ký tự khác ngoài số (dấu + ở đầu chuỗi thì được)
// 2. Ở số đầu tiên có thể là số 0, có thể là +84
// 3. Độ dài 10 ký tự
// const pattern = /^(0|\+84)[0-9]{9}$/;
// const str = "+84123456789";
// const check = pattern.test(str);
// console.log(check);


// Thực hành: Kiểm tra chuỗi là một thẻ html h1, ...
// const pattern = /^<[a-z0-9-]+.*>.*<\/[a-z0-9-]+>$/;
// const str = `< class="main-heading">Heading</ h1>`;
// const check = pattern.test(str);
// console.log(check);