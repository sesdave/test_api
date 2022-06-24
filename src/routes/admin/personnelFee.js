const { Router } = require("express");
const personnelFeeController = require('../../controllers/personnelFee.controller');
const isAuthorized = require('../../middlewares/isAuthorized');

const router = Router();

router.get('/fees', personnelFeeController.getAllSelectFees);
router.get('/:personnelFeeId', isAuthorized(''), personnelFeeController.getOne);
router.put('/:personnelFeeId', isAuthorized(''), personnelFeeController.update);
router.post('/', isAuthorized(''), personnelFeeController.create);
router.get('/', personnelFeeController.getAll);
//router.get('/fees', personnelFeeController.getAllSelectFees);

module.exports = router;