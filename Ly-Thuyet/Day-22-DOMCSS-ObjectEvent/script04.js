// Event Object
// event.target : Sẽ lấy phần tử mà nó tác động vào (Lưu ý là chỉ giống this khi bên trong Element không còn Element nào)

// var btn = document.querySelector('.btn');
// var content = document.querySelector('.content');

// btn.addEventListener("click", function (e) {
//     // console.log(this);
//     // console.log(e.target);
//     content.innerHTML = `<button class="remove">Xóa</button>`;
// });

// content.addEventListener('click', function (e) {
//     if (e.target.classList.contains("remove")) {
//         e.target.remove();
//     }
// });



// event.preventDefault() : Ngăn chặn hành động mặc định của thẻ HTML
var archon = document.querySelector('a');
archon.onclick = function (e) {
    e.preventDefault();
    console.log(this.href);
}

var menu = document.querySelector('.context-menu');
document.oncontextmenu = function (e) {
    e.preventDefault();
    menu.style.display = "block";
    menu.style.top = `${e.clientY - 15}px`;
    menu.style.left = `${e.clientX}px`;
}

// event.stopPropagation() : Ngăn hành động nổi bọt của thẻ HTML
document.onclick = function (e) {
    menu.style.display = "none";
}

menu.onclick = function (e) {
    e.stopPropagation();
}