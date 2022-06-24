const { Router } = require('express')
const firmController = require('../../controllers/firm.controller')
const authController = require('../../controllers/auth.controller')
const validate = require('../../middlewares/Validator/auth')

const router = Router()

router.post('/signup', validate('createFirm'), authController.register)
router.put('/:firmId', firmController.updateFirm)
router.get('/states/:adminId', firmController.getByAdminStates)


// router.get('/send-otp', validate('sendOtp'), buyerController.sendOtp);
// router.post('/verify-otp', validate('verifyOtp'), buyerController.verifyOtp);
// router.post(
//     '/update-password',
//     isAuthenticated,
//     isAuthorized(),
//     validate('updatePassword'),
//     buyerController.updatePassword
// );
// router.post(
//     '/forgot-password',
//     validate('forgotPassword'),
//     buyerController.setPassword
// );

module.exports = router
