const notesRouter = require("express").Router();

const Note = require("../models/note");
const User = require("../models/user");
notesRouter.get("/", async(req, res) => {
    const notes = await Note.find({});

    res.json(notes);
});

notesRouter.get("/:id", async(req, res, next) => {
    const id = req.params.id;

    const note = await Note.findById(id);

    if (note) {
        return res.json(note);
    } else {
        return res.status(404).end();
    }
});

notesRouter.put("/:id", async(req, res, next) => {
    const body = req.body;

    const user = User.findById(body.user);
    console.log(user)
    const note = {
        content: body.content,
        important: body.important,
        user: body.user,
        date: new Date(),
    };

    const updated = await Note.findByIdAndUpdate(req.params.id, note, {
        new: true,
    });

    user.notes = user.notes.concat(updatedNote);

    await user.save();

    res.json(updated);
});

notesRouter.delete("/:id", async(req, res, next) => {
    const id = req.params.id;

    await Note.findByIdAndRemove(id);
    res.status(204).end();
});

notesRouter.post("/", async(req, res, next) => {
    const body = req.body;

    if (!body.content) {
        return res.status(400).json({
            error: "Content missing",
        });
    }

    const user = await User.findById(body.user);
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: user._id,
    });

    const savedNote = await note.save();

    user.notes = user.notes.concat(savedNote);

    await user.save();
    res.json(savedNote);
});

module.exports = notesRouter;