const notesRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Note = require("../models/note");
const User = require("../models/user");
const passport = require("passport");
notesRouter.get("/", passport.authenticate("jwt", { session: false }), async(req, res) => {
    const notes = await Note.find({});

    res.json(notes);
});

notesRouter.get("/:id", passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const id = req.params.id;

    const note = await Note.findById(id);

    if (note) {
        return res.json(note);
    } else {
        return res.status(404).end();
    }
});

notesRouter.put("/:id", passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const body = req.body;

    const note = {
        content: body.content,
        important: body.important,
        user: body.user,
        date: new Date(),
    };

    const updated = await Note.findByIdAndUpdate(req.params.id, note, {
        new: true,
    });


    //await user.save();
    console.log(updated);
    //res.json( updated);
});

notesRouter.delete("/:id", passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const id = req.params.id;

    await Note.findByIdAndRemove(id);
    res.status(204).end();
});

notesRouter.post("/", passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const body = req.body;

    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(body.user);
    console.log("user", user);
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