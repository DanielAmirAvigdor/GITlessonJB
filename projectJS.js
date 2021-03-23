
function LoadTask(i){          // gets an attribute (i) as a cell in the array and loads it to the HTML page
    const tasks_Arr = TasksLocalToJS();
    const tasks_ArrR = tasks_Arr.reverse();
    const singleNoteContainer =document.createElement('div');
    singleNoteContainer.className = "single_Note";

    const task_id = document.createElement("id");
    task_id.innerHTML = `<button harf=# onclick="EraseTask('${i}') ,location.reload() " class="glyphicon glyphicon-remove" ></button>`;
    singleNoteContainer.appendChild(task_id);

    const text = document.createElement('div');
    text.className = "text";
    text.innerHTML = tasks_ArrR[i].details;
    singleNoteContainer.appendChild(text);

    const date = document.createElement('div');
    date.className = "date";
    date.innerHTML = tasks_ArrR[i].date;
    singleNoteContainer.appendChild(date);

    const time = document.createElement('div');
    time.className = "time";
    time.innerHTML = tasks_ArrR[i].time;
    singleNoteContainer.appendChild(time);
    singleNoteContainer.classList.add("fade-in"); 
    

    if(tasks_ArrR[i].valid_Date==false){
        singleNoteContainer.classList.add("single_Note_Gray"); 
    }
    

    return singleNoteContainer;
}



function LoadTasks(){       // uses "LoadTask()" to load every task in the array to the HTML page
    const tasks_Arr = TasksLocalToJS();
    const tasks_ArrR = tasks_Arr.reverse();
    const allNotesContainer = document.getElementById("container");

    for(let i=0; i<tasks_ArrR.length; i++){
        
        const singleNoteContainer= LoadTask(i);
        allNotesContainer.appendChild(singleNoteContainer);
        
    }
}



function SetTask(){               // sets a new task in the array with the information given from the user (in the "new task" form)
    const task_Details_Obj = document.getElementById("task_details");
    const task_Date_Obj = document.getElementById("task_date");
    const task_Time_Obj = document.getElementById("task_time");

    let single_Task_Obj = {
         details: task_Details_Obj.value,
         date: task_Date_Obj.value,
         time: task_Time_Obj.value,
         valid_Date: true
    };

    const tasksArray = TasksLocalToJS();
    tasksArray.push(single_Task_Obj);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    
}



function TasksLocalToJS(){    // parsing string from local storage into a JS array
    if("tasks" in localStorage){
        const tasksLocal=localStorage.getItem("tasks");
        const tasksArray=JSON.parse(tasksLocal);
        return tasksArray;
    }
    else{
        return [];
    }
}



function TasksJSToJSON(tasksArray){     // gets a JS array and saving into the local storage
    localStorage.setItem("tasks", JSON.stringify(tasksArray)); 
}



function EraseTask(i){
     const tasksArray = TasksLocalToJS();
     const tasksArrR = tasksArray.reverse();
     tasksArrR.splice(i, 1);
     TasksJSToJSON(tasksArrR.reverse());

 }   




function formatDate() {       // formats the current date from object to string
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}




function formatTime() {     // formats the current time from object to string
    var d = new Date(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes();
       
    if (hours.length < 2) 
        hours = '0' + hours;
    if (minutes.length < 2) 
        minutes = '0' + minutes;

    return [hours, minutes].join(':');
}




function CheckDate(){   // checks the date of the tasks 
    const tasksArray = TasksLocalToJS();
    const currentTimeString = formatTime();
    const currentDateString = formatDate();

    for(let task in tasksArray){
        
         if ((tasksArray[task].date)<currentDateString){
            tasksArray[task].valid_Date = false;
        }
        if((tasksArray[task].date==currentDateString)&&(tasksArray[task].time<currentTimeString)){
            tasksArray[task].valid_Date = false;
        }

    }
    TasksJSToJSON(tasksArray);
}




