const mongoose=require('mongoose');

const ownerSchema=new mongoose.Schema({
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
    hostels:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hostel"
        }
    ]
});
module.exports=mongoose.model("Owner",ownerSchema);