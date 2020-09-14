const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    email: { type: mongoose.Schema.ObjectId, ref: 'User' },
}, { timestamps: true });
module.exports = mongoose.model('Comment', commentSchema)