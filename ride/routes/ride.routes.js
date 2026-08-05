const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
//const rideControler = require('../controler/ride.controler')
const rideController=require('../controllers/rideControllers')


router.post('/create-ride', authMiddleware.authUser, rideController.createRide)
router.put('/accept-ride',authMiddleware.captainAuth, rideController.acceptRide)


module.exports = router; 