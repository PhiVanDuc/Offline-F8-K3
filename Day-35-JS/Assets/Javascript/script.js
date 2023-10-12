import { fetchApi } from "../Modules/fetch.js";
const rowElement = document.querySelector(".news > .row");
const loadingFooter = document.querySelector(".loading-footer");
loadingFooter.style.display = "none";
let isLoading = false;

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
    if (isLoading) return;
    isLoading = true;

    const getNews = async function (query = {}) {
        const queryString = new URLSearchParams(query).toString();
        const { data: news } = await fetchApi.get('/paginate?' + queryString);
        isLoading = false;
        render(news);

        document.querySelector("#loader").style.display = "none";
    }
    getNews({
        _page: 1,
        _limit: 8,
    });
}
updateNews();

window.addEventListener("scroll", function () {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        loadingFooter.style.display = "block";
        updateNews();
    }
});