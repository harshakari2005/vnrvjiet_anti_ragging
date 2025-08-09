// This file defines the Express router for handling report-related API endpoints.
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// POST route to submit a new complaint
router.post('/', async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    console.log('Complaint submitted successfully!');
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

// Export the router module
module.exports = router;