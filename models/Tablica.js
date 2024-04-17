import mongoose from "mongoose";

const tablicaSchema = new mongoose.Schema({

    bodovi: {
        type:Number,
        required: true,
    },

    postignutiPogodci: {
        type:Number,
        required: true
    },

    primljeniPogodci: {
        type:Number,
        required: true,
    },

    odigranihDvoboja: {
        type:Number,
        required: true
    },

    liga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ligas', // Referenca na model User
        required: true
    },

    klub: {
        type: String,
        required: true
    },

    grbKlub: {
        type: String,
        required: true
    },

    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Referenca na model User
        required: true
    },

});

const Tablica = mongoose.model("Tablice", tablicaSchema);

export default Tablica;