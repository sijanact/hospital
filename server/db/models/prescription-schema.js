const mongoose = require('mongoose');

const prescriptionSchema = mongoose.Schema({
  note: {
    type: String,
  },
  userId: {
    type: String,
  },

  doctorId: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Prescription = mongoose.Model('Prescription', prescriptionSchema);
module.exports = Prescription;
