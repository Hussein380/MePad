class TodoList {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.querySelector('.js-todo-input');
        this.addButton = document.querySelector('.js-add-todo-btn');
        this.todoContainer = document.getElementById('todo');
        this.completedContainer = document.getElementById('completed');

        this.addButton.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        this.render();
    }

    addTodo() {
        const todoText = this.todoInput.value.trim();
        if (todoText) {
            const newTodo = {
                id: Date.now(),
                text: todoText,
                completed: false,
                createdAt: new Date().toISOString()
            };

            this.todos.push(newTodo);
            this.todoInput.value = '';
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    render() {
        this.todoContainer.innerHTML = '';
        this.completedContainer.innerHTML = '';

        this.todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="todo-content">${todo.text}</div>
                <div class="buttons">
                    <button class="complete js-complete-btn" data-id="${todo.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path class="fill" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                    </button>
                    <button class="remove js-delete-btn" data-id="${todo.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path class="fill" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                    </button>
                </div>
            `;

            const container = todo.completed ? this.completedContainer : this.todoContainer;
            container.appendChild(listItem);

            // Add event listeners to buttons
            listItem.querySelector('.js-complete-btn').addEventListener('click', () => {
                this.toggleTodo(todo.id);
            });

            listItem.querySelector('.js-delete-btn').addEventListener('click', () => {
                this.deleteTodo(todo.id);
            });
        });
    }
}

// Initialize the todo list when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TodoList();
});