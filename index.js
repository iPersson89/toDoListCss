const listItems = [];

const inputList = document.querySelector("#inputList");
const addBtn = document.querySelector("#addBtn");
const toDoList = document.querySelector("#toDoList");
const numberCompleted = document.querySelector("#numberCompleted");
const meddelande = document.querySelector(".felmeddelande");
let completedToDo = 0;


// Knapp som lägger till items i toDoList
addBtn.addEventListener("click", function(){
    if (inputList.value === "") {
        meddelande.textContent = "Input must not be empty";
        return;
    }

    meddelande.textContent = "";
    let itemObject = {
        text: inputList.value,
        completed: false
    };

    listItems.push(itemObject);

    let newListItem = document.createElement('li');
    newListItem.classList.add("toDo-item");

    const textSpan = document.createElement("span");
    textSpan.classList.add("todoText");
    textSpan.textContent = inputList.value;

    // Skapar soptunna och tabortfunktion
    const trash = document.createElement("span");
    trash.classList.add("trashBtn");
    trash.innerHTML = " &#128465;";

    // Tar bort items
    trash.addEventListener("click", function(event) {
        event.stopPropagation();
        const index = listItems.indexOf(itemObject);
        if (index !== -1) {
            listItems.splice(index, 1);
        }
        
        
        if (itemObject.completed){
            completedToDo--;
            numberCompleted.textContent = `${completedToDo} completed`;
        }
        newListItem.remove();
    });

    newListItem.appendChild(textSpan);
    newListItem.appendChild(trash);

    toDoList.appendChild(newListItem);
    inputList.value = "";
});

toDoList.addEventListener("click", function(event) {
    if (event.target.classList.contains("trashBtn")) return;

    const clickedElement = event.target.closest(".toDo-item");
    
    if (clickedElement) {
        const text = clickedElement.querySelector(".todoText").textContent;
        
        const item = listItems.find(i => text === i.text);
        
        if (item) {
           
            item.completed = !item.completed;

            
            if (item.completed) {
                clickedElement.classList.add("completed");
                completedToDo++;
            } else {
                clickedElement.classList.remove("completed");
                completedToDo--;
            }

            numberCompleted.textContent = `${completedToDo} completed`;
        }
    }
});