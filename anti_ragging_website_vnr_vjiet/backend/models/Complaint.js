const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  rollNumber: String,
  message: String,
  location: String,
  bullyingType: String,
  knowPerson: Boolean,
  privacy: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);