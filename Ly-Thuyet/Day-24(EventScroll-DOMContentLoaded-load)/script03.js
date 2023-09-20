/*
    Scroll Event
        1. Lấy vị trí scroll so với top, left
        2. scroll() => Tự động kéo thanh cuộc tới vị trí mong muốn
*/
var btnTop = document.querySelector(".top");
window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (y > 20)
        btnTop.style.display = "initial";
    else
        btnTop.style.display = "none";
});

window.addEventListener("load", function () {
    var bodyHeight = document.body.clientHeight;
    window.scroll(0, bodyHeight);
});

btnTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scroll(0, 0);
})