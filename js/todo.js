const body = document.body;
const todoInput = document.getElementById('create-todo');
const todoList = document.querySelector('#todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.querySelector('.toggle-btn');
const themeIcon = document.querySelector('.themeIcon');
const itemsLeft = document.querySelector('#todos-left')
const clearCompleted = document.querySelector('#clear-completed')
const todoContainer = document.querySelector('#listings')


let todos = [];
let currentFilter = 'all';

// Add new todo
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

// Display todos based on filter
const displayTodos =()=> {
  todoList.innerHTML = '';

  const filtered = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    if (currentFilter === 'completed'){
      li.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <button class="delete-btn" data-id="${todo.id}">
          <img src="../images/icon-cross.svg" alt="delete" width="10px" />
        </button>
      `;
    }else{
      li.innerHTML = `
      <label class="custom-check">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}" />
        <span class="checkmark"></span>
        <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
      </label>
      <button class="delete-btn" data-id="${todo.id}">
        <img src="../images/icon-cross.svg" alt="delete" width="10px" />
      </button>
    `;
    }
    li.style.listStyle = "none"
    li.style.textIndent ="none"
    todoList.appendChild(li);
  });

  itemsLeft.textContent = `${todos.filter(t => !t.completed).length} items left`;
}

// Toggle complete or delete
todoList.addEventListener('click', (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.matches('input[type="checkbox"]')) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    displayTodos();

  } else if (e.target.matches('.delete-btn') || e.target.closest('.delete-btn')) {
    todos = todos.filter(todo => todo.id !== id);
  }

  displayTodos();
});

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    currentFilter = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    displayTodos();
  });
});

// Clear completed
clearCompleted.addEventListener('click', (e) => {
  e.preventDefault();
  todos = todos.filter(todo => !todo.completed);
  displayTodos();
});



let isDark = false;

themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark')
    todoInput.classList.toggle('dark')
    todoContainer.classList.toggle('dark')

    const isDark = body.classList.contains('dark');

    // Change icon based on theme
    themeIcon.src = isDark ? 'images/icon-sun.svg' : 'images/icon-moon.svg';
    themeIcon.alt = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    
})











