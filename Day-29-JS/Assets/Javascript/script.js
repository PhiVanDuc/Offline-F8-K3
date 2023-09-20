const listCourses = document.querySelector(".list-courses");
const listItems = listCourses.querySelectorAll(".list-item");

listItems.forEach(function (element) {
    element.addEventListener("dragstart", function () {
        element.classList.add("dragging");
    });

    element.addEventListener("dragend", function () {
        element.classList.remove("dragging");
    });
});

listCourses.addEventListener("dragover", function (e) {
    e.preventDefault();
    const dragging = listCourses.querySelector(".dragging");
    const remainingElements = listCourses.querySelectorAll(".list-item:not(.dragging)");

    let changeUp = Array.from(remainingElements).find(function (element) {
        const box = element.getBoundingClientRect();
        if (e.clientY >= box.top - (box.height / 2))
            return element;
    });

    let changeDown = Array.from(remainingElements).find(function (element) {
        const box = element.getBoundingClientRect();
        if (e.clientY <= box.top + (box.height / 2))
            return element;
    });

    if (changeUp)
        listCourses.insertBefore(dragging, changeUp);
    else
        listCourses.prepend(dragging);

    if (changeDown)
        listCourses.insertBefore(dragging, changeDown);
    else
        listCourses.appendChild(dragging);
});
