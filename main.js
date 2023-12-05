function draw(data) { //RENDER
    //PUT LATEST DATA IN LOCAL STORAGE
    localStorage.cachedData = JSON.stringify(data);

    cardList.innerHTML = ""; //clear
    data.forEach(item => {
        cardList.innerHTML += `
            <div class="card">
                <button onclick="deleteById(${item.id})"> X </button>
    
                <button onclick="editById(${item.id}, '${item.courseName}')">
                    ${item.courseName}
                </button>
            </div>
        `;
    })
}

function editById(id, name) {
    editItemId.value = id;
    editItemTitle.value = name;
}

function read() {
    console.log("READ")
    // GET EXAMPLE
    fetch("http://localhost:8081/api/courses")
        .then(r => r.json())
        .then(draw);
}

// POST AKA CREATE
function create(title) {
    console.log("CREATE")
    const item = {
        // "id": 17, //NOT REQUIRED FOR *NEW* ITEMS
        "dept": "CompSci",
        "courseNum": "401",
        "courseName": title,
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
    console.log("UPDATE id =", id)
    // PUT AKA UPDATE
    const item = {
        "courseName": courseName //NO ID
    }

    fetch("http://localhost:8081/api/courses/" + id, {
        method: "PUT", // UPDATE
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item)
    })
        .then(read);
    //NOTE NO JSON RESPONSE IS ECHOED BY OUT IN THIS CASE
}

function deleteById(id) {
    console.log("DELETE id =", id)
    // DELETE AKA DELETE
    fetch("http://localhost:8081/api/courses/" + id, {
        method: "DELETE", // DELETE
    }).then(read); //NOTE NO JSON RESPONSE IS ECHOED BY OUT IN THIS CASE
}

document.addEventListener("DOMContentLoaded", e => {
    if(localStorage.cachedData == undefined){
        read()//GET        
    }else{
        draw(JSON.parse(localStorage.cachedData))
    }

    saveButton.addEventListener("click", e => {
        create(newItemTitle.value);
    });

    saveEditButton.addEventListener("click", e => {
        updateById(editItemId.value, editItemTitle.value);
    });

});//END LOADED