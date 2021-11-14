const multer = require('multer');
const { extname } = require('path');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname+Date.now()+extname(file.originalname))
    }
})

var upload = multer({storage:storage});
module.exports = upload;
