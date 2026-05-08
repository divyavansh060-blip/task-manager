function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") {
        alert("Enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleDone(this)">${text}</span>
        <div class="actions">
            <span onclick="deleteTask(this)">Delet</span>
        </div>
    `;

    document.getElementById("taskList").appendChild(li);
    input.value = "";
}

function toggleDone(task) {
    task.parentElement.classList.toggle("done");
}

function deleteTask(icon) {
    icon.closest("li").remove();
}
window.location.href = "todo.html";
