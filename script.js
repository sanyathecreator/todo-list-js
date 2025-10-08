// Initialize the task list application
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");
    const emptyImage = document.querySelector(".empty-image");
    const tasksContainer = document.querySelector(".tasks-container");

    // Change the view when task list is empty or not
    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
        tasksContainer.style.width = taskList.children.length === 0 ? "50%" : "100%";
    }

    const addTask = (text, completed = false) => {
        // If text is provided (for editing), use it; otherwise, use input value
        const taskText = text || taskInput.value.trim();
        if (!taskText) {
            return;
        }

        // Create task item
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${completed ? "checked" : ""}/>
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-button"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        
        const checkbox = listItem.querySelector(".task-checkbox");
        const editButton = listItem.querySelector(".edit-button");

        // Disable edit button if task is completed
        if (completed) {
            listItem.classList.add("completed");
            editButton.disabled = true;
            editButton.style.opacity = 0.5;
            editButton.style.pointerEvents = "none";
        }

        // Also disable edit button when checkbox is checked/unchecked
        checkbox.addEventListener("change", () => {
            const isChecked = checkbox.checked;
            listItem.classList.toggle("completed", isChecked);
            editButton.disabled = isChecked;
            editButton.style.opacity = isChecked ? "0.5" : "1";
            editButton.style.pointerEvents = isChecked ? "none" : "auto";
        });

        editButton.addEventListener("click", () => {
            if (!checkbox.checked) {
                taskInput.value = listItem.querySelector("span").textContent;
                listItem.remove();

            }
        });

        listItem.querySelector(".delete-button").addEventListener("click", () => {
            taskList.removeChild(listItem);
            toggleEmptyState();
        });

        taskList.appendChild(listItem);
        taskInput.value = "";
        toggleEmptyState();
    };

    addTaskButton.addEventListener("click", () => addTask);
    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
});