// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
//this will be how we store the data in local storage
function generateTaskId() {

}

// Todo: create a function to create a task card
//this 
//createTaskCard(task)
function createTaskCard() {

    let taskCard = $('<div></div>');
    taskCard.addClass('tCard');
    taskCard.text('Hello, World!');
    let removeButton = $('<button></button>');
    removeButton.addClass('remove-button');
    removeButton.text('remove');
    taskCard.append(removeButton);
    $('#todo-cards').append(taskCard);

    $('.tCard').css({

      'position':'relative',
      'color': 'lightgrey',
      'background-color' : 'blue',
      'padding':'10px',
      'text-align':'center',
      'width':'100%',
      'height':'200px'
    });

    $('.remove-button').css({

      'position':'absolute',
      'color': 'lightgrey',
      'background-color' : 'red',
      'padding':'10px',
      'text-align':'center',
      'width':'50px',
      'height':'50px'
    });

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
//update state

     

   

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
//were gathering data from the modal here
$(document).ready(function () {


    //modal date picker function
    $( function() {
        $( "#datepicker" ).datepicker();
      } );

      $(function(){

      })
//accept
      $('#add-task').click(function(){
        createTaskCard();
      });

//revert


//sort
$( function() {
  $( "#draggable" ).draggable({ revert: "valid" });
  $( "#draggable2" ).draggable({ revert: "invalid" });

  $( "#todo-cards, #in-progress-cards, #done-cards" ).droppable({
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover"
    },
    drop: function( event, ui ) {
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });
} );

});

