const { Router } = require('express')
const authController = require('../../controllers/auth.controller')
const validate = require('../../middlewares/Validator/auth')
const isAuthenticated = require('../../middlewares/isAuthenticated')

const router = Router()
const feeItemRoutes = require('./feeItem')
const aclRoutes = require('./acl')
const statesRoutes = require('./states')
const personnelFeeRoutes = require('./personnelFee')
const firmFeeRoutes = require('./firmFee')
router.post('/signup', validate('createAdmin'), authController.register)
// router.get('/send-otp', validate('sendOtp'), buyerController.sendOtp);
// router.post('/verify-otp', validate('sendOtp'), buyerController.verifyOtp);

//console.log('check', 'got into routes');

router.use('/feeItems', feeItemRoutes)
router.use('/acl', isAuthenticated, aclRoutes)
router.use('/states', isAuthenticated, statesRoutes)
router.use('/personnelFee', isAuthenticated, personnelFeeRoutes)
router.use('/firmFee', isAuthenticated, firmFeeRoutes)

module.exports = router
