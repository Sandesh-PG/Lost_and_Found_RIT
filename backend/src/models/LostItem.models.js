import mongoose from "mongoose";

const LostItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String, // store uploaded file URL (e.g., from Cloudinary, Firebase, S3)
      default: null,
    },
    status: {
      type: String,
      enum: ["lost", "found", "returned"],
      default: "lost",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LostItem", LostItemSchema);
