import FoundItem from "../models/FoundItem.models.js";
import User from "../models/user.models.js"; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to set up the email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// @desc    Create a new found item report and notify ALL users
// @route   POST /api/found
export const createFoundItem = async (req, res) => {
  try {
    const { name, item, location, date, description, photoUrl, reportedBy } = req.body;

    if (!name || !item || !location || !date || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newFoundItem = new FoundItem({
      name, item, location, date, description, photoUrl, reportedBy, status: "found",
    });

    const savedItem = await newFoundItem.save();
    
    // --- START: BROADCAST EMAIL NOTIFICATION LOGIC ---

    const allUsers = await User.find({}, 'email');

    const recipientEmails = [...new Set(
        allUsers
            .map(user => user.email)
            .filter(email => email)
    )];

    if (recipientEmails.length > 0) {
      const transporter = createTransporter();
      
      // --- UPDATED: Email HTML content ---
      const mailOptions = {
        from: `"LostNFound" <${process.env.EMAIL_USER}>`,
        to: `"Recipients" <${process.env.EMAIL_USER}>`,
        subject: `A new item has been found: '${savedItem.item}'`,
        bcc: recipientEmails,
        html: `
          <h1>A New Item Has Been Reported as Found!</h1>
          <p>Someone has reported a found item. Please check the details to see if it might be yours.</p>
          <hr/>
          <h2>${savedItem.item}</h2>
          <p><strong>Description:</strong> ${savedItem.description}</p>
          ${savedItem.photoUrl ? `<img src="${savedItem.photoUrl}" alt="${savedItem.item}" style="max-width: 300px; border-radius: 8px;"/>` : ''}
          <br/>
          <p style="margin-top: 20px;">
            <a 
              href="${process.env.FRONTEND_URL}/found/${savedItem._id}" 
              target="_blank" 
              style="background-color: #4f46e5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px;"
            >
              Contact the Reporter
            </a>
          </p>
        `,
      };
      console.log(mailOptions.bcc)
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log("Error sending broadcast email:", error);
        }
        console.log('Broadcast email sent successfully: ' + info.response);
      });
    } else {
        console.log("No users found in the database to notify.");
    }
    // --- END: BROADCAST EMAIL NOTIFICATION LOGIC ---

    res.status(201).json({ success: true, data: savedItem });

  } catch (error) {
    console.error("Error creating found item:", error);
    res.status(500).json({ success: false, message: "Server error while creating found item" });
  }
};
// @desc    Get all found items
// @route   GET /api/found
// @access  Public
export const getAllFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching found items:", error);
    res.status(500).json({ success: false, message: "Server error while fetching found items" });
  }
};

// @desc    Get a single found item by its ID
// @route   GET /api/found/:id
// @access  Public
export const getFoundItemById = async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Found item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("Error fetching found item by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Update a found item
// @route   PUT /api/found/:id
// @access  Private (should be protected)
export const updateFoundItem = async (req, res) => {
  try {
    const item = await FoundItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document
      runValidators: true, // Run schema validators on update
    });
    if (!item) {
      return res.status(404).json({ success: false, message: "Found item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("Error updating found item:", error);
    res.status(500).json({ success: false, message: "Server error while updating" });
  }
};

// @desc    Delete a found item
// @route   DELETE /api/found/:id
// @access  Private (should be protected)
export const deleteFoundItem = async (req, res) => {
  try {
    const item = await FoundItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Found item not found" });
    }
    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting found item:", error);
    res.status(500).json({ success: false, message: "Server error while deleting" });
  }
};
