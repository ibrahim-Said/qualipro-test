var express = require('express');
var router = express.Router();
const roleController = require('../Controllers/RoleController');

router.get('/', roleController.getRoles);
module.exports = router;
