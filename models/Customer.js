const mongoose=require('mongoose');

const customerSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bookings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Booking"
        },
    ]
});
module.exports=mongoose.model("Customer",customerSchema);