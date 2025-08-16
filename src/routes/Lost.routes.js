const express = require('express');


const router = express.Router();


// GET /: To retrieve a list of all found items.
router.get('/', FoundItemController);

// POST /: To report a new found item. (Protected)
router.post('/', AuthMiddleware, FoundNewItemController);

// GET /:itemId: To get details of a specific found item.
router.get('/:itemId', DetailsItemController);

// PUT /:itemId: To update a found item's details. (Protected)
router.put('/:itemId', AuthMiddleware, UpdateFoundItemController);

// GET /user/:userId: To get a list of found items reported by a specific user.
router.get('/user/:userId', AuthMiddleware, ListOfItemsFoundByUserController);

module.exports = router;