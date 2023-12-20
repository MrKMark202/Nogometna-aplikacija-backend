import { methods } from './functions.js';
import express  from "express";
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from '../models/Users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({path: __dirname + "/.env"});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))
  .catch((error) => console.log(error));

console.log('Loaded .env file with MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 3000;


//Rute za auth

app.post("/signUp", (req, res) => {
    //...
})

app.post("/logIn", (req, res) => {
    //...
})

app.post("/logOut", (req, res) => {
    //...
})

//Rute za ligu
app.post("/nekiuser/Lige", (req, res) => {
    //...
})


//Rute za klubove
app.post("/nekiuser/Lige/Klubovi", (req, res) => {
    //...
})

app.post("/nekiuser/Lige/Klubovi/Tablica/Podaci", (req, res) => {
    //...
})

//Rute za utakmice
app.post("/nekiuser/Lige/Utakmice", (req, res) => {
    //...
})

app.post("/nekiuser/Lige/Klubovi/Tablica/Podaci", (req, res) => {
    //...
})

//Rute za tablicu

app.get("/nekiuser/Lige/:imelige", (req, res) => {
    //...
})

//Za Domaćina
app.get("/nekiuser/Lige/Klubovi/:imekluba", (req, res) => {
    //...
})
//Za Gosta
app.get("/nekiuser/Lige/Klubovi/:imekluba", (req, res) => {
    //...
})

app.get("/nekiuser/Lige/Klubovi/Tablica/Podaci", (req, res) => {
    //...
})

app.delete("/nekiuser/Lige/:imelige", (req, res) => {
    //...
})

app.delete("/nekiuser/Lige/Klubovi/:imekluba", (req, res) => {
    //...
})

//Rute za pregled utakmica

app.delete("/nekiuser/Lige/Utakmice", (req, res) => {
    //...
})

app.get("/nekiuser/Lige/Utakmice", (req, res) => {
    //...
})


/*
app.get("/auth", (req, res) => {
    res.json({"token": "asdf"});
})

app.post("/user", (req, res) => {
    res.status(201).send();
})

app.get("/studenti/hh", (req, res) => {
    console.log(studenti)
    res.json({"status": "ok"});
})

app.get("/studenti/:jmbag", (req, res) => {
    res.json({"jmbag": "322456"});
})

app.post("/studenti", (req, res) => {
    const student = {
        ime: "Marko",
        prezime: "Katalinic",
        JMBAG: '0303770100'
    }
    methods.addStudent(student);
    res.status(201).send();
})
*/

app.listen(port, () => {
	console.log(`Servis radi na portu ${port}`);
});
