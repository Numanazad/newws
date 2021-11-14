const { Booking, validate } = require('../models/bookings');
const { Book } = require('../models/books');
const { User } = require('../models/users');
const Fawn = require('fawn');
const express = require('express');
const router =  express.Router();

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
    let booking = new Booking({
        book:{
            _id:book._id,
            name:book.name,
            author:book.author,
            department:book.department,
            semester:book.semester
        },
        user:{
            _id:user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            department:user.department,
            semester:user.semester
        }
    });

    booking = await booking.save();
    res.status(200).redirect('/');
});
router.get('/:id', async(req,res)=>{
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(404).send('booking with the id not found');

    res.status(200).send(booking);
});

module.exports = router;