const jwt=require('jsonwebtoken');
const  Owner=require('../models/Owner');
const Customer=require('../models/Customer');

const verifyToken=(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token){
        return res.status(401).json({
            error:"Access denied"
        });
    }

    try {
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    } 
    catch (error) {
        return res.status(400).json({
            error:"Invalid token"
        });
    }
};


const isOwner=async(req,res,next)=>{
    try {
        const owner=await Owner.findById(req.user.id);
        if(!owner){
            return res.status(403).json({
                error:"Access denid"
            });
        }
        next();
    } 
    catch (error) {
        res.status(500).json({
            error:"Error verifying owner"
        });
    }
};

const isCustomer=async(req,res,next)=>{
    try {
        const customer=await Customer.findById(req.user.id);
        if(!customer){
            return res.status(403).json({
                error:"Access denid"
            });
        }
        next();
    } 
    catch (error) {
        res.status(500).json({
            error:"Error verifying owner"
        });
    }
}

module.exports={verifyToken,isOwner,isCustomer};

