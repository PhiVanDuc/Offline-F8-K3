const todosApp = document.querySelector(".todos-app");
const formSearch = document.querySelector(".form-search");
const inputSearch = formSearch.querySelector(".input-search");
const btnAddTodos = formSearch.querySelector(".add-todos-btn");
const btnCompletedTasks = document.querySelector(".completed-task-btn");
const quantityCompletedTasks = btnCompletedTasks.querySelector("span");
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
function updateUI(task) {
    let nameTask = task.nameTask;
    nameTask = JSON.stringify(nameTask);

    const liElement = document.createElement("li");
    liElement.classList.add("task");
    liElement.setAttribute("data-index", task.id);
    liElement.innerHTML = `
    <p class="name-task">${nameTask.replace(/^"(.*)"$/, '$1')}</p>
    <div class="btn-svg">
        <button type="button" class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>
        <button type="button" class="edit-btn">
            <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button type="button" class="complete-btn">
            <i class="fa-solid fa-clipboard-check"></i>
        </button>
    </div>
    `;

    if (!task.completed) listTasks.appendChild(liElement);
    else if (task.completed) {
        liElement.classList.add("completed");
        listCompletedTasks.appendChild(liElement);
    }
}


// Hàm load dữ liệu lên khi mới load trang
async function loadTasksInfo() {
    const response = await fetch(`${serverApi}/tasks`);
    const tasks = await response.json();
    tasks.forEach((task) => {
        if (!renderedTasks.includes(task.id)) {
            updateUI(task);
            renderedTasks.push(task.id);
        }
    });
    quantityCompletedTasks.innerText = listCompletedTasks.childElementCount;
}
loadTasksInfo();


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

        if (response.ok) {
            const task = await response.json();
            updateUI(task);
        }
    }
    catch (e) {
        alert(e);
    }
}


// Hàm render ra form save
function renderFormSave() {
    const elementFormSave = document.createElement("form");
    elementFormSave.classList.add("form-save");
    elementFormSave.innerHTML = contentHtmlFormSave;
    todosApp.appendChild(elementFormSave);

    formSave = document.querySelector(".form-save");
    inputSave = document.querySelector(".input-save");

    formSave.addEventListener("submit", function (infoEvent) {
        infoEvent.preventDefault();
        formSave.querySelector(".save-btn").click();
    });
}


// Thao tác với form save
btnAddTodos.addEventListener("click", function () {
    renderFormSave();
    btnAddTodos.blur();

    formSave.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", function () {
            if (button.classList.contains("cancel-btn")) todosApp.lastElementChild.remove();
            if (button.classList.contains("save-btn")) {
                if (!inputSave.value) alert("Hãy nhập thông tin!");
                else {
                    let nameTask = inputSave.value;
                    nameTask = JSON.stringify(nameTask).replace(/^"(.*)"$/, '$1');
                    addTaskInfo({
                        nameTask: nameTask,
                        completed: false,
                    });
                    alert("Thêm nhiệm vụ thành công!");
                    todosApp.lastElementChild.remove();
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


// Xử lý xóa, sửa và hoàn thành
async function deleteTaskInfo(id, taskBar) {
    try {
        const response = await fetch(`${serverApi}/tasks/${id}`, {
            method: "DELETE",
        });

        taskBar.remove();
        if (taskBar.classList.contains("completed")) {
            quantityCompletedTasks.innerText = listCompletedTasks.childElementCount;
        }
    }
    catch (e) {
        alert(e);
    }
}


async function updateTaskCompleted(id, object, taskBar) {
    try {
        const response = await fetch(`${serverApi}/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
        });

        if (!taskBar.classList.contains("completed")) {
            taskBar.remove();
            taskBar.classList.add("completed");
            listCompletedTasks.prepend(taskBar);
        }
        else if (taskBar.classList.contains("completed")) {
            taskBar.remove();
            taskBar.classList.remove("completed");
            listTasks.prepend(taskBar);
        }
        quantityCompletedTasks.innerText = listCompletedTasks.childElementCount;
    }
    catch (e) {
        alert(e);
    }
}


async function updateTaskName(id, object, taskBar, inputSave) {
    try {
        const response = await fetch(`${serverApi}/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
        });

        taskBar.querySelector(".name-task").innerText = inputSave.value;
    }
    catch (e) {
        alert(e);
    }
}


let elementTarget, taskBar;
todosApp.addEventListener("click", function (infoEvent) {
    const originalTarget = infoEvent.target;
    function setTarget() {
        if (originalTarget.classList.contains("delete-btn") || originalTarget.classList.contains("edit-btn") || originalTarget.classList.contains("complete-btn")) {
            elementTarget = infoEvent.target;
            taskBar = elementTarget.parentElement.parentElement;
        }
        else if (originalTarget.tagName === "I") {
            elementTarget = infoEvent.target.parentElement;
            taskBar = elementTarget.parentElement.parentElement;
        }
    }
    setTarget();

    if (elementTarget && taskBar) {
        const idTask = taskBar.dataset.index;

        if (elementTarget.classList.contains("delete-btn")) {
            deleteTaskInfo(idTask, taskBar);
        }
        else if (elementTarget.classList.contains("complete-btn")) {
            if (!taskBar.classList.contains("completed")) updateTaskCompleted(idTask, { completed: true }, taskBar);
            else if (taskBar.classList.contains("completed")) updateTaskCompleted(idTask, { completed: false }, taskBar);
        }
        else if (elementTarget.classList.contains("edit-btn")) {
            renderFormSave();
            elementTarget.blur();
            inputSave.value = taskBar.querySelector(".name-task").innerText;

            formSave.querySelectorAll("button").forEach((button) => {
                button.addEventListener("click", function () {
                    setTarget();
                    if (button.classList.contains("cancel-btn")) todosApp.lastElementChild.remove();
                    else if (button.classList.contains("save-btn")) {
                        if (!inputSave.value) alert("Vui lòng nhập thông tin chỉnh sửa!");
                        else {
                            let nameTask = inputSave.value;
                            nameTask = JSON.stringify(nameTask).replace(/^"(.*)"$/, '$1');
                            updateTaskName(idTask, { nameTask: nameTask }, taskBar, inputSave);
                            todosApp.lastElementChild.remove();
                        }
                    }
                    elementTarget = undefined;
                    taskBar = undefined;
                });
            });
        }
        elementTarget = undefined;
        taskBar = undefined;
    }
});