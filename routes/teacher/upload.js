const express = require('express');
const router = express.Router();
const fileHandler = require('../../middleware/uploadNotes');
const { Note, validate } = require('../../models/notes');

router.get('/',async(req,res)=>{
    res.render('notesTeacherUpload');
});
router.post('/', fileHandler.single('notes') ,async(req,res)=>{
    const file = {
        filepath:req.file.path,
        filename:req.file.originalname,
        contentType:req.file.mimetype
    }
    let note = await new Note({
        filepath:file.filepath,
        name:req.body.name,
        department:req.body.department,
        semester:req.body.semester
    });
    await note.save();
    res.send(note);
});
router.get('/:id', async(req,res)=>{
    const image = await Note.findById(req.params.id);
    res.send(image)
});

module.exports = router;