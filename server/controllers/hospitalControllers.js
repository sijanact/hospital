const Hospital = require('../db/models/hospital-schema');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports.getHospitals = async (req, res) => {
  const hospital = await Hospital.find();

  res.status(200).json(hospital);
};

module.exports.postHospitals = async (req, res) => {
  const hospital = await Hospital.create({
    name: req.body.name,
    address: {
      street: req.body.street,
      city: req.body.city,
      pincode: req.body.pincode,
    },
    image: `http://localhost:${process.env.PORT}/${req.file.filename}`,
    department: req.body.department,
  });

  res.status(201).json({ message: 'Hospital added', data: hospital });
};
