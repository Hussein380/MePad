const todoList = [{
    name: 'make dinner',
    dueDate: '2022-12-22'
}, {
    name: 'wash dishes',
    dueDate: '2022-12-22'
}
];

renderTodoList();

function renderTodoList(){

    let todoListHTML = '';

    todoList.forEach((todoObj, index) => {
        // const todoObj = todoList[i];
        //const name = todoObj.name;
        //const dueDate = todoObj.dueDate;

        const { name, dueDate } = todoObj;

        const html = `
        <div>${name}</div>
        <div> ${dueDate}</div>
        <button class="delete-todo-btn js-delete-todo-btn">Delete</button>`
        todoListHTML += html;

    })

    


    document.querySelector('.js-todo-list').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-todo-btn')
        .forEach( (deleteBtn, index) => {
            deleteBtn.addEventListener('click', () => {
                todoList.splice(index, 1);
                renderTodoList();
            });            
        });
}

document.querySelector('.js-add-todo-btn').addEventListener('click', () => {
    addTodo();
});

function addTodo(){
    const inputElem = document.querySelector('.js-input');
    const name = inputElem.value;

    const dateElem = document.querySelector('.js-due-date-input');
    const dueDate = dateElem.value;


    todoList.push({
        //name: name,
        //dueDate: dueDate
        name,
        dueDate
    });

    inputElem.value = ('');
    renderTodoList();
    
}
