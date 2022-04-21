/* declare variables */

const inputTask = document.getElementById('task');
const form = document.getElementById('form');
const todoContent = document.getElementById('lists_todo');
const deleteTask = document.getElementById('delete');
const clearAll = document.getElementById('clearAll');



let taskArray = []


form.onsubmit = function(e){
    
    e.preventDefault();
    addTodo(inputTask.value);
    console.log(taskArray)
    
}

function addTodo(item){

    //if the value is not empty
    if(!item) return
    const todo = {
        id: Date.now(),
        name: item,
        isCompleted: false
    }

    //add the todo object to the array of todos
    taskArray.push(todo)

    //add to local storage
    addToLocalStorage(taskArray)

    //set the text content to empty ''
    inputTask.value = '';
}

function renderTodos(arr){
    //clear the ul innerhtml
    todoContent.innerHTML = '';

    arr.forEach(function(item) {
        const checked = item.isCompleted ? 'checked': null;
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        // <li class="item" data-key="20200708"> </li>
        li.setAttribute('data-key', item.id);
        if (item.isCompleted === true) {
            li.style.textDecoration = `line-through`;
        }
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked} />
            ${item.name}
            <button class="delete-button">X</button>
            `;
        // finally add the <li> to the <ul>
        todoContent.append(li);
    });
}

// function to add todos to local storage
function addToLocalStorage(todos) {
    // conver the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));
    // render them to screen
    renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    // if reference exists
    if (reference) {
      // converts back to array and store it in todos array
      taskArray = JSON.parse(reference);
      renderTodos(taskArray);
    }
}

// initially get everything from localStorage
getFromLocalStorage();


// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoContent.addEventListener('click', function(event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
      // toggle the state
      toggle(event.target.parentElement.getAttribute('data-key'));
    }
  // check if that is a delete-button
    if (event.target.classList.contains('delete-button')) {
      // get id from data-key attribute's value of parent <li> where the delete-button is present
      deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

// toggle the value to completed and not completed
function toggle(id) {
    taskArray.forEach(function(item) {
      // use == not ===, because here types are different. One is number and other is string
      if (item.id == id) {
        // toggle the value
        item.isCompleted = !item.isCompleted;
      }
    });
  addToLocalStorage(taskArray);
}
// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
    // filters out the <li> with the id and updates the todos array
    taskArray = taskArray.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
    });
// update the localStorage
    addToLocalStorage(taskArray);
}

clearAll.onclick = function(){
    
    taskArray = []
    // update the localStorage
    addToLocalStorage(taskArray);
    todoContent.innerHTML = ''
}