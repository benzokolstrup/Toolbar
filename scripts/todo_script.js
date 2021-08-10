// Selecting the UL / list container
const listsContainer = document.querySelector('[data-lists]');
// Selecting form and input and storing in constant variable
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-Count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.querySelector('#task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]');

// Local storage variables
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';

// Pass stuff from local storage into this array, if nothing is in local storage add an empty array
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

// Add event to list container that if we click on the ul and hit a li then set the variable selectiedListId equal to the list item that is clicked. Then save and render
listsContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'li'){
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
});

tasksContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'input'){
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        save();
        renderTaskCount(selectedList);
    }
})

clearCompleteTasksButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    saveAndRender();
});

// Delete list that is currently selected
deleteListButton.addEventListener('click', e =>{
    if(confirm('Are you sure you want to delete this to-do list?')){
        // Return all the lists that is not the same list id as we have already selected
        lists = lists.filter(list => list.id !== selectedListId);
        // Assign selectedListId to null because the selected list doesn't exists anymore
        selectedListId = null;
        saveAndRender();
    }else{
        
    }
    
});

// Add event to the form to be able to write and save new lists
newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value;
    // Checking if listName contains any information from the function
    if (listName == null || listName === ''){
        // if listname / input value is not a number or a string, stop here
        return;
    }
    const list = createList(listName);
    // After submitting clear the input
    newListInput.value = null;
    // Push the new list object to lists array
    lists.push(list);
    // Run save and render function
    saveAndRender();
});

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    // Checking if listName contains any information from the function
    if (taskName == null || taskName === ''){
        // if listname / input value is not a number or a string, stop here
        return;
    }
    const task = createTask(taskName);
    // After submitting clear the input
    newTaskInput.value = null;
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks.push(task);
    // Run save and render function
    saveAndRender();
});

function createTask(name){
   return { id: Date.now().toString(), name: name, complete: false };
}

// Function that will return a new object with unique id based on the time object was created, custom name depeding on the input value and an empty tasks array that we will feed tasks.
function createList(name){
   return { id: Date.now().toString(), name: name, tasks: [] };
}
// Function that calls save function and render function
function saveAndRender(){
    save();
    render();
}

// Save what ever is in the array lists to the local storage
function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render(){
    clearElement(listsContainer);
    renderLists();
    const selectedList = lists.find(list => list.id === selectedListId);
    // Check if we have a list selected and change the name of the title to selected list name, if we don't remove task container
    if(selectedListId == null){
        listDisplayContainer.style.display = 'none';
    }else{
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.name;
        renderTaskCount(selectedList);
        clearElement(tasksContainer);
        renderTasks(selectedList);
    }
}

function renderTasks(selectedList){
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);
        tasksContainer.appendChild(taskElement);
    });
}

function renderTaskCount(selectedList){
    // Getting the length of incomplete tasks
    const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length;
    // Shorthand if/else statement that checks if it should be plural or not
    const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks';
    listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

// This function create the whole list element, adds classes and content and places it
function renderLists(){
    lists.forEach(list => {
        // For every item in lists array create and element
        const listElement = document.createElement('li');
        // Add unique id to the list item so we can select it
        listElement.dataset.listId = list.id;
        // Add class to the element
        listElement.classList.add('list-name');
        // Add inner text to the element and place it inside the list container
        listElement.textContent = list.name;
        if(list.id === selectedListId){
            listElement.classList.add('active-list');
        }
        listsContainer.appendChild(listElement);
    });
}

// Function to clear list / Is called everytime we render
function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

render();