var express = require('express');
var router = express.Router();
const userController = require('../Controllers/UserController');
const validate = require('../middlewares/validate');
const { StoreUserRequest } = require('../validators/StoreUserRequest');
const {verifyToken,isAdmin} = require('../middlewares/authJwt');
/* GET users listing. */
router.get('/', verifyToken, userController.getUsers);
router.get('/:id', verifyToken, isAdmin, userController.getUserById);
router.post('/', verifyToken, isAdmin, StoreUserRequest, validate, userController.createUser);
router.put('/:id', verifyToken, isAdmin, StoreUserRequest, validate, userController.updateUser);
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
