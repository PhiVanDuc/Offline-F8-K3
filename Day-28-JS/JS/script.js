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

function hide() {
    hoverTime.style.display = "none";
}

progressBar.addEventListener("mouseover", function () {
    hoverTime.style.display = "block";
});

progressBar.addEventListener("mousemove", function (e) {
    displayHoverTime(e.offsetX);

    progressSpan.addEventListener("mouseover", hide);
    progressSpan.addEventListener("mouseenter", hide);
    progressSpan.addEventListener("mousemove", hide);
    progressSpan.addEventListener("mouseleave", hide);
});

progressBar.addEventListener("mouseleave", function () {
    hoverTime.style.display = "none";
});

progress.addEventListener("mouseover", function (e) {
    displayHoverTime(e.offsetX);
});



// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------


const karaokeBtn = document.querySelector(".karaoke-btn button");
const karaoke = document.querySelector(".karaoke");
const closeBtn = karaoke.querySelector(".close-btn");
const karaokeLyric = karaoke.querySelector(".karaoke-lyric");
const nameSong = karaokeLyric.querySelector(".name-song");
const firstLyric = karaokeLyric.querySelector(".first-lyric");
const secondLyric = karaokeLyric.querySelector(".second-lyric");

// Hiển thị và ẩn bảng lyric karaoke
karaokeBtn.addEventListener("click", function () {
    karaoke.classList.toggle("show");
});
closeBtn.addEventListener("click", function () {
    if (karaoke.classList.contains("show"))
        karaoke.classList.remove("show");
});

// Lấy ra mảng chứa các đoạn lyric trong bài hát
let sentences = lyric.data.sentences;

// Trước khi xử lý, cần ghép các từ trong một câu lại với nhau
// Lấy beginTime và endTime của câu đó
// Đưa cả 3 vào một object
// Đưa object đó vào một mảng mới là newSentences
let newSentences = [];
for (let i = 0; i < sentences.length; i++) {
    let wordArray = sentences[i].words;
    let string = "";
    for (let j = 0; j < wordArray.length; j++) {
        if (j === wordArray.length - 1) {
            string += wordArray[j].data;
            newSentences.push({
                sentence: string,
                beginTime: (wordArray[0].startTime / 1000),
                endTime: (wordArray[wordArray.length - 1].endTime / 1000)
            });
            break;
        }
        string += wordArray[j].data + " ";
    }
}

// Giờ chúng ta làm việc với mảng newSentences
// Giải phóng mảng sentences
// Bắt đầu phát nhạc (Sự kiện timeupdate)
// Kiểm tra thời gian nằm trong khoảng từ bắt đầu đến kết thúc thì hiển thị
sentences = [];
audio.addEventListener("timeupdate", function () {
    let runningTime = audio.currentTime;
    let tempArr = [];
    for (let i = 0; i < newSentences.length; i += 2) {
        if (newSentences[i + 1]) {
            if (audio.currentTime >= newSentences[i].beginTime && audio.currentTime <= newSentences[i + 1].endTime)
                tempArr.push(newSentences[i].sentence, newSentences[i + 1].sentence);
        }
        else if (!newSentences[i + 1]) {
            if (audio.currentTime >= newSentences[i].beginTime && audio.currentTime <= newSentences[i].endTime)
                tempArr.push(newSentences[i].sentence);
        }
    }

    if (tempArr.length > 0) {
        nameSong.innerHTML = ``;
        firstLyric.innerText = tempArr[0];
        if (tempArr[1])
            secondLyric.innerText = tempArr[1];
        else
            secondLyric.innerText = "";
    }
    else {
        firstLyric.innerText = "";
        secondLyric.innerText = "";
        nameSong.innerHTML = `Thay Doi<br>Ca sĩ: Thịnh Suy`;
    }
});
console.log(newSentences);