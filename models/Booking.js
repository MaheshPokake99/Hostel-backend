const mongoose=require('mongoose');
const { number } = require('zod');

const bookingSchema=new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    hostel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hostel"
    },
    date:{
        type:Date,
        default:Date.now
    },
    duration:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model("Booking",bookingSchema);