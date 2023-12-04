
// GET EXAMPLE
fetch("http://localhost:8081/api/courses")
    .then(r => r.json())
    .then(data => {
        data.forEach(item => console.log(JSON.stringify(item, 0, 4)));
    });

// POST AKA CREATE
const item = {
    // "id": 17, //NOT REQUIRED FOR *NEW* ITEMS
    "dept": "CompSci",
    "courseNum": "401",
    "courseName": "INTRO TO AJAX API REST CRUD",
    "instructor": "Kevin Ernest Long",
    "startDate": "Dec 4",
    "numDays": 5
}

fetch("http://localhost:8081/api/courses", {
    method: "POST", // CREATE
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(item)
})
    .then(r => r.json())
    .then(item => console.log(JSON.stringify(item, 0, 4))
    );
    