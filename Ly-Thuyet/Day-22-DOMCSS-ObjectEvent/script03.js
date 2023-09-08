var btn = document.querySelector(".btn");
var isDrag = false;
var offsetX, offsetY;

btn.addEventListener("mousedown", function (e) {
    if (e.which === 1) {
        isDrag = true;
        btn.style.position = "relative";
        offsetY = e.offsetY;
        offsetX = e.offsetX;
    }
});

function handleDrag(e) {
    let top = e.clientY;
    let left = e.clientX;
    let css = {
        top: `${top - 10 - offsetY}px`,
        left: `${left - 10 - offsetX}px`,
    };

    Object.assign(btn.style, css);
}

document.addEventListener("mousemove", function (e) {
    if (isDrag) {
        handleDrag(e);
        btn.style.cursor = "move";
    }
});

document.addEventListener("mouseup", function () {
    isDrag = false;
    let css = {
        top: `${0}px`,
        left: `${0}px`,
        position: '',
        cursor: '',
    };

    Object.assign(btn.style, css);
});