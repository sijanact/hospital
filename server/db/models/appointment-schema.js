const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },

  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
