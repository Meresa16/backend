
const validator=require('validator');
const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new Schema({
    email: {
        type:String,
        index:{unique:true},
        lowercase:true,unique:true,required:[true,"can't be blank"], match:[/\S+@\S+\.\S+/, 'is invalid'],index:true,
    },
    password: String,
    firstname:String,
    lastname:String,
    phone: {type:Number,required:true},
    createdDate: {
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('User',userSchema);