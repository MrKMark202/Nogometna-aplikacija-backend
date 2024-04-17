// Importi
import express  from "express";
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"

const app = express()
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(cookieParser());

app.use(cors());

const port = process.env.PORT || 10000;

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: 'nogometnaAplikacija'})
  .then(() => console.log("Connected"))
  .catch((error) => console.log(error));

console.log('Loaded .env file with MONGO_URI:', process.env.MONGO_URI);


// Consts i drugi importi
import authRoute from "./routes/auth.js";
import ligaRoute from "./routes/liga.js";
import klubRoute from "./routes/klub.js";
import utakmicaRoute from "./routes/utakmica.js";
import tablicaRoute from "./routes/tablica.js";
import userRoute from "./routes/user.js";

//Rute za auth
app.use("/api/auth",authRoute);
app.use("/api/liga",ligaRoute);
app.use("/api/klub",klubRoute);
app.use("/api/utakmica",utakmicaRoute);
app.use("/api/tablica", tablicaRoute);
app.use("/api/user", userRoute);


app.listen(port, () => {
	console.log(`Servis radi na portu ${port}`);
});