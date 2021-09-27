const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    hash: String,
    admin: Boolean,
    salt: String,
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
    }, ],
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.hash;
        delete returnedObject.salt;

    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;