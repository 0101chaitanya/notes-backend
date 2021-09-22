const notesRouter = require('express').Router();

const Note = require('../models/note');

notesRouter.get("/", (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes);

    })
})

notesRouter.get("/:id", (req, res, next) => {
    const id = req.params.id;

    Note.findById(id).then((note) => {

        if (note) {
            res.json(note);

        } else {
            res.status(404).end();
        }
    }).catch(e => next(e));

})

notesRouter.put("/:id", (req, res, next) => {

    const body = req.body;
    console.log(req.body);
    const note = {
        content: body.content,
        important: body.important,
    };

    Note.findByIdAndUpdate(req.params.id, note, { new: true }).then((updated) => {

        res.json(updated);
    }).catch((err) => console.error(err));

})

notesRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id;

    Note.findByIdAndRemove(id).then((note) => {

        res.status(204).end()
    }).catch(e => next(e));
})

notesRouter.post("/", (req, res, next) => {
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
    note.save().then((note) => (note).toJSON()).then(formattedNote => res.json(formattedNote)).catch(err => next(err));

})


module.exports = notesRouter;