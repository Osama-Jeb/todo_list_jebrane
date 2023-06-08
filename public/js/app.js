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
        let input = document.createElement("input");
        let h1 = document.createElement("h1");
        //add class to tags
        divParent.setAttribute(
            "class",
            "zone list-item bg-danger rounded-3 align-items-center ms-4 me-4 p-4"
        )

        h1.setAttribute("class", "text-white mb-4")
        button.setAttribute("class", "add-task btn btn-oussama mb-4 w-100");
        input.setAttribute("class", "taskInput");
        divChild.setAttribute("class", "d-flex flex-column gap-2");

        //add text to the button and title
        h1.innerHTML = createInput.value;
        button.innerHTML = "Add a task";

        //append to the column
        allListDiv.append(divParent);
        divChild.append(input, button)
        divParent.append(h1, divChild);
        //reset the input value
        createInput.value = "";
    }
}

btnList.addEventListener("click", addList);


const addTask = () => {
    
}




