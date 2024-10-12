const express=require('express');
const {verifyToken,isOwner}=require('../middlewares/auth');
const upload=require('../middlewares/upload');
const {createHostel,getOwnerHostel,deleteHostel}=require('../controllers/ownerController');
const router=express.Router();

router.post('/addHostel',verifyToken,isOwner,upload.single('image'),createHostel);
router.get('/hostels',verifyToken,isOwner,getOwnerHostel);
router.delete('/hostel/:id',verifyToken,isOwner,deleteHostel);

module.exports=router;