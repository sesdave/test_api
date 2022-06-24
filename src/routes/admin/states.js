const { Router } = require('express')
const stateController = require('../../controllers/state.controller')
const aclController = require('../../controllers/acl.controller')
const hasPermission = require('../../middlewares/hasPermission')
const isAuthorized = require('../../middlewares/isAuthorized')
const validate = require('../../middlewares/Validator/acl')

const router = Router()

router.get('/', stateController.getStates)
router.post('/', isAuthorized(''), aclController.assignStateToAdmin)
router.get('/:adminId', isAuthorized(''), aclController.getAdminStates)
router.post('/delete', isAuthorized(''), aclController.removeStateFromAdmin)

module.exports = router
