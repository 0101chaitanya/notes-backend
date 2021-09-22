const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const api = supertest(app);
const NOtest = require('../models/note');


const initialNotes = [{
        content: "HTML is easy",
        date: new Data(),
        important: false,
    },
    {
        content: "Browser can execute only javascript",
        date: new Data(),
        important: true,
    }
]

beforeEach(async() => {
    await Note.deleteMany({});
    let noteObject = await Note(initialNotes[0]);
    await noteObject.save();
    noteObject = await Note(initialNotes[1]);
    await noteObject.save();
})




test("notes are returned as json", async() => {
    await api.get("/api/notes").expect(200).expect("Content-Type", /application\/json/)

}, 10000)

afterAll(() => {

    mongoose.connection.close()
})