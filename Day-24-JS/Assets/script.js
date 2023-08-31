var todosApp = document.querySelector('.todos-app');
var inputAdd = todosApp.querySelector('.todo-form input');
var buttonAdd = todosApp.querySelector('.todo-form button');
var container = todosApp.querySelector('.container');


function todoItem(taskText, element, remove, add) {
    if (element && remove && add) {
        element.classList.remove(remove);
        element.classList.add(add);
        return element;
    }
    else if (taskText) {
        let innerTodoItem = `<p class="task">${taskText}</p>
        <div class="todo-item-icon">
            <img src="./Assets/Image/edit-icon.png" class="edit-icon" alt="edit-icon">
            <img src="./Assets/Image/bin-icon.png" class="bin-icon" alt="bin-icon">
        </div>`;

        return innerTodoItem;
    };
}


function todoForm(element, remove, add, taskText) {
    element.classList.remove(remove);
    element.classList.add(add);
    element.innerHTML = `<input type="text" placeholder="Edit task">
    <button type="button">Add Task</button>`;
    element.querySelector("input").value = taskText;

    return element;
}

buttonAdd.addEventListener("click", function () {
    let insert = document.createElement("div");
    insert.setAttribute("class", "todo-item");
    insert.innerHTML = todoItem(inputAdd.value);
    container.appendChild(insert);
    inputAdd.value = '';
});


inputAdd.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        buttonAdd.click();
    }
});


container.addEventListener("click", function (e) {
    let selectElement = e.target;

    if (selectElement.getAttribute("class") === "task") {
        if (selectElement.style.textDecoration === "" && selectElement.style.opacity === "") {
            selectElement.style.textDecoration = "line-through";
            selectElement.style.opacity = "0.6";
        }
        else {
            selectElement.style.textDecoration = "";
            selectElement.style.opacity = "";
        }
    }
    else if (selectElement.getAttribute("class") === "bin-icon") {
        selectElement.closest(".todo-item").remove();
    }
    else if (selectElement.getAttribute("class") === "edit-icon") {
        let currentParent = selectElement.closest(".todo-item");
        currentParent = todoForm(currentParent, "todo-item", "todo-form", currentParent.querySelector(".task").innerHTML);

        let buttonEdit = currentParent.querySelector("button");
        let inputEdit = currentParent.querySelector("input");

        buttonEdit.addEventListener("click", function () {
            currentParent = todoItem(null, currentParent, "todo-form", "todo-item");
            currentParent.innerHTML = todoItem(inputEdit.value);
        });

        inputEdit.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                buttonEdit.click();
            }
        });
    }
});