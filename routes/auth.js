const express=require('express');
const {registerCustomer,registerOwner,loginCustomer,loginOwner}=require('../controllers/authController');
const router=express.Router();

router.post('/owner/signup',registerOwner);
router.post('/customer/signup',registerCustomer);
router.post('/owner/login',loginOwner);
router.post('/customer/login',loginCustomer);

module.exports=router;