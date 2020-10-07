require('dotenv').config()

const express = require("express");

const app = express();
const port = process.env.PORT;

let {students, instructors} = require('./data')

app.use((req, res, next) => {
    console.log("Hello im the middleware");
    next();
});

app.use(express.static(__dirname + "/public"));

const hbs = require('hbs')

hbs.registerPartials(__dirname + "/views/partials")

app.set('view engine', 'hbs');

// views only works with dynamic files 
app.set('views', __dirname + '/views' )


app.get("/", (req, res) => {
    res.render('landing.hbs' , { name: 'Manish', layout: false } )
});

app.get("/students", (req, res) => {
    students.sort((a, b) => {
        if (a.name > b.name) {
            return 1
        }
        else if (a.name < b.name) {
            return -1
        }
        else {
            return 0
        }
    })
    students = students.map((student) => {
        student.name = student.name.toUpperCase()
        return student
    })
    res.render('students.hbs' , {students})
});

app.get("/instructors", (req, res) => {
    res.render('instructors.hbs', {instructors})
});


app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);