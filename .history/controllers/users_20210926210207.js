const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


usersRouter.get("/showAll", async(req, res) => {
    const users = await User.find({}).populate("notes", { content: 1, date: 1 });
    res.json(users);
});

usersRouter.post("/login", async(req, res) => {
    const { username, password } = req.body;
    const { salt, hash } = await utils.genPassword(password);

    const newUser = new User({
        username,
        hash,
        salt,
        admin: true,
    });
    const user = await newUser.save();

    const { token, expires } = utils.issueJWT(user);

    res.json({ success: true, user, token, expiresIn: expires })
});


usersRouter.post("/register", async(req, res) => {
    const body = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });

    const savedUser = await user.save();

    res.json(savedUser);
});

module.exports = usersRouter;