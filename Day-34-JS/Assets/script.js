const todosApp = document.querySelector(".todos-app");
const formSearch = document.querySelector(".form-search");
const inputSearch = formSearch.querySelector(".input-search");
const btnAddTodos = formSearch.querySelector(".add-todos-btn");
const btnCompletedTasks = document.querySelector(".completed-task-btn");
const listTasks = document.querySelector(".list-tasks");
const listCompletedTasks = document.querySelector(".list-completed-tasks");
let formSave, inputSave;


const contentHtmlFormSave = `
<div class="overlay"></div>
<div class="box">
    <div class="wrap-input">
        <input type="text" class="input-save" placeholder="Add Todos">
    </div>
    <div class="group-btn">
        <button type="button" class="save-btn">Save</button>
        <button type="button" class="cancel-btn">Cancel</button>
    </div>
</div>
`;
const serverApi = `https://z65x4n-8080.csb.app`;
const renderedTasks = [];


// Hàm render dữ liệu ra giao diện
async function renderTasksInfo() {
    const response = await fetch(`${serverApi}/tasks`);
    const tasks = await response.json();
    console.log(tasks);

    tasks.forEach((task) => {
        let nameTask = task.nameTask;
        nameTask = JSON.stringify(nameTask);

        if (!renderedTasks.includes(task.id)) {
            const liElement = document.createElement("li");
            liElement.classList.add("task");
            liElement.setAttribute("data-index", task.id);
            liElement.innerHTML = `
            <p class="name-task">${nameTask.replace(/^"(.*)"$/, '$1')}</p>
            <div class="btn-svg">
                <button type="button" class="delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M13,3c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-5.98633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5.98633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805zM6,8v16c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-16z"></path></g></g>
                    </svg>
                </button>
                <button type="button" class="edit-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                </button>
                <button type="button" class="complete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 576 512"><path class="fill-white" d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"></path></svg>
                </button>
            </div>
            `;

            if (!task.completed) listTasks.appendChild(liElement);
            else if (task.completed) {
                liElement.classList.add("completed");
                listCompletedTasks.appendChild(liElement);
            }
            renderedTasks.push(task.id);
        }
    });
    console.log(renderedTasks);
}
renderTasksInfo();


// Hàm thêm dữ liệu và đưa lên server
async function addTaskInfo(object) {
    try {
        const response = await fetch(`${serverApi}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
        });
    }
    catch (e) {
        alert("Lỗi chương trình, chưa thêm được nhiệm vụ mới");
    }
}


// Hàm render ra form save
function renderFormSave() {
    const elementFormSave = document.createElement("form");
    elementFormSave.classList.add("form-save");
    elementFormSave.innerHTML = contentHtmlFormSave;
    todosApp.appendChild(elementFormSave);
}


// Thao tác với form save
btnAddTodos.addEventListener("click", function () {
    renderFormSave();
    formSave = document.querySelector(".form-save");
    inputSave = document.querySelector(".input-save");

    formSave.addEventListener("submit", function (infoEvent) {
        infoEvent.preventDefault();
        formSave.querySelector(".save-btn").click();
    })

    formSave.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", function () {
            if (button.classList.contains("cancel-btn")) todosApp.lastElementChild.remove();
            if (button.classList.contains("save-btn")) {
                if (!inputSave.value) alert("Hãy nhập thông tin!");
                else {
                    let nameTask = inputSave.value;
                    nameTask = JSON.stringify(nameTask).replace(/^"(.*)"$/, '$1');
                    addTaskInfo({
                        nameTask,
                        completed: false,
                    });
                    todosApp.lastElementChild.remove();
                    renderTasksInfo()
                    alert("Thêm mới nhiệm vụ thành công!");
                }
            }
        });
    });
});


// Thao tác với hiện thị các nhiệm vụ đã xong
btnCompletedTasks.addEventListener("click", function () {
    btnCompletedTasks.classList.toggle("checked");
    if (btnCompletedTasks.classList.contains("checked")) listCompletedTasks.style.display = "block";
    else listCompletedTasks.style.display = "";
});