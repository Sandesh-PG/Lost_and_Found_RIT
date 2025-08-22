import LostItem from "../models/LostItem.models.js";  // ✅ ensure correct filename

// @desc    Create a new lost item
// @route   POST /api/lost
// @access  Public (you can later protect it with auth)
export const createLostItem = async (req, res) => {
  try {
    const { name, location, date, description, photoUrl } = req.body;

    if (!name || !location || !date || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newItem = new LostItem({
      name,
      location,
      date,
      description,
      photoUrl,
      status: "lost",
    });

    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error("Error creating lost item:", error);
    res.status(500).json({ success: false, message: "Error creating lost item" });
  }
};

// @desc    Get all lost items
// @route   GET /api/lost
// @access  Public
export const getAllLostItems = async (_req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching lost items:", error);
    res.status(500).json({ success: false, message: "Error fetching lost items" });
  }
};

// @desc    Get one lost item by ID
// @route   GET /api/lost/:id
export const getLostItemById = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching lost item" });
  }
};

// @desc    Update lost item (ex: mark found)
// @route   PUT /api/lost/:id
export const updateLostItem = async (req, res) => {
  try {
    const item = await LostItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating lost item" });
  }
};

// @desc    Delete lost item
// @route   DELETE /api/lost/:id
export const deleteLostItem = async (req, res) => {
  try {
    const item = await LostItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting lost item" });
  }
};
