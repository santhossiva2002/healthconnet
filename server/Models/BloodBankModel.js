const mongoose = require('mongoose');

const bloodBankSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  location: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    required: true,
    enum: ['Immediate', 'Within 24 Hours', 'Within 3 Days'],
  },
  hospitalName: {
    type: String,
  },
  doctorContact: {
    type: String,
  },
  bloodUnitsRequired: {
    type: Number,
    min: 1,
  },
  donorEligibility: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BloodBank', bloodBankSchema);
