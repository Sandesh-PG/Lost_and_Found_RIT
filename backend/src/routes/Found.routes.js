import express from 'express';
import LostItemModel from '../models/LostItem.models.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();


//GET /api/lost_items
//it will get all the lost items
router.get('/', LostItemController);

//Post /api/lost_items
//it should be protected as only logged in user can report
router.post('/', authMiddleware, ReportLostItemController);

//after a item is reported after the item 
// /api/lost_items/:item_id
//for user search we get items
//so GET METHOD for searching we user params that is :item_id
router.get('/:item_id', authMiddleware, FindLostItemController);


//now updating the lost item
// /api/lost_items/:item_id
router.put('/:item_id', authMiddleware, UpdateLostItemController);

//GET /api/lost-items/user/:userId
//Get all lost items for a specific user
router.get('/user/:user_id', ListOfLostItemUserController);

export default router;
