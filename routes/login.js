const {User} = require('../models/users');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

router.get('/', async(req,res)=>{
    res.render('userLogin');
});
router.post('/',async(req,res)=>{
    const email = req.body.email;
    const user = await User.findOne({email});
    if(!user) return res.status(404).send('user doesnot exists');

    const auth = await bcrypt.compare(req.body.password, user.password);
    const token = user.generateAuthToken();
    if(auth){
        res.cookie('studentcookie',token,{
            expires:new Date(Date.now()+300000),
            httpOnly:true
        });
        res.redirect('/dashboard');
    }
    else {res.json({status:'notOk', message:'watch out for the login details'})};
});

module.exports = router;