const { Router } = require("express");
const paymentController = require('../../controllers/payment.controller');
const validate = require('../../middlewares/Validator/payment');
const isAuthenticated= require('../../middlewares/isAuthenticated');
const isAuthorized= require('../../middlewares/isAuthorized');

const router = Router();

router.get('/', isAuthenticated, isAuthorized(''), paymentController.getAll);
router.post('/initialize', validate('initialize'), paymentController.initialize);
router.post('/link-payment', validate('linkPayment'), paymentController.linkPayment);
router.post('/verify-rrr', validate('verifyRRR'), paymentController.verifyPayment);
router.get('/:paymentId', isAuthenticated, isAuthorized(''), paymentController.getOneById);
router.put('/finalize/:reference', validate('finalize'), paymentController.finalize);
router.get('/reference/:reference', isAuthenticated, isAuthorized(''), paymentController.getOneByReference);
router.put('/webhook/remita-update-payment-status/:reference', paymentController.finalize);

module.exports = router;