import mongoose from "mongoose";

const klubSchema = new mongoose.Schema({

    naziv: {
        type:String,
        required: true,
        unique: true
    },

    godinaOsnivanja: {
        type:String,
        required: true
    },

    drzava: {
        type:String,
        required: true,
    },

    grbKluba: {
        type: String,
        required: true,
    },

    liga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ligas', // Referenca na model User
        required: true
    },

    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Referenca na model User
        required: true
    }

});

const Klub = mongoose.model("Klubs", klubSchema);

export default Klub;