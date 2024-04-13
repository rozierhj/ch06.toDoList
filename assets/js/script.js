// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
//this will be how we store the data in local storage
function generateTaskId() {
 
  let randomNum = Math.floor(Math.random()*1000000000)+1;
  console.log(randomNum);

 return randomNum;
}

// Todo: create a function to create a task card
//this 

function createTaskCard(task) {

  let taskCard = $('<div></div>');
  taskCard.addClass('tCard');
  taskCard.attr('id','chicken');
  let taskTitle = $('<h3></h3>');
  taskTitle.text(task.title);
  let taskDate = $('<date></date>');
  taskDate.text(task.date);
  let taskDescription = $('<p></p>');
  taskDescription.text(task.description);
  let removeButton = $('<button></button>');
  removeButton.addClass('remove-button ui-button ui-widget ui-corner-all');
  removeButton.attr('id','nuke');
  removeButton.text('remove');

  taskCard.append(taskTitle);
  taskCard.append(taskDate);
  taskCard.append(taskDescription);
  taskCard.append(removeButton);

  $('#todo-cards').append(taskCard);

  $('.tCard').css({

    'position':'relative',
    'display':'flex',
    'flex-direction':'column',
    'align-items':'center',
    'justify-content':'center',
    'color': 'lightgrey',
    'background-color' : 'blue',
    'padding':'10px',
    'text-align':'center',
    'width':'100%',
    'height':'200px'
  });

  $('.remove-button').css({

    'color': 'lightgrey',
    'background-color' : 'red',
    'padding':'10px',
    'text-align':'center',
    'width':'100px',
    'height':'50px',
  });

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

    let taskDetail = {
      title: '',
      date: '',
      description: '',
      taskID: ''
      };

    taskDetail.title = 'New Title';
    taskDetail.date = new Date().toLocaleDateString('en-US');
    taskDetail.description = 'This is a task description';
    taskDetail.taskID = generateTaskId();

      return taskDetail;
}

// Todo: create a function to handle deleting a task
//function handleDeleteTask(event)
function handleDeleteTask(event){
    $('#chicken').remove();
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
//accept

      $('#add-task').click(function(event){
     
        event.preventDefault();
       let answer = handleAddTask();
        console.log(answer);
        createTaskCard(answer);
      });
      $('#todo-cards').on('click', '#nuke', function(event){
         handleDeleteTask(event);
      });

//revert


//sort
// $( function() {
//   $( "#draggable" ).draggable({ revert: "valid" });
//   $( "#draggable2" ).draggable({ revert: "invalid" });

//   $( "#todo-cards, #in-progress-cards, #done-cards" ).droppable({
//     classes: {
//       "ui-droppable-active": "ui-state-active",
//       "ui-droppable-hover": "ui-state-hover"
//     },
//     drop: function( event, ui ) {
//       $( this )
//         .addClass( "ui-state-highlight" )
//         .find( "p" )
//           .html( "Dropped!" );
//     }
//   });
// } );

});

