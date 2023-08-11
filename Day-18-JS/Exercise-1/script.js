var karaokeText = document.querySelector('.karaoke-text');
var text = karaokeText.innerHTML;
var words = text.split(" ");
var wordsLength = words.length;
var currentRedWord = 0;

setInterval(function () {
    var newText = '';

    for (var i = 0; i < wordsLength; i++) {
        if (i === currentRedWord) {
            newText += '<span class="red-word">' + words[i] + '</span> ';
        }
        else if (i !== currentRedWord) {
            newText += words[i] + ' ';
        }
    }

    karaokeText.innerHTML = newText;
    currentRedWord = (currentRedWord + 1) % text.length;
}, 1000);