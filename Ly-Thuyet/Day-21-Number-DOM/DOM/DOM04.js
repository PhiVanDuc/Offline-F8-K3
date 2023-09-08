// DOM HTML : DOM HTML thao tác với nội dung và thuộc tính với html



let content = document.querySelector('.content');



// 1. .innerHTML : Lấy nội dung bên trong thẻ HTML
// console.log(content.innerHTML);



// 2. .innerText : Lấy nội dung (lưu ý là chỉ lấy text, bỏ hết HTML) trong thẻ HTML
// Lưu ý rằng : Nếu dùng CSS để ẩn đi element đó, thì innerText trong console không thể loại bỏ được khoẳng trắng
// console.log(content.innerText);



// 3. .textContent : Lấy nội dung trong thẻ HTML (Chỉ lấy text, nhưng lại giữ nguyên khoảng trắng)
// console.log(content.textContent);



// 4. .outerHTML : Lấy nội dung bao gồm chính element đang sử dụng
// console.log(content.outerHTML);



// Cập nhật nội dung html

// content.innerHTML = `<h1>Javascript không khó</h1>`;
// content.innerText = `<h1>Javascript không khó</h1>`;
// content.outerHTML = `<h1>Javascript không khó</h1>`;
// content.outerText = `<h1>Javascript không khó</h1>`;



let tagNumber = document.querySelector('.number');
let number = parseInt(tagNumber.innerText);
let down = document.querySelector('.down');
let up = document.querySelector('.up');
let numberDown = document.querySelector('.down span');
let numberUp = document.querySelector('.up span');

down.onclick = function () {
    --number;
    ++numberDown.innerText;
    tagNumber.innerText = number;
};

up.onclick = function () {
    ++number;
    ++numberUp.innerText;
    tagNumber.innerText = number;
};