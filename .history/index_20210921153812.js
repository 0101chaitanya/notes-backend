const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const Note = require('./models/note');


app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("<h1>Hello world!</h1>")
});
app.get("/api/notes", (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes);

    })
})

app.get("/api/notes/:id", (req, res, next) => {
    const id = req.params.id;

    Note.findById(id).then((note) => {

        if (note) {
            res.json(note);

        } else {
            res.status(404).end();
        }
    }).catch(e => next(e));

})

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;

    Note.findByIdAndRemove(id).then((note) => {

        res.status(204).end()
    }).catch(e => next(e));
})

app.post("/api/notes/", (req, res) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({
            error: "Content missing"
        })

    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });
    note.save().then((note) => {

        res.json(note);

    })

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    if (err.name === "CastError") {
        return res.status(400).send({ error: "malformed id" })
    }
    next(err)
}

app.use(errorHandler);



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});