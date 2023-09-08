// let handleClick = function () {
//     alert("Đăng kí khóa học thành công");
// };

// let handleInput = function () {
//     alert("Bạn đang gõ");
// }

/*
    - Gán sự kiện thông qua DOM
    - Gán sự kiện dựa vào thuộc tính HTML => Được gọi là Event Handler

    Nhược điểm:
        Nếu trong 1 element, chúng ta sẽ không gán được 2 sự kiện giống nhau
*/

// let btn = document.querySelector('.btn');
// btn.onclick = function () {
//     alert("Hành động 1");
// }

// btn.onclick = function () {
//     alert("Hành động 2");
// }



// Event Listener
// Sử dụng Event Listener có thể chạy được 2 sự kiện giống nhau trở lên trong một element
let btn = document.querySelector('.btn');



// 1. .addEventListener()
let handleClick = function () {
    alert("Hành động 1");
}

btn.addEventListener("click", handleClick);

// btn.addEventListener("click", function () {
//     alert("Hành động 2");
// });

// btn.addEventListener("click", function () {
//     alert("Hành động 2");
// });



// 2. .removeEventListener()
let finishBtn = document.querySelector('.finish');

finishBtn.addEventListener("click", function () {
    alert("Đã hoàn thành");
    btn.removeEventListener("click", handleClick);
});