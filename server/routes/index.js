const express = require('express');

const departmentRoutes = require('./department-routes');
const hospitalRoutes = require('./hospital-routes');
const doctorRoutes = require('./doctor-routes');
const userRoutes = require('./user-routes');
const slotRoutes = require('./slot-routes');
const appointmentRoutes = require('./appointment-routes');
const router = express.Router();

router.use('/department', departmentRoutes);
router.use('/hospital', hospitalRoutes);
router.use('/doctor', doctorRoutes);
router.use('/user', userRoutes);
router.use('/slot', slotRoutes);
router.use('/appointment', appointmentRoutes);

module.exports = router;
