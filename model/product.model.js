const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image:{type:String,data:Buffer}
});
module.exports = mongoose.model('Product', productSchema);