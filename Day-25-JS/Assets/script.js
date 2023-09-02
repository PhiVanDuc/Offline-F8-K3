let carousel = document.querySelector(".carousel");
let carouselInner = carousel.querySelector(".carousel .carousel-inner");
let carouselDots = carousel.querySelector(".carousel .carousel-dots");
let btnPrev = carousel.querySelector(".prev");
let btnNext = carousel.querySelector(".next");
let images = carouselInner.querySelectorAll("img");
let widthCarousel;
let widthCarouselInner;


// Cập nhật kích cỡ ảnh vừa với carousel
function fitImage() {
    widthCarousel = carousel.offsetWidth;
    images.forEach(function (element) {
        element.style.width = widthCarousel + "px";
    });
    widthCarouselInner = widthCarousel * images.length;
}
fitImage();
document.body.onresize = function () {
    fitImage();
}


// Tạo ra số lượng dấu chấm bằng với số lượng của ảnh
let numberDot = 0;
while (numberDot < images.length) {
    ++numberDot;
    let dot = document.createElement('span');
    dot.setAttribute("class", "dot");
    carouselDots.appendChild(dot);
}


let showing = 0;
let dots = carouselDots.querySelectorAll(".dot");


// Gán active vào dấu chấm đầu tiên
dots[showing].classList.add("active");


// Xử lý logic bấm nút Prev và Next
let autoRun = setInterval(function () {
    btnNext.click();
}, 5000);


function reloadSlider() {
    let distanceLeft = images[showing].offsetLeft;
    carouselInner.style.translate = -distanceLeft + "px";

    let currentActiveDot = carouselDots.querySelector(".dot.active");
    currentActiveDot.classList.remove("active");
    dots[showing].classList.add("active");
    clearInterval(autoRun);
    autoRun = setInterval(function () {
        btnNext.click();
    }, 3000);
}


btnNext.addEventListener("click", function () {
    if (showing + 1 > images.length - 1)
        showing = 0;
    else
        ++showing;
    reloadSlider();
});


btnPrev.addEventListener("click", function () {
    if (showing === 0)
        showing = images.length - 1;
    else
        --showing;
    reloadSlider();
});


// Xây dựng chức năng ấn vào dot và chuyển đến ảnh tương ứng
dots.forEach(function (element, index) {
    element.addEventListener("click", function () {
        showing = index;
        reloadSlider();
    });
});