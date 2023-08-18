var renderArr = [
    {
        heading: 'Tiêu đề bài viết 1',
        desc: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have',
        image: "./Image/Example-img.jpg",
    },
    {
        heading: 'Tiêu đề bài viết 2',
        desc: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have',
        image: "./Image/Example-img.jpg",
    },
    {
        heading: 'Tiêu đề bài viết 3',
        desc: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have',
        image: "./Image/Example-img.jpg",
    },
    {
        heading: 'Tiêu đề bài viết 4',
        desc: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have',
        image: "./Image/Example-img.jpg",
    }
];

const container = document.querySelector('.container');
var displayArr = renderArr.map(function (element, index) {
    if (index % 2 === 0) {
        return `
        <div class="block">
            <img src="${element.image}" alt="">
            <div class="block-content">
                <h2>${element.heading}</h2>
                <p>${element.desc}</p>
            </div>
        </div>
        `;
    }
    else {
        return `
        <div class="block">
            <div class="block-content">
                <h2>${element.heading}</h2>
                <p>${element.desc}</p>
            </div>
            <img src="${element.image}" alt="">
        </div>
        `;
    }
});

container.innerHTML = displayArr.join('');