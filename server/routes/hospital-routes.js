const express = require('express');
const upload = require('../middlewares/upload');
const controller = require('../controllers/hospitalControllers');

const router = express.Router();

router.get('/', controller.getHospitals);
router.post('/', upload.single('image'), controller.postHospitals);

module.exports = router;
