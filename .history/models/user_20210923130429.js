const mongoose = require("mongoose");

const userSchema = new mongoose.schema({

    username: String,
    name: String,
    passwordHash: String,
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: note
    }]
})