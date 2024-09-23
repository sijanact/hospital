const Slot = require('../db/models/slot-schema');
const Appointment = require('../db/models/appointment-schema');

module.exports.getSlot = async (req, res) => {
  const slot = await Slot.find().populate('doctorId');
  res.status(200).json(slot);
};

module.exports.getSlotByDoctorId = async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.find({ doctorId: id }).populate('doctorId');
    // console.log(slot);
    res.status(200).json(slot);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports.postSlot = async (req, res) => {
  const slot = await Slot.create({
    date: req.body.date,
    from: req.body.from,
    to: req.body.to,
    availableSlots: req.body.availableSlots,
    doctorId: req.body.doctorId,
  });
  res.status(201).json({ message: 'Slot added', data: slot });
};

module.exports.deleteSlot = async (req, res) => {
  const { id } = req.params;
  const slot = await Slot.findByIdAndDelete(id);
  res.status(200).json({ message: 'slot deleted' });
};

module.exports.patchSlot = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const body = req.body;
  const slot = await Slot.findByIdAndUpdate(id, body, { new: true });

  res.status(200).json({ message: 'slot edited', slot });
};

// book slot

module.exports.bookSlotsById = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const { userId } = req.body;
  // console.log(userId);
  const slot = await Slot.findById(id);

  if (slot.availableSlots === 0) {
    return res.status(400).json({ message: 'Slot is fully booked' });
  }

  const updated = await Slot.findByIdAndUpdate(id, {
    availableSlots: slot.availableSlots - 1,
  });

  const app = await Appointment.create({
    doctorId: slot.doctorId,
    slot: slot._id,
    userId: userId,
  });

  res.status(200).json({ message: 'booked', app });
};
