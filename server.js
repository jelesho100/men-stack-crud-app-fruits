const dotenv = require("dotenv"); //bringing the functionality of dotenv
dotenv.config(); //using dot env to bring the variables from the .env file . FIRST 2 LINES SHOULD BE 1ST 2 LINES IN THIS ORDER!

const express = require('express');
const mongoose = require("mongoose");

const app = express();
//

mongoose.connect(process.env.MONGODB_URI); //Connect to MongoDB using the connection string in the .env file

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//adding middleware for app
app.use(express.urlencoded({ extended: false }));



//import the fruit model
const Fruit = require('./models/fruit.js');
// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

//get/fruits/new
app.get("/fruits/new", (req, res) => {
    res.render('fruits/new.ejs');
});

//POST /fruits
// server.js

// POST /fruits
app.post("/fruits", async (req, res) => {
    if(req.body.isReadyToEat === 'on'){
        req.body.isReadyToEat = true;
    }else{
        req.body.isReadyToEat = false;
    }

    await Fruit.create(req.body); //this line is the database transaction
    res.redirect("/fruits/new");
});





























app.listen(3000, () => {
    console.log('Listening on port 3000');
});
