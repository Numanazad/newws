const bcrypt = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User, validate} = require('../../models/users');

router.get('/',async(req,res)=>{
    const user = await User.find();
    res.status(200).render('users');
});
router.post('/',async (req,res)=>{
    //joi validation
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //if user already exists than display message
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('user already exists');

    //register the user
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'department', 'semester']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).status(200).render('adminLogin');
});

module.exports = router;