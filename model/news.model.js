const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tittle: {
        type: String,
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
}, { timestamps: true });
module.exports = mongoose.model('News', NewsSchema)