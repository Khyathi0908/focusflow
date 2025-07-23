window.onload = () => {
    loadTasks();
    initDarkModeToggle();

    const savedTitle = localStorage.getItem("listTitle");
    if (savedTitle) {
        document.getElementById("listTitle").innerText = savedTitle;
    }
};

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button onclick="deleteTask(this)"><i class="fa-solid fa-trash"></i></button>
  `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function toggleComplete(span) {
    span.classList.toggle("completed");
    saveTasks();
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
      <span onclick="toggleComplete(this)" class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>
      <button onclick="deleteTask(this)"><i class="fa-solid fa-trash"></i></button>
    `;
        taskList.appendChild(li);
    });
}

function initDarkModeToggle() {
    const toggle = document.getElementById("darkModeToggle");
    const isDark = localStorage.getItem("darkMode") === "true";

    if (isDark) document.body.classList.add("dark");
    toggle.checked = isDark;

    toggle.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", toggle.checked);
    });
}

function deleteAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        document.getElementById("taskList").innerHTML = "";
        localStorage.removeItem("tasks");
    }
}

const listTitle = document.getElementById("listTitle");

listTitle.addEventListener("input", () => {
    localStorage.setItem("listTitle", listTitle.innerText);
});