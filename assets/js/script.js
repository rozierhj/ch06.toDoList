// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
//this will be how we store the data in local storage
function generateTaskId() {

}

// Todo: create a function to create a task card
//this be
function createTaskCard(task) {

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

    //make draggable and droppable

    $( function() {
        $( "#todo-cards, #in-progress-cards" ).sortable({
           connectWith:'.for-sort',
           receive: function(event, ui){
                let $child = $(ui.item);
                let $parent = $child.parent();
                if($parent.attr('id') === 'todo-cards'){
                    $child.css('background-color','red');
                }else{
                    $child.css('background-color','green');
                }
                console.log($parent.attr('id'));
            // ui.item.css('background-color','lightgreen');
           }  
        });
        ;
      } );     





});

