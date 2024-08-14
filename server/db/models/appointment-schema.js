const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  user: {
    type: String,
  },
  doctor: {
    type: String,
  },

  slotId: {
    type: String,
  },
});

const Appointment = mongoose.Model('Appointment', appointmentSchema);
module.exports = Appointment;
