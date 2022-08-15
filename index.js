const express = require("express");
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const ObjectID = require('mongoose').Types.ObjectId;
const morgan = require('morgan');
const { truncate } = require("fs");

const AppError = require('./appError');
const Definition = require('./models/definitions');
const User = require('./models/users');
const { errorMonitor } = require("stream");
app.use('/styles', express.static(__dirname + '/styles'));
// Morgan is used to display requests & status to the console.
app.use(morgan('tiny'));

mongoose.connect('mongodb://localhost:27017/fairwork')
    .then(() => {
        console.log("Connection Open")
    })
    .catch(err => {
        console.log("Error")
        console.log(err)
    });

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("listening on port 3000")
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/definitions', async (req, res, next) => {
    try {
        const definitions = await Definition.find({})
        res.render('definitions', { definitions })
    } catch (e) {
        next(e);
    }

})

app.get('/definitions/:id', async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return next(new AppError(400, "Invalid ID Format"))
    }
    const found = await Definition.findById(id);
    if (!found) {
        return next(new AppError(404, "Definition Not Found"))
    }
    res.render('term', { found })
})

// Middleware to run if prior route wasn't followed
app.use((req, res, next) => {
    const err = new AppError(404, "Page Not Found")
    next(err);
})

app.use((err, req, res, next) => {
    console.log('***********ERROR**************');
    res.render('pagenotfound');
    next(err);
})

// Notes to self:
// "brew services list" -> "mongosh" -> "show dbs" -> "use fairwork"
// "brew services restart mongodb-community@6.0" -> "mongosh"
// db.[collection].find()
