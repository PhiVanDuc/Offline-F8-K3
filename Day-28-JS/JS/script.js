// Lấy các Element
const progressBar = document.querySelector(".progress-bar");
const progress = progressBar.querySelector(".progress");
const progressSpan = progress.querySelector("span");
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


// Hàm lấy ra Element parent
function getParent(element, level = 1) {
    while (level > 0) {
        element = element.parentElement;
        --level;
    }
    return element;
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
        hoverTime.style.display = "none";
    }
    isDrag = false;
});

// Bắt đầu phát nhạc
const playBtn = document.querySelector(".play-btn");
const runningTime = progressBar.previousElementSibling;
const durationTime = progressBar.nextElementSibling;
const pauseIcon = `<i class="fa-solid fa-pause"></i>`;
const playIcon = `<i class="fa-solid fa-play"></i>`;
let audio = new Audio("./955d0dafe950fa0f8121b00b04d1888e.mp3");

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


// Cập nhật lại độ dài của thanh progress, thời gian đang chạy
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

// Hiện thời gian khi hover, di chuyển trong progressBar
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
});

progressSpan.addEventListener("mousemove", function (e) {
    displayHoverTime(e.offsetX);
});



// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------



const karaokeBtn = document.querySelector(".karaoke-btn button");
const karaoke = document.querySelector(".karaoke");
const closeBtn = karaoke.querySelector(".close-btn");
const karaokeLyric = karaoke.querySelector(".karaoke-lyric");
const nameSong = karaokeLyric.querySelector("name-song");
const firstLyric = karaokeLyric.querySelector("first-lyric");
const secondLyric = karaokeLyric.querySelector("second-lyric");

// Hiển thị và ẩn bảng lyric karaoke
karaokeBtn.addEventListener("click", function () {
    karaoke.classList.toggle("show");
});
closeBtn.addEventListener("click", function () {
    if (karaoke.classList.contains("show"))
        karaoke.classList.remove("show");
});

// Đối tượng lyric
// key data
// key sentences
// Mảng
// Phần tử
// Đối tượng
// key word
// Chứa mảng
// Các phần tử là thời gian start, end của từng từ (Từng từ trong một đoạn lyric)


// Lấy ra mảng chứa các đoạn lyric trong bài hát
const sentences = lyric.data.sentences;
let newSentences = [];


// Trước khi xử lý, cần ghép các từ trong một câu lại
// Lấy beginTime và endTime của câu đó
// Đưa cả 3 vào một object
// Đưa object đó vào một mảng mới
for (let i = 0; i < sentences.length; i++) {
    let wordArray = sentences[i].words;
    let string = "";
    for (let j = 0; j < wordArray.length; j++) {
        if (j === wordArray.length - 1) {
            string += wordArray[j].data;
            newSentences.push({
                sentence: string,
                beginTime: wordArray[0].startTime,
                endTime: wordArray[wordArray.length - 1].endTime
            });
            break;
        }
        string = string + wordArray[j].data + " ";
    }
}


// Giờ chúng ta làm việc với mảng mới
// Đó là mảng newSentences -> Giải phóng mảng cũ
sentences = [];