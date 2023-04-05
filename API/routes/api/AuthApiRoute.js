const express = require('express');
const router = express.Router();

const apiAuthController = require('../../api/AuthAPI');

router.post('/login', apiAuthController.login);
// router.post('/login',apiAuthController.loginUser);

module.exports = router;