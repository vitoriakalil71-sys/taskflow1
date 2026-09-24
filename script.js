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

let tasks = JSON.parse(localStorage.getItem("taskflowTasks")) || [];

function saveTasks() {
    localStorage.setItem("taskflowTasks", JSON.stringify(tasks));
}

function updateCount() {
    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    pendingCount.textContent = tasks.length - completed;
    completedCount.textContent = completed;
}

function createTaskElement(task, index) {

    const li = document.createElement("li");

    if (task.completed) {
        li.classList.add("completed");
    }

    const taskInfo = document.createElement("span");

    if (task.date !== "") {
        taskInfo.textContent =
            task.subject + " - " + task.text + " - " + task.date;
    } else {
        taskInfo.textContent =
            task.subject + " - " + task.text;
    }

    const completeButton = document.createElement("button");
    completeButton.textContent = "Concluir";

    completeButton.addEventListener("click", function () {

        tasks[index].completed = !tasks[index].completed;

        saveTasks();
        renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";

    deleteButton.addEventListener("click", function () {

        tasks.splice(index, 1);

        saveTasks();
        renderTasks();
    });


    li.appendChild(taskInfo);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        if (filter === "pending" && task.completed) {
            return;
        }

        if (filter === "completed" && !task.completed) {
            return;
        }

        createTaskElement(task, index);
    });

    updateCount();
}

addTask.addEventListener("click", function () {

    const taskText = taskInput.value.trim();
    const subject = subjectSelect.value;
    const date = taskDate.value;

    if (taskText !== "" && subject !== "") {

        let formattedDate = "";

        if (date !== "") {
            formattedDate = date.split("-").reverse().join("/");
        }

        const newTask = {
            text: taskText,
            subject: subject,
            date: formattedDate,
            completed: false
        };

        tasks.push(newTask);

        saveTasks();
        renderTasks();

        taskInput.value = "";
        subjectSelect.value = "";
        taskDate.value = "";
    }
});
allTasks.onclick = function () {
    renderTasks("all");
};

pendingTasks.onclick = function () {
    renderTasks("pending");
};

completedTasks.onclick = function () {
    renderTasks("completed");
};

renderTasks();
