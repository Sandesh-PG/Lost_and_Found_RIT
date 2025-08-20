const mongoose = require('mongoose');


const LostItemSchema = new mongoose.Schema({
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
    lostLocation: {
        type: String,
        required: true
    },
    dateLost: {
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
        enum: ['Lost', 'Found'],
        default:'Lost'
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});


const LostItemModel = mongoose.model("LostItem", LostItemSchema);

module.exports = LostItemModel;