const express = require('express');
const upload = require('../middlewares/upload');
const controller = require('../controllers/hospitalControllers');

const router = express.Router();

router.get('/', controller.getHospital);
router.post('/', upload.single('image'), controller.postHospital);
router.get('/:id', controller.getHospitalById);
router.get('/:id/department', controller.getDepartmentByHospitalId);
router.get('/:id/doctor', controller.getDoctorByHospitalId);

router.delete('/:id', controller.deleteHospital);
router.patch('/:id', controller.patchHospital);

module.exports = router;
