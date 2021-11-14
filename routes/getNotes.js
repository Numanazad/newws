const express = require('express');
const router = express.Router();
const { Note } = require('../models/notes');
const path = require('path');

router.get('/',async(req,res)=>{
    res.render('getNotesMukid');
});
router.get('/search', async(req,res)=>{
    const dept = req.query.department;
    const sem = req.query.semester;
    await Note.find({department:dept, semester:sem}, (err,result)=>{
        if(err) throw err.message;
        res.render('searchedNotesMukid', {books:result});
    });
});
router.get('/uploads/:filepath', async(req,res)=>{
    const file = req.params.filepath;
    const actualfile = path.join(__dirname, '../uploads', file);
    res.download(actualfile);
});

module.exports = router;