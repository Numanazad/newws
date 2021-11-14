require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    lastname:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    department:{
        type:String
    },
    semester:{
        type:Number
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
    },
    isTeacher:{
        type:Boolean,
        default:false
    },
    isLibrarian:{
        type:Boolean,
        default:false
    }
});

const virtual = userSchema.virtual('fullname');
virtual.get(function(value,virtual, doc){
    return this.firstname + " " + this.lastname;
})
// before compiling the model place every middleware 
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, firstname:this.firstname, lastname:this.lastname,email:this.email, department:this.department,
        semester:this.semester, isLibrarian:this.isLibrarian, isTeacher:this.isTeacher}, 
        process.env.authorisationToken);
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        firstname:Joi.string().required().min(2).max(50),
        lastname:Joi.string(),
        email:Joi.string().required().min(5).max(255).email(),
        password:Joi.string().required().min(5).max(255),
        department:Joi.string().required(),
        semester:Joi.number().required()
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;