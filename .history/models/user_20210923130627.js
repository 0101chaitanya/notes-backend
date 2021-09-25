const mongoose = require("mongoose");

const userSchema = new mongoose.schema({

    username: String,
    name: String,
    passwordHash: String,
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: note
    }]
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v,
            delete returnedObject.passwordHash
    }
})