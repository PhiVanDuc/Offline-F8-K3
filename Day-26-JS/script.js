// Lấy các Element
const progressBar = document.querySelector(".progress-bar");
const progress = progressBar.querySelector(".progress");
const progressSpan = progress.querySelector(".progress span");
const hoverTime = progressBar.querySelector(".hover-time");
const hoverTimeText = hoverTime.querySelector("p");

// Thực hiện các sự kiện
let progressBarWidth = progressBar.clientWidth;
let isDrag = false;
let percent;

window.addEventListener("resize", function () {
    progressBarWidth = progressBar.clientWidth;
})

// Hàm cập nhật độ dài của thanh progress (thanh màu đỏ) tính theo %
function handleDrag(value) {
    percent = (value / progressBarWidth) * 100;
    if (percent > 100)
        percent = 100;
    if (percent < 0)
        percent = 0;
    progress.style.width = `${percent}%`;
}

// Hàm để cập nhật lại left, thời gian của box khi hover, move bên trong thanh progressBar
function displayHoverTime(currentWidth) {
    let value;
    value = (currentWidth / progressBarWidth) * 100;
    hoverTime.style.left = value + "%";
    hoverTimeText.innerText = getTime(audio.duration * (value / 100));
}

progressBar.addEventListener("mousedown", function (e) {
    if (e.which === 1) {
        isDrag = true;
        handleDrag(e.offsetX);
    }
});

progressSpan.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    isDrag = true;
});

document.addEventListener("mousemove", function (e) {
    if (isDrag) {
        let moving = e.clientX - progressBar.offsetLeft;
        handleDrag(moving);
        if (moving >= 0 && moving <= progressBarWidth) {
            hoverTime.style.display = "block";
            displayHoverTime(moving);
        }
        else
            hoverTime.style.display = "none";
    }
});

document.addEventListener("mouseup", function () {
    if (isDrag && (percent || percent === 0)) {
        audio.currentTime = audio.duration * (percent / 100);
    }
    isDrag = false;
});

// Bắt đầu phát nhạc
const playBtn = document.querySelector(".play-btn");
const runningTime = progressBar.previousElementSibling;
const durationTime = progressBar.nextElementSibling;
const pauseIcon = `<i class="fa-solid fa-pause"></i>`;
const playIcon = `<i class="fa-solid fa-play"></i>`;
let audio = new Audio("./y2mate.com - Ed Sheeran  Supermarket Flowers Official Audio.mp3");

function getTime(seconds) {
    let mins = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - mins * 60);
    return `${mins < 10 ? "0" + mins : mins}:${seconds < 10 ? "0" + seconds : seconds}`
}

audio.addEventListener("loadeddata", function () {
    durationTime.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = pauseIcon;
    }
    else {
        audio.pause();
        playBtn.innerHTML = playIcon;
    }
});

audio.addEventListener("timeupdate", function (e) {
    runningTime.innerText = getTime(Math.floor(audio.currentTime));
    if (!isDrag) {
        progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    }

    if (audio.currentTime === audio.duration) {
        progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
        audio.currentTime = 0;
        playBtn.innerHTML = playIcon;
        audio.pause();
    }
});

// Hiện thời gian khi hover vào progress-bar
progressBar.addEventListener("mouseover", function () {
    if (hoverTime.style.display === "") {
        hoverTime.style.display = "block";
    }
});

progressBar.addEventListener("mouseleave", function () {
    if (hoverTime.style.display === "block") {
        hoverTime.style.display = "";
    }
});

progressBar.addEventListener("mousemove", function (e) {
    displayHoverTime(e.offsetX);

    progressSpan.addEventListener("mousemove", function () {
        hoverTime.style.display = "";
    })
});