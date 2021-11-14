const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Note, validate } = require('../../models/notes');

router.get('/',async (req,res)=>{
    let notes = await Note.find();
    res.status(201).send(notes);
});
router.post('/',async(req,res)=>{
    // joi validation
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // save to database
    let notes = new Note(_.pick(req.body, ['name', 'department', 'semester']));
    notes = await notes.save();

    res.send(notes); 
});
router.put('/:id',async(req,res)=>{
    // joi validation
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //save to database
    let notes = await Note.findByIdAndUpdate(req.params.id,
    {
        name:req.body.name,
        department:req.body.department,
        semester:req.body.semester
    }, {new:true});

    if(!notes) return res.status(404).send('note with the given id is not found');

    res.send(notes);
});
router.delete('/:id',async(req,res)=>{
    let notes = await Note.findByIdAndDelete(req.params.id);
    if(!notes) return res.status(404).send('note with given id not found');

    res.send(notes);
});

module.exports = router;