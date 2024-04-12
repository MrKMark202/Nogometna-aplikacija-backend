import mongoose from "mongoose";

const ligaSchema = new mongoose.Schema({

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

    grbLige: {
        type: String,
        required: true,
    },

    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Referenca na model User
        required: true
    }
});

const Liga = mongoose.model("Ligas", ligaSchema);

export default Liga;