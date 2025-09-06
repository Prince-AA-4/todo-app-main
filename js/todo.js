const body = document.body;
const todoInput = document.getElementById('create-todo');
const todoList = document.querySelector('#todo-list');
const filter = document.querySelectorAll('.filter-btn');
const themeToggle = document.querySelector('.toggle-btn');
const themeIcon = document.querySelector('.themeIcon');
const itemsLeft = document.querySelector('#todos-left')

let todos = [];

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && todoInput.value.trim()) {
    todos.push({
      id: Date.now(),
      text: todoInput.value.trim(),
      completed: false
    });
    todoInput.value = '';
    displayTodos();
  }
});


function displayTodos() {
  todoList.innerHTML = '';

  const filtered = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.setAttribute('draggable', true);
    li.style.listStyle ="none"
    li.style.lineHeight = "1.2rem"
    li.style.borderBottom = "1px solid #ccc"
    li.innerHTML = `
      <label>
        <input type="radio" ${todo.completed ? 'checked' : ''} data-id="${todo.id}" />
        <span>${todo.text}</span>
      </label>
      <button class="delete-btn" data-id="${todo.id}"><img src= "../images/icon-cross.svg" alt="cancel button" width = "10px"></button>
    `;
    todoList.appendChild(li);
  });

  itemsLeft.textContent = `${todos.filter(t => !t.completed).length} items left`;
}


todoList.addEventListener('click', (e) => {
  const id = Number(e.target.dataset.id);
  if (e.target.matches('input[type="radio"]')) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  } else if (e.target.matches('.delete-btn')) {
    todos = todos.filter(todo => todo.id !== id);
  }
  displayTodos();
});







let isDark = false;

themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark')

    const isDark = body.classList.contains('dark');

    // Change icon based on theme
    themeIcon.src = isDark ? 'images/icon-sun.svg' : 'images/icon-moon.svg';
    themeIcon.alt = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    
})











