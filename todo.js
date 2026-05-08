// Show logged-in email
document.getElementById("userEmail").innerText =
    localStorage.getItem("userEmail") || "Guest";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(){
    const text = taskInput.value.trim();
    if(text==="") return;

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    saveTask(task);
    createTask(task);
    taskInput.value="";
}

function createTask(task){
    const li = document.createElement("li");
    if(task.completed) li.classList.add("completed");

    li.innerHTML = `
        <span onclick="toggleTask(${task.id})">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(li);
}

function toggleTask(id){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(t=>{
        if(t.id===id) t.completed = !t.completed;
        return t;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshUI();
}

function deleteTask(id){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t=>t.id!==id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshUI();
}

function saveTask(task){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task=>createTask(task));
}

function refreshUI(){
    taskList.innerHTML="";
    loadTasks();
}

function logout(){
    localStorage.removeItem("userEmail");
    window.location.href="index.html";
}
function login(){
    const name = nameInput.value = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
}
function login(){
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    document.getElementById("name").value

    const error = document.getElementById("error");

    if(!/^[A-Za-z ]{2,}$/.test(name)){
        error.innerText = "❌ Name must have at least 2 letters";
        return;
    }

    if(!/^[^@]+@[^@]+\.com$/.test(email)){
        error.innerText = "❌ Enter valid email (.com)";
        return;
    }

    if(pass.length < 6){
        error.innerText = "❌ Password min 6 characters";
        return;
    }

    // ✅ Login success → next page
    window.location.href = "todo.html";
}
function addTask(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push("Demo Task");
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function logout(){
 localStorage.clear();
 window.location.href="index.html";
}

window.addEventListener("beforeunload",()=>{
 let c = JSON.parse(localStorage.current || "null");
 if(c && c.role==="user"){
  let online = JSON.parse(localStorage.getItem("onlineUsers") || "[]");
  online = online.filter(e=>e!==c.email);
  localStorage.setItem("onlineUsers", JSON.stringify(online));
 }
});   taskText.addEventListener("input",()=>{
 if(taskUser.value){
  localStorage.setItem("typing_"+taskUser.value,"yes");
  setTimeout(()=>{
   localStorage.removeItem("typing_"+taskUser.value);
  },1500);
 }
});
let typingKey = "typing_"+c.email;

setInterval(()=>{
 if(localStorage.getItem(typingKey)){
  userNotify.innerHTML=`
   <div class="notify">
    ✍ Admin is assigning a task...
   </div>`;
 }else{
  userNotify.innerHTML="";
 }
},1000);
