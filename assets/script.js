// DOM elements
var timeBlockContainerEl = $(".container")
var currentDayEl = $("#currentDay");

// date display
var date = moment().format('dddd, Do MMMM YYYY');
currentDayEl.text(date);


// dynamically create timeblocks

var Hour = parseInt(moment().format("HH"));
var timeBlocksArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];

for (var index = 0; index < timeBlocksArr.length; index++) {
    var time = timeBlocksArr[index];
    
    // create div element
    var timeBlock = $('<div>');
    timeBlock.addClass('row timeblock');
    timeBlock.attr("id", time);
    timeBlockContainerEl.append(timeBlock);

    // timeblock label
    var timeBlockLabel = $('<label>');
    timeBlockLabel.addClass("inputText col-1");
    timeBlockLabel.text(time + ":00");
    timeBlock.append(timeBlockLabel);

    // timeblock input
    var timeBlockContent = $("<textarea>");
    timeBlockContent.attr("rows", "1");
    timeBlockContent.addClass("form-control textarea col-10");
    timeBlockContent.attr("id", "input" + time);

    // colours for time in past, present and future
    if (time < Hour)
    {
        timeBlockContent.addClass("past");
    } else if (time === Hour) {
    
        timeBlockContent.addClass("present");
    } else { timeBlockContent.addClass("future"); }
    timeBlock.append(timeBlockContent);

    // make enter buttons
    var timeBlockButton = $("<button>");
    timeBlockButton.addClass("saveBtn col-1");
    timeBlockButton.attr("row", "2");

    // icon
    var buttonIcon = $("<i>");
    buttonIcon.addClass("fa fa-save");
    timeBlockButton.append(buttonIcon);
    timeBlock.append(timeBlockButton);
};

function start() {
    // draw local storage content
    for (let index = 0; index < timeBlocksArr.length; index++) {
        var time = timeBlocksArr[index];
        
        if (localStorage.getItem(time)) {
            var inputTextId = "input" + time;
            var inputTextArea = $("#" + inputTextId);
            inputTextArea.text(localStorage.getItem(time));
        }
    }
    timeBlockContainerEl.on('click', 'button', storeInput);
}


// store input to local storage
function storeInput(event) {
    
    if ($(event.target).parent().attr('id')) {
        var saveInputId = $(event.target).parent().attr('id');
        var saveTextArea = $(event.target).parent().children('textarea');
    } else {
        var saveInputId = $(event.target).parent().parent().attr('id');
        var saveTextArea = $(event.target).parent().parent().children('textarea');
    }
    
    saveInput = saveTextArea.val();
    localStorage.setItem(saveInputId, saveInput);
}


$(document).ready(start); 
