const express = require('express');
const upload = require('../middlewares/upload');
const controller = require('../controllers/doctorControllers');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/sign-up', upload.single('image'), controller.signupDoctor);
router.post('/login', controller.loginDoctor);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset/:token', controller.resetPassword);
router.get('/', controller.getDoctor);
router.get('/:id', controller.getDoctorById);
router.get('/:id/doctor', controller.getDoctorByDepartmentId);

router.get(
  '/hospital/:hospitalid/department/:departmentid',
  controller.getDoctorByHospitalAndDepartment
);
router.patch('/:id', controller.patchDoctor);
router.delete('/:id', controller.deleteDoctor);

module.exports = router;
