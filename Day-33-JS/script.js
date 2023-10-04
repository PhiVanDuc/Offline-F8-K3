window.SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


recognition.continuous = false;
recognition.lang = "vi-VN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


const speechBtn = document.querySelector(".speech-btn");
const regexWay = /^(tới|đường tới|đến|đường đến|đi đến|chỉ đường|chỉ đường tới|chỉ đường đến).*$/;
const regexMusic = /^(bật bài|mở bài|bật bài hát|mở bài hát|bài hát|nghe bài|nghe bài hát|phát nhạc|phát bài|nghe nhạc).*$/;
const regexVideo = /^(video|mở video|phát video|bật video|xem video).*$/;
let showOrHidden = false;
speechBtn.addEventListener("click", function () {
    recognition.start();
});


function openNewTab(regex, string, url) {
    let keyword = string.replace(string.match(regex)[1], "").trim().replace(/\s+/, "+");
    window.open(`${url}${keyword}`, "_blank");
}


recognition.addEventListener("result", function (event) {
    const text = event.results[0][0].transcript;
    const lowerText = text.toLowerCase();
    switch (lowerText) {
        case "google":
            window.open("https://google.com", "_blank");
            break;
        case "youtube":
            window.open("https://youtube.com", "_blank");
            break;
        case "facebook":
            window.open("https://facebook.com", "_blank");
            break;
        case "google drive":
            window.open("https://drive.google.com", "_blank");
            break;
        case "google maps": case "bản đồ":
            window.open("https://www.google.com/maps/place", "_blank");
            break;
        case lowerText.match(regexWay) ? lowerText.match(regexWay).input : false:
            openNewTab(regexWay, lowerText, "https://www.google.com/maps/search/");
            break;
        case lowerText.match(regexMusic) ? lowerText.match(regexMusic).input : false:
            openNewTab(regexMusic, lowerText, "https://zingmp3.vn/tim-kiem/tat-ca?q=");
            break;
        case lowerText.match(regexVideo) ? lowerText.match(regexVideo).input : false:
            openNewTab(regexVideo, lowerText, "https://www.youtube.com/results?search_query=");
            break;
    }
});


recognition.addEventListener("speechend", function () {
    recognition.stop();
});