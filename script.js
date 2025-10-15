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

    /*editButton.addEventListener("click", () => {
        if (!checkbox.checked) {
            taskInput.value = listItem.querySelector("span").textContent;
            listItem.remove();
            toggleEmptyState();
            saveTasksToLocalStorage();
        }
    }); */
});

// Change the view when task list is empty or not
function toggleEmptyState() {
    emptyImage.style.display =
        tasks.length === 0 ? "block" : "none";
    tasksContainer.style.width =
        tasks.length === 0 ? "50%" : "100%";
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(text = task.text, completed = task.completed));
    toggleEmptyState();
} */


function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((item, index) => {
        // Create task item
        const listItem = document.createElement("li");
        listItem.id = `task-${index}`;
        listItem.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${item.completed ? "checked" : ""
            }/>
        <span>${item.text}</span>
        <div class="task-buttons">
            <button class="edit-button" onClick="editTask(${index})"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-button"><i onClick="deleteTask(${index})" class="fa-solid fa-trash"></i></button>
        </div>
        `;

        const checkbox = listItem.querySelector(".task-checkbox");
        const editButton = listItem.querySelector(".edit-button");
        checkbox.addEventListener("change", () => {
            item.completed = checkbox.checked;

            // Disable/enable edit button
            editButton.disabled = item.completed;
            editButton.style.opacity = item.completed ? "0.5" : "1";
            editButton.style.pointerEvents = item.completed ? "none" : "auto";

            listItem.classList.toggle("completed", item.completed);
            saveTasksToLocalStorage();
        });

        taskList.appendChild(listItem);
    });
}

function updateState() {
    saveTasksToLocalStorage();
    displayTasks();
    toggleEmptyState();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateState();
}

function deleteAllTasks() {
    tasks = [];
    updateState();
}

function editTask(index) {
    const taskItem = document.getElementById(`task-${index}`);
    const currentText = tasks[index].text;
    const inputElement = document.createElement("input");

    inputElement.className = "edit-task-input";
    inputElement.value = currentText;
    taskItem.replaceWith(inputElement);
    inputElement.focus();

    const updateTaskText = () => {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            tasks[index].text = updatedText;
            saveTasksToLocalStorage();
        }
        displayTasks();
    };

    // Listen when inputElement lose focus
    inputElement.addEventListener("blur", updateTaskText);

    inputElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            updateTaskText();
        }
    });
}

function addTask(event, completed = false) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    if (!taskText) {
        return;
    }

    tasks.push({ text: taskText, completed });
    taskInput.value = "";

    updateState();
}
