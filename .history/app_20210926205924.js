const config = require("./utils/config");
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const Note = require("./models/note");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const path = require("path");
const passport = require("passport");

//logger.info('connecting to', config.MONGODB_URI)

//process.env.TEST_MONGODB_URI

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connecting to MongoDB:", error.message);
    });
require("./utils/passport")(passport);
app.use(passport.initialize());
app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;