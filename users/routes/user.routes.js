const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controllers.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logOut);
router.get('/profile', authMiddleware.userAuth, userController.profile);

module.exports = router;