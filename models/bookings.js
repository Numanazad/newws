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
        required:true,
        default:Date.now
    },
    dateIn:{
        type:Date
    },
    penalty:{
        type:Number
    }
});

function validateBookings(booking){
    const schema = {
        bookId:Joi.objectId().required(),
        userId:Joi.objectId().required()
    }
    return Joi.validate(booking, schema);
}

const Booking = mongoose.model("Booking", bookingSchema);
exports.Booking = Booking;
exports.validate = validateBookings;