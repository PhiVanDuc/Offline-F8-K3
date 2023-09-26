function customSetInterval(func, interval) {
    let begin = performance.now();
    let requestId;

    function loop(timestamp) {
        const elapsed = timestamp - begin;
        if (elapsed >= interval) {
            func();
            begin = timestamp;
        }
        requestId = requestAnimationFrame(loop);
    }
    requestId = requestAnimationFrame(loop);

    return {
        clearCustomSetInterval: function () {
            cancelAnimationFrame(requestId);
        }
    };
}

const elementTimeCount = document.querySelector(".time-count span");
const btnGetLink = document.querySelector(".btn-get-link");


let timeCountDown = 10;
let countDown;
let showOrHidden;
let styleBtn = {
    cursor: "pointer",
    backgroundColor: "transparent",
};

elementTimeCount.innerText = timeCountDown;
function handleVisibilitychange() {
    showOrHidden = document.hidden;
    if (!showOrHidden) {
        countDown = customSetInterval(() => {
            elementTimeCount.innerText = timeCountDown;
            if (timeCountDown === 0) {
                countDown.clearCustomSetInterval();
                Object.assign(btnGetLink.style, styleBtn);
                btnGetLink.addEventListener("click", () => { window.location.href = "https://fullstack.edu.vn/"; });
            }
            else --timeCountDown;
        }, 1000);
    }
    else {
        if (countDown)
            countDown.clearCustomSetInterval();
    }
}

window.addEventListener("load", () => { handleVisibilitychange(); });
document.addEventListener("visibilitychange", handleVisibilitychange);