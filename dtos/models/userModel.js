import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },

    // extra fields
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },

    // extra fields
    role: {
        type: String,
        required: true,
        default: "user"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;