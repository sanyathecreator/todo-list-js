// Initialize the task list application
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const emptyImage = document.querySelector(".empty-image");
const tasksContainer = document.querySelector(".tasks-container");

document.addEventListener("DOMContentLoaded", () => {
    displayTasks();
    toggleEmptyState();

    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask(event);
        }
    });

    addTaskButton.addEventListener("click", (event) => {
        addTask(event);
    });

    // Also disable edit button when checkbox is checked/unchecked
    checkbox.addEventListener("change", () => {
        const isChecked = checkbox.checked;
        listItem.classList.toggle("completed", isChecked);
        editButton.disabled = isChecked;
        editButton.style.opacity = isChecked ? "0.5" : "1";
        editButton.style.pointerEvents = isChecked ? "none" : "auto";
        saveTasksToLocalStorage();
    });

    editButton.addEventListener("click", () => {
        if (!checkbox.checked) {
            taskInput.value = listItem.querySelector("span").textContent;
            listItem.remove();
            toggleEmptyState();
            saveTasksToLocalStorage();
        }
    });

    listItem.querySelector(".delete-button").addEventListener("click", () => {
        taskList.removeChild(listItem);
        toggleEmptyState();
        saveTasksToLocalStorage();
    });
});

// Change the view when task list is empty or not
function toggleEmptyState() {
    emptyImage.style.display =
        taskList.children.length === 0 ? "block" : "none";
    tasksContainer.style.width =
        taskList.children.length === 0 ? "50%" : "100%";
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(text = task.text, completed = task.completed));
    toggleEmptyState();
} */

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    const checkbox = tasks[index].querySelector(".task-checkbox");
    const editButton = tasks[index].querySelector(".edit-button");
    // Disable edit button if task is completed
    /*
    if (tasks[index].completed) {
        tasks[index].completed = !tasks[index].completed;
        editButton.disabled = true;
        editButton.style.opacity = 0.5;
        editButton.style.pointerEvents = "none";
    }
    */
    saveTasksToLocalStorage();
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((item, index) => {
        // Create task item
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${
            item.completed ? "checked" : ""
        }/>
        <span>${item.text}</span>
        <div class="task-buttons">
            <button class="edit-button"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        listItem
            .querySelector(".task-checkbox")
            .addEventListener("change", () => {
                toggleTaskCompletion(index);
            });
        taskList.appendChild(listItem);
    });
}

function addTask(event, completed = false) {
    event.preventDefault();
    // If text is provided (for editing), use it; otherwise, use input value
    const taskText = taskInput.value.trim();
    if (!taskText) {
        return;
    }

    tasks.push({ text: taskText, completed });
    taskInput.value = "";
    toggleEmptyState();
    saveTasksToLocalStorage();
    displayTasks();
}
