import express from 'express';
import {
  createFoundItem,
  getAllFoundItems,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem,
} from '../controllers/Founditems.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post("/", createFoundItem);      // Report a found item
router.get("/", getAllFoundItems);      // Get all found items
router.get("/:id", getFoundItemById);   // Get a single found item
router.put("/:id", updateFoundItem);      // Update a found item
router.delete("/:id", deleteFoundItem);   // Delete a found item

export default router;