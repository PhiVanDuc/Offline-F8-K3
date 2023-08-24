// var email = "ftyfytftyftyfytf.web@gmail.com";

// // Lấy ra username

// var place = email.indexOf('@');
// var cut = email.slice(0, place);
// console.log(cut);

// /*
//     Bài 2: Kiểm tra 1 chuỗi có được viết hoa hết hay không?
// */

// var fullname = 'TẠ HOÀNG An';
// var check = fullname === fullname.toUpperCase();
// console.log(check);

/*
    Bài 3:
    var fullname = 'tạ hoàng an';
    => Chuyển họ tên thành dạng tên chuẩn: Tạ Hoàng An
*/

// var fullname = 'tạ hoàng an hùng';
// fullname = fullname.charAt(0).toUpperCase() + fullname.slice(1);

// for (var i = 0; i <= fullname.length; i++) {
//     var char = fullname.charAt(i);
//     var nextChar = fullname.charAt(i + 1);

//     if (char === ' ' && nextChar !== ' ') {
//         fullname = fullname.replace(nextChar, nextChar.toUpperCase());
//     }
// }
// console.log(fullname);

var keyword = "Lorem";
var count = 0;

var content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

var position = content.toLowerCase().indexOf(keyword.toLowerCase());
var result = '';
while (position !== -1) {
    result += content.slice(0, position) + `<span>${content.slice(position, position + keyword.length)}</span>`;
    content = content.slice(position + keyword.length);
    position = content.toLowerCase().indexOf(keyword.toLowerCase());
    count++;
}

result = result + content

var title = `<p>Tìm kiếm với từ khóa <b>${keyword}</b></p>`;
var bottom = `<p>Đã tìm thấy <b>${count}</b> kết quả với từ khóa <b>${keyword}</b>`;
document.write(title + result + bottom);