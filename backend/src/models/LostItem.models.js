import mongoose from 'mongoose';

// This schema defines the structure of a "lost item" document in your database.
const lostItemSchema = new mongoose.Schema({
  // The name of the item (e.g., "iPhone 13", "Water Bottle").
  name: {
    type: String,
    required: [true, 'Item name is required.'], // This field must be provided.
    trim: true, // Removes any extra whitespace from the beginning or end.
  },
  // The location where the item was lost.
  location: {
    type: String,
    required: [true, 'Location is required.'],
    trim: true,
  },
  // The date the item was lost.
  date: {
    type: Date,
    required: [true, 'Date is required.'],
  },
  // A detailed description of the item.
  description: {
    type: String,
    required: [true, 'Description is required.'],
    trim: true,
  },
  // The URL of the photo of the item, which will be stored on Imagekit.
  photoURL: {
    type: String,
    default: '', // It's not required, so it can be an empty string.
  },
  // A reference to the user who reported the item. This links it to your User collection.
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // This must match the name you gave your user model (e.g., mongoose.model('User', ...)).
    required: true,
  },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields.

const LostItem = mongoose.model('LostItem', lostItemSchema);

export default LostItem;