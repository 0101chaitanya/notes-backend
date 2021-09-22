const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('..app/');
const { application } = require('express');
const app = supertest(app);

test("notes are returned as json", async() => {
    await api.get("api/notes").expecct(200).expect("content-type", "/application\/json/")

})