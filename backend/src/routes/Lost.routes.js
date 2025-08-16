import express from 'express';
import { LostItemController, ReportLostItemController, FindLostItemController, UpdateLostItemController, ListOfLostItemUserController } from '../controllers/Lost.controllers.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();


router.get('/', LostItemController);


router.post('/', authMiddleware, ReportLostItemController);


router.get('/:item_id', authMiddleware, FindLostItemController);


router.put('/:item_id', authMiddleware, UpdateLostItemController);


router.get('/user/:user_id', ListOfLostItemUserController);

export default router;