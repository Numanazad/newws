const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Book, validate } = require('../models/books');  

router.get('/',async (req,res)=>{
    let books = await Book.find();
    res.status(201).render('booksMukid');
});
router.post('/',async(req,res)=>{
    // joi validation
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // save to database
    let books = new Book(_.pick(req.body, ['name','author', 'department', 'semester', 'quantity']));
    books = await books.save();

    res.redirect('/api/uploadbooks');// render a page for admin only to view all the books uploaded sorted with date
});
router.put('/:id',async(req,res)=>{
    // joi validation
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //save to database
    let books = await Book.findByIdAndUpdate(req.params.id,
    {
        name:req.body.name,
        author:req.body.author,
        department:req.body.department,
        semester:req.body.semester,
        quantity:req.body.quantity
    }, {new:true});

    if(!books) return res.status(404).send('book with the given id is not found');

    res.send(books);
});
router.delete('/:id',async(req,res)=>{
    let books = await Book.findByIdAndDelete(req.params.id);
    if(!books) return res.status(404).send('book with given id not found');

    res.send(books);
});

module.exports = router;