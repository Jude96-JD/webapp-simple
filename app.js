// app.js
function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const tasks = getTasks();
  tasks.push(taskText);
  saveTasks(tasks);
  renderTasks();
  taskInput.value = '';
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  const tasks = getTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Add event listener only if running in browser
if (typeof window !== 'undefined') {
  document.getElementById('add-btn').addEventListener('click', addTask);
  // Initial render
  renderTasks();
}

// Export for testing
module.exports = {
  addTask,
  deleteTask,
  getTasks,
  saveTasks,
  renderTasks
};