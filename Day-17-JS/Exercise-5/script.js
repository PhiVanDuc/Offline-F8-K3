var count = 0;
var container = document.querySelector('.container');

for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= i; j++) {
        count++;
        var child = document.createElement('span');
        child.innerText = count + ' ';
        child.style.fontSize = '20px';
        child.style.fontFamily = 'system-ui';
        container.appendChild(child);
        if (j === i) {
            container.appendChild(document.createElement('br'));
        }
    }
}