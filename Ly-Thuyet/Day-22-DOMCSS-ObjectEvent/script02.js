// Event Object

var btn = document.querySelector('.btn');

// Pointer Event: Giải quyết các bài toán liên quan tới các sự kiện trên con trỏ
// Mouse Event : Giải quyết các bài toán liên quan tới các sự kiện trên con chuột
btn.addEventListener("mousedown", function (e) {
    // e = Event Object (Nó trả về thông tin của sự kiện)
    // Mỗi sự kiện lại có các thông tin khác nhau
    // console.log('clicked');
    // console.log(this);

    // offsetX,Y là căn theo cạnh trái và cạnh trên của element đang tác động
    // clientX,Y là căn theo cạnh trái và cạnh trên của trình duyệt
    // pageX,Y là căn theo cạnh trái và cạnh trên của chính mà hình window
    // console.log(e);
    if (e.which === 1) {
        this.style.backgroundColor = 'red';
    }
    console.log(e);
});



// Keyboard Event : Giải quyết các bài toán liên quan đến bàn phím
var nameElement = document.querySelector('.name');
nameElement.addEventListener('keyup', function (e) {
    // console.log(e);
    if (e.key === 'Enter') {
        console.log(this.value);
    }
});

document.addEventListener('keyup', function (e) {
    // Giữ ctr + bấm Enter => Chuyển cả trang thành màu đỏ
    // Ấn Enter thì chuyển về màu ban đầu
    if (e.ctrlKey && e.key === 'Enter') {
        this.body.style.backgroundColor = 'red';
    }
    else if (e.key === 'Enter') {
        this.body.style.backgroundColor = 'initial';
    }
});