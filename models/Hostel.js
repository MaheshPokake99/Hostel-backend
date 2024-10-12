const { default: mongoose } = require("mongoose");

const hostelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true 
    },
    price:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Owner"
    },
    imageUrl:{
        type:String
    },
    amenities: [String],
});
module.exports=mongoose.model("Hostel",hostelSchema);