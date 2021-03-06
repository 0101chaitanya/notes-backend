const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('..app/');
const { application } = require('express');
const api = supertest(app);

test("notes are returned as json", async() => {
    await api.get("api/notes").expect(200).expect("Content-Type", "/application\/json/")

}, 10000)

afterAll(() => {

    mongoose.connection.close()
})