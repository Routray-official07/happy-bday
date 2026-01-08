/* =========================
   PAGE NAVIGATION
========================= */
function showPage(pageId, btn) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

/* =========================
   DATE, TIME & GREETING
========================= */
function updateDateTime() {
    const now = new Date();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let hrs = now.getHours();
    const mins = now.getMinutes().toString().padStart(2, "0");
    const ampm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12 || 12;

    document.getElementById("datetime").innerText =
        `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} • ${hrs}:${mins} ${ampm}`;

    let greet = "";
    if (now.getHours() < 12) greet = "Good Morning ☀️";
    else if (now.getHours() < 17) greet = "Good Afternoon 🌤️";
    else if (now.getHours() < 22) greet = "Good Evening 🌙";
    else greet = "Good Night 🌙";

    document.getElementById("greeting").innerText = greet;
}
setInterval(updateDateTime, 1000);
updateDateTime();

/* =========================
   STUDY TIMER (SLOTS)
========================= */
let timerSeconds = 3600;
let timerInterval = null;
let currentSlot = 1;

const slots = {
    1: { name: "Slot 1", subject: "Math", time: 3600 },
    2: { name: "Slot 2", subject: "Physics / Chemistry", time: 4500 },
    3: { name: "Slot 3", subject: "English / Statistics / Alt English", time: 3600 }
};

function loadSlot(s) {
    currentSlot = s;
    timerSeconds = slots[s].time;
    document.getElementById("slotName").innerText = slots[s].name;
    document.getElementById("subjectName").innerText = slots[s].subject;
    updateTimer();
}

function updateTimer() {
    const m = Math.floor(timerSeconds / 60);
    const s = String(timerSeconds % 60).padStart(2, "0");
    document.getElementById("timer").innerText = `${m}:${s}`;
}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert(`${slots[currentSlot].name} completed!`);
            if (currentSlot < 3) loadSlot(currentSlot + 1);
            return;
        }
        timerSeconds--;
        updateTimer();
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = slots[currentSlot].time;
    updateTimer();
}

loadSlot(1);

/* =========================
   WEEKLY ROUTINE
========================= */
const routine = {
    Monday: ["Math", "Physics", "English"],
    Tuesday: ["Math", "Org. Chemistry", "Statistics"],
    Wednesday: ["Math", "Physics", "Alt English"],
    Thursday: ["Math", "Chemistry", "English"],
    Friday: ["Math", "Physics", "Statistics"],
    Saturday: ["Math", "Chemistry", "English"],
    Sunday: ["Math", "Light Revision", "Planning"]
};

const mini = document.getElementById("weekGridMini");
const full = document.getElementById("weekGrid");

for (const day in routine) {
    const card = document.createElement("div");
    card.className = "day-card";
    card.innerHTML = `<h3>${day}</h3><p>${routine[day].join(" • ")}</p>`;
    mini.appendChild(card.cloneNode(true));
    full.appendChild(card);
}

/* =========================
   DETAILED DAILY FORMAT
========================= */
document.getElementById("dailyFull").innerHTML = `
<div class="format-card">
<h2>🔹 DAY 1 & DAY 2 – LECTURES / THEORY (Monday & Tuesday)</h2>
<ul>
<li>Read <b>NCERT line by line</b> carefully</li>
<li>Watch or attend all lectures properly</li>
<li>Write <b>short notes</b> in your notebook</li>
<li>Mark <b>important formulas, laws & definitions</b></li>
<li>For derivations: understand each step clearly</li>
</ul>
<p><b>⏱️ Time:</b> 2–3 hours per subject</p>
</div>

<div class="format-card">
<h2>🔹 DAY 3 & DAY 4 – PROBLEMS / NUMERICAL PRACTICE (Wednesday & Thursday)</h2>
<ul>
<li>Solve all <b>NCERT examples</b></li>
<li>Solve <b>NCERT exercise questions</b></li>
<li>Practice school-level numericals</li>
<li>Mark difficult questions</li>
<li>Maintain a <b>mistake notebook</b></li>
</ul>
<p><b>⏱️ Time:</b> 3 hours</p>
</div>

<div class="format-card">
<h2>🔹 DAY 5 – REVISION + TEST (Friday)</h2>
<ul>
<li>Revise all formulas</li>
<li>Revise key concepts</li>
<li>Revise reactions / derivations</li>
<li>Take a short test (15–25 questions)</li>
<li>Analyze mistakes properly</li>
</ul>
<p><b>⏱️ Time:</b> 2–3 hours</p>
</div>

<div class="format-card">
<h2>🔹 DAY 6 – BUFFER / WEAK TOPICS (Saturday)</h2>
<ul>
<li>Revise weak areas</li>
<li>Rewatch tough lectures</li>
<li>Solve extra problems</li>
<li>Complete pending work</li>
</ul>
</div>

<div class="format-card">
<h2>🔹 DAY 7 – REST + LIGHT REVISION (Sunday)</h2>
<ul>
<li>Revise formulas (30–45 minutes)</li>
<li>No heavy study</li>
<li>Prepare plan for next chapter</li>
</ul>
</div>
`;

/* =========================
   TASK MANAGER
========================= */
function addTask() {
    const i = document.getElementById("taskInput");
    if (!i.value) return;
    const li = document.createElement("li");
    li.textContent = i.value;
    li.onclick = () => li.remove();
    document.getElementById("taskList").appendChild(li);
    i.value = "";
}

function addTaskFromDashboard() {
    const i = document.getElementById("taskInputDash");
    if (!i.value) return;
    const li = document.createElement("li");
    li.textContent = i.value;
    li.onclick = () => li.remove();
    document.getElementById("taskListDash").appendChild(li);
    i.value = "";

}

