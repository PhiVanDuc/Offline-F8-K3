// Cắt chuỗi match()
// Lấy ra các số điện thoại có trong content
// const content = `Xin chào, tôi tên là Phí Văn Đức, số điện thoại +84328895451, thêm số nữa 0123456789`;
// const pattern = /(0|\+84)\d{9}/g;
// const result = content.match(pattern);
// console.log(result);


// Capturing Group: Kỹ thuật lấy 1 phần của Regex (không áp dụng cho modifier global)
// const content = `Lorem ipsum dolor sit amet consectetur phivanduc325@gmail.com adipisicing elit. Velit ad nulla explicabo necessitatibus facere earum omnis sunt dolorem eligendi phiduc81@gmail.com hic ullam ipsam, neque aut, deleniti mollitia harum at, dicta modi?`;
// const pattern = /([a-z0-9-_\.]{3,})@([a-z0-9-_\.]+\.[a-z]{2,})/;
// const result = content.match(pattern);
// console.log(result);


// Non-Capturing Group: Loại trừ nội dung trong cặp ngoặc tròn ra khỏi kết quả
// ?:
// const pattern = /^(?:https|http):\/\/[a-z0-9-_\.]+\.(?:[a-z]{2,})(\/?|\/[a-z0-9_\-\.\/]+)$/;
// const str = "http://fullstack.edu.vn/khoa-hoc/khoa-hoc-offline";
// const result = str.match(pattern);
// console.log(result);


// Greedy, lazy: Chỉ áp dụng với dấu .
// const html = `<img width="200" src="https://fullstack.edu.vn" title = "F8" />`;
// const pattern = /<img.*src="(.*?)"/;
// const result = html.match(pattern);
// console.log(result);


// Thay thế
// let content = `Xin chào, tôi tên là Phí Văn Đức, số điện thoại +84328895451, thêm số nữa 0123456789`;
// const pattern = /(0|\+84)\d{9}/g;
// content = content.replace(pattern, "***");
// console.log(content);


// Đối sánh chuỗi
// let content = `Xin chào, tôi tên là Phí Văn Đức, số điện thoại +84328895451, thêm số nữa 0123456789`;
// const pattern = /((0|\+84)(\d{9}))/g;
// content = content.replace(pattern, `<a href="fullstack.edu.vn" class="$2">$1</a>`);
// console.log(content);
