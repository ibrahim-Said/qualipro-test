var express = require('express');
var router = express.Router();
const AuthController = require('../Controllers/AuthController');
const { SignInRequest } = require('../validators/SignInRequest');
const validate = require('../middlewares/validate');

router.post('/sign-in', SignInRequest,validate, AuthController.signIn);

module.exports = router;
