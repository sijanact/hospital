const mongoose = require('mongoose');

const prescriptionSchema = mongoose.Schema({
  note: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  date: {
    type: Date,
  },
});

const Prescription = mongoose.Model('Prescription', prescriptionSchema);
module.exports = Prescription;
