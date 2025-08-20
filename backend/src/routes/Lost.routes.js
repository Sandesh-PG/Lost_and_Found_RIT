import express from "express"
import protectRoute from '../middleware/auth.middleware.js'; // Your security middleware.
import upload from '../middleware/multer.middleware.js';   // The image upload middleware.
import {reportLostItem}  from '../controllers/item.controller.js'; // The controller logic.

const router = express.Router();


// GET /: To retrieve a list of all found items.
//router.get('/', FoundItemController);

// POST /: To report a new found item. (Protected)
//router.post('/', AuthMiddleware, FoundNewItemController);

// POST /api/items/lost/report
router.post('/lost/report', protectRoute, upload.single('photo'), reportLostItem);

// GET /:itemId: To get details of a specific found item.
//router.get('/:itemId', DetailsItemController);

// PUT /:itemId: To update a found item's details. (Protected)
//router.put('/:itemId', AuthMiddleware, UpdateFoundItemController);

// GET /user/:userId: To get a list of found items reported by a specific user.
//router.get('/user/:userId', AuthMiddleware, ListOfItemsFoundByUserController);

export default router;