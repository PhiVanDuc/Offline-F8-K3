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

    const changeElement = Array.from(remainingElements).reduce(function (closest, child) {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset)
            return { offset: offset, element: child };
        else
            return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;

    if (changeElement)
        listCourses.insertBefore(dragging, changeElement);
    else
        listCourses.appendChild(dragging);
});