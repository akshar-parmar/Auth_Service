const express = require('express');
const UserController = require('../../controller/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index');
const router = express.Router();

router.post(
    '/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
);
router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
    );

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
);

router.delete(
    '/users/:id',
    UserController.deleteUser
);


module.exports = router;