import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    ime: {
        type:String,
        required: true
    },

    prezime: {
        type:String,
        required: true
    },

    datumRodenja: {
        type:Date,
        required: true
    },

    email: {
        type:String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },
});

const User = mongoose.model("Users", userSchema);

export default User;