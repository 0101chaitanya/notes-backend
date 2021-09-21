const mongoose = require('mongoose');
const url = "mongodb+srv://0101chaitanya:Webdev%400101@cluster0.ojoav.mongodb.net/fso-notes?authSource=admin&replicaSet=atlas-yx635f-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true"; //process.env.MONGO_URI;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => {
    console.log("COnnected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB" + error.message);
});

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,

})

noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;

    }
})


module.exports = mongoose.model("Note", noteSchema);