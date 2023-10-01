const headerComponent = document.querySelector("header-component");
let counterApp = document.querySelector("counter-app");

function render(content, element) {
    const template = content;
    const templateElement = document.createElement("template");
    templateElement.innerHTML = template;
    const templateClone = templateElement.content.cloneNode(true);
    element.textContent = '';
    element.appendChild(templateClone);
}

class F8 {
    constructor() { }
    static component(name, object) {
        customElements.define(name, class extends HTMLElement {
            constructor() { super(); }

            connectedCallback() {
                if (name === "header-component") render(object.template, headerComponent);
                else if (name === "counter-app") {
                    Object.keys(object).forEach((key) => {
                        window[key] = object[key];
                    });

                    const objectData = data();
                    let objectTemplate = template;

                    const takeStrings = objectTemplate.match(/{{.+?}}/g);
                    takeStrings.forEach((string) => {
                        const alternative = string.match(/{{\s*(\w+)\s*}}/)[1];
                        objectTemplate = objectTemplate.replace(string, objectData[alternative]);
                    });
                    render(objectTemplate, counterApp);

                    let btns = counterApp.querySelectorAll("button");
                    btns.forEach((btn) => {
                        btn.addEventListener("click", function () {
                            if (btn.innerText === '-' || btn.innerText === '+') {
                                if (btn.innerText === '-') --objectData["count"];
                                else ++objectData["count"];
                                counterApp.querySelector("h2").innerText = `Đã đếm: ${objectData["count"]} lần`;
                            }
                        });
                    });

                    btns[btns.length - 1].addEventListener("dblclick", function () {
                        const elementTitle = counterApp.querySelector("h1")
                        elementTitle.classList.toggle("change");
                        if (elementTitle.classList.contains("change")) objectData["title"] = "Title changed";
                        else objectData["title"] = "Counter App";
                        elementTitle.innerText = objectData["title"];
                    });
                }
            }
        });
    }
}