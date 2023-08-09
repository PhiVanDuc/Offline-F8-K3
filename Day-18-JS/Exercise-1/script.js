var karaokeText = document.querySelector('.karaoke-text');
var text = karaokeText.innerHTML;
var words = text.split(" ");
var wordsLength = words.length;
var currentRedWord = 0;

setInterval(function () {
    var nextWord = '';

    for (var i = 0; i < wordsLength; i++) {
        if (i === currentRedWord) {
            nextWord += '<span class="red-word">' + words[i] + '</span> ';
        }
        else if (i !== currentRedWord) {
            nextWord += words[i] + ' ';
        }
    }

    karaokeText.innerHTML = nextWord;
    currentRedWord = (currentRedWord + 1) % 25;
}, 1000);