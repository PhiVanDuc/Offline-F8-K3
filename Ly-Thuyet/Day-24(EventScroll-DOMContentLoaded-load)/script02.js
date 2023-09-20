// Event beforeunload (sự kiện trước khi load)
function handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = "F8";
}


// Trước khi submit
let loginForm = document.querySelector(".login-form");
loginForm.addEventListener("input", function (e) {
    if (e.target.defaultValue !== e.target.value)
        window.addEventListener("beforeunload", handleBeforeUnload);
});


// Khi submit -> Chặn không cho chuyển trang
//            -> Xóa event beforeunload
//            -> submit lại (thông qua hàm submit)
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    window.removeEventListener("beforeunload", handleBeforeUnload);
    this.submit();
});