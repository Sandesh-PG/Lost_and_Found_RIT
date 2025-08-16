import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String
    },
    profilePictureURL: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;