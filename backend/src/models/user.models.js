import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values, but unique if a value exists
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // Not required for Google OAuth users
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  profilePictureURL: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values, but unique if a value exists
  },
  // --- Fields for Password Reset ---
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;