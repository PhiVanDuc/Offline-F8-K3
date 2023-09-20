// Tìm hiểu thêm
// skeleton loading || placeholder loading
// Có thể dùng thư viện skeleton loading npm
/*
    window.performance : Xem trang web load mất bao nhiêu thời gian
    Thời gian trong đây được tính là milisecond
    search thêm: estimate loading content website
*/


// DOMContentLoaded -> Cây DOM được hình thành (Tất cả các tài nguyên chưa đc tải)
window.addEventListener("DOMContentLoaded", function () {
    var img = document.querySelector("img");
    img.id = "image";
});


// load -> Tất cả các tài nguyên trên trang web được tải: css, js, img, video, audio.
window.addEventListener("load", function () {
    var preLoader = document.querySelector(".pre-loader");
    preLoader.classList.add("done");
});