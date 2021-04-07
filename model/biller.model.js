const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const CustomerBillDataSchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    biller_id : {type:Number,required:true},
    biller_name : String,
    bill_id : {type:String,required:true},
    bill_description : String,
    bill_reason : String,
    bill_amount_due : {type:Number,required:true},
    bill_due_dt : Date,
    bill_submitted_as_paid:{type:Boolean,'default':false},
    partial_pay_allowed:{type:Boolean,'default':false},
    customer_id : String,
    customer_name : String,
    customer_mobile_number : String,
    customer_email : String,
    bill_data_file_id:{type:String,'default':'none'},
    payment_status:{
        type:{
                paid_amount:{type:Number,required:true},
                paid_dt:{type:Date,required:true},
                agent_id:{type:Number,required:true},
                agent_name : {type:String,required:false},
                agent_channel_name : {type:String,required:false},
                agent_tx_code : {type:String,required:true},
                confirmation_code:{type:String,required:true},
                payee_mobile_number:{type:String, require:false}
            }, 
        required:false
    }
},{ timestamps: { createdAt: 'created_at',updatedAt:'updated_at' } });


module.exports= mongoose.model('customer-bill-datum',CustomerBillDataSchema);