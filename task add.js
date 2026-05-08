function loadTasks(){
    const list = document.getElementById("list");
    list.innerHTML = "";

    const email = localStorage.getItem("userEmail");
    let tasks = JSON.parse(localStorage.getItem(email+"_tasks")) || [];

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.innerText = task;
        taskSpan.style.cursor = "pointer";
        taskSpan.onclick = function(){
            openTask(index);
        };

        const del = document.createElement("span");
        del.innerText = "Delete";
        del.className = "delete";
        del.onclick = function(){
            deleteTask(index);
        };

        li.appendChild(taskSpan);
        li.appendChild(del);

        list.appendChild(li);
    });
}

/* HISTORY */

function saveHistory(task){
    let user = localStorage.getItem("userEmail");
    if(!user) return;

    let historyKey = "taskHistory_" + user;

    let history = JSON.parse(localStorage.getItem(historyKey)) || [];

    history.push({
        task: task,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(historyKey, JSON.stringify(history));
}


/* PIE CHART */
function drawPieChart(done, pending){
    let canvas = document.getElementById("pieChart");
    let ctx = canvas.getContext("2d");

    let total = done + pending;
    if(total == 0) return;

    let doneAngle = (done / total) * 2 * Math.PI;

    ctx.clearRect(0,0,250,250);

    ctx.beginPath();
    ctx.moveTo(125,125);
    ctx.arc(125,125,100,0,doneAngle);
    ctx.fillStyle="#4caf50";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(125,125);
    ctx.arc(125,125,100,doneAngle,2*Math.PI);
    ctx.fillStyle="#f44336";
    ctx.fill();
}

/* ANALYTICS */
function updateAnalytics(){
    let steps = JSON.parse(localStorage.getItem(stepsKey)) || [];
    let done = steps.filter(s=>s.done).length;
    let pending = steps.length - done;
    
    analytics.innerHTML = `
    <span style="color:#4caf50">Completed: ${done}</span><br>
    <span style="color:#f44336">Pending: ${pending}</span><br>
    Total Steps: ${steps.length}
    `;

    drawPieChart(done, pending);
}

/* WEEKLY */
function weeklyAnalytics(){
    let history = JSON.parse(localStorage.getItem("taskHistory")) || [];
    let last7 = history.slice(-7);

    let txt = "Last 7 Completed Tasks:<br>";
    last7.forEach(h=>{
        txt += "✔ " + h.task + "<br>";
    });

    weekly.innerHTML = txt;
}

/* PROFILE */
function loadProfile(){
    let name = localStorage.getItem("profile_name") || "Guest User";
    let email = localStorage.getItem("userEmail") || "Not Logged";
    profileBox.innerHTML = `👤 ${name}<br>📧 ${email}`;
}

function editProfile(){
    let name = prompt("Enter your name", localStorage.getItem("profile_name")||"");
    if(name){
        localStorage.setItem("profile_name", name);
        loadProfile();
    }
}

/* ADMIN */
function openAdmin(){
    let pass = prompt("Enter Admin Password");
    if(pass==="admin123"){
        window.location.href="admin.html";
    }else{
        alert("Wrong password");
    }
}

/* FINGERPRINT */
async function fingerLogin(){
  if(!window.PublicKeyCredential){
    alert("Fingerprint not supported");
    return;
  }
  alert("Fingerprint Verified ✅");
  window.location.href="todo.html";
}

/* OTP */
let mobileOTP="";

function sendOTP(){
  let m=document.getElementById("mobile").value;
  if(m.length!=10){
    alert("Enter valid mobile");
    return;
  }
  mobileOTP = Math.floor(1000+Math.random()*9000);
  alert("OTP: "+mobileOTP);
}

function verifyOTP(){
  let o=document.getElementById("otp").value;
  if(o==mobileOTP){
    alert("Mobile verified ✅");
    window.location.href="todo.html";
  }else{
    alert("Wrong OTP");
  }
}

/* AUTO CALL */
loadTasks();
updateAnalytics();
weeklyAnalytics();
loadProfile();
if(done == steps.length){
   let c = document.getElementById("pieChart");
   if(c) c.style.display = "none";
}
