const { Booking } = require('../../models/bookings');
const express = require('express');
const router = express.Router();

router.get('/',async(req,res)=>{
    const bookings = await Booking.find().sort('-dateOut');
    if(!bookings) return res.status(404).send("no bookings yet");

    res.status(200).render('adminSeeAllBookingsMukid', {bookings:bookings});
});
router.get('/:id', async(req,res)=>{
    const user = await (req.params.id)
});

module.exports = router;