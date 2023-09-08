// DOM CSS: Can thiệp CSS vào các element thông qua thuộc tính style



// Ví dụ:
var content = document.querySelector('.content');
var btn = document.querySelector('.btn');
console.log(content);

// Cách 1:
// content.style = 'color: red; font-weight: bold';
// content.style = 'background-color: red;';

// Cách 2:
// console.log(content.style);
// content.style.color = 'red';
// content.style.fontWeight = '600';
// content.style.textDecoration = 'line-through';

// Cách 3:
// var css = {
//     color: 'red',
//     fontWeight: 'bold',
//     textDecoration: 'line-through',
//     fontStyle: 'italic',
// };

// Object.assign(content.style, css);



// Bài tập: Thêm các thuộc tính sau:
/*
    1. background-img: url(linkAnh)
    2. transition: all 0.4s ease
    3. transform: translateX(20px)
*/

// var css = {
//     backgroundImage: 'url(./neom-V8w0gSmxajY-unsplash.jpg)',
//     backgroundRepeat: 'none',
//     backgroundSize: 'cover',
//     transition: 'all 0.4s ease',
//     transform: 'translateX(20px)',
// };

// Object.assign(content.style, css);



// Bài tập:
// btn.addEventListener("click", function () {
//     if (!content.style.display) {
//         content.style.display = 'none';
//         btn.innerHTML = "Hiện";
//     }
//     else {
//         content.style.display = '';
//         btn.innerHTML = "Ẩn";
//     }
// });