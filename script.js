const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const subjectSelect = document.getElementById("subjectSelect");
const taskDate = document.getElementById("taskDate");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const allTasks = document.getElementById("allTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

function updateCount() {
    const tasks = taskList.querySelectorAll("li");
    const completed = taskList.querySelectorAll("li.completed");

    pendingCount.textContent = tasks.length - completed.length;
    completedCount.textContent = completed.length;
}

addTask.addEventListener("click", function () {

    const taskText = taskInput.value.trim();
    const subject = subjectSelect.value;
    const date = taskDate.value;

    if (taskText !== "" && subject !== "") {

        const li = document.createElement("li");
        const taskInfo = document.createElement("span");

        if (date !== "") {
            const formattedDate = date.split("-").reverse().join("/");

            taskInfo.textContent =
                subject + " - " + taskText + " - " + formattedDate;
        } else {
            taskInfo.textContent =
                subject + " - " + taskText;
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = "Concluir";

        completeButton.addEventListener("click", function () {
            li.classList.toggle("completed");
            updateCount();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", function () {
            li.remove();
            updateCount();
        });

        li.appendChild(taskInfo);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        taskInput.value = "";
        subjectSelect.value = "";
        taskDate.value = "";

        updateCount();
    }
});

allTasks.onclick = function () {

    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(function (task) {
        task.style.display = "flex";
    });
};

pendingTasks.onclick = function () {

    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(function (task) {

        if (task.classList.contains("completed")) {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }

    });
};

completedTasks.onclick = function () {

    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(function (task) {

        if (task.classList.contains("completed")) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }

    });
};