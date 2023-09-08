let link = document.querySelector(".link");
console.log(link);



// Thuộc tính
/*
    Khi làm việc với JS, chúng ta sẽ có 2 loại thuộc tính
        1. Thuộc tính có sẵn của thẻ HTML
        2. Thuộc tính tự tạo (Data Attribute)
*/



// Thuộc tính có sẵn
// Lấy giá trị thuộc tính: element.tenthuoctinh
// console.log(link.href);
// console.log(link.id);
// console.log(link.target);
// console.log(link.title);
// Riêng thuộc tính class: element.classname
// console.log(link.className);



// Cập nhật giá trị thuộc tính
// element.tenthuoctinh = giatri

// link.onclick = () => {
//     link.href = 'https://google.com';
//     link.target = "_blank";
//     link.title = "Trang chủ Google";
// }

// Giá trị mặc định của 1 thuộc tính sẽ là chuỗi rỗng
// console.log(link.rel);



// Thuộc tính tự tạo (data attribute)
// Lấy thuộc tính tự tạo
// console.log(link.getAttribute("data-count"));
// console.log(link.dataset.count);
// console.log(link.dataset.indexNumber); // data-index-number



// Thêm data attribute
// link.setAttribute("data-count", 10);
// link.dataset.count = 5;
// link.dataset.indexNumber = 50;
// link.dataset.animationDuration = "2s";



// let content = document.querySelector('.content');



// 1. .classList : Vừa xem danh sách class của một element vừa thêm mới một class cho element đó
// Hiển thị danh sách và thêm class mới
// console.log(content.classList);
// content.classList.add("abc", "ahihi");



// 2. .classList.remove : Xóa class
// content.classList.remove("ahihi");



// 3. .classList.contains : Kiểm tra class tồn tại hay chưa
// console.log(content.classList.contains("abc"));



// 4. .classList.toggle : Tự động thêm class nếu chưa tồn tại và xóa class nếu đã tồn tại
// content.classList.toggle("ahihi");
// content.classList.toggle("ahihi");



// 5. element.remove : Xóa hẳn element đi
// content.remove();



// 6. .removeAttribute(attribute) : Xóa thuộc tính
// link.removeAttribute('title');