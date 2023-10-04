window.SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


recognition.continuous = false;
recognition.lang = "vi-VN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


const speechBtn = document.querySelector(".speech-btn");
speechBtn.addEventListener("click", function () {
    recognition.start();
});


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
        case lowerText.match(/(chỉ đường|chỉ đường tới|tới|đường tới).*/).input:
            console.log(lowerText.match(/^(?!.*(chỉ đường|chỉ đường tới|tới|đường tới)).*$/i));
            break;
    }
});


recognition.addEventListener("speechend", function () {
    recognition.stop();
});