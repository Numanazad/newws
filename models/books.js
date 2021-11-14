const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxlength:255,
        required:true
    },
    author:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    },
    department:{
        type:String,
        minlength:3,
        maxlength:255,
        required:true
    },
    semester:{
        type:Number,
        minlength:1,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        minlength:0
    },
    date:{
        type:String,
        default:Date.now
    }
});

function validateBooks(books){
    const schema = {
        name:Joi.string().required().min(2).max(255),
        author:Joi.string().required().min(3).max(255),
        department:Joi.string().required().min(3).max(255),
        semester:Joi.number().required().min(1),
        quantity:Joi.number().required().min(0),
    }
    return Joi.validate(books,schema);
}

const Book = mongoose.model("Book", bookSchema);
exports.Book = Book;
exports.validate = validateBooks;