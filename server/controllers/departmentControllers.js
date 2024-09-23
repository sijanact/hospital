const Department = require('../db/models/department-schema');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports.getDepartment = async (req, res) => {
  //get departments from api
  const department = await Department.find();
  res.status(200).json(department);
};

module.exports.postDepartment = async (req, res) => {
  const department = await Department.create({
    name: req.body.name,
    image: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`,
  });
  res.status(201).json({ message: 'Department added', data: department });
};

module.exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);

    res.status(200).json(department);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  const department = await Department.findByIdAndDelete(id);
  res.status(200).json({ message: 'department deleted' });
};

module.exports.patchDepartment = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const department = await Department.findByIdAndUpdate(id, body);

  res.status(200).json({ message: 'department edited' });
};
