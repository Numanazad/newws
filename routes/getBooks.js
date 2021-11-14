const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Book } = require('../models/books');

router.get('/',async(req,res)=>{
    const books = await Book.find();
    res.render('getbooksMukid');
});
router.get('/search', async(req,res)=>{
    const dept = req.query.department;
    const sem = req.query.semester;
    await Book.find({department:dept, semester:sem}, (err,result)=>{
        if(err) throw err.message;
        res.render('searchedBooksMukid', {books:result});
    });
});
router.get('/:id',auth, async(req,res)=>{
    const books = await Book.findById(req.params.id); //here books is only one book that is of the id passed
    res.render('userBookings', {
        books:books,
        user:req.user
    })
});

module.exports = router;