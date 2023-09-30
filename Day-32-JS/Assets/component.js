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
                if (name === "header-component") {
                    render(object.template, headerComponent);
                }
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
                    counterApp.addEventListener("click", function (event) {
                        const btn = event.target;
                        if (btn.innerText === "-" || btn.innerText === "+") {
                            if (btn.innerText === "-") {
                                --objectData["count"];
                            }
                            else if (btn.innerText === "+") {
                                ++objectData["count"];
                            }
                            objectTemplate = objectTemplate.replace(/(?<=\s)-?\d+(?=\s)/g, objectData["count"]);
                            render(objectTemplate, counterApp);
                            btns = counterApp.querySelectorAll("button");
                        }
                    });
                }
            }
        });
    }
}