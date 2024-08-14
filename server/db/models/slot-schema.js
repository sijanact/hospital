const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  availableSlots: {
    type: Number,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
});

const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;
