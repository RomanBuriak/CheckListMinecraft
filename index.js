const addTaskInput = document.querySelector(".addTaskInput");
const addTaskButton = document.querySelector("#addTaskButton");
const newData = document.querySelector(".newData");

let tasksArr;
let getTasks = JSON.parse(localStorage.getItem("tasks"));
getTasks ? (tasksArr = getTasks) : (tasksArr = []);

let todoItems = [];

function Tasks(item) {
  this.item = item;
  this.complete = false;
}

addTaskButton.addEventListener("click", () => {
  if (addTaskInput.value !== "") {
    tasksArr.push(new Tasks(addTaskInput.value));
    addTaskInput.value = "";
    update();
  }
});

const drawTask = (element, index) => {
  return `
        <div class="todo-item ${tasksArr[index].complete ? "checked" : ""}">
            <input class="todo-checkbox" type="checkbox" onclick="completeTask(this, ${index})" ${tasksArr[index].complete ? "checked" : ""} />
            <p class="todo-desc">${index} ${element.item}</p>
            <button class="todo-button" onclick="deleteTask(${index})"><img src="images/trash.png"></button>
        </div>
    `;
};

function fillTasks() {
  newData.innerHTML = "";
  if (tasksArr.length > 0) {
    tasksArr.forEach((element, index) => {
      newData.innerHTML += drawTask(element, index);
      todoItems.push(drawTask(element, index));
    });
  } else {
    newData.innerHTML = "No items";
  }
}

const updateStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
};

function update() {
  updateStorage();
  fillTasks();
}

function deleteTask(index) {
  tasksArr.splice(index, 1);
  update();
}

function completeTask(selectedTask, index) {
  let task = selectedTask.parentElement;
  if (selectedTask.checked) {
    task.classList.add("checked");
    tasksArr[index].complete = true;
  } else {
    task.classList.remove("checked");
    tasksArr[index].complete = false;
  }
}

fillTasks();

//tasksArr[index].complete = !tasksArr[index].complete;
//if (tasksArr[index].complete) {
//  todoItems[index].classList.add("checked");
//} else {
//  todoItems[index].classList.remove("checked");
//}
//update();
