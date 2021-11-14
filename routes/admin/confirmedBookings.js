const {ConfirmedBooking} = require('../../models/confirmedBookings');
const express = require('express');
const router = express.Router();


router.get('/', async(req,res)=>{
    await ConfirmedBooking.find({}, (err,result)=>{
        if(err) throw err;
        res.status(200).render('confirmedBookings',{bookings:result})
    });
});

module.exports = router;
