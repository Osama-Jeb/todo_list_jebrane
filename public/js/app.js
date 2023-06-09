let createInput = document.querySelector("#create-list");
let btnList = document.querySelector("#add-list");
let allListDiv = document.querySelector(".all-lists")

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

        // button for delete the list
        let btnDelete = document.createElement("button");
        let h2 = document.createElement("h2");

        // add classes to my tags
        divParent.setAttribute(
            "class",
            "zone list-item bg-primary rounded-3 align-items-center ms-4 me-4 p-4"
        )

        h2.setAttribute("class", "text-white mb-4")
        btnAdd.setAttribute("class", "add-task btn btn-oussama mb-4 w-100");
        btnDelete.setAttribute("class", "deleteList")
        divChild.setAttribute("class", "d-flex flex-column gap-2");
        divTasks.setAttribute("class", "taskHolder");

        //add text to the buttons and title
        h2.innerHTML = createInput.value;
        btnAdd.innerHTML = "Add a task";
        btnDelete.innerHTML = "X"

        //append everything to the column
        allListDiv.append(divParent);

        divChild.append(btnAdd, divTasks)
        divParent.append(btnDelete, h2, divChild);
        //reset the input value
        createInput.value = "";
    }
}

// call for the addList function using the button click or pressing Enter
btnList.addEventListener("click", addList);
createInput.addEventListener("keypress", (e) => {
    if (e.code == "Enter") {
        addList();
    }
})

// delete the list
const deleteList = (btn) => {
    // select the parent of the delete button and remove it 
    btn.parentElement.remove();
}


// adding a task
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
    // task items : 
    // paragraph with textContent as our inputted task name
    // buttons that contain icons that will allow us to modify our tasks
    newDiv.innerHTML += `
                        <p class="m-0">${taskInput}</p>

                        <div>
                        <button class="icon"><i class="done fa-solid fa-check" style="color: #00b72e;"></i></button>

                        <button class="icon"><i class="modify fa-solid fa-pen" style="color: #2700df;"></i></button>

                        <button class="icon"><i class="down fa-solid fa-arrow-down" style="color: #000000;"></i></button>

                        <button class="icon"><i class="up fa-solid fa-arrow-up" style="color: #000000;"></i></button>

                        <button class="icon"><i class="delete fa-solid fa-trash" style="color: #ff0000;"></i></button>
                        </div>
                    `
    // add our entire new div to the task list in the divTasks div
    btn.nextElementSibling.insertAdjacentElement("afterbegin", newDiv);
}


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
    let change = prompt("new task: ");
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

const dragDrop = (item) => {
    // when dragging starts
    let zones = document.querySelectorAll(".zone");
    let draggables = document.querySelectorAll(".draggable");
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

// click events
document.onclick = function (event) {
    // select what i'm clicking on
    let target = event.target;
    console.log(target.classList[0]);
    // check the first class of our targeted element
    // if it has a certain class then call for the appropriate function
    switch (target.classList[0]) {
        case "add-task":
            addTask(target);
            break;
        case "done":
            done(target);
            break;
        case "delete":
            erase(target);
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
        case "deleteList":
            deleteList(target);
        case "draggable":
            dragDrop(target);
            break;
    }
}


