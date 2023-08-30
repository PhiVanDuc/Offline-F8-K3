var todosApp = document.querySelector('.todos-app');
var inputAdd = todosApp.querySelector('.todo-form input');
var buttonAdd = todosApp.querySelector('.todo-form button');
var container = todosApp.querySelector('.container');
var nameTodoItem = 'todo-item';
var listEditItem = [];


buttonAdd.addEventListener("click", function () {
    if (inputAdd.value) {
        let todoItem = document.createElement("div");
        todoItem.setAttribute("class", nameTodoItem);
        todoItem.innerHTML = `<p class="task">${inputAdd.value}</p>
        <div class="todo-item-svg">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square" class="svg-inline--fa fa-pen-to-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="svg-1" fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path></svg>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path class="svg-2" fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
        </div>`;
        container.appendChild(todoItem);
        inputAdd.value = '';
    }
});


inputAdd.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        buttonAdd.click();
    }
});


container.addEventListener("click", function (e) {
    let element = e.target;

    // Nếu e.target là một element có class = task (Nó là tên nhiệm vụ)
    if (element.getAttribute("class") === 'task') {
        if (element.style.textDecoration === '' && element.style.opacity === '') {
            element.style.textDecoration = 'line-through';
            element.style.opacity = '0.7';
        }
        else if (element.style.textDecoration !== '' && element.style.opacity !== '') {
            element.style.textDecoration = '';
            element.style.opacity = '';
        }
    }
    // Nếu e.target là một element có class = svg-2 (Nó là icon thùng rác)
    else if (element.getAttribute("class") === 'svg-2') {
        element.closest("." + nameTodoItem).remove();
    }
    // Nếu e.target là một element có class = svg-1 (Nó là icon chỉnh sửa)
    else if (element.getAttribute("class") === 'svg-1') {
        let saveTask = element.closest('.' + nameTodoItem).querySelector('.task').innerHTML;
        element.closest('.' + nameTodoItem).outerHTML = `<form class="todo-form">
            <input type="text" placeholder="Edit task">
            <button type="button">Add Task</button>
        </form>`;

        listEditItem = container.querySelectorAll('.todo-form');
        listEditItem.forEach(function (element) {
            if (!element.querySelector('input').value) {
                element.querySelector('input').value = saveTask;
            }
        });

        container.addEventListener("click", function (e) {
            let element = e.target;
            let saveTask = element.closest('.todo-form').querySelector('input').value;
            if (element.tagName === "BUTTON") {
                element.closest('.todo-form').outerHTML = `<div class="${nameTodoItem}">
                <p class="task">${saveTask}</p>
                <div class="todo-item-svg">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square" class="svg-inline--fa fa-pen-to-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="svg-1" fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path></svg>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path class="svg-2" fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                </div></div>`;
            }
            else if (element.tagName === "INPUT") {
                element.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        let saveTask = element.closest('.todo-form').querySelector('input').value;
                        element.closest('.todo-form').outerHTML = `<div class="${nameTodoItem}">
                        <p class="task">${saveTask}</p>
                        <div class="todo-item-svg">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square" class="svg-inline--fa fa-pen-to-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="svg-1" fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path></svg>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path class="svg-2" fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                        </div></div>`;
                    }
                });
            }
        });
    }
});