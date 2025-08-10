const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the 'uploads' directory exists
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Create a unique filename to prevent overwriting
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// POST route to submit a new complaint
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Received file data:', req.file);

    const complaintData = {
      ...req.body,
      // Correctly set knowPerson to a boolean.
      knowPerson: !!req.body.knowPerson,
      // Add the file path to the complaint data, if a file was uploaded
      image: req.file ? req.file.path : null
    };

    const complaint = new Complaint(complaintData);
    await complaint.save();
    console.log('Complaint submitted successfully');
    res.status(200).json({ message: 'Complaint submitted' });
  } catch (error) {
    console.error('Server error on submitting complaint:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route to retrieve all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error('Server error on fetching complaints:', error);
    res.status(500).json({ error: 'Server error' });
  }
  
});

module.exports = router;
