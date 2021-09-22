const config = require("./utils/config");
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const notesRouter = require('./controllers/notes');
const Note = require('./models/note');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })



app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(morgan("dev"))

app.use(middleware.requestLogger);

app.get("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

module.exports = app;