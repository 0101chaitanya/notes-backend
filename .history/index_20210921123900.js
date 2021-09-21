const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
//let notes = require('./db');
require('dotenv').config();

const url = "mongodb+srv://0101chaitanya:Webdev%400101@cluster0.ojoav.mongodb.net/fso-notes?authSource=admin&replicaSet=atlas-yx635f-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true"; //process.env.MONGO_URI;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,

})

const Note = mongoose.model("Note", noteSchema);

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.get("/", (req, res) => {
    res.send("<h1>Hello world!</h1>")
});
app.get("/api/notes", (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes);

    })
})

app.get("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id.toString() === id);

    if (note) {
        res.json(note);

    } else {
        res.status(400).send("No data found");
    }
})

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id.toString() !== id);
    res.status(204).end();
})
const maxId = () => {

    const max = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return max + 1;
}

app.post("/api/notes/", (req, res) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({
            error: "Content missing"
        })

    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: maxId()
    };
    console.log(notes)
    notes = notes.concat(note);
    res.json(note);

})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});