const express = require('express');

const controller = require('../controllers/userControllers');

const router = express.Router();

router.post('/sign-up', controller.signupUser);
router.post('/login', controller.loginUser);
router.get('/userbyid/:id', controller.getUserById);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset/:token', controller.resetPassword);

module.exports = router;
