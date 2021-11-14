const express = require('express');
const app = express();
const routes = require('./startup/routes')(app);
const db = require('./startup/db')();

const port = 9000 || process.env.PORT;
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`listening to ${port}`);
});