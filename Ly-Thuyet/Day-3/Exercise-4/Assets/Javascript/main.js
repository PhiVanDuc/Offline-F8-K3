const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabItems = $$('.tab-item');
var lengTab = tabItems.length;
const contents = $$('.content');

for(let i = 0; i < lengTab; i++) {
    var element = tabItems[i];

    element.addEventListener('click', function() {
        $('.tab-item.active').classList.remove('active');
        this.classList.add('active');

        $('.content.active').classList.remove('active');
        contents[i].classList.add('active');
    });
}