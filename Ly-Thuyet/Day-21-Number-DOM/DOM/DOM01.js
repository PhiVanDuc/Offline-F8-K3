// Trước khi thao tác với các thẻ HTML : Phải tạo được Element



// DOM Element : Tạo Element từ các thẻ HTML có sẵn
console.log(document);



// Các cách thao tác với các element
/*
    1. document.getElementById(id)
        - Truy xuất vào thẻ HTML thông qua id
        - Chỉ truy xuất được thẻ đầu tiên có id đó

    2. document.getElementsByClassName(class)
        - Truy xuất vào thẻ HTML thông qua class
        - Trả về 1 danh sách (HTMLCollection)
        - Muốn tương tác : Cần lặp để truy cập tới từng element

    3. document.getElementsByTagName(tag)
        - Truy xuất tới thẻ HTML thông qua tên thẻ HTML
        - Trả về 1 danh sách (HTMLCollection)
        - Muốn tương tác : Cần lặp để truy cập tới từng element

    4. document.querySelector(selector)
        - Truy xuất tới 1 thehr html thông qua css selector
        - Chỉ truy xuất được ở thẻ đầu tiên

    5. document.querySelectorAll(selector)
        - Truy xuất tới tất cả các thẻ HTML có cùng selector đã khai báo
        - Trả về một danh sách (NodeList)
        - Muốn tương tác : Cần lặp để truy cập vào từng element
*/



// Các ví dụ cụ thể về các cách tương tác với các element trên



// 1. document.getElementById(id)
// var title = document.getElementById("title");
// console.log([title]);



// 2. document.getElementsByClassName(class)
// var titleList = document.getElementsByClassName("title");
// console.log(titleList);
// for (var i = 0; i < titleList.length; i++) {
//     console.log(titleList[i]);
// }



// 3. document.getElementsByTagName(tag)
// var titleList = document.getElementsByTagName("h1");
// console.log(titleList);
// for (var i = 0; i < titleList.length; i++) {
//     console.log(titleList[i]);
// }



// 4. document.querySelector(selector)
// var title = document.querySelector(".title");
// console.log([title]);



// 5. document.querySelectorAll(selector)
// var titleList = document.querySelectorAll(".title");
// console.log(titleList);
// titleList.forEach(function (element) {
//     console.log([element]);
// });



// VD : Chọn thẻ heading của content và element
// var heaing1 = document.querySelector(".content .heading");
// var heaing2 = document.querySelector(".element .heading");
// console.log(heaing1);
// console.log(heaing2);



// VD2:
// var content = document.querySelector(".content");
// var heading = content.querySelector(".heading");
// var text = content.querySelector(".text");
// console.log(content);
// console.log(heading);
// console.log(text);