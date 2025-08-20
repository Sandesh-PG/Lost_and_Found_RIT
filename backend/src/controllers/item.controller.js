import LostItem from '../models/LostItem.models.js';
import ImageKit from 'imagekit'; // 1. Import the ImageKit SDK.

// 2. Initialize ImageKit with the credentials from your .env file.
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// This function handles the creation of a new lost item report.
export const reportLostItem = async (req, res) => {
  try {
    // Get the text data from the form body.
    const { name, location, date, description } = req.body;
    
    // The user's information is attached by your 'protectRoute' middleware.
    const userId = req.user._id;

    let photoURL = ''; // Initialize photoURL.

    // Check if a file was uploaded.
    if (req.file) {
      // 3. If a file exists, upload it to ImageKit.
      // The SDK can directly use the file buffer from Multer.
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer, // The file data.
        fileName: req.file.originalname, // The original name of the file.
        folder: '/lost-and-found-items/', // Optional: Organizes uploads in ImageKit.
      });
      
      photoURL = uploadResponse.url; // 4. Get the URL of the uploaded image.
    }

    // Create a new lost item document with all the data.
    const newLostItem = new LostItem({
      name,
      location,
      date,
      description,
      photoURL,
      reportedBy: userId,
    });

    // Save the new item to the database.
    await newLostItem.save();

    // Send a success response back to the frontend.
    res.status(201).json({ message: 'Lost item reported successfully!', item: newLostItem });

  } catch (error) {
    console.error("Error reporting lost item:", error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};
