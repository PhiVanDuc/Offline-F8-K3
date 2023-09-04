let carousel = document.querySelector(".carousel");
let carouselInner = carousel.querySelector(".carousel-inner");
let imgs = carouselInner.querySelectorAll("img");
let carouselDots = carousel.querySelector(".carousel-dots");
let btnPrev = carousel.querySelector(".prev");
let btnNext = carousel.querySelector(".next");


// Tạo ra các Dot bằng với số lượng ảnh
let quantity = 0;
while (quantity < imgs.length) {
    let dot = document.createElement("span");
    dot.classList.add("dot");
    carouselDots.appendChild(dot);
    quantity++;
}


// Xây dựng chức năng tự động chạy
let autoPlay = setInterval(function () {
    btnNext.click();
}, 5000);


// Xây dựng chức năng nút bấm Next và Prev và Dots
let showing = 0;
let widthImg = carousel.clientWidth;
let totalWidth = widthImg * imgs.length;

document.body.onresize = function () {
    widthImg = carousel.clientWidth;
    totalWidth = widthImg * imgs.length;
}

function reloadSlide() {
    let distanceEdgeLeft = imgs[showing].offsetLeft;
    carousel.scrollLeft = distanceEdgeLeft;

    let currentDotActive = carouselDots.querySelector(".active");
    currentDotActive.classList.remove("active");
    dots[showing].classList.add("active");

    clearInterval(autoPlay);
    autoPlay = setInterval(function () {
        btnNext.click();
    }, 5000);
}

btnNext.addEventListener("click", function () {
    if (showing + 1 > imgs.length - 1)
        showing = 0;
    else
        showing++;
    reloadSlide();
});

btnPrev.addEventListener("click", function () {
    if (showing === 0)
        showing = imgs.length - 1;
    else
        --showing;
    reloadSlide();
});

let dots = carouselDots.querySelectorAll(".dot");
dots[showing].classList.add("active");
dots.forEach(function (element, index) {
    element.addEventListener("click", function () {
        showing = index;
        reloadSlide();
    });
});


// Xây dựng chức năng kéo thả
let beginPress = false;
let isPressing = false;
let transferPoint = widthImg * 0.1;
let prevPageX, prevScrollLeft, positionDiff;

function swipe() {
    positionDiff = Math.abs(positionDiff);

    if (carousel.scrollLeft > prevScrollLeft) {
        if (positionDiff > transferPoint) {
            btnNext.click();
        }
        else {
            carousel.scrollLeft -= positionDiff;
        }
        console.log("right");
    }
    else if (carousel.scrollLeft < prevScrollLeft) {
        if (positionDiff > transferPoint) {
            btnPrev.click();
        }
        else {
            carousel.scrollLeft += positionDiff;
        }
        console.log("left");
    }
}

function handleMouseDown(e) {
    beginPress = true;
    prevPageX = e.clientX;
    prevScrollLeft = carousel.scrollLeft;
    clearInterval(autoPlay);
}

function handleMouseMove(e) {
    if (beginPress) {
        carousel.classList.add("dragging");
        positionDiff = e.clientX - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        isPressing = true;
    }
}

function handleMouseUp() {
    beginPress = false;
    carousel.classList.remove("dragging");
    autoPlay = setInterval(function () {
        btnNext.click();
    }, 5000);
    if (!isPressing) return;
    isPressing = false;
    swipe();
}

carousel.addEventListener("mousedown", handleMouseDown);
carousel.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);