import multer from 'multer';

// We configure Multer to store the uploaded file in memory as a buffer.
// This is efficient because it avoids saving the file to the server's disk
// before we upload it to Imagekit.
const storage = multer.memoryStorage();

// This creates the Multer middleware. The .single('photo') part tells it
// to expect a single file upload from a form field named "photo".
// Make sure your frontend form's file input has `name="photo"`.
const upload = multer({ storage });

export default upload;