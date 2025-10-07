// 
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");
    const emptyImage = document.querySelector(".empty-image");

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
    }

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) {
            return;
        }

        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <input type="checkbox" class="task-checkbox"/>
        <span>${taskText}</span>
        `;

        taskList.appendChild(listItem);
        taskInput.value = "";
        toggleEmptyState();
    };

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask(event);
        }
    });
});