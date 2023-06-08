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
        let button = document.createElement("button");
        let h2 = document.createElement("h2");

        // add classes to my tags
        divParent.setAttribute(
            "class",
            "zone list-item bg-danger rounded-3 align-items-center ms-4 me-4 p-4"
        )
        h2.setAttribute("class", "text-white mb-4")
        button.setAttribute("class", "add-task btn btn-oussama mb-4 w-100");
        divChild.setAttribute("class", "d-flex flex-column gap-2");

        //add text to the button and title
        h2.innerHTML = createInput.value;
        button.innerHTML = "Add a task";

        //append everything to the column
        allListDiv.append(divParent);
        divChild.append(button)
        divParent.append(h2, divChild);
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


// adding a task
const addTask = (btn) => {
    // ask for task name and verify it's not empty
    let taskInput = prompt("Add a task: ").trim();

    while(taskInput == ""){
        taskInput = prompt("Add a task: ").trim();
    }


    // create my div for the task
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "bg-light");
    // give the possibility of dragging
    newDiv.setAttribute("draggable", true);

    //todo FIX THE DRAGGABLE CLASS AND ATTRIBUTES FOR DRAGGING
    // task items : 
    // paragraph with textContent as our inputted task name
    // buttons that contain icons that will allow us to modify our tasks
    newDiv.innerHTML += `
                        <div class="draggable d-flex justify-content-between p-2">

                        <p class="m-0">${taskInput}</p>

                        <div>
                        <button class="icon"><i class="done fa-solid fa-check" style="color: #00b72e;"></i></button>

                        <button class="icon"><i class="modify fa-solid fa-pen" style="color: #2700df;"></i></button>

                        <button class="icon"><i class="down fa-solid fa-arrow-down" style="color: #000000;"></i></button>

                        <button class="icon"><i class="up fa-solid fa-arrow-up" style="color: #000000;"></i></button>

                        <button class="icon"><i class="delete fa-solid fa-trash" style="color: #ff0000;"></i></button>
                        </div>

                    </div>
                    `
    // add our entire new div to the task list
    btn.parentElement.insertAdjacentElement("afterend", newDiv);
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
    let task = btn.parentElement.parentElement.parentElement.parentElement;
    // check if there's an element after it or not
    if (task.nextElementSibling != null){
        // put the div after the next element
        task.nextElementSibling.insertAdjacentElement("afterend", task);
    }
}

const up = (btn) => {
    // select the div that contains the task and everything
    let task = btn.parentElement.parentElement.parentElement.parentElement;
    // check if there's an element before it or not
    if (task.previousElementSibling != null) {
        // put the div before the previous element
        task.previousElementSibling.insertAdjacentElement("beforebegin", task);
    }
}


// click events
document.onclick = function (event) {
    // select what i'm clicking on
    let target = event.target;
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
    }
}


