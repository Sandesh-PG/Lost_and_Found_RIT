import express from "express";
import {
  createLostItem,
  getAllLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
} from "../controllers/Lostitems.controller.js";
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router();

// Lost Item routes
router.post("/", createLostItem);        // Report lost item
router.get("/", getAllLostItems);        // Get all
router.get("/:id",  getLostItemById);     // Get single
router.put("/:id", updateLostItem);      // Update
router.delete("/:id", deleteLostItem);   // Delete

export default router;
