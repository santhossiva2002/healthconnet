const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  goal: {
    type: Number,
    required: true,
    min: 1,
  },
  deadline: {
    type: Date,
    required: true,
  },
  beneficiary: {
    type: String,
  },
  paymentDetails: {
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

module.exports = mongoose.model('Donation', donationSchema);
