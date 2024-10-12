const { any } = require('zod');
const Hostel=require('../models/Hostel');

const createHostel=async(req,res)=>{
    const {name,location,price,amenities}=req.body;
    const imageUrl=req.file ? req.file.path : null;

    try {
        const hostel=new Hostel({
            name,
            location,
            price,
            amenities: amenities.split(','),
            owner:req.user.id,
            imageUrl
        });

        const saved=await hostel.save();
        if(!saved){
            return res.status(400).json({
                error: "Hostel could not be saved"
            });
        }
        return res.status(200).json({
            msg:"Hostel created successfully",
            hostel:hostel
        })
    }
    catch (error) {
        return res.status(400).json({
            error:"error creating hostel"
        });
    }
};

const getOwnerHostel=async(req,res)=>{
    try {
        const hostels=await Hostel.find({
            owner:req.user.id
        });
        if(!hostels){
            return res.status(400).json({
                msg:"No hostels found for this owner"
            })
        }
        return res.status(200).json({
            msg:"success",
            hostels:hostels
        })
    } 
    catch (error) {
        return res.status(400).json({
            msg:"Error fetching hostels"
        })
    }
}

const deleteHostel=async(req,res)=>{
    try {
        await Hostel.findByIdAndDelete(req.param.id);
        res.status(200).json({
            msg:"Hostel deletetd successfully"
        });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting hostel' });
    }
}

module.exports={createHostel,getOwnerHostel,deleteHostel};