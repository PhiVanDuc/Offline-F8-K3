// JSON : Javascript Object Notation
/*
    Json là chuỗi
    Được tạo từ object của JS
    Json được dùng để mô tả dữ liệu 1 cách chính xác
    Được dùng để giao tiếp dữ liệu giữa các nền tảng với nhau
    Json hỗ trợ hầu hết các loại ngôn ngữ lập trình
*/

/*
    Vấn đề:
    Web F8 (JS)

    Chuyển về 1 kiểu dữ liệu chung thường là chuỗi mà các nền tảng đề đọc được (Nó phải đảm bảo tính toàn vẹn của dữ liệu)
        xml
        json
    App F8 (Java)
*/

/*
    Trong JS có 2 hàm thường dùng để xử lý JSON
    1. Chuyển từ kiểu dữ liệu trong JS thành Json : JSON.stringify()
    2. Chuyển từ JSON về kiểu dữ liệu tương ứng : JSON.parse()
*/

var lyric = ``;

lyric = JSON.parse(lyric);
console.log(lyric);