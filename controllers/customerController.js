const Booking=require('../models/Booking');

const bookingHostel=async (req,res)=>{
    const {hostelId,duration}=req.body;
    
    try {
        const booking=new Booking({
            customer: req.user.id,
            hostel:hostelId,
            duration
        });
        const verifyed=await booking.save();
        if(!verifyed){
            return res.status(400).json({
                msg:"Error booking hostel"
            });
        }
        return res.status(201).json({
            msg:"Hostel booked Successfully",
            booking
        });
    } 
    catch (error) {
        return res.status(500).json({
            error: 'Error booking hostel'
        });
    }
}

const getBooking=async(req,res)=>{
    try {
        const bookings=await Booking.find({
            customer:req.user.id
        }).populate('hostel');

        return res.status(200).json({
            msg:"booking are",
            bookings
        })
    } 
    catch (error) {
        res.status(400).json({ error: 'Error fetching bookings' });
    }
}

module.exports={getBooking,bookingHostel};