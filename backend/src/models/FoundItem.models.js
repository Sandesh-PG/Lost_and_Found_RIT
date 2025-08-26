import mongoose from 'mongoose';

const foundItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Reporter's name is required."],
    trim: true,
  },
  item: {
    type: String,
    required: [true, 'Item name or category is required.'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location where the item was found is required.'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Date when the item was found is required.'],
  },
  description: {
    type: String,
    required: [true, 'A brief description of the item is required.'],
    trim: true,
  },
  photoUrl: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['found', 'claimed'],
    default: 'found',
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const FoundItem = mongoose.model('FoundItem', foundItemSchema);

export default FoundItem;
