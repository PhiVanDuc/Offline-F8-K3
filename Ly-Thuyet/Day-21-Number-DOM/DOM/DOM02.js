/*
    DOM Event
    - Mỗi thẻ HTML đều có sẵn các event nhất định
    - Có event xuất hiện trong tất cả các thẻ
    - Có event chỉ xuất hiện trong 1 số thẻ

    VD:
    1. click
    2. dblclick
    3. mousehover
    4. mouseout
    5. mousemove

    => Thẻ HTML nào cũng có

    VD: 
    1. submit : Chỉ có trong thẻ form
    2. keyup, keydown : Thường xuất hiện trong các ô nhập liệu
    3. play, pause, timeupdate : Xuất trong thẻ audio, video

    => Có các sự kiện chỉ có riêng trong từng thẻ
*/



// function để thực thi một sự kiện gọi là Listener
var btn = document.querySelector(".btn");
btn.onclick = function () {
    alert("Đăng kí thành công!");
};

btn.onmouseover = function () {
    console.log("Over");
}

btn.onmouseout = function () {
    console.log("Out");
}

btn.onmousemove = function () {
    console.log("Move");
}

var email = document.querySelector(".email");
email.onchange = function () {
    console.log("Đã xong");
}

email.onfocus = function () {
    console.log("Focus");
}

email.onblur = function () {
    console.log("Ra ngoài");
}

email.onkeyup = function (e) {
    console.log("Đang gõ phím", e.key);
}

// email.onkeydown = function () {
//     console.log("Đang nhấn phím");
// }