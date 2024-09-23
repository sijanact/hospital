const express = require('express');
const controller = require('../controllers/appointmentControllers');

const router = express.Router();

router.get('/doctor/:id', controller.getAppointmentByDoctor);
router.get('/user/:id', controller.getAppointmentByUser);

module.exports = router;
