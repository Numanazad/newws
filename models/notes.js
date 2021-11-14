const mongoose = require('mongoose');
const Joi = require('joi');

const noteSchema = new mongoose.Schema({
    filepath:{
        type:String,
        required:true
    },
    name:{
        type:String,
        minlength:2,
        maxlength:255,
        required:true
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
    date:{
        type:String,
        default:Date.now
    }
});

function validateNotes(notes){
    const schema = {
        name:Joi.string().required().min(2).max(255),
        filepath:Joi.string().required(),
        department:Joi.string().required().min(3).max(255),
        semester:Joi.number().required().min(1)
    }
    return Joi.validate(notes,schema);
}

const Note = mongoose.model("Note", noteSchema);
exports.Note = Note;
exports.validate = validateNotes;