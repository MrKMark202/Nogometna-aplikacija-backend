// Importi
import express  from "express";
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express()
app.get('/', (req, res) => {
  res.send('Hello World');
});

//app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'https://wa-nogometna-aplikacija.netlify.app'
  }));

const port = process.env.PORT || 3000;

//app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));

const dbUri = 'mongodb+srv://makatalinic:teetee02@nogometnaaplikacija.uczg4pk.mongodb.net/'

mongoose
  .connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: 'nogometnaAplikacija'})
  .then(() => console.log("Connected"))
  .catch((error) => console.log(error));

console.log('Loaded .env file with MONGO_URI:', process.env.MONGO_URI);

// Consts i drugi importi

import authRoute from "./routes/auth.js";


//Rute za auth
app.use("/api/auth",authRoute);

app.post("/auth/logIn", (req, res) => {
    //...
})

app.post("/auth/logOut", (req, res) => {
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
