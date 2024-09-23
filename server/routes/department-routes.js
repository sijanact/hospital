const express = require('express');
const upload = require('../middlewares/upload');
const controller = require('../controllers/departmentControllers');

const router = express.Router();

router.get('/', controller.getDepartment);
router.post('/', upload.single('image'), controller.postDepartment);
router.get('/:id', controller.getDepartmentById);

router.delete('/:id', controller.deleteDepartment);
router.patch('/:id', controller.patchDepartment);

module.exports = router;
