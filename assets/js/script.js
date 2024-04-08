// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let suffix = taskList.length;
    taskId = 'task'+suffix;
    return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let $newDiv = $('<div></div>',{
        'class':'dataCard',
    }).css({
        'height':'50px',
        'width':'50px',
        'padding':'10px',
        'background-color':'red',
        'boreder':'5px solid black'
    });
    let $newTitle = $('<h2></h2>',{
        'class':'dataCard',
    }).css({
        'padding':'10px',
        'background-color':'white',
        'boreder':'5px solid black'
    });
    let $newDate = $('<p></p>',{
        'class':'dataCard',
    }).css({
        'padding':'10px',
        'background-color':'white',
        'boreder':'5px solid black'
    });
    let newText = $('<p></p>',{
        'class':'dataCard',
    }).css({
        'padding':'10px',
        'background-color':'white',
        'boreder':'5px solid black'
    });
    $('#todo-cards').append($newDiv);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#modal-button').on('click',function(event){
        createTaskCard(event);
        $('#formModal').dispose();
        let myModal = new bootstrap.Modal(document.getElementById('formModal'),function(){
            console.log(myModal),   
            myModal.dispose()
                
        });
    });
});

//for model date
$( function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
  } );

  $(document).ready(function() {
    $('.form-control').on('input', function() {

        document.querySelector('.spinner-border').style.animation = 'none';

    });
  });
  const textarea = document.getElementById('text-area');
  textarea.addEventListener('mousedown', function(event) {
    event.preventDefault();
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = 0;
    }, 1);
  });