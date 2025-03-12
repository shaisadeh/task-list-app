// קבועים עבור שדה הקלט ואזור המשימות
const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector('.tasks');

// מאזין לאירוע Enter בשדה הקלט
taskInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        createTask();
    }
});

// אירוע לחיצה על כפתור "הוסף"
document.querySelector('#push').onclick = function() {
    createTask();
};

// פונקציה ליצירת משימה חדשה
function createTask() {
    // בדיקה אם שדה הקלט ריק
    if (taskInput.value.length == 0) {
        alert("The task field is blank. Enter a task name and try again.");
    } else {
        // יצירת מזהה ייחודי למשימה
        let taskId = 'task-' + Date.now();
        
        // הוספת HTML למשימה חדשה
        taskSection.innerHTML +=
        `<div class="task">
            <input onclick="updateTask(this)" type="checkbox" id="${taskId}">
            <label class="task-label" for="${taskId}">${taskInput.value}</label>
            <div class="delete">
                <i class="uil uil-trash"></i>
            </div>
        </div>`;
        
        // הוספת פונקציונליות מחיקה לכל כפתורי המחיקה
        var current_tasks = document.querySelectorAll(".delete");
        for (var i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function() {
                this.parentNode.remove();
            };
        }
        
        // בדיקה אם צריך להוסיף גלילה
        taskSection.offsetHeight >= 300
            ? taskSection.classList.add("overflow")
            : taskSection.classList.remove("overflow");
        
        // איפוס שדה הקלט
        taskInput.value = "";
    }
}

// פונקציה לעדכון סטטוס משימה (סימון כמושלם)
function updateTask(checkbox) {
    // מציאת תווית המשימה הצמודה לצ'קבוקס
    let taskLabel = checkbox.nextElementSibling;
    
    // הוספה או הסרה של מחלקת checked בהתאם למצב הצ'קבוקס
    if (checkbox.checked) {
        taskLabel.classList.add("checked");
    } else {
        taskLabel.classList.remove("checked");
    }
}
// הוסף את הקוד הזה לסוף ה-script.js שלך

// שמירת משימות ב-localStorage
function saveTasks() {
    const tasks = document.querySelectorAll('.task');
    const taskList = [];
    
    tasks.forEach(task => {
        const taskText = task.querySelector('.task-label').textContent;
        const isChecked = task.querySelector('input[type="checkbox"]').checked;
        taskList.push({ text: taskText, completed: isChecked });
    });
    
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

// טעינת משימות בעת טעינת הדף
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    savedTasks.forEach(taskData => {
        let taskId = 'task-' + Date.now() + Math.random().toString(36).substr(2, 5);
        
        taskSection.innerHTML +=
        `<div class="task">
            <input onclick="updateTask(this)" type="checkbox" id="${taskId}" ${taskData.completed ? 'checked' : ''}>
            <label class="task-label" for="${taskId}" ${taskData.completed ? 'class="checked"' : ''}>${taskData.text}</label>
            <div class="delete">
                <i class="uil uil-trash"></i>
            </div>
        </div>`;
    });
    
    // הוספת פונקציונליות מחיקה לכל כפתורי המחיקה
    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function() {
            this.parentNode.remove();
            saveTasks(); // שמירה אחרי מחיקה
        };
    }
}

// עדכון פונקציית createTask כדי לשמור משימות
function createTask() {
    // (הקוד הקיים)
    
    // הוסף בסוף הפונקציה:
    saveTasks();
}

// עדכון פונקציית updateTask כדי לשמור משימות אחרי סימון
function updateTask(checkbox) {
    // (הקוד הקיים)
    
    // הוסף בסוף הפונקציה:
    saveTasks();
}

// טען משימות בעת טעינת הדף
document.addEventListener('DOMContentLoaded', loadTasks);
