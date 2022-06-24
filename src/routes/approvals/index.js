const { Router } = require('express')

const personnelController = require('../../controllers/personnel.controller')
const firmController = require('../../controllers/firm.controller')
const isAuthorized = require('../../middlewares/isAuthorized')

const router = Router()

router.post(
	'/personnels/approve-vetted/:personnelId',
	isAuthorized(),
	personnelController.approveToVetted
)
router.post(
	'/personnels/approve-activated/:personnelId',
	//isAuthorized(),
	personnelController.approveToActivateAfterPayment
)

router.post(
	'/firms/approve-vetted/:firmId',
	isAuthorized(),
	firmController.approveToVetted
)

module.exports = router
