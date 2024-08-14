const Slot = require('../db/models/slot-schema');
const { objectId } = require('mongodb');

module.exports.getSlot = async (req, res) => {
  const slot = await Slot.find();
  res.status(200).json(slot);
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
  const body = req.body;
  const slot = await Slot.updateOne({ _id: newObjectId(id) }, { $set: body });
  res.status(200).json({ message: 'slot edited' });
};
