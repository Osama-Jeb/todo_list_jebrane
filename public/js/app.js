let createInput = document.querySelector("#create-list");
let btnList = document.querySelector("#add-list");
let allListDiv = document.querySelector(".all-lists")

function addItem() {
    // check if the input value is different than 0
    if (createInput.value != "") {
        //create tags for the column
        let div = document.createElement("div");
        let button = document.createElement("button");
        let h1 = document.createElement("h1");
        //add class to tags
        div.setAttribute(
            "class",
            "bg-danger h-100 w-25  rounded-3 d-flex flex-column align-items-center ms-4 me-4 p-4 box-container"
        );
        button.setAttribute("class", "btn btn-oussama mb-4 add-task");
        h1.setAttribute("class", "text-white mb-4");

        //add text to the button and title
        h1.innerHTML = createInput.value;
        button.innerHTML = "Add a task";
        //appendChild to the column
        allListDiv.append(div);
        div.append(h1, button);
        //reset the input value
        createInput.value = "";
        //call the add task event listener function
    }
}

btnList.addEventListener("click", addItem);


