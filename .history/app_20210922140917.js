const config = require("./utils/config");
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const notesRouter = require('./controllers/notes');
const Note = require('./models/note');


app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("<h1>Hello world!</h1>")
});

app.get("/api/notes", notesRouter);


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    if (err.name === "CastError") {
        return res.status(400).send({ error: "malformed id" })
    } else if (err.name === "validationError") {
        return res.status(400).send({ error: err.message })

    }
    next(err)
}

app.use(errorHandler);



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});