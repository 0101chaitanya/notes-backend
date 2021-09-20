const express = require('express');
const app = express();

let notes = [{
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]
const maxId = () => notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 0;

app.use(express.json());
app.get("/", (req, res) => {
    res.send("<h1>Hello world!</h1>")
});
app.get("/api/notes", (req, res) => {
    res.json(notes);
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
        },
        notes = notes.concat(note)
    res.json(note);

})


const PORT = 3001;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});