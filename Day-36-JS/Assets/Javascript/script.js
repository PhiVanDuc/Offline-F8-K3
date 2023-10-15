import { interactAPI } from "./Modules/interactAPI.js";


const btnStart = document.querySelector(".btn-start button");
const countdown = document.querySelector(".countdown");
const container = document.querySelector(".container");


let htmlContainer = `
<div class="progress-bar">
    <div class="progress"></div>
</div>

<div class="calc-point">
    <div class="number-question">
        <p><span>0</span>/<span>0</span></p>
    </div>

    <div class="strike-bar">
        <div class="strike-progress"></div>
        <p class="strike"></p>
        <div class="strike-line-left"></div>
        <div class="strike-line-right"></div>
        <p class="plus-point"></p>
    </div>
</div>

<div class="question">
</div>

<div class="result"></div>
`;

let questions;
let catchError = "";


async function getData() {
    try {
        const { data } = await interactAPI.get("/quizizz");
        questions = data;
    }
    catch (e) {
        catchError = e;
        console.log(e);
    }
}
getData();


btnStart.addEventListener("click", function () {
    btnStart.style.display = "none";
    countdown.style.visibility = "visible";

    // Chuyển cảnh đếm ngược khi ấn nút Start
    let numberCountdown = countdown.querySelector("span");
    numberCountdown.style.transform = "scale(1)";
    const animationCountdown = setInterval(function () {
        if (numberCountdown.innerText === "Go!") {
            countdown.style.visibility = "hidden";
            clearInterval(animationCountdown);

            // Bắt đầu xử lý các logic khi đã chạy xong phần khởi động

            // Thêm nội dung vào container
            container.innerHTML = htmlContainer;
            container.style.transform = "translateX(0%)";

            // Xử lý các logic khác
            const progress = container.querySelector(".progress");
            const calcPoint = document.querySelector(".calc-point");
            const currentQuestion = calcPoint.querySelector(".number-question p span:first-child");
            const totalQuestion = calcPoint.querySelector(".number-question p span:last-child");
            const question = document.querySelector(".question");
            const result = document.querySelector(".result");

            const checkQuestions = setInterval(function () {
                // Nếu lấy được dữ liệu rồi thì mới xử lý logic và xóa setInterval đi
                if (questions) {
                    clearInterval(checkQuestions);

                    currentQuestion.innerText = 1;
                    totalQuestion.innerText = questions.length;

                    let duration = 10000;
                    let startTime = performance.now();
                    let currentAnimation;

                    function updateProgress() {
                        const currentTime = performance.now();
                        const elapsed = currentTime - startTime;
                        let newWidth = 100 - (elapsed / duration) * 100;
                        progress.style.width = newWidth + "%";
                        if (newWidth > 0) {
                            currentAnimation = requestAnimationFrame(updateProgress);
                        }
                    }

                    function rerenderQuestion() {
                        if (+currentQuestion.innerText === questions.length) return;
                        else {
                            result.style.display = "none";
                            ++currentQuestion.innerText;
                            progress.style.width = "100%";
                            startTime = performance.now();
                            renderQuestion(+currentQuestion.innerText);
                        }
                    }

                    function renderQuestion(index) {
                        const stripHtml = (html) => html.replace(/<([^>]+)>/gi, "");

                        let infoQuestion = questions[index - 1];
                        if (infoQuestion.choose === 1) question.setAttribute("data-choose", 1);
                        else question.setAttribute("data-choose", 2);
                        question.innerHTML = `
                            <div class="heading-question">
                                <h2>${infoQuestion.question}</h2>
                                <p>${infoQuestion.choose === 1 ? "" : "Choose 2 correct answer(s)"}</p>
                            </div>

                            <div class="answers">
                                <p class="answer" data-correct="${infoQuestion.answers[0].correct}">${stripHtml(infoQuestion.answers[0].answer)}</p>
                                <p class="answer" data-correct="${infoQuestion.answers[1].correct}">${stripHtml(infoQuestion.answers[1].answer)}</p>
                                <p class="answer" data-correct="${infoQuestion.answers[2].correct}">${stripHtml(infoQuestion.answers[2].answer)}</p>
                                <p class="answer" data-correct="${infoQuestion.answers[3].correct}">${stripHtml(infoQuestion.answers[3].answer)}</p>
                            </div>
                            `;
                        updateProgress();

                        setTimeout(function () {
                            const number = progress.style.width.match(/^(\d+)/);
                            if (+number[1] === 0 && +currentQuestion.innerText < questions.length) {
                                rerenderQuestion();
                                cancelAnimationFrame(currentAnimation);
                            }
                            else if (+number[1] === 0 && +currentQuestion.innerText === questions.length) return;
                        }, duration);
                    }
                    renderQuestion(+currentQuestion.innerText);

                    let saveChoose = [];
                    let numberCorrect = 0;
                    let canClick = true;

                    question.addEventListener("click", function (e) {
                        const target = e.target;
                        if (!canClick && target.parentElement.parentElement.dataset.choose === "1") return;
                        else if (!canClick && target.parentElement.parentElement.dataset.choose === "2" && saveChoose === 2) return;
                        else {
                            if (target.classList.contains("answer")) {
                                const css = {
                                    display: "block",
                                    backgroundColor: "#DC4C64",
                                };
                                const answers = question.querySelectorAll(".answer");

                                if (target.parentElement.parentElement.dataset.choose === "1") {
                                    if (target.dataset.correct === "false") {
                                        target.style.backgroundColor = "#DC4C64";

                                        answers.forEach((answer) => {
                                            if (answer.dataset.correct === "true") {
                                                answer.style.backgroundColor = "#14A44D";
                                                return;
                                            }
                                        });

                                        Object.assign(result.style, css);
                                        result.innerText = "Incorrect!";

                                        setTimeout(function () {
                                            rerenderQuestion();
                                            canClick = true;
                                        }, 2000);
                                    }

                                    if (target.dataset.correct === "true") {
                                        target.style.backgroundColor = "#14A44D";
                                        css.backgroundColor = "#14A44D";
                                        Object.assign(result.style, css);
                                        result.innerText = "Correct!";

                                        setTimeout(function () {
                                            rerenderQuestion();
                                            canClick = true;
                                        }, 2000);
                                    }
                                }
                                else if (target.parentElement.parentElement.dataset.choose === "2") {
                                    saveChoose.push(target);
                                    if (saveChoose.length < 2) {
                                        target.style.backgroundColor = "rgba(24, 160, 190, 0.5)";
                                    }
                                    else if (saveChoose.length === 2) {
                                        if (saveChoose.length === 2) {
                                            saveChoose.forEach((anwser) => {
                                                if (anwser.dataset.correct === "false")
                                                    anwser.style.backgroundColor = "#DC4C64"
                                                else {
                                                    anwser.style.backgroundColor = "#14A44D";
                                                    numberCorrect++;
                                                }
                                            });

                                            if (numberCorrect === 2) {
                                                css.backgroundColor = "#14A44D";
                                                Object.assign(result.style, css);
                                                result.innerText = "Correct!";
                                            }
                                            else {
                                                Object.assign(result.style, css);
                                                result.innerText = "Incorrect!";
                                                answers.forEach((answer) => {
                                                    if (answer.dataset.correct === "true") {
                                                        answer.style.backgroundColor = "#14A44D";
                                                        return;
                                                    }
                                                });
                                            }
                                        }

                                        setTimeout(function () {
                                            numberCorrect = 0;
                                            saveChoose = [];
                                            rerenderQuestion();
                                            canClick = true;
                                        }, 2000);
                                    }
                                }
                                canClick = false;
                                cancelAnimationFrame(currentAnimation);
                            }
                        }
                    });
                }
                else if (catchError) {
                    clearInterval(checkQuestions);
                    alert("Lỗi, hãy tải lại trang hoặc vào lại sau!");
                    return;
                }
            }, 16);
        }

        --numberCountdown.innerText;
        if (numberCountdown.innerText === "0") {
            numberCountdown.innerText = "Go!";
        }
    }, 1000);
});