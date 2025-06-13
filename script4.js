let tasks = [];
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleComplete(index);
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    taskDetails.innerHTML = `
      <span>${task.text}</span><br/>
      <div class="task-meta">
        ${task.datetime ? new Date(task.datetime).toLocaleString() : ''} | ${task.category || ''}
      </div>
    `;
    const actions = document.createElement('div');
    actions.className = 'task-actions';
    actions.innerHTML = `
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskDetails);
    taskItem.appendChild(actions);
    taskList.appendChild(taskItem);
  });
}
function addTask() {
  const text = document.getElementById('taskText').value.trim();
  const datetime = document.getElementById('taskDateTime').value;
  const category = document.getElementById('taskCategory').value.trim();
  if (text === '') {
    alert('Task description cannot be empty!');
    return;
  }
  tasks.push({
    text,
    datetime,
    category,
    completed: false
  });
clearInputs();
  renderTasks();
}
function clearInputs() {
  document.getElementById('taskText').value = '';
  document.getElementById('taskDateTime').value = '';
  document.getElementById('taskCategory').value = '';
}
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}
function editTask(index) {
  const task = tasks[index];
  const newText = prompt('Edit task description:', task.text);
  if (newText !== null) {
    const newDatetime = prompt('Edit date/time (YYYY-MM-DDTHH:MM):', task.datetime);
    const newCategory = prompt('Edit category:', task.category);
    tasks[index] = {
      text: newText,
      datetime: newDatetime,
      category: newCategory,
      completed: task.completed
    };
    renderTasks();
  }
}
function deleteTask(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}
renderTasks();
