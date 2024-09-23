const Appointment = require('../db/models/appointment-schema');

module.exports.getAppointmentByDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.find({ doctorId: id })
      .populate('userId') // Optional: to get user details
      .populate('slot'); // Optional: to get slot details
    if (!appointment) {
      return res
        .status(404)
        .json({ message: 'No appointments found for this doctor' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports.getAppointmentByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.find({ userId: id })
      .populate('doctorId') // Optional: to get user details
      .populate('slot'); // Optional: to get slot details
    if (!appointment) {
      return res
        .status(404)
        .json({ message: 'No appointments found for this user' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
