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

    try {

        const note = {
            content: body.content,
            important: body.important,
            date: new Date()
        };
        const body = req.body;

        const updated = await Note.findByIdAndUpdate(req.params.id, note, { new: true });

        res.json(updated);
    } catch (err) {

        return next(err);
    }

})

notesRouter.delete("/:id", async(req, res, next) => {
    const id = req.params.id;
    try {

        await Note.findByIdAndRemove(id);
        res.status(204).end()

    } catch (e) {

        return next(e);
    }
})

notesRouter.post("/", async(req, res, next) => {

})


module.exports = notesRouter;