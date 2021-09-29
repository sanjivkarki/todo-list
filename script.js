// Dom elements
const inputField = document.querySelector('.inputField input');
const unList = document.querySelector('.ul-list');
const addButton = document.querySelector('.inputField button');
const clearbutton = document.querySelector('.clear-button');
const pending =document.querySelector('footer span')


// Event Listeners
document.addEventListener('DOMContentLoaded' , getTodos);
addButton.addEventListener('click', new_list);
unList.addEventListener("click" , deleteList);
inputField.addEventListener("keypress" , enterKeyPress);
clearbutton.addEventListener("click" , clearall);



// Add new list item
function new_list() {
    console.log('Click');
    if(inputField.value === ""){
        addButton.value = "Disabled";
    }else {
        addButton.value = "Enabled";
        var newList = document.createElement('li');
        newList.classList.add("list-item");
       newList.innerHTML = `${inputField.value}`;
       unList.append(newList);
       var icon = document.createElement('i');
       icon.setAttribute("class", "fas fa-trash");
       newList.appendChild(icon);
       saveLocalTodos(inputField.value);
    }
    inputField.value = "";

}

function enterKeyPress(key){
    console.log("keypress");
    if(key.keyCode == '13'){
        new_list();
    }
}


// Delete list item .
function deleteList(e){
    const targetItem = e.target;
    const todo = targetItem.parentElement;

    if(targetItem.tagName == "I"){
        removeTodos(todo);
        targetItem.parentElement.remove();
    }

}

// Check todos list in localStorage
let todos;
function checksaveTodos(){
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}


// Save item to localstorage
function saveLocalTodos(todo){
    checksaveTodos();
    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos));
    pendingItem(todos);

}


// get LocalStorage list when page load
function getTodos() {
    checksaveTodos();
    todos.forEach(function(todo) {
            var newList = document.createElement('li');
             newList.classList.add("list-item");
            newList.innerHTML = `${todo}`;
            unList.append(newList);
            var icon = document.createElement('i');
            icon.setAttribute("class", "fas fa-trash");
            newList.appendChild(icon);
    })
    pendingItem(todos);
}


// Remove array list items from localStorage
function removeTodos(todo){
    checksaveTodos();
    const todoIndex = todos.indexOf(todo.innerText);
    console.log(todoIndex);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos",JSON.stringify(todos));
    pendingItem(todos);
}




// Remaining task to complete
function pendingItem(todos){
    pending.innerHTML = `Your have ${todos.length} remaining task`;
  }

// CLear all task.
function clearall() {
    let todos = "";
    pendingItem(todos);

     let newArr = [];
     unList.innerHTML = "";
   localStorage.setItem("todos", JSON.stringify(newArr));

}
