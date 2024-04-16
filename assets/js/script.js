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
taskCard.addClass('tCard ui-widget-content ui-state-default card text-center');
taskCard.attr('id', String(task[i].taskID));

let taskTitle = $('<div></div>');
taskTitle.addClass('card-header');
taskTitle.text(task[i].title);

let cardBody = $('<div></div>');
cardBody.addClass('card-body');

let taskDate = $('<date></date>');
taskDate.text(task[i].date);

let taskDescription = $('<p></p>');
taskDescription.addClass('card-text');
taskDescription.text(task[i].description);

let taskFooter = $('<div></div>');
taskFooter.addClass('card-footer text-muted');

let removeButton = $('<button></button>');
removeButton.addClass('remove-button ui-button ui-widget ui-corner-all btn btn-primary');
removeButton.attr('id','nuke');
removeButton.text('remove');


cardBody.append(taskDescription);
cardBody.append(taskDate);
cardBody.append(removeButton);

taskCard.append(taskTitle);
taskCard.append(cardBody);
taskCard.append(taskFooter);

      
      let parentID = '#'+ task[i].parent
      console.log('the parent - ',parentID);

      $(parentID).append(taskCard);

      console.log(task);
      cardStyle(task);

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

//load existing cards to page
let renderList = JSON.parse(localStorage.getItem("tasks"));

if(renderList !== null){

  for(i = 0; i < renderList.length; i++){

      createTaskCard(renderList);
      $('.tCard').css('z-index',100);
      cardStyle(renderList[i]);
     // $('.tCard').sortable();
  }
}

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  // console.log('here');

  event.preventDefault();

    let taskArray =[];
    let idArray = [];

    let taskDetail = {};
    taskDetail.title = $('#task-title').val();
    taskDetail.date = $('#datepicker').val();
    taskDetail.description = $('#exampleFormControlTextarea1').val();
    taskDetail.parent = 'todo-cards';
    taskDetail.taskID = generateTaskId();

    let matchTaskID = taskDetail.taskID;

      if(taskList !== null){
        taskList.push(taskDetail);
        nextId.push(matchTaskID);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        localStorage.setItem('nextId', JSON.stringify(nextId));
      }else{
        idArray.push(matchTaskID);
        taskArray.push(taskDetail);
        localStorage.setItem('tasks', JSON.stringify(taskArray));
        localStorage.setItem('nextId', JSON.stringify(idArray));
      }
       
        window.location.href='index.html';
        // console.log(taskDetail);

      return taskDetail;
}

// Todo: create a function to handle deleting a task
//function handleDeleteTask(event)
function handleDeleteTask(event,cardID){

    let taskIndex = 0;
    for(let i =0; i < taskList.length; i++){
      if(String(taskList[i].taskID) === String(cardID)){
        taskIndex = i;
        // console.log('we are in');
      }
    }
    taskList.splice(taskIndex,1);
    // localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(taskList));

    let nextidIndex = 0;
    for(let i =0; i < nextId.length; i++){
      if(String(nextId[i]) === String(cardID)){
        nextidIndex = i;
        // console.log('we are in');
      }
    }
    nextId.splice(nextidIndex,1);
    // localStorage.removeItem('nextId');
    localStorage.setItem('nextId', JSON.stringify(nextId));
   
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
//update state

let elementId = ui.item.parent().attr('id');
let card_id = ui.item.attr('id');
ui.item.parent = elementId;

 console.log(elementId);
let taskMoved = taskList.find(taskDetail => String(taskDetail.taskID) === card_id);

//turn cards colors

taskMoved.parent = elementId;
cardStyle(taskMoved);
localStorage.setItem('tasks', JSON.stringify(taskList));


}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
//were gathering data from the modal here
$(document).ready(function () {

  //set task cards o be on top of to do, in progress and done columns
  $( "#todo-cards, #in-progress-cards, #done-cards" ).css({'z-index':1,'height':'100%'});

    //modal date picker function
    $( function() {
        $( "#datepicker" ).datepicker({
          changeMonth: true,
          changeYear: true
        });
      } );

      //click event on the modal that creates the task and its card
      $('#add-task').click(function(event){
        event.preventDefault();
        //function collects data from modal input fields
       let answer = handleAddTask(event);
       //function takes data from modal inputs and creates a task card
        createTaskCard(answer);
      });

      //listen for click on parent todo-cards to delete the child task card
      $('.card-body').on('click', '#nuke', function(event){
         //handleDeleteTask(event);
         let card = $(this).parent().parent();
         let cardID = card.attr('id');
        //  console.log(cardID);
         handleDeleteTask(event,cardID);
         cardID = '#'+cardID;
         let message = cardID;
         $(cardID).remove();
         //console.log(cardID);
      });

      //clicking on the Add Task button to open up the modal
      $('.btn-success').click(function(event){
        modalCircle();
      });

      //event when user begins to enter data into the task description field of the modal
      $('#exampleFormControlTextarea1').on('input',function(){
        modalSpinner_Spin()
        //code to save space for the icon so that text does not go under it
          $(this).css('height','auto');
          let newHeight =$(this).prop('scrollHeight') - 3;
          $(this).css('height',newHeight+'px');
      });
      //user entering the title of the task in the modal
      $('#task-title').on('input',function(){
        modalSpinner_noSpin();
      });

//revert
renderTaskList();

//giving the to do, in progress and done columns the droppable attribute
$( function laneDrop() {
  $('#todo-cards').addClass('card-sort');
  $('#in-progress-cards').addClass('card-sort');
  $('#done-cards').addClass('card-sort');

  $( "#todo-cards #in-progress-cards #done-cards" ).css({'z-index':1,'height':'100%'});
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

//linking columns the cards are dropped into with the sortable feature
$( function laneSort() {
  $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable({
    connectWith: ".card-sort", 

    start: function(event, ui) {
      // Get the ID of the element being dragged
    },
    sort: function(event, ui) {
      // Optionally handle the drag event

    },
    change: function(event, ui){

    },
    stop: function(event, ui) {

      handleDrop(event, ui);

    }

  }).disableSelection();
});

//modal style
$( function modalStyle(){

  $('#form-title, #form-date ').css({
    'width':'80%',
    'margin-top':'20px',
    'margin-bottm':'5px',
    'margin-left':'5px',
    'margin-right':'5px',
    'height':'20px'
  });

  $(' #task-title,  #datepicker ').css({
    'width':'90%',
    'margin-left':'5px',
    'margin-right':'5px',
    'height':'40px'
  });

  $(' #task-description').css({
    'width':'100%',
    'margin-left':'5px',
    'margin-right':'5px',
  });
  $(' #bottom-row').css({
    'width':'100%',
  });
  $(' #exampleFormControlTextarea1').css({
    'width':'95%',
    'margin-left':'10px',
    'margin-right':'5px',
  });

});

} );

//styles for the task cards and controlls fot their styles based on their date and the column that they are in
function cardStyle(card){

  //set cards so that they lay on top of the to do, in progress and done columns
  $( "#todo-cards #in-progress-cards #done-cards" ).css({'z-index':1,'height':'100%'});

  // let column = card.parent;
  // let cardDate = card.date;

  //preparing date for card calculations
  let formatDate = dayjs(card.date).format('YYYY-MM-DD');

  //creating unique css selector combonations using element attributes and the unique numer-id of each card
  let headerFooter = '#'+String(card.taskID) + ' .card-header, ' + '#'+String(card.taskID) + ' .card-footer';
  let cardBody = '#'+String(card.taskID) + ' .card-body';
  let cardButton = '#'+String(card.taskID)+' .remove-button';

  //style for cards that are for late tasks and note completed
  if(dayjs().isAfter(dayjs(formatDate),'day') === true && card.parent !== 'done-cards' ){

    $(headerFooter).css({
      'background-color':'red',
      'color':'white'
    });

    $(cardBody).css({
      'background-color':'rgb(255,204,204)',
    });
    $(cardButton).css({
        'background-color':'red',
        'color':'white'
    });

  }
  //style for cards for task due today and not completed
  else if(dayjs().isSame(dayjs(formatDate),'day') === true && card.parent !== 'done-cards' ){

    $(headerFooter).css({
      'background-color':'yellow',
    });

    $(cardBody).css({
      'background-color':'rgb(255,255,153)',
    });
    $(cardButton).css({
      'background-color':'yellow',
  });


}
//reset cards to default styles when put into done column
else{
 
    $(headerFooter).attr('style','');
    $(cardBody).attr('style','');
    $(cardBody).css({
      'background-color':'white',
    });
    $(cardButton).attr('style','');

}

//card styles
$('.tCard').css({
    
  'margin':'15px'
  
});
$('.card-body').css({
  'position':'relative',
  'display':'flex',
  'flex-direction':'column',
  'justify-content':'center'
});
$('.card-header').css({
  'height':'40px',
  'font-weight':'bold',
  'font-size':'20px',

});
$('.card-header.bg-white').css({
  'height':'55px'
});

//style for the remove button on the card
$('.remove-button').css({

  'position':'relative',
  'left':'50%',
  'transform':'translate(-50%, -50%)',
  'top':'25px',
  // 'margin-top':'30px',
  'width':'100px'  
});
}
//an icon that is being placed in the modal task description input and has a spinner that is not spinning
function modalSpinner_noSpin(){

  let spinnyHouse = $('<span></span>');
  let spinnyDiv = $('<div></div>');
  let icon = $('<i></i>');
  icon.addClass('fas fa-wifi');
  spinnyDiv.addClass('spinner-border spinner-border-sm');
  $(spinnyDiv).attr('role','status');
  $(spinnyDiv).attr('id', 'spinny');
  let spinny = $('<span></span>');
  spinny.addClass('visually-hidden');
  $(spinnyDiv).css({
    'animation':'none',
  });

  spinnyHouse.addClass('badge rounded-pill bg-primary');
  //spinnyHouse.text('i am here');

  // $(spinny) = ('');
  // $(cloud) = ('');
  $('#taskText').css({
    'position':'relative',
  });
  $('#exampleFormControlTextarea1').css({
    'padding-bottom':'40px',
    'box-sizing':'border-box',
  });
  $(spinny).css({
    'right':'0',
    'margin-left':'5px',
  });
  $(icon).css({
    'margin-right':'5px',
  });
  $(spinnyHouse).css({
    'display':'flex',
    'align-items':'center',
    'justify-content':'right',
    'position':'absolute',
    'bottom':'5px',
    'right':'35px',
    'width':'55px',
    'height':'35px',
  });
  $('#mdl-crl').css({
    'display':'none',
  });
  $('#mdl-crl').remove();
  $(spinnyDiv).append(spinny);
  $(spinnyHouse).append(icon);
  $(spinnyHouse).append(spinnyDiv);
  $('#taskText').append(spinnyHouse);
}
//circle icon that is placed in the modal task description input field at the beginning
function modalCircle(){
  $('#taskText').css({
    'position':'relative',
  });
  let modalCrcl = $('<div></div>');
  modalCrcl.attr('id','mdl-crl');
  $(modalCrcl).css({
    'padding':'0',
    'display':'flex',
    'align-items':'center',
    'justify-content':'right',
    'position':'absolute',
    'bottom':'10px',
    'right':'30px',
    'width':'10px',
    'height':'10px',
    'background-color':'blue',
    'border-radius':'50%',
  });
  $('#taskText').append(modalCrcl);
}
//same icon placed inside the task description input field of the modal but its spinner is spinning
function modalSpinner_Spin(){

  let spinnyHouse = $('<span></span>');
  let spinnyDiv = $('<div></div>');
  let icon = $('<i></i>');
  icon.addClass('fas fa-wifi');
  spinnyDiv.addClass('spinner-border spinner-border-sm');
  $(spinnyDiv).attr('role','status');
  $(spinnyDiv).attr('id', 'spinny');
  let spinny = $('<span></span>');
  spinny.addClass('visually-hidden');
  spinnyHouse.addClass('badge rounded-pill bg-primary');
  //spinnyHouse.text('i am here');

  // $(spinny) = ('');
  // $(cloud) = ('');
  $('#taskText').css({
    'position':'relative',
  });
  $('#exampleFormControlTextarea1').css({
    'padding-bottom':'40px',
    'box-sizing':'border-box',
  });
  $(spinny).css({
    'right':'0',
    'margin-left':'5px',
  });
  $(icon).css({
    'margin-right':'5px',
  });
  $(spinnyHouse).css({
    'display':'flex',
    'align-items':'center',
    'justify-content':'right',
    'position':'absolute',
    'bottom':'5px',
    'right':'35px',
    'width':'55px',
    'height':'35px',
  });
  $('#mdl-crl').css({
    'display':'none',
  });
  $('#mdl-crl').remove();
  $(spinnyDiv).append(spinny);
  $(spinnyHouse).append(icon);
  $(spinnyHouse).append(spinnyDiv);
  $('#taskText').append(spinnyHouse);
}
