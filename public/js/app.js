let createInput = document.querySelector("#create-list");
let btnList = document.querySelector("#add-list");
let allListDiv = document.querySelector(".all-lists");

//~ added this for fun
// every new list created will have a random background
const randBg = (tag) => {
    let options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    let bg = "#";
    // can put 3 or 6: 3 just looks better in color selection
    for (let index = 0; index < 3; index++) {
        // pick a random number
        let rand = Math.floor(Math.random() * options.length);
        // concatenate the equivalent item to bg from our options
        bg += options[rand]
    }
    // change the background
    tag.style.backgroundColor = bg;
}


//!!!!! ADDING A NEW LIST
const addList = () => {
    // remove any empty space
    createInput.value = createInput.value.trim();
    // only apply if there's no empty input
    if (createInput.value != "") {
        // create my tags that will form the new list
        let divParent = document.createElement("div");
        let divChild = document.createElement("div");

        // button for adding tasks later
        let btnAdd = document.createElement("button");
        // div to fix the UpDown problem: tasks went waay up
        let divTasks = document.createElement("div")

        // div for the select button
        let divSelect = document.createElement("div");

        // button for delete the list
        let btnDelete = document.createElement("button");
        let h2 = document.createElement("h2");

        // add classes to my tags
        divParent.setAttribute(
            "class",
            "list-item rounded-3 text-center align-items-center ms-4 me-4 p-4"
        )

        randBg(divParent);

        h2.setAttribute("class", "bg-light fw-bold mb-4")
        btnAdd.setAttribute("class", "add-task btn btn-oussama mb-4 w-100");
        btnDelete.setAttribute("class", "deleteList")
        divChild.setAttribute("class", "d-flex flex-column gap-2");
        divTasks.setAttribute("class", "zone taskHolder");

        //add text to the buttons and title
        h2.innerHTML = createInput.value.toUpperCase();
        btnAdd.innerHTML = "Add a task";
        btnDelete.innerHTML = "X";

        // the div will hold the select button and it's option
        divSelect.innerHTML += `
            <select class="rounded-pill text-center px-3 border-0">
                <option class="all">All</option>
                <option class="validated">Done</option>
                <option class="unValidated">Not done</option>
            </select>
        `

        //append everything to the column
        allListDiv.append(divParent);

        divChild.append(divSelect, btnAdd, divTasks)
        divParent.append(btnDelete, h2, divChild);
        //reset the input value
        createInput.value = "";
    }
}

//!!!! delete a list
const deleteList = (btn) => {
    // select the parent of the delete button and remove it 
    btn.parentElement.remove();
}

// call for the addList function using the button click or pressing Enter
createInput.addEventListener("keypress", (e) => {
    if (e.code == "Enter") {
        addList();
    }
})


//!!!!! THE SELECT FUNCTIONS
// only showing the validated/done tasks
const val = (btn) => {
    // select the div that will hold all the tasks
    let children = btn.parentElement.parentElement.nextElementSibling.nextElementSibling.children;
    // loop through them one by one (forEach sucks)
    for (let index = 0; index < children.length; index++) {
        let element = children[index];
        // if the element does not have "finished" in it's className
        if (!element.className.includes("finished")) {
            // hide it
            element.classList.add("hide");
        } else {
            // make sure if it has "finished" to not have "hide" also
            element.classList.remove("hide");
        }
    }
}

// Almost the same as above. Hide the tasks that have "finished" in their className 
const unVal = (btn) => {
    let children = btn.parentElement.parentElement.nextElementSibling.nextElementSibling.children;
    for (let index = 0; index < children.length; index++) {
        let element = children[index];
        if (element.className.includes("finished")) {
            element.classList.add("hide");
        } else {
            element.classList.remove("hide");
        }
    }
}

// Reset: remove the class "hide" from all elements
const all = (btn) => {
    let children = btn.parentElement.parentElement.nextElementSibling.nextElementSibling.children;
    for (let index = 0; index < children.length; index++) {
        let element = children[index];
        element.classList.remove("hide");
    }
}


//!!!! ADDING A TASK
const addTask = (btn) => {
    // ask for task name and verify it's not empty
    let taskInput = prompt("Add a task: ").trim();

    while (taskInput == "") {
        taskInput = prompt("Add a task: ").trim();
    }

    // create my div for the task
    let newDiv = document.createElement("div");
    // give the possibility of dragging

    newDiv.setAttribute("class", "draggable");
    newDiv.setAttribute("draggable", true);
    //* fix the double click and null issue
    newDiv.setAttribute('onmouseover', 'dragDrop(this)');

    // task items : 
    // paragraph with textContent as our inputted task name
    // buttons that contain icons that will allow us to modify our tasks
    newDiv.innerHTML += `
                        <p class="m-0">${taskInput}</p>

                        <div>
                            <button class="icon">
                                <i class="done fa-solid fa-check" style="color: #00b72e;"></i>
                            </button>

                            <button class="icon">
                                <i class="modify fa-solid fa-pen" style="color: #2700df;"></i>
                            </button>
                            
                            <button class="icon">
                                <i class="up fa-solid fa-arrow-up" style="color: #000000;"></i>
                            </button>

                            <button class="icon">
                                <i class="down fa-solid fa-arrow-down" style="color: #000000;"></i>
                            </button>

                            <button class="icon">
                                <i class="delete fa-solid fa-trash" style="color: #ff0000;"></i>
                            </button>
                        </div>
                    `
    // add our entire new div to the task list in the divTasks div
    btn.nextElementSibling.insertAdjacentElement("afterbegin", newDiv);
}

//!!!!! FUNCTION FOR THE ICONS
const done = (btn) => {
    // select the div that contains the task
    btn.parentElement.parentElement.parentElement.classList.toggle("finished");
}

const erase = (btn) => {
    // select the div that contains the task
    btn.parentElement.parentElement.parentElement.remove();
}

const modify = (btn) => {
    // select the text content we want to change
    let change = prompt("new task: ").trim();
    // verify if empty string
    while (change == "") {
        change = prompt("It's an empty string. Please write something: ");
    }
    btn.parentElement.parentElement.previousElementSibling.textContent = change;
}

const down = (btn) => {
    // Select the div that contains the task and everything
    let task = btn.parentElement.parentElement.parentElement;
    // check if there's an element after it or not
    if (task.nextElementSibling != null) {
        // put the div after the next element
        task.nextElementSibling.insertAdjacentElement("afterend", task);
    }
}

const up = (btn) => {
    // select the div that contains the task and everything
    let task = btn.parentElement.parentElement.parentElement;
    // check if there's an element before it or not
    if (task.previousElementSibling != null) {
        // put the div before the previous element
        task.previousElementSibling.insertAdjacentElement("beforebegin", task);
    }
}


//!!!! THE DRAG AND DROP 
////(I hate AND love this at the same time)
const dragDrop = (item) => {
    // update our drop zones
    let zones = document.querySelectorAll(".zone");
    // when dragging starts
    item.style.cursor = "grab"
    item.addEventListener("dragstart", () => {
        // make our item opaque
        item.classList.add("dragging");
    })

    // when done dragging an item
    item.addEventListener("dragend", () => {
        // return the opacity of our item
        item.classList.remove("dragging");
    })

    zones.forEach(thing => {
        // event listneder when our dragged item is over our zone
        thing.addEventListener("dragover", eve => {
            // prevent our mouse icon from looking like a stop sign
            eve.preventDefault();
            // only one item can have dragging class 
            let item = document.querySelector(".dragging");
            // we add that child to the div that we are currently "draging over"
            // it automatically goes to the last position
            thing.append(item)
        })
    })
}


//!!! Click Events
////(Life saver. Thank god I found this lol.)
// I wrote my classes so that the first one is the most important for this reason
document.onclick = function (event) {
    // select what i'm clicking on
    let target = event.target;
    console.log(target.className);
    // check the first class of our targeted element
    // if it has a certain class then call for the appropriate function
    switch (target.classList[0]) {
        //^^ Creating or Deleting a list
        case "add-list":
            addList();
            break;
        case "deleteList":
            deleteList(target);
            break;
        //^^ Creating or Deleting a task
        case "add-task":
            addTask(target);
            break;
        case "delete":
            erase(target);
            break;
        //^^ Modifying Tasks
        case "done":
            done(target);
            break;
        case "modify":
            modify(target);
            break;
        case "up":
            up(target);
            break;
        case "down":
            down(target);
            break;
        //^^ Selecting Tasks
        case "all":
            all(target);
            break;
        case "validated":
            val(target);
            break;
        case "unValidated":
            unVal(target);
            break;
    }
}