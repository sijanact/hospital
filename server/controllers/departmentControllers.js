const Department = require('../db/models/department-schema');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports.getDepartments = async (req, res) => {
  //get departments from api
  const department = await Department.find();
  res.status(200).json(department);
};

module.exports.postDepartments = async (req, res) => {
  const department = await Department.create({
    name: req.body.name,
    image: `http://localhost:${process.env.PORT}/${req.file.filename}`,
  });
  res.status(201).json({ message: 'Department added', data: department });
};
