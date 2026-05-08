<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Todo List</title>

<style>
body{
font-family:Poppins;
background:linear-gradient(135deg,#43cea2,#185a9d);
display:flex;
justify-content:center;
align-items:center;
height:100vh;
margin:0;
}

.box{
background:white;
padding:25px;
width:380px;
border-radius:15px;
}

input,button{
width:100%;
padding:10px;
margin-top:10px;
border-radius:8px;
}

li{
background:#f2f2f2;
padding:8px;
margin-top:6px;
border-radius:6px;
display:flex;
justify-content:space-between;
}

.delete{color:red;cursor:pointer}
</style>
</head>

<body>

<div class="box">

<h2>My Tasks</h2>

<div id="welcome"></div>

<input id="task" placeholder="Enter task">
<button onclick="addTask()">Add Task</button>

<ul id="list"></ul>

<button onclick="logout()">Logout</button>

</div>

<script>

if(!localStorage.getItem("userEmail")){
window.location="index.html";
}

document.getElementById("welcome").innerText =
"Welcome "+localStorage.getItem("profile_name");

function getTasks(){
let email=localStorage.getItem("userEmail");
return JSON.parse(localStorage.getItem(email+"_tasks"))||[];
}

function saveTasks(tasks){
let email=localStorage.getItem("userEmail");
localStorage.setItem(email+"_tasks",JSON.stringify(tasks));
}

function addTask(){

let t=document.getElementById("task").value.trim();

if(t=="") return;

let tasks=getTasks();

tasks.push(t);

saveTasks(tasks);

document.getElementById("task").value="";

loadTasks();
}

function loadTasks(){

let list=document.getElementById("list");
list.innerHTML="";

let tasks=getTasks();

tasks.forEach((t,i)=>{

let li=document.createElement("li");

li.innerHTML=`
<span onclick="openTask('${t}')">${t}</span>
<span class="delete" onclick="deleteTask(${i})">Delete</span>
`;

list.appendChild(li);

});
}

function deleteTask(i){

let tasks=getTasks();

tasks.splice(i,1);

saveTasks(tasks);

loadTasks();
}

function openTask(task){

localStorage.setItem("openTask",task);

window.location="task.html";
}

function logout(){

localStorage.removeItem("userEmail");
localStorage.removeItem("profile_name");

window.location="index.html";
}

loadTasks();

</script>

</body>
</html>