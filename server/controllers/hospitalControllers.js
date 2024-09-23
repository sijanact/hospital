const Hospital = require('../db/models/hospital-schema');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports.getHospital = async (req, res) => {
  const hospital = await Hospital.find();

  res.status(200).json(hospital);
};

module.exports.postHospital = async (req, res) => {
  const hospital = await Hospital.create({
    name: req.body.name,
    address: {
      street: req.body.street,
      city: req.body.city,
      pincode: req.body.pincode,
    },
    image: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`,
    department: req.body.department,
    doctor: req.body.doctor,
  });

  res.status(201).json({ message: 'Hospital added', data: hospital });
};

module.exports.getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id);

    res.status(200).json(hospital);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports.getDepartmentByHospitalId = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id).populate('department');

    res.status(200).json(hospital.department);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports.getDoctorByHospitalId = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id).populate('doctor');

    res.status(200).json(hospital.doctor);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports.deleteHospital = async (req, res) => {
  const { id } = req.params;
  const hospital = await Hospital.findByIdAndDelete(id);
  res.status(200).json({ message: 'hospital deleted' });
};

module.exports.patchHospital = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const hospital = await Hospital.findByIdAndUpdate(id, {
    $push: {
      doctor: body.doctor,
      department: body.department,
    },
  });

  res.status(200).json({ message: 'hospital edited' });
};
