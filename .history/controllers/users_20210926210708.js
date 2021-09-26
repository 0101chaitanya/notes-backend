const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
    validPassword,
    genPassword,
    issueJWT
} = require("../utils/helpers");

usersRouter.get("/showAll", passport.authenticate("jwt", { session: false }), async(req, res) => {
    const users = await User.find({}).populate("notes", { content: 1, date: 1 });
    res.json(users);
});

usersRouter.post("/login", async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        res.status(401).json({ success: true, msg: "could not find user" });
    }
    const isValid = validPassword(password, user.hash);
    if (isValid) {
        const { token, expires } = issueJWT(user);

        res.json({ success: true, user, token, expiresIn: expires })

    } else {
        res.status(401).json({ success: true, msg: "you entered the wrong password" })
    }



});


usersRouter.post("/register", async(req, res) => {
    const { username, password } = req.body;
    const { salt, hash } = await genPassword(password);

    const newUser = new User({
        username,
        hash,
        salt,
        admin: true,
    });
    const user = await newUser.save();

    const { token, expires } = issueJWT(user);

    res.json({ success: true, user, token, expiresIn: expires })
});

module.exports = usersRouter;