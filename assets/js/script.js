// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
 
  let randomNum = Math.floor(Math.random()*1000000000)+1;

 return randomNum;
}

// Todo: create a function to create a task card
function createTaskCard(task) {


      let taskCard = $('<div></div>');
      taskCard.addClass('tCard ui-widget-content');
      taskCard.attr('id','chicken');
      let taskTitle = $('<h3></h3>');
      taskTitle.text(task[i].title);
      let taskDate = $('<date></date>');
      taskDate.text(task[i].date);
      let taskDescription = $('<p></p>');
      taskDescription.text(task[i].description);
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


//load existing cards to page
let renderList = JSON.parse(localStorage.getItem("tasks"));
if(renderList !== null){
  for(i = 0; i < renderList.length; i++){

    $('.tCard').css('z-index',100);
    $('.tCard').draggable();
      createTaskCard(renderList);
  }
}

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  console.log('here');

  event.preventDefault();

    let taskArray =[];

    let taskDetail = {};
    taskDetail.title = $('#task-title').val();
    taskDetail.date = $('#datepicker').val();
    taskDetail.description = $('#exampleFormControlTextarea1').val();
    taskDetail.taskID = generateTaskId();

      if(taskList !== null){
        taskList.push(taskDetail);
        localStorage.setItem('tasks', JSON.stringify(taskList));
      }else{
        taskArray.push(taskDetail);
        localStorage.setItem('tasks', JSON.stringify(taskArray));
      }
       
        window.location.href='index.html';
        console.log(taskDetail);

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

      //click on submit button on modal to add a task
      $('#add-task').click(function(event){
        event.preventDefault();
        //function collects data from modal input fields
       let answer = handleAddTask(event);
       //function takes data from modal inputs and creates a task card
        createTaskCard(answer);
      });
      //listen for click on parent todo-cards to delete the child task card
      $('#todo-cards').on('click', '#nuke', function(event){
         handleDeleteTask(event);
      });

//revert
renderTaskList();

$( function() {
  $( "#todo-cards #in-progress-cards #done-cards" ).css('z-index',1);
  $( "#todo-cards #in-progress-cards #done-cards" ).droppable({
    accept: ".tCard",
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover"
    },
    drop: function( event, ui ) {
      $( this )
        .addClass( "ui-state-highlight ui-widget-header" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });
} );

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', function(){
    localStorage.clear();
    console.log('Cleared Local Storage');
    alert('local storage clear');
});



});

