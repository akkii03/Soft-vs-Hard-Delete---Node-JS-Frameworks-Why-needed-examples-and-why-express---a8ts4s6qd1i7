const express = require('express');
const Student = require('./models/Student');


const app = express();

// middleware 
app.use(express.json());

// Routes

// Get all the students
app.get('/students', async (req, res) => {
    // write your codes here
})

// Add student to database
app.post('/students', async (req, res) =>{
    // write your codes here
})

// Get specific student
app.get('/students/:id', async (req, res) =>{
    // write your codes here
})

// delete specific student
app.delete('/students/:id', async (req, res) =>{
    // write your codes here
}) 


module.exports = app;
