import { fetchApi } from "../Modules/fetch.js";

let page = 1;
let limit = 4;
const rowElement = document.querySelector(".news > .row");

function render(news) {
    const stripHtml = (html) => html.replace(/<([^>]+)>/gi, "");
    const newsHtml = news.map(({ image, heading, desc }) =>
        `
        <div class="col-12 col-md-6">
            <a href="#!" class="text-decoration-none">
                <div class="news-item bg-dark rounded">
                    <img class="w-100 object-fit-cover rounded mb-3" style="height: 300px; object-position: center" src="${stripHtml(image)}" alt="">
                    <h3 class="news-heading text-white ms-4 fs-4 pe-3 lh-base">${stripHtml(heading)}</h3>
                    <p class="text-white ms-4 pb-3">${stripHtml(desc)}</p>
                </div>
            </a>
        </div>
        `
    ).join("");
    rowElement.innerHTML += newsHtml;
}


function updateNews() {
    const getNews = async function (query = {}) {
        const queryString = new URLSearchParams(query).toString();
        const { data: news } = await fetchApi.get('/paginate?' + queryString);
        render(news);
        page++;

        if (news.length === 0) {
            page = 1;
            getNews({
                _page: page,
                _limit: limit,
            });
        }

        document.querySelector("#loader").style.display = "none";
        if (rowElement.querySelector(".load")) rowElement.querySelector(".load").remove();
    }
    getNews({
        _page: page,
        _limit: limit,
    });
}
updateNews();

window.addEventListener("scrollend", function () {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        const load = document.createElement("p");
        load.classList.add("load");
        load.innerHTML = "Loading...";
        rowElement.appendChild(load);
        updateNews();
    }
});