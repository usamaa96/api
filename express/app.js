const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require("path");


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const pathDir = path.dirname(process.mainModule.filename);

app.use(cors());

// ---------------------------------

app.get("/", (request, response, next) => {
    const p = path.join(pathDir, "data", "test.json");

    fs.readFile(p, (err, content) => {
        response.send(JSON.parse(content));
    });
});

app.get("/getAllStudents", (request, response, next) => {
    const p = path.join(pathDir, "data", "students.json");

    fs.readFile(p, (err, content) => {
        response.send(JSON.parse(content));
    });
});

app.get("/resetData", (request, response, next) => {
    const s = path.join(pathDir, "data", "students.json");
    const r = path.join(pathDir, "data", "reset.json");

    fs.readFile(r, (err, content) => {
        fs.writeFile(s, '', err => {
            console.log(err);
        });
        fs.writeFile(s, content, err => {
            console.log(err);
        })
    });
});

app.post("/updateStudent", (request, response, next) => {
    const p = path.join(pathDir, "data", "students.json");

    let id = request.body.id;

    fs.readFile(p, (err, content) => {
        let allStudents = JSON.parse(content);
        let getIndex = allStudents.findIndex(s => s.id == id);

        if(getIndex != -1){
            allStudents[getIndex] = {...request.body};

            fs.writeFile(p, JSON.stringify(allStudents), err => {
                console.log(err);
            })
        }
    })
});

app.post("/deleteStudent", (request, response, next) => {
    const p = path.join(pathDir, "data", "students.json");

    let id = request.body.id;

    fs.readFile(p, (err, content) => {
        let allStudents = JSON.parse(content);
        let getIndex = allStudents.findIndex(s => s.id == id);

        if(getIndex != -1){
            allStudents.splice(getIndex, 1);

            fs.writeFile(p, JSON.stringify(allStudents), err => {
                console.log(err);
            })
        }
    })
});

app.post("/postStudent", (request, response, next) => {
    const p = path.join(pathDir, "data", "students.json");
    let randomNumber = Math.random();

    fs.readFile(p, (err, content) => {
        let allStudents = JSON.parse(content);
        let currentStudent = request.body;
        currentStudent.id = randomNumber;

        allStudents.push(currentStudent);

        fs.writeFile(p, JSON.stringify(allStudents), err => {
            console.log(err);
        });

        next();
    });
});

// ----------------------------------

app.listen(3000);