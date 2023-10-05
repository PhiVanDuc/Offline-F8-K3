window.SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


recognition.continuous = false;
recognition.lang = "vi-VN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


const speechBtn = document.querySelector(".speech-btn");
const state = document.querySelector(".state");
const inProcess = document.querySelector(".in-process");
const regexWay = /^(tới|đường tới|đến|đường đến|đi đến|chỉ đường|chỉ đường tới|chỉ đường đến|đi tới).*$/;
const regexMusic = /^(bật bài|mở bài|bật bài hát|mở bài hát|bài hát|nghe bài|nghe bài hát|phát nhạc|phát bài|nghe nhạc).*$/;
const regexVideo = /^(video|mở video|phát video|bật video|xem video).*$/;
function openNewTab(regex, string, url) {
    let keyword = string.replace(string.match(regex)[1], "").trim().replace(/\s+/, "+");
    window.open(`${url}${keyword}`, "_blank");
}


speechBtn.addEventListener("click", function () {
    recognition.start();
    state.innerText = "Hãy nói nội dung bạn muốn";
    state.style.color = "red";
    inProcess.style.display = "none";
    inProcess.innerText = ``;
});


recognition.addEventListener("result", function (event) {
    const text = event.results[0][0].transcript;
    const lowerText = text.toLowerCase();

    if (text) {
        inProcess.style.display = "block";
        inProcess.innerText = `Đang thực hiện: ${text}`;
    }

    setTimeout(() => {
        switch (lowerText) {
            case "google":
                recognition.interimResults = true;
                window.open("https://google.com", "_blank");
                break;
            case "youtube":
                recognition.interimResults = true;
                window.open("https://youtube.com", "_blank");
                break;
            case "facebook":
                recognition.interimResults = true;
                window.open("https://facebook.com", "_blank");
                break;
            case "google drive":
                recognition.interimResults = true;
                window.open("https://drive.google.com", "_blank");
                break;
            case "google maps": case "bản đồ":
                recognition.interimResults = true;
                window.open("https://www.google.com/maps/place", "_blank");
                break;
            case lowerText.match(regexWay) ? lowerText.match(regexWay).input : false:
                recognition.interimResults = true;
                openNewTab(regexWay, lowerText, "https://www.google.com/maps/search/");
                break;
            case lowerText.match(regexMusic) ? lowerText.match(regexMusic).input : false:
                recognition.interimResults = true;
                openNewTab(regexMusic, lowerText, "https://zingmp3.vn/tim-kiem/tat-ca?q=");
                break;
            case lowerText.match(regexVideo) ? lowerText.match(regexVideo).input : false:
                recognition.interimResults = true;
                openNewTab(regexVideo, lowerText, "https://www.youtube.com/results?search_query=");
                break;
            default:
                recognition.interimResults = false;
                break;
        }
    }, 1000);
});


recognition.addEventListener("speechend", function (event) {
    recognition.stop();
    state.innerText = "Đã nói xong. Hy vọng kết quả như ý bạn";
    state.style.color = "green";
    setTimeout(() => {
        if (!recognition.interimResults) inProcess.innerText = `Không thực hiện được yêu cầu`;
        else inProcess.innerText = `Đã thực hiện xong`;
    }, 1000);
});