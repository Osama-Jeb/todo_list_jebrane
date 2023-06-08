let createInput = document.querySelector("#create-list");
let btnList = document.querySelector("#add-list");
let allListDiv = document.querySelector(".all-lists")

const addList = () => {
    // check if the input value is different than 0
    if (createInput.value != "") {
        //create tags for the column
        let divParent = document.createElement("div");
        let divChild = document.createElement("div");
        let button = document.createElement("button");
        let h2 = document.createElement("h2");
        //add class to tags
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

        //append to the column
        allListDiv.append(divParent);
        divChild.append(button)
        divParent.append(h2, divChild);
        //reset the input value
        createInput.value = "";
    }
}

btnList.addEventListener("click", addList);
createInput.addEventListener("keypress", (e) => {
    if (e.code == "Enter") {
        addList();
    }
})


const addTask = (btn) => {
    let taskInput = prompt("fuck: ");

    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "bg-light");
    newDiv.setAttribute("draggable", true);
    //todo add the up down done delete functions from other file
    //todo add THE MODIFY THINGY
    newDiv.innerHTML += `
                        <div class="draggable d-flex justify-content-between p-2">

                        <p class="m-0">${taskInput}</p>

                        <div>
                        <button class="icon"><i class="done fa-solid fa-check" style="color: #00b72e;"></i></button>

                        <button class="icon"><i class="modify fa-sharp fa-light fa-pen" style="color: #2222ff;"></i></button>

                        <button class="icon"><i class="down fa-solid fa-arrow-down" style="color: #000000;"></i></button>

                        <button class="icon"><i class="up fa-solid fa-arrow-up" style="color: #000000;"></i></button>

                        <button class="icon"><i class="delete fa-solid fa-trash" style="color: #ff0000;"></i></button>
                        </div>
                    </div>
                    `

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
}

const down = (btn) => {
    let task = btn.parentElement.parentElement.parentElement;
    if (task.nextElementSibling != null){
        task.nextElementSibling.insertAdjacentElement("afterend", task);
    }
}



document.onclick = function (event) {
    let target = event.target;
    console.log(target);
    let task = target.parentElement.parentElement.parentElement;
    console.log(task);
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
        case "down":
            down(target);
            break;
    }
}


// document.onclick = function (event) {
//     let target = event.target;
//     console.log(target);
// }


