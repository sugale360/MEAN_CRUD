const express = require('express');
const router = express.Router();
var studentModel = require('../src/student/studentModel');
// add records
router.post('/student/create', async (req, res) => {
    const student = new studentModel(req.body);
    try {
        await student.save();
        res.status(201).send({
            "status": "student created",
            "message": "Student created!"
        });
    }
    catch (error) {
        res.send(error);
    }
});

// view records
router.get('/students', async (req, res) => {
    try {
        const students = await studentModel.find({});
        res.status(200).send(students);
    }
    catch (error) {
        res.status(400).send(error);
    }
});

// find records
router.get('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const students = await studentModel.findById({ _id });
        if (!students) {
            return res.status(404).send();
        }
        return res.status(200).send(students);

    }
    catch (error) {
        res.status(400).send(error);
    }
});
// update records 
router.patch('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatestudents = await studentModel.findByIdAndUpdate( _id, body, {new:true} );
        if (!updatestudents) {
            return res.status(404).send();
        }
        res.status(201).send({
            "status": true,
            "message": "Student updated!"
        });

    }
    catch (error) {
        res.status(400).send(error);
    }
});

//delete
router.delete('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletestudents = await studentModel.findByIdAndDelete( _id);
        if (!deletestudents) {
            return res.status(404).send();
        }
        res.status(201).send({
            "status": true,
            "message": "Student deleted!"
        });

    }
    catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;