const auth = require('../../middleware/auth');
const {User} = require('../../models/users');
const {Booking} = require('../../models/bookings');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

router.get('/', async(req,res)=>{
    res.render('adminLogin');
});

router.post('/',auth,async(req,res)=>{
    const email = req.body.email;
    const user = await User.findOne({email});
    if(!user) return res.status(404).send('user doesnot exist');

    const authority = await bcrypt.compare(req.body.password, user.password);
    const bookings = await Booking.find();
    if(authority) res.render('adminSeeAllBooking',{bookings:bookings});
});

module.exports = router;