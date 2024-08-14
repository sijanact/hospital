const express = require('express');
const upload = require('../middlewares/upload');
const controller = require('../controllers/departmentControllers');

const router = express.Router();

router.get('/', controller.getDepartments);
router.post('/', upload.single('image'), controller.postDepartments);

module.exports = router;
