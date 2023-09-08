let html = document.documentElement;
let header = document.querySelector(".header");
let carousel = header.querySelector(".carousel");
let carouselOverflow = carousel.querySelector(".carousel-overflow");
let carouselInner = carousel.querySelector(".carousel-inner");
let imgs = carouselInner.querySelectorAll("img");
let dots = header.querySelector(".dots");


let showing = 0;
for (let i = 0; i < imgs.length; i++) {
    let dot = document.createElement("span");
    dot.classList.add("dot");
    dots.appendChild(dot);
}
let listDot = dots.querySelectorAll(".dot");
listDot[showing].classList.add("active");


function reloadSlider() {
    let distanceEdgeLeft = imgs[showing].offsetLeft;
    carouselOverflow.scrollLeft = distanceEdgeLeft;

    let currentActiveDot = dots.querySelector(".dot.active");
    currentActiveDot.classList.remove("active");
    listDot[showing].classList.add("active");
}


function autoPlay() {
    if (showing === imgs.length - 1)
        showing = 0;
    else
        ++showing;
    reloadSlider();
}
let changeImg = setInterval(autoPlay, 10000);


listDot.forEach(function (element, index) {
    element.addEventListener("click", function () {
        showing = index;
        reloadSlider();

        clearInterval(changeImg);
        changeImg = setInterval(autoPlay, 10000);
    });
});




let btnDown = header.querySelector(".btn-down");
btnDown.addEventListener("click", function () {
    html.scrollTop = header.clientHeight + 50;
}) 