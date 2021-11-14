const nodemailer = require('nodemailer');
const { ConfirmedBooking, validate} = require('../../models/confirmedBookings');
const { Booking} = require('../../models/bookings');
const { Book } = require('../../models/books');
const { User } = require('../../models/users');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router =  express.Router();

Fawn.init(mongoose);

router.get('/', async(req,res)=>{
    const booking = await Booking.find().sort('-dateOut');
    res.status(200).send(booking);
});
router.post('/', async(req,res)=>{
    // Joi validation 
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // find the book
    const book = await Book.findById(req.body.bookId);
    if(!book) return res.status(404).send('book with the id not found');

    // find the user
    const user = await User.findById(req.body.userId);
    if(!user) return res.status(404).send('user with the id not found');
  

    // if book not available
    if(book.quantity === 0) return res.status(404).send('All books of this author booked');
    // everything fine so booking to database

    // get the booking
    const booking = await Booking.findById(req.body.bookingId);
    
    try {
        new Fawn.Task()
        .update('books',{_id:book._id},{
            $inc:{quantity:-1}
        })
        .run();

        let confirmedBooking = new ConfirmedBooking({
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
            dateOut:booking.dateOut
        });
        confirmedBooking.save();
        
        // send mail
        function sendEMail(){
            const timeGone = Date.now() - booking.dateOut;
            const threshold = (3*60*1000);
            if(timeGone > threshold){
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'namanajid54@gmail.com',
                      pass: 'mynewgmail23'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'namanajid54@gmail.com',
                    to: `${booking.user.email}`,
                    subject: 'Renew your book',
                    html:`<h3>${booking.book.name}</h3>`,
                    text: 'Its been more than 3 minutes you have booked it'
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  clearInterval(sentEmail);
            }
        }
        const sentEmail = setInterval(sendEMail,60000);
        //sent email started
        await Booking.findByIdAndDelete(req.body.bookingId);
        res.status(200).redirect('/api/librarian');
    } catch (error) {
        return res.status(500).send(error.message);
    }
});
router.get('/:id', async(req,res)=>{
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(404).send('booking with the id not found');

    res.status(200).render('personalBooking', {booking:booking});
});

module.exports = router;