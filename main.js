const byIdReverse = (a, b) => b.id - a.id;
const buttonComponent = (onclick, name) => `<button onclick="${onclick}"> ${name} </button>`;

function cardComponent(item) {
    return `<div class="card">` +
        buttonComponent(`deleteById(${item.id})`, "X") +
        buttonComponent(`editById(${item.id}, '${item.courseName}')`, item.courseName) +
        `</div>`;
}

function draw(data) { //RENDER
    //PUT LATEST DATA IN LOCAL STORAGE
    localStorage.cachedData = JSON.stringify(data);
    //sort and add all items to the card list
    cardList.innerHTML = data.sort(byIdReverse).map(cardComponent).join("");
}

function editById(id, name) {
    editItemId.value = id;
    editItemTitle.value = name;
}

function read() {
    fetch("http://localhost:8081/api/courses", { method: "GET" })
        .then(r => r.json())
        .then(draw);
}

// POST AKA CREATE
function create(title) {
    const item = {
        "courseName": title,
        //// "id": 17, //NOT REQUIRED FOR *NEW* ITEMS
        "dept": "CompSci",
        "courseNum": "401",
        "instructor": "Kevin Long",
        "startDate": "Dec 4",
        "numDays": 5
    }

    fetch("http://localhost:8081/api/courses", {
        method: "POST", // CREATE
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item)
    }).then(r => r.json()).then(read);
}

function updateById(id, courseName) {
    const item = { "courseName": courseName };//NO ID
    fetch("http://localhost:8081/api/courses/" + id, {
        method: "PUT", // UPDATE
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item)
    }).then(read);
}

function deleteById(id) {
    fetch("http://localhost:8081/api/courses/" + id, { method: "DELETE" }).then(read); 
}

document.addEventListener("DOMContentLoaded", e => {
    if (localStorage.cachedData == undefined) {
        read()//GET        
    } else {
        draw(JSON.parse(localStorage.cachedData))
    }

    saveEditButton.addEventListener("click", e => {
        if (editItemId.value == "") {
            create(editItemTitle.value)
        } else {
            updateById(editItemId.value, editItemTitle.value);
        }
    });

    newItemButton.addEventListener("click", e => {
        editItemId.value = "";
        editItemTitle.value = "";
    })

});//END LOADED