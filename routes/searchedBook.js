const {Book} = require('../models/books');
const express = require('express');
const router = express.Router();

router.get('/', async(req,res)=>{
    const dept = req.query.department;
    const sem = req.query.semester;

    res.send(`${dept, sem}`);
});

module.exports = router;