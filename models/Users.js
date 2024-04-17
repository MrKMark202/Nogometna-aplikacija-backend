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
        type:String,
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
    profilnaSlika: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("Users", userSchema);

export default User;