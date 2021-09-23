const notesRouter = require('express').Router();

const Note = require('../models/note');

notesRouter.get("/", async(req, res) => {
    const notes = await Note.find({});

    res.json(notes);


})

notesRouter.get("/:id", async(req, res, next) => {
    const id = req.params.id;

    try {

        const note = await Note.findById(id);

        if (note) {
            return res.json(note);

        } else {
            return res.status(404).end();
        }
    } catch (e) {

        return next(e)

    };

})

notesRouter.put("/:id", async(req, res, next) => {


    const note = {
        content: body.content,
        important: body.important,
        date: new Date()
    };
    const body = req.body;

    const updated = await Note.findByIdAndUpdate(req.params.id, note, { new: true });

    res.json(updated);


})

notesRouter.delete("/:id", async(req, res, next) => {
    const id = req.params.id;

    await Note.findByIdAndRemove(id);
    res.status(204).end()

})

notesRouter.post("/", async(req, res, next) => {
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

    const noteRes = await note.save();

    const formattedNote = noteRes.toJSON();
    res.json(formattedNote);


})


module.exports = notesRouter;