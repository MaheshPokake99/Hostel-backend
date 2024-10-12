const Owner=require('../models/Owner');
const Customer=require('../models/Customer');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const zod=require('zod');

const signupBody=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()
})

const registerOwner=async(req,res)=>{
    const {success}=signupBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            msg:"all data required"
        });
    }

    const existingUser=await Owner.findOne({
        email:req.body.email
    });
    if(existingUser){
        return res.status(409).json({
            msg:"user already exits"
        });
    }
    const saltRound=10;
    const hashedpassword=await bcrypt.hash(req.body.password,saltRound);
    const { firstName, lastName, email } = req.body;
    const owner=new Owner({
        firstName,
        lastName,
        email,
        password:hashedpassword
    });
    
    try {
        await owner.save();
        const token = jwt.sign({ id: Owner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            msg:"Owner registered successfully",
            token:token
        })
    } 
    catch (error) {
        return res.status(400).json({
            msg:"Error registering Owner'"
        })
    }
}

const registerCustomer=async(req,res)=>{
    const {success}=signupBody.safeParse(req.body);
    if(!success){
        return res.status(401).json({
             msg:"all data required"
        });
    }
    const existingUser=await Customer.findOne({
        email:req.body.email
    });
    if(existingUser){
        return res.status(409).json({
            msg:"user already exits"
        });
    }
    const saltRound=10;
    const hashedpassword=await bcrypt.hash(req.body.password,saltRound);
    const { firstName, lastName, email } = req.body;
    const customer=new Customer({
        firstName,
        lastName,
        email,
        password:hashedpassword
    });
    
    try {
        await customer.save();
        const token = jwt.sign({ id: Owner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            msg:"Customer registered successfully",
            token:token
        })
    } 
    catch (error) {
        return res.status(400).json({
            msg:"Error registering customer'"
        })
    }
}

const loginBody=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6),
});
const loginOwner=async(req,res)=>{
    const {success}=loginBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({ error: 'All data required' });
    }
    const owner= await Owner.findOne({email:req.body.email});
    if(!owner){
        return res.status(400).json({ error: 'no user found' });
    }
    const validpass=await bcrypt.compare(req.body.password,owner.password);
    if(!validpass){
        return res.status(400).json({
            error:"Wrong password"
        });
    }
    const token=jwt.sign({
        id:owner._id
    },process.env.JWT_SECRET)
    return res.status(200).json({
        msg:"loggend in",
        token:token
    });
}

const loginCustomer=async(req,res)=>{
    const {success}=loginBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({ error: 'All data required' });
    }
    const customer=await Customer.findOne({email:req.body.email});
    if(!customer){
        return res.status(400).json({ error: 'no user found' });
    }
    const validpass=await bcrypt.compare(req.body.password,customer.password);
    if(!validpass){
        return res.status(400).json({
            error:"Wrong password"
        });
    }
    const token=jwt.sign({
        id:customer._id
    },process.env.JWT_SECRET)
    return res.status(200).json({
        msg:"loggend in",
        token:token
    });
}

module.exports={registerCustomer,registerOwner,loginCustomer,loginOwner};