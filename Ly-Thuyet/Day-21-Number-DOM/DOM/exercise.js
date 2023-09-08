let btn = document.querySelector(".btn");
let overlay = document.querySelector(".overlay");
let model = document.querySelector(".model");
let iconCancel = document.querySelector(".icon-cancel");

btn.addEventListener("click", function () {
    overlay.classList.add("show");
    model.classList.add("active");
});

overlay.addEventListener("click", function () {
    overlay.classList.remove("show");
    model.classList.remove("active");
});

iconCancel.addEventListener("click", function () {
    overlay.classList.remove("show");
    model.classList.remove("active");
});