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


        

        // $( function() {
        //     $( "#draggable, #draggable-nonvalid" ).draggable();
        //     $( "#droppable" ).droppable({
        //       accept: "#draggable",
        //       classes: {
        //         "ui-droppable-active": "ui-state-active",
        //         "ui-droppable-hover": "ui-state-hover"
        //       },
        //       drop: function( event, ui ) {
        //         $( this )
        //           .addClass( "ui-state-highlight" )
        //           .find( "p" )
        //             .html( "Dropped!" );
        //       }

        //     })


   

        // });
        $( function() {
            $( "#draggable").draggable();
            // $( "#draggable" ).draggable({ revert: "valid" });
         
            $( "#droppable" ).css('postion','absolute').css('background-color','red').sortable().droppable({
              accept: "#draggable",
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
            // $('#droppable').css('postion','absolute');
            $("#draggable").css('position','relative').mouseup(function(){

            });
          } );

});

