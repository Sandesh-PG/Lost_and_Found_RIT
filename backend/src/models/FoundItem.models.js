const mongoose = require('mongoose');


const FoundItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    foundLocation: {
        type: String,
        required: true
    },
    dateFound: {
        type: Date,
        required: true
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    photoURLs: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['active', 'returned', 'archived'],
        default: 'active'
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});


const FoundItemModel = mongoose.model("FoundItem", FoundItemSchema);

module.exports = FoundItemModel;