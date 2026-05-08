let todos = [];
const inputName = document.getElementById('input-new-todo-name');
const inputDescription = document.getElementById('input-new-todo-description');

let selectedPriority = 3;

// Criar tarefa apertando enter
inputName.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        newTask();
        inputName.focus();
    }
});

inputDescription.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        newTask();
        inputName.focus();
    }
});

// CRUD
function newTask()
{
    let Iname = document.getElementById('input-new-todo-name')
    let Idescription = document.getElementById('input-new-todo-description')
    Iname.style.border = ''

    // validação
    if(!Iname.value)
    {
        Iname.style.border = '1px solid red'
        alert('Type Todo name')
    }
    // else if()
    else
    {
        const todo = {
            name: Iname.value,
            description: Idescription.value,
            priority: selectedPriority
        };

        fetch("http://localhost:8080/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })
        .then(res => res.json())
        .then(data => {
            todos = data;
            preencherTabela(data);
        });
    }

    Iname.value = ''
    Idescription.value = ''
}

function listarTodos() {
    fetch("http://localhost:8080/todos")
        .then(res => res.json())
        .then(dados => {
            todos = dados;
            preencherTabela(dados);
        })
        .catch(err => console.log(err));
}

// Checkbox antiga
{/* <input class="checkbox" type="checkbox" ${todo.done ? 'checked' : ''} 
    onclick="toggleDone(${todo.id})"> */}
function preencherTabela(todos) {
    let list = document.getElementById('todo-list')
    list.innerHTML = ''
    todos.forEach(todo => {
        list.innerHTML += `
            <li class="${todo.done ? 'done' : ''}">
                <div class="todo-left">
                    <div class="checkbox ${todo.done ? 'checked' : ''}" onclick="toggleDone(${todo.id})" role="checkbox" aria-checked="${todo.done}" tabindex="0">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <polyline points="1,4 3.5,6.5 9,1" stroke="#F5F4F0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>

                    <div class="todo-text">
                        <span class="todo-title">
                            ${todo.name}
                        </span>

                        <div class="todo-meta">
                            <span class="priority-badge p${todo.priority}">
                                P${todo.priority}
                            </span>

                            <span class="todo-description">
                                ${todo.description || ''}
                            </span>
                        </div>
                    </div>
                </div>

                <button class="btn-delete" onclick="deleteTodo(${todo.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
            </li>
        `
    });
}

function toggleDone(id) {
    const todo = todos.find(t => t.id === id);

    todo.done = !todo.done;

    fetch("http://localhost:8080/todos", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    .then(res => res.json())
    .then(data => {
        todos = data;
        preencherTabela(data);
    });
}

function deleteTodo(id) {
    fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        todos = data;
        preencherTabela(data);
    });
}

// Menu de priority
function togglePriorityMenu() {
    const menu = document.getElementById('priority-menu');
    menu.classList.toggle('hidden');
}

function setPriority(value) {
    selectedPriority = value;

    document.getElementById('priority-btn').innerText = `P${value}`;

    document.getElementById('priority-menu').classList.add('hidden');
}

listarTodos()