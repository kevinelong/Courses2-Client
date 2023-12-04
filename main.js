
function read() {
    console.log("READ")
    // GET EXAMPLE
    fetch("http://localhost:8081/api/courses")
        .then(r => r.json())
        .then(data => {
            data.forEach(item => console.log(JSON.stringify(item, 0, 4)));
            console.log("END READ/GET")
        });
}

// POST AKA CREATE
function create() {
    console.log("CREATE")
    const item = {
        // "id": 17, //NOT REQUIRED FOR *NEW* ITEMS
        "dept": "CompSci",
        "courseNum": "401",
        "courseName": "INTRO TO AJAX API REST CRUD",
        "instructor": "Kevin Long",
        "startDate": "Dec 4",
        "numDays": 5
    }

    fetch("http://localhost:8081/api/courses", {
        method: "POST", // CREATE
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item)
    }).then(r => r.json()).then(
        item => {
            console.log(JSON.stringify(item, 0, 4), "CREATED")
            //immediately update
            updateById(item.id)
        }
    );
}

function updateById(id) {
    console.log("UPDATE id =", id)
    // PUT AKA UPDATE
    const item = {
        "instructor": "Kevin Ernest Long" //NO ID
    }

    fetch("http://localhost:8081/api/courses/" + id, {
        method: "PUT", // UPDATE
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(
            r => {
                console.log(r.status, "UPDATE")
                //then delete
                deleteById(id)
            }
        );
    //NOTE NO JSON RESPONSE IS ECHOED BY OUT IN THIS CASE
}

function deleteById(id) {
    console.log("DELETE id =", id)
    // DELETE AKA DELETE
    fetch("http://localhost:8081/api/courses/" + id, {
        method: "DELETE", // DELETE
    }).then(r => console.log(r.status, "DELETE", id)); //NOTE NO JSON RESPONSE IS ECHOED BY OUT IN THIS CASE
}

read() //before
create() //call others when don