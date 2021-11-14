const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    book:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true
            },
            author:{
                type:String,
                required:true
            },
            department:{
                type:String,
                required:true
            },
            semester:{
                type:Number,
                required:true
            }
        }),
        required:true
    }, 
    user:{
        type:new mongoose.Schema({
            firstname:{
                type:String,
                required:true
            },
            lastname:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            department:{
                type:String,
                required:true
            },
            semester:{
                type:Number,
                required:true
            }
        }),
        required:true
    
    },
    dateOut:{
        type:Date,
        required:true
    },
    dateIn:{
        type:Date
    },
    penalty:{
        type:Number
    }
});


function validateBooking(booking){
    const schema = {
        confirmedBookingId:Joi.objectId().required(),
        bookId: Joi.objectId().required(),
        userId: Joi.objectId().required()
    };
    return Joi.validate(booking, schema);
}

const ReturnedBooking = mongoose.model("ReturnedBooking", bookingSchema);
exports.ReturnedBooking = ReturnedBooking;
exports.validate = validateBooking;