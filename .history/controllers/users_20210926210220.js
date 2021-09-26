const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


usersRouter.get("/showAll", async(req, res) => {
    const users = await User.find({}).populate("notes", { content: 1, date: 1 });
    res.json(users);
});

usersRouter.post("/login", async(req, res) => {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    const passwordCorrect =
        user === null ?
        false :
        await bcrypt.compare(body.password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: "invalid username or password",
        });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
    });

    res.status(200).send({ token, username: user.username, name: user.name });
});


usersRouter.post("/register", async(req, res) => {
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

module.exports = usersRouter;