const express = require('express');
const router = express.Router();
const {ConfirmedBooking} = require('../../models/confirmedBookings');
const {Book} = require('../../models/books');
const {ReturnedBooking , validate} = require('../../models/returnedBookings');

router.get('/:id', async(req,res)=>{
    const booking = await ConfirmedBooking.findById(req.params.id);
    if(!booking) return res.status(404).send('booking with the id not found');

    res.status(200).render('returnBooks',{booking:booking});
});
router.post('/', async(req,res)=>{
    //Joi validation
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const book = await Book.findByIdAndUpdate(req.body.bookId, 
        {
            $inc:{ quantity:1 }
        }, {new:true});
    if(!book) return res.status(404).send('book with the id not found');

    const booking = await ConfirmedBooking.findById(req.body.confirmedBookingId);
    
    //calculate penalty
    const threshold = (3*60*1000);
    const value = Date.now() - booking.dateOut;
    const penaltyValue = ((value - threshold)/60000) * 10;

    if(penaltyValue > 0){
        let returnedBooking = new ReturnedBooking({
            book:{
                _id:booking.book._id,
                name:booking.book.name,
                author:booking.book.author,
                department:booking.book.department,
                semester:booking.book.semester
            },
            user:{
                _id:booking.user._id,
                firstname:booking.user.firstname,
                lastname:booking.user.lastname,
                email:booking.user.email,
                department:booking.user.department,
                semester:booking.user.semester
            },
            dateOut:booking.dateOut,
            dateIn:Date.now(),
            penalty:penaltyValue
        });  
        await returnedBooking.save();
        await ConfirmedBooking.findByIdAndDelete(req.body.confirmedBookingId);

        res.render('studentPenalty', {pen:penaltyValue});
    } else{
        let returnedBooking = new ReturnedBooking({
            book:{
                _id:booking.book._id,
                name:booking.book.name,
                author:booking.book.author,
                department:booking.book.department,
                semester:booking.book.semester
            },
            user:{
                _id:booking.user._id,
                firstname:booking.user.firstname,
                lastname:booking.user.lastname,
                email:booking.user.email,
                department:booking.user.department,
                semester:booking.user.semester
            },
            dateOut:booking.dateOut,
            dateIn:Date.now(),
            penalty:0
        });
        await returnedBooking.save();
        await ConfirmedBooking.findByIdAndDelete(req.body.confirmedBookingId);
        res.redirect('/api/librarian');
    }
});

module.exports = router;