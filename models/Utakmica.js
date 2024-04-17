import mongoose from "mongoose";

const utakmicaSchema = new mongoose.Schema({

    kolo: {
        type:String,
        required: true,
    },

    stadionNaziv: {
        type:String,
        required: true
    },

    mjestoIgranja: {
        type:String,
        required: true,
    },

    gledateljiBroj: {
        type:Number,
        required: true
    },

    datum: {
        type: String,
        required: true,
    },

    satUpisa: {
        type: String,
        required: true,
    },

    Liga: {
        type: String,
        required: true,
    },

    Domacin: {
        type: String,
        required: true,
    },

    domacinGol: {
        type: Number,
        required: true
    },

    Gosti: {
        type: String,
        required: true,
    },

    gostiGol: {
        type: Number,
        required: true
    },

    liga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ligas', // Referenca na model User
        required: true
    },

    domacin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Klubs', // Referenca na model User
        required: true
    },

    gost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Klubs', // Referenca na model User
        required: true
    },

    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Referenca na model User
        required: true
    },

});

const Utakmica = mongoose.model("Utakmice", utakmicaSchema);

export default Utakmica;