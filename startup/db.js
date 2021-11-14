const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/library',{useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false} )
.then(()=>console.log('conn to db')).catch((error)=>console.log(error.message));
}