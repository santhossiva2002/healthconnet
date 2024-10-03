const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Password stored as plain text
});

AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return candidatePassword === this.password; // Plain text comparison
};

module.exports = mongoose.model('Admin', AdminSchema);
