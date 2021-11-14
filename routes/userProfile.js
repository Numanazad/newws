const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { User } = require('../models/users');

router.get('/', auth,async(req,res)=>{
    res.render('userProfile', {user:req.user});
});
router.get('/update', auth, async(req,res)=>{
    res.render('userProfileUpdate', {user:req.user});
});
router.post('/update', auth, async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.user._id, {
        firstname:req.body.fname,
        lastname:req.body.lname,
        semester:req.body.semester,
        department:req.body.department
    },{ new: true });
    if(!user) return res.status(404).send('not authenticated');
    res.redirect('/myProfile');
});

module.exports = router;